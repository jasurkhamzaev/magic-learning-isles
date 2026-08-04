import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  BookOpen,
  Trophy,
  Gift,
  Sparkles,
  Users,
  BarChart3,
  GraduationCap,
  ShieldCheck,
  Baby,
  Map as MapIcon,
} from "lucide-react";
import { PageShell, GlassCard } from "@/components/PageShell";
import { useAuth } from "@/hooks/useAuth";
import { ROLE_DESC, ROLE_EMOJI, ROLE_LABEL, type AppRole } from "@/lib/roles";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Boshqaruv paneli — Hashimjon Akademiyasi" },
      { name: "description", content: "Rolingizga mos shaxsiy panel: darslar, natijalar va boshqaruv." },
      { property: "og:title", content: "Boshqaruv paneli — Hashimjon Akademiyasi" },
      { property: "og:description", content: "Rolingizga mos shaxsiy panel va tezkor havolalar." },
    ],
  }),
  component: DashboardPage,
});

type Tile = { to: string; icon: React.ElementType; label: string; desc: string };

const TILES: Record<AppRole, Tile[]> = {
  student: [
    { to: "/islands", icon: MapIcon, label: "Orollar", desc: "Sayohatni davom ettirish" },
    { to: "/subjects", icon: BookOpen, label: "Fanlar", desc: "12 fan bo'yicha darslar" },
    { to: "/rewards", icon: Gift, label: "Mukofotlar", desc: "Kunlik sovg'alarni oling" },
    { to: "/leaderboard", icon: Trophy, label: "Reyting", desc: "Do'stlar bilan raqobat" },
    { to: "/ai-teacher", icon: Sparkles, label: "AI Ustoz", desc: "Uyga vazifada yordam" },
    { to: "/profile", icon: GraduationCap, label: "Profil", desc: "Statistika va yutuqlar" },
  ],
  teacher: [
    { to: "/subjects", icon: BookOpen, label: "Fanlar va darslar", desc: "Kontentni ko'rish" },
    { to: "/leaderboard", icon: Trophy, label: "O'quvchilar reytingi", desc: "Natijalarni kuzatish" },
    { to: "/islands", icon: MapIcon, label: "Orollar", desc: "Bosqichlar tuzilmasi" },
    { to: "/ai-teacher", icon: Sparkles, label: "AI Ustoz", desc: "Dars materiali tayyorlash" },
    { to: "/profile", icon: GraduationCap, label: "Profil", desc: "Sozlamalar" },
  ],
  parent: [
    { to: "/leaderboard", icon: Trophy, label: "Farzand natijalari", desc: "Reyting va XP" },
    { to: "/subjects", icon: BookOpen, label: "Fanlar", desc: "Nimalarni o'rganadi" },
    { to: "/rewards", icon: Gift, label: "Mukofotlar", desc: "Motivatsiya tizimi" },
    { to: "/blog", icon: Baby, label: "Blog", desc: "Ota-onalar uchun maslahatlar" },
    { to: "/profile", icon: GraduationCap, label: "Profil", desc: "Sozlamalar" },
  ],
  manager: [
    { to: "/admin", icon: BarChart3, label: "Admin panel", desc: "Statistika va foydalanuvchilar" },
    { to: "/leaderboard", icon: Trophy, label: "Reyting", desc: "Umumiy ko'rsatkichlar" },
    { to: "/subjects", icon: BookOpen, label: "Fanlar", desc: "Kontentni ko'rish" },
    { to: "/profile", icon: GraduationCap, label: "Profil", desc: "Sozlamalar" },
  ],
  superadmin: [
    { to: "/admin", icon: ShieldCheck, label: "Admin panel", desc: "To'liq boshqaruv, rollar" },
    { to: "/leaderboard", icon: Users, label: "Foydalanuvchilar", desc: "Reyting va faollik" },
    { to: "/subjects", icon: BookOpen, label: "Fanlar", desc: "Kontent" },
    { to: "/profile", icon: GraduationCap, label: "Profil", desc: "Sozlamalar" },
  ],
};

function DashboardPage() {
  const { profile, role, loading } = useAuth();
  const tiles = TILES[role];

  return (
    <PageShell
      eyebrow={<span>{ROLE_EMOJI[role]} {ROLE_LABEL[role]} paneli</span>}
      title={
        <>
          Salom, <span className="text-gradient-magic">{profile?.full_name?.split(" ")[0] || "do'st"}</span>!
        </>
      }
      subtitle={loading ? "Yuklanmoqda..." : ROLE_DESC[role]}
    >
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <GlassCard>
            <div className="text-xs uppercase tracking-wider text-white/50">XP</div>
            <div className="mt-1 text-3xl font-extrabold text-magic-gold">{(profile?.xp ?? 0).toLocaleString()}</div>
          </GlassCard>
          <GlassCard>
            <div className="text-xs uppercase tracking-wider text-white/50">Streak</div>
            <div className="mt-1 text-3xl font-extrabold text-magic-pink">{profile?.streak ?? 0} kun</div>
          </GlassCard>
          <GlassCard>
            <div className="text-xs uppercase tracking-wider text-white/50">Daraja</div>
            <div className="mt-1 text-3xl font-extrabold text-magic-cyan">Level {profile?.level ?? 1}</div>
          </GlassCard>
        </div>

        <h2 className="mt-10 text-2xl font-extrabold text-white">Tezkor havolalar</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map((t, i) => (
            <motion.div key={t.to} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <Link to={t.to}>
                <GlassCard className="transition-transform hover:-translate-y-1">
                  <t.icon className="h-7 w-7 text-magic-cyan" />
                  <div className="mt-3 text-lg font-extrabold text-white">{t.label}</div>
                  <div className="text-sm text-white/60">{t.desc}</div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
