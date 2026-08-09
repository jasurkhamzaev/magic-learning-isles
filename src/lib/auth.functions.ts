import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Email holatini tekshiradi: hisob mavjudmi va qanday usul bilan yaratilgan.
 * Faqat "exists" va provayder nomlarini qaytaradi — hech qanday shaxsiy ma'lumot yo'q.
 * Maqsad: bir email bilan takror ro'yxatdan o'tishni bloklash va Google hisobini bog'lash.
 */
export const checkEmailStatus = createServerFn({ method: "POST" })
  .inputValidator((input: { email: string }) =>
    z.object({ email: z.string().email().max(200) }).parse(input),
  )
  .handler(async ({ data }) => {
    const email = data.email.trim().toLowerCase();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: list, error } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 });
    if (error) return { exists: false, providers: [] as string[] };

    const user = (list?.users ?? []).find((u) => (u.email ?? "").toLowerCase() === email);
    if (!user) return { exists: false, providers: [] as string[] };

    const providers = (user.identities ?? []).map((i) => i.provider);
    return {
      exists: true,
      providers: providers.length ? providers : ["email"],
    };
  });
