import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Loader2, Lock, ShieldAlert } from "lucide-react";
import { MagicalBackground } from "@/components/MagicalBackground";
import { GlassCard } from "@/components/PageShell";
import { useAuth } from "@/hooks/useAuth";
import { ROLE_EMOJI, ROLE_LABEL, type AppRole } from "@/lib/roles";

type Props = {
  children: ReactNode;
  /** Ruxsat berilgan rollar. Bo'sh bo'lsa — kirgan har qanday foydalanuvchi. */
  allow?: AppRole[];
};

function Screen({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-6">
      <MagicalBackground />
      <GlassCard className="relative max-w-md text-center !p-8">{children}</GlassCard>
    </div>
  );
}

export function RoleGuard({ children, allow }: Props) {
  const { user, roles, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center">
        <MagicalBackground />
        <Loader2 className="relative h-8 w-8 animate-spin text-white/70" />
      </div>
    );
  }

  if (!user) {
    return (
      <Screen>
        <Lock className="mx-auto h-10 w-10 text-magic-cyan" />
        <h1 className="mt-4 text-2xl font-extrabold text-white">Kirish talab qilinadi</h1>
        <p className="mt-2 text-sm text-white/65">
          Bu bo'limdan foydalanish uchun hisobingizga kiring yoki ro'yxatdan o'ting.
        </p>
        <Link
          to="/auth"
          className="mt-5 inline-flex rounded-2xl bg-gradient-sunset px-5 py-2.5 text-sm font-bold text-white"
        >
          Kirish
        </Link>
      </Screen>
    );
  }

  const allowed = !allow || allow.length === 0 || roles.some((r) => allow.includes(r));

  if (!allowed) {
    return (
      <Screen>
        <ShieldAlert className="mx-auto h-10 w-10 text-magic-pink" />
        <h1 className="mt-4 text-2xl font-extrabold text-white">Ruxsat yo'q</h1>
        <p className="mt-2 text-sm text-white/65">
          Bu bo'lim sizning rolingiz uchun ochiq emas. Rolingiz: {ROLE_EMOJI[role]} {ROLE_LABEL[role]}.
        </p>
        <p className="mt-1 text-xs text-white/45">
          Ruxsat berilgan rollar: {allow!.map((r) => ROLE_LABEL[r]).join(", ")}
        </p>
        <Link
          to="/dashboard"
          className="mt-5 inline-flex rounded-2xl bg-gradient-sunset px-5 py-2.5 text-sm font-bold text-white"
        >
          Panelga qaytish
        </Link>
      </Screen>
    );
  }

  return <>{children}</>;
}
