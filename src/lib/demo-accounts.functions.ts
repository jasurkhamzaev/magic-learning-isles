import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { DEMO_EMAIL_DOMAIN } from "@/lib/demo-accounts";

export const listDemoAccounts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { assertStaffServer, buildDemoAccountList } = await import("@/lib/demo-accounts.server");
    await assertStaffServer(context.supabase, context.userId);
    return buildDemoAccountList();
  });

export const provisionDemoAccounts = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { assertStaffServer, provisionAll } = await import("@/lib/demo-accounts.server");
    await assertStaffServer(context.supabase, context.userId);
    return provisionAll();
  });

export const createDemoMagicLink = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { email: string; redirectTo: string }) =>
    z
      .object({
        email: z.string().email().max(200),
        redirectTo: z.string().url().max(500),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { assertStaffServer, magicLinkFor } = await import("@/lib/demo-accounts.server");
    await assertStaffServer(context.supabase, context.userId);

    const email = data.email.trim().toLowerCase();
    if (!email.endsWith(`@${DEMO_EMAIL_DOMAIN}`)) {
      throw new Error("Faqat demo hisoblar uchun magic link yaratiladi");
    }
    return magicLinkFor(email, data.redirectTo);
  });
