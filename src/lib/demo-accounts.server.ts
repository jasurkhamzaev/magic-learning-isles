import { DEMO_PASSWORD, demoEmailFromName, type DemoAccount } from "@/lib/demo-accounts";

type MinimalSupabase = {
  from: (t: string) => {
    select: (c: string) => { eq: (k: string, v: string) => Promise<{ data: { role: string }[] | null }> };
  };
};

export async function assertStaffServer(supabase: unknown, userId: string) {
  const { data } = await (supabase as MinimalSupabase)
    .from("user_roles")
    .select("role")
    .eq("user_id", userId);
  const roles = (data ?? []).map((r) => r.role);
  if (!roles.includes("superadmin") && !roles.includes("manager")) {
    throw new Error("Forbidden: faqat superadmin yoki manager");
  }
  return roles;
}

type DemoStudent = {
  full_name: string;
  avatar_emoji: string;
  island: string;
  grade: number | null;
  xp: number;
  stars: number;
  level: number;
  streak: number;
};

async function loadDemoStudents() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("demo_students")
    .select("full_name, avatar_emoji, island, grade, xp, stars, level, streak")
    .order("xp", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as DemoStudent[];
}

async function existingEmails() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  const map = new Map<string, string>();
  for (const u of data?.users ?? []) {
    if (u.email) map.set(u.email.toLowerCase(), u.id);
  }
  return map;
}

export async function buildDemoAccountList(): Promise<DemoAccount[]> {
  const [students, emails] = await Promise.all([loadDemoStudents(), existingEmails()]);
  return students.map((s) => {
    const email = demoEmailFromName(s.full_name);
    return { fullName: s.full_name, email, password: DEMO_PASSWORD, exists: emails.has(email) };
  });
}

export async function provisionAll() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const [students, emails] = await Promise.all([loadDemoStudents(), existingEmails()]);

  let created = 0;
  let updated = 0;
  const accounts: DemoAccount[] = [];

  for (const s of students) {
    const email = demoEmailFromName(s.full_name);
    let userId = emails.get(email);

    if (!userId) {
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        password: DEMO_PASSWORD,
        email_confirm: true,
        user_metadata: {
          full_name: s.full_name,
          role: "student",
          avatar_emoji: s.avatar_emoji,
          demo: true,
        },
      });
      if (error || !data.user) {
        accounts.push({ fullName: s.full_name, email, password: DEMO_PASSWORD, exists: false });
        continue;
      }
      userId = data.user.id;
      created += 1;
    } else {
      // Parolni har safar qayta demo parolga tiklaymiz — demo hisoblar doim ishlashi uchun.
      await supabaseAdmin.auth.admin.updateUserById(userId, {
        password: DEMO_PASSWORD,
        email_confirm: true,
      });
      updated += 1;
    }

    await supabaseAdmin
      .from("profiles")
      .update({
        full_name: s.full_name,
        avatar_emoji: s.avatar_emoji,
        island: s.island,
        grade: s.grade,
        xp: s.xp,
        stars: s.stars,
        level: s.level,
        streak: s.streak,
      })
      .eq("id", userId);

    await supabaseAdmin
      .from("user_roles")
      .upsert({ user_id: userId, role: "student" }, { onConflict: "user_id,role" });

    accounts.push({ fullName: s.full_name, email, password: DEMO_PASSWORD, exists: true });
  }

  return { created, updated, total: students.length, accounts };
}

export async function magicLinkFor(email: string, redirectTo: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.auth.admin.generateLink({
    type: "magiclink",
    email,
    options: { redirectTo },
  });
  if (error) throw new Error(error.message);
  return { link: data.properties?.action_link ?? null };
}
