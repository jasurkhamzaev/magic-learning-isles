import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "motion/react";
import { Loader2, Mail, Lock, User as UserIcon, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { checkEmailStatus } from "@/lib/auth.functions";
import { MagicalBackground } from "@/components/MagicalBackground";
import { GlassCard } from "@/components/PageShell";
import { ROLE_DESC, ROLE_EMOJI, ROLE_LABEL, SIGNUP_ROLES, type AppRole } from "@/lib/roles";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Kirish / Ro'yxatdan o'tish — Hashimjon Akademiyasi" },
      { name: "description", content: "Hashimjon Akademiyasiga kiring: o'quvchi, ustoz yoki ota-ona sifatida ro'yxatdan o'ting." },
      { property: "og:title", content: "Kirish — Hashimjon Akademiyasi" },
      { property: "og:description", content: "O'quvchi, ustoz yoki ota-ona sifatida sehrli bilim orollariga qo'shiling." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

type Mode = "login" | "signup" | "forgot";

function AuthPage() {
  const navigate = useNavigate();
  const emailStatus = useServerFn(checkEmailStatus);
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<AppRole>("student");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast.success("Parolni tiklash havolasi emailingizga yuborildi ✉️");
        setMode("login");
        return;
      }

      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          // Google bilan yaratilgan hisob bo'lsa — aniq yo'l ko'rsatamiz (account linking).
          const status = await emailStatus({ data: { email } }).catch(() => null);
          if (status?.exists && status.providers.includes("google") && !status.providers.includes("email")) {
            toast.error("Bu hisob Google bilan yaratilgan. «Google bilan davom etish» tugmasini bosing.");
            return;
          }
          throw error;
        }
        toast.success("Xush kelibsiz! 🎉");
        void navigate({ to: "/dashboard" });
        return;
      }

      // signup — bir email bilan takror ro'yxatdan o'tishni bloklaymiz
      const status = await emailStatus({ data: { email } }).catch(() => null);
      if (status?.exists) {
        if (status.providers.includes("google") && !status.providers.includes("email")) {
          toast.error("Bu email Google hisobiga bog'langan. «Google bilan davom etish» orqali kiring.");
        } else {
          toast.error("Bu email bilan hisob allaqachon mavjud. Iltimos, kiring yoki parolni tiklang.");
          setMode("login");
        }
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: { full_name: fullName, role, avatar_emoji: ROLE_EMOJI[role] },
        },
      });
      if (error) throw error;
      if (data.session) {
        toast.success("Hisob yaratildi! 🚀");
        void navigate({ to: "/dashboard" });
      } else {
        toast.success("Emailingizni tasdiqlang — xat yubordik ✉️");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Xatolik yuz berdi");
    } finally {
      setBusy(false);
    }
  }

  async function onGoogle() {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Google bilan kirish amalga oshmadi");
      setBusy(false);
      return;
    }
    if (result.redirected) return;
    void navigate({ to: "/dashboard" });
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16">
      <MagicalBackground />

      <Link
        to="/"
        className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 backdrop-blur-xl hover:bg-white/10"
      >
        <ArrowLeft className="h-4 w-4" /> Bosh sahifa
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <div className="mb-6 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-magic text-2xl shadow-lg shadow-fuchsia-500/40">
            ✨
          </span>
          <h1 className="mt-4 text-3xl font-extrabold text-white">
            {mode === "login" ? "Xush kelibsiz!" : mode === "signup" ? "Sayohatni boshlang" : "Parolni tiklash"}
          </h1>
          <p className="mt-1 text-sm text-white/60">
            {mode === "login"
              ? "Orollarga qaytish uchun kiring"
              : mode === "signup"
                ? "Rolingizni tanlab hisob yarating"
                : "Emailingizni kiriting — tiklash havolasini yuboramiz"}
          </p>
        </div>

        <GlassCard className="!p-6">
          <div className="mb-5 grid grid-cols-2 gap-1 rounded-2xl border border-white/10 bg-white/5 p-1">
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`rounded-xl py-2 text-sm font-bold transition-colors ${
                  mode === m ? "bg-gradient-magic text-white shadow-lg" : "text-white/70 hover:text-white"
                }`}
              >
                {m === "login" ? "Kirish" : "Ro'yxatdan o'tish"}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmit} className="space-y-3">
            {mode === "signup" && (
              <>
                <Field icon={UserIcon}>
                  <input
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="To'liq ism"
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                  />
                </Field>

                <div>
                  <div className="mb-2 text-xs font-bold uppercase tracking-wider text-white/50">Rolingiz</div>
                  <div className="grid gap-2">
                    {SIGNUP_ROLES.map((r) => (
                      <button
                        type="button"
                        key={r}
                        onClick={() => setRole(r)}
                        className={`flex items-start gap-3 rounded-2xl border p-3 text-left transition-colors ${
                          role === r
                            ? "border-magic-pink/60 bg-white/10"
                            : "border-white/10 bg-white/[0.03] hover:bg-white/[0.07]"
                        }`}
                      >
                        <span className="text-xl">{ROLE_EMOJI[r]}</span>
                        <span>
                          <span className="block text-sm font-bold text-white">{ROLE_LABEL[r]}</span>
                          <span className="block text-xs text-white/55">{ROLE_DESC[r]}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <Field icon={Mail}>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.uz"
                autoComplete="email"
                className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
            </Field>

            {mode !== "forgot" && (
              <Field icon={Lock}>
                <input
                  required
                  minLength={6}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Parol (kamida 6 belgi)"
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
              </Field>
            )}

            <button
              type="submit"
              disabled={busy}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-sunset py-3 text-sm font-extrabold text-white shadow-lg shadow-orange-500/30 transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === "login" ? "Kirish" : mode === "signup" ? "Hisob yaratish" : "Havola yuborish"}
            </button>
          </form>

          <div className="mt-3 text-center">
            {mode === "forgot" ? (
              <button onClick={() => setMode("login")} className="text-xs font-semibold text-white/60 hover:text-white">
                ← Kirishga qaytish
              </button>
            ) : (
              <button onClick={() => setMode("forgot")} className="text-xs font-semibold text-magic-cyan hover:underline">
                Parolni unutdingizmi?
              </button>
            )}
          </div>

          <div className="my-5 flex items-center gap-3 text-xs text-white/40">
            <div className="h-px flex-1 bg-white/10" /> yoki <div className="h-px flex-1 bg-white/10" />
          </div>

          <button
            onClick={onGoogle}
            disabled={busy}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10 disabled:opacity-60"
          >
            <GoogleIcon /> Google bilan davom etish
          </button>

          <p className="mt-4 text-center text-xs text-white/40">
            Bir email bilan faqat bitta hisob. Google va parol usullari bir xil emailda avtomatik bog'lanadi.
          </p>
        </GlassCard>
      </motion.div>
    </main>
  );
}

function Field({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <Icon className="h-4 w-4 flex-shrink-0 text-magic-pink" />
      {children}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.4a5.5 5.5 0 0 1-2.4 3.6v3h3.8c2.2-2 3.7-5 3.7-8.8Z" />
      <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.8-2.9l-3.8-3a7.2 7.2 0 0 1-10.7-3.8H1.4v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.4a12 12 0 0 0 0 10.8l3.9-3.1Z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.4.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.4 6.6l3.9 3.1A7.2 7.2 0 0 1 12 4.8Z" />
    </svg>
  );
}
