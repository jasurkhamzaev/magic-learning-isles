import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const roleSchema = z.enum(["superadmin", "manager", "teacher", "parent", "student"]);

async function assertStaff(supabase: {
  from: (t: "user_roles") => {
    select: (c: string) => { eq: (k: string, v: string) => Promise<{ data: { role: string }[] | null }> };
  };
}, userId: string) {
  const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId);
  const roles = (data ?? []).map((r) => r.role);
  if (!roles.includes("superadmin") && !roles.includes("manager")) {
    throw new Error("Forbidden: faqat superadmin yoki manager");
  }
  return roles;
}

export const listAllUsers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertStaff(context.supabase as never, context.userId);

    const [{ data: profiles }, { data: roleRows }] = await Promise.all([
      context.supabase
        .from("profiles")
        .select("id, full_name, email, avatar_emoji, island, grade, xp, stars, level, streak, created_at")
        .order("xp", { ascending: false }),
      context.supabase.from("user_roles").select("user_id, role"),
    ]);

    const byUser = new Map<string, string[]>();
    for (const r of roleRows ?? []) {
      const list = byUser.get(r.user_id) ?? [];
      list.push(r.role);
      byUser.set(r.user_id, list);
    }

    return (profiles ?? []).map((p) => ({ ...p, roles: byUser.get(p.id) ?? [] }));
  });

export const setUserRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { userId: string; role: string }) =>
    z.object({ userId: z.string().uuid(), role: roleSchema }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const callerRoles = await assertStaff(context.supabase as never, context.userId);

    // Superadmin rolini faqat superadmin bera oladi.
    if (data.role === "superadmin" && !callerRoles.includes("superadmin")) {
      throw new Error("Forbidden: superadmin rolini faqat superadmin beradi");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("user_roles").delete().eq("user_id", data.userId);
    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: data.userId, role: data.role });
    if (error) throw new Error(error.message);

    return { ok: true };
  });
