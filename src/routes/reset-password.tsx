import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Loader2, Lock, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { MagicalBackground } from "@/components/MagicalBackground";
import { GlassCard } from "@/components/PageShell";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Parolni tiklash — Hashimjon Akademiyasi" },
      { name: "description", content: "Emailingizga yuborilgan havola orqali yangi parol o'rnating." },
      { property: "og:title", content: "Parolni tiklash — Hashimjon Akademiyasi" },
      { property: "og:description", content: "Yangi parol o'rnatib, hisobingizga qayta kiring." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;
      if (event === "PASSWORD_RECOVERY" || session) setReady(true);
    });
    void supabase.auth.getSession().then(({ data }) => {
      if (active && data.session) setReady(true);
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Parollar mos emas");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Parol yangilandi ✅ Endi kirishingiz mumkin");
    void navigate({ to: "/dashboard" });
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16">
      <MagicalBackground />
      <Link
        to="/auth"
        className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 backdrop-blur-xl hover:bg-white/10"
      >
        <ArrowLeft className="h-4 w-4" /> Kirish sahifasi
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-md">
        <GlassCard className="!p-7 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-magic text-2xl">
            🔐
          </span>
          <h1 className="mt-4 text-2xl font-extrabold text-white">Yangi parol</h1>
          <p className="mt-1 text-sm text-white/60">
            {ready
              ? "Yangi parolni kiritib, hisobingizni himoyalang."
              : "Havolani tekshirmoqdamiz... Agar havola eskirgan bo'lsa, qaytadan so'rov yuboring."}
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-3 text-left">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <Lock className="h-4 w-4 text-magic-pink" />
              <input
                required
                minLength={6}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Yangi parol (kamida 6 belgi)"
                autoComplete="new-password"
                className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <Lock className="h-4 w-4 text-magic-cyan" />
              <input
                required
                minLength={6}
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Parolni takrorlang"
                autoComplete="new-password"
                className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={busy || !ready}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-sunset py-3 text-sm font-extrabold text-white disabled:opacity-60"
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" />} Parolni saqlash
            </button>
          </form>
        </GlassCard>
      </motion.div>
    </main>
  );
}
