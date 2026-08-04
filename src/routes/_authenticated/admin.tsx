import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  BarChart3,
  Settings,
  Search,
  Bell,
  ShieldAlert,
  Loader2,
} from "lucide-react";
import { MagicalBackground } from "@/components/MagicalBackground";
import { GlassCard } from "@/components/PageShell";
import { useAuth } from "@/hooks/useAuth";
import { listAllUsers, setUserRole } from "@/lib/admin.functions";
import { ALL_ROLES, ROLE_EMOJI, ROLE_LABEL, primaryRole, type AppRole } from "@/lib/roles";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin panel — Hashimjon Akademiyasi" },
      { name: "description", content: "Boshqaruv paneli — foydalanuvchilar, rollar va statistika." },
      { property: "og:title", content: "Admin panel — Hashimjon Akademiyasi" },
      { property: "og:description", content: "Foydalanuvchilarni boshqarish, rollarni tayinlash va statistika." },
    ],
  }),
  component: AdminPage,
});

const nav = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "Foydalanuvchilar" },
  { icon: GraduationCap, label: "Ustozlar" },
  { icon: BookOpen, label: "Fanlar" },
  { icon: BarChart3, label: "Tahlil" },
  { icon: Settings, label: "Sozlamalar" },
];

function AdminPage() {
  const { isStaff, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center">
        <MagicalBackground />
        <Loader2 className="relative h-8 w-8 animate-spin text-white/70" />
      </div>
    );
  }

  if (!isStaff) {
    return (
      <div className="relative flex min-h-screen items-center justify-center px-6">
        <MagicalBackground />
        <GlassCard className="relative max-w-md text-center !p-8">
          <ShieldAlert className="mx-auto h-10 w-10 text-magic-pink" />
          <h1 className="mt-4 text-2xl font-extrabold text-white">Ruxsat yo'q</h1>
          <p className="mt-2 text-sm text-white/65">
            Bu bo'lim faqat Superadmin va Manager uchun. Sizning rolingiz: {ROLE_EMOJI[role]} {ROLE_LABEL[role]}.
          </p>
          <Link
            to="/dashboard"
            className="mt-5 inline-flex rounded-2xl bg-gradient-sunset px-5 py-2.5 text-sm font-bold text-white"
          >
            Panelga qaytish
          </Link>
        </GlassCard>
      </div>
    );
  }

  return <AdminDashboard canGrantSuperadmin={role === "superadmin"} />;
}

function AdminDashboard({ canGrantSuperadmin }: { canGrantSuperadmin: boolean }) {
  const fetchUsers = useServerFn(listAllUsers);
  const changeRole = useServerFn(setUserRole);
  const queryClient = useQueryClient();
  const [q, setQ] = useState("");

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: () => fetchUsers(),
  });

  const mutation = useMutation({
    mutationFn: (vars: { userId: string; role: AppRole }) => changeRole({ data: vars }),
    onSuccess: async () => {
      toast.success("Rol yangilandi ✅");
      await queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Rolni o'zgartirib bo'lmadi"),
  });

  const filtered = users.filter((u) =>
    `${u.full_name} ${u.email ?? ""}`.toLowerCase().includes(q.toLowerCase()),
  );

  const count = (r: AppRole) => users.filter((u) => u.roles.includes(r)).length;
  const totalXp = users.reduce((s, u) => s + (u.xp ?? 0), 0);

  const stats = [
    { label: "Foydalanuvchilar", value: users.length, change: "jami", color: "from-magic-pink to-rose-500" },
    { label: "O'quvchilar", value: count("student"), change: "student", color: "from-magic-cyan to-blue-500" },
    { label: "Ustozlar", value: count("teacher"), change: "teacher", color: "from-magic-purple to-indigo-500" },
    { label: "Ota-onalar", value: count("parent"), change: "parent", color: "from-magic-gold to-orange-500" },
    { label: "Umumiy XP", value: totalXp.toLocaleString(), change: "xp", color: "from-emerald-500 to-teal-500" },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <MagicalBackground />
      <div className="relative flex min-h-screen">
        <aside className="hidden w-64 flex-shrink-0 border-r border-white/10 bg-black/50 p-4 backdrop-blur-2xl lg:block">
          <Link to="/" className="flex items-center gap-2 p-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-magic text-lg">✨</span>
            <span className="text-sm font-extrabold text-white">
              Hashimjon <span className="text-gradient-magic">Admin</span>
            </span>
          </Link>
          <nav className="mt-6 space-y-1">
            {nav.map((n) => (
              <button
                key={n.label}
                className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                  n.active ? "bg-gradient-magic text-white shadow-lg" : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <n.icon className="h-4 w-4" /> {n.label}
              </button>
            ))}
          </nav>
          <Link
            to="/dashboard"
            className="mt-6 block rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10"
          >
            ← Saytga qaytish
          </Link>
        </aside>

        <div className="flex-1 overflow-x-hidden">
          <div className="sticky top-0 z-10 flex items-center gap-4 border-b border-white/10 bg-black/40 px-6 py-3 backdrop-blur-2xl">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Ism yoki email bo'yicha qidirish..."
                className="w-full rounded-2xl border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/50 focus:outline-none"
              />
            </div>
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80">
              <Bell className="h-4 w-4" />
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-magic text-sm font-bold text-white">
              A
            </div>
          </div>

          <div className="p-6">
            <h1 className="text-3xl font-extrabold text-white">Dashboard</h1>
            <p className="text-sm text-white/60">Haqiqiy foydalanuvchilar va rollar boshqaruvi.</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {stats.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                  <GlassCard>
                    <div className={`inline-block rounded-lg bg-gradient-to-r ${s.color} px-2 py-0.5 text-[10px] font-bold text-white`}>
                      {s.change}
                    </div>
                    <div className="mt-3 text-2xl font-extrabold text-white">{s.value}</div>
                    <div className="text-xs text-white/60">{s.label}</div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <GlassCard>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-white/60">Rollar taqsimoti</h3>
                <div className="space-y-3">
                  {ALL_ROLES.map((r) => {
                    const c = count(r);
                    const pct = users.length ? Math.round((c / users.length) * 100) : 0;
                    return (
                      <div key={r}>
                        <div className="flex justify-between text-xs text-white/70">
                          <span>{ROLE_EMOJI[r]} {ROLE_LABEL[r]}</span>
                          <span>{c}</span>
                        </div>
                        <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.8 }}
                            className="h-full bg-gradient-magic"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>

              <GlassCard>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-white/60">Top XP</h3>
                <div className="flex h-52 items-end gap-2">
                  {users.slice(0, 12).map((u, i) => {
                    const max = Math.max(1, users[0]?.xp ?? 1);
                    return (
                      <motion.div
                        key={u.id}
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.max(6, ((u.xp ?? 0) / max) * 100)}%` }}
                        transition={{ delay: i * 0.05, duration: 0.7 }}
                        title={`${u.full_name}: ${u.xp} XP`}
                        className="flex-1 rounded-t-lg bg-gradient-to-t from-magic-purple to-magic-pink"
                      />
                    );
                  })}
                  {users.length === 0 && <p className="text-sm text-white/50">Hali foydalanuvchi yo'q.</p>}
                </div>
              </GlassCard>
            </div>

            <div className="mt-6">
              <h3 className="mb-4 text-lg font-extrabold text-white">Foydalanuvchilar va rollar</h3>
              <GlassCard className="!p-0 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[820px] text-left text-sm">
                    <thead className="bg-white/5 text-xs uppercase tracking-wider text-white/60">
                      <tr>
                        <th className="p-4">Ism</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Orol</th>
                        <th className="p-4 text-right">XP</th>
                        <th className="p-4">Rol</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading && (
                        <tr>
                          <td colSpan={5} className="p-6 text-center text-white/60">
                            Yuklanmoqda...
                          </td>
                        </tr>
                      )}
                      {!isLoading && filtered.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-6 text-center text-white/60">
                            Foydalanuvchi topilmadi.
                          </td>
                        </tr>
                      )}
                      {filtered.map((u) => {
                        const current = primaryRole(u.roles as AppRole[]);
                        return (
                          <tr key={u.id} className="border-t border-white/5 text-white/90 hover:bg-white/[0.03]">
                            <td className="p-4 font-semibold">
                              <span className="mr-2">{u.avatar_emoji}</span>
                              {u.full_name || "—"}
                            </td>
                            <td className="p-4 text-white/60">{u.email}</td>
                            <td className="p-4 capitalize">{u.island}</td>
                            <td className="p-4 text-right font-mono text-magic-gold">{(u.xp ?? 0).toLocaleString()}</td>
                            <td className="p-4">
                              <select
                                value={current}
                                disabled={mutation.isPending}
                                onChange={(e) => mutation.mutate({ userId: u.id, role: e.target.value as AppRole })}
                                className="rounded-xl border border-white/15 bg-black/40 px-2 py-1.5 text-xs font-semibold text-white focus:outline-none"
                              >
                                {ALL_ROLES.filter((r) => canGrantSuperadmin || r !== "superadmin").map((r) => (
                                  <option key={r} value={r}>
                                    {ROLE_LABEL[r]}
                                  </option>
                                ))}
                              </select>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
