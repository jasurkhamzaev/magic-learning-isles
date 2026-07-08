import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { LayoutDashboard, Users, GraduationCap, BookOpen, ClipboardList, Award, Gift, Trophy, BarChart3, Settings, Search, Download, Bell } from "lucide-react";
import { MagicalBackground } from "@/components/MagicalBackground";
import { GlassCard } from "@/components/PageShell";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Hashimjon Akademiyasi" },
      { name: "description", content: "Boshqaruv paneli — statistika, foydalanuvchilar, tahlil." },
    ],
  }),
  component: AdminPage,
});

const nav = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "Students" },
  { icon: GraduationCap, label: "Teachers" },
  { icon: BookOpen, label: "Subjects" },
  { icon: ClipboardList, label: "Lessons" },
  { icon: Award, label: "Tests" },
  { icon: Award, label: "Certificates" },
  { icon: Gift, label: "Rewards" },
  { icon: Trophy, label: "Leaderboard" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Settings, label: "Settings" },
];

const stats = [
  { label: "Total Students", value: "12,480", change: "+8.2%", color: "from-magic-pink to-rose-500" },
  { label: "Daily Active Users", value: "4,120", change: "+3.4%", color: "from-magic-cyan to-blue-500" },
  { label: "Completed Lessons", value: "84,320", change: "+12.1%", color: "from-magic-purple to-indigo-500" },
  { label: "Certificates Issued", value: "1,842", change: "+5.7%", color: "from-magic-gold to-orange-500" },
  { label: "Revenue", value: "$48,290", change: "+9.3%", color: "from-emerald-500 to-teal-500" },
];

const recent = [
  { name: "Aziza Karimova", email: "aziza@ex.uz", island: "Kelajak", xp: 24800, status: "Active" },
  { name: "Bekzod Mahmudov", email: "bekzod@ex.uz", island: "Kashfiyot", xp: 22150, status: "Active" },
  { name: "Dilnoza Rahimova", email: "dilnoza@ex.uz", island: "Kelajak", xp: 20340, status: "Active" },
  { name: "Sardor Toshev", email: "sardor@ex.uz", island: "Kashfiyot", xp: 18720, status: "Idle" },
  { name: "Malika Saidova", email: "malika@ex.uz", island: "Quvonch", xp: 17280, status: "Active" },
];

function AdminPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <MagicalBackground />
      <div className="relative flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 flex-shrink-0 border-r border-white/10 bg-black/50 p-4 backdrop-blur-2xl lg:block">
          <Link to="/" className="flex items-center gap-2 p-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-magic text-lg">✨</span>
            <span className="text-sm font-extrabold text-white">Hashimjon <span className="text-gradient-magic">Admin</span></span>
          </Link>
          <nav className="mt-6 space-y-1">
            {nav.map((n) => (
              <button key={n.label} className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                n.active ? "bg-gradient-magic text-white shadow-lg" : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}>
                <n.icon className="h-4 w-4" /> {n.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <div className="flex-1 overflow-x-hidden">
          {/* Topbar */}
          <div className="sticky top-0 z-10 flex items-center gap-4 border-b border-white/10 bg-black/40 px-6 py-3 backdrop-blur-2xl">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
              <input placeholder="Qidirish..." className="w-full rounded-2xl border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/50 focus:outline-none" />
            </div>
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80"><Bell className="h-4 w-4" /></button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-magic text-sm font-bold text-white">A</div>
          </div>

          <div className="p-6">
            <h1 className="text-3xl font-extrabold text-white">Dashboard</h1>
            <p className="text-sm text-white/60">Xush kelibsiz — bugungi ko'rsatkichlar.</p>

            {/* Stats */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {stats.map((s, i) => (
                <motion.div key={s.label} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.06}}>
                  <GlassCard>
                    <div className={`inline-block rounded-lg bg-gradient-to-r ${s.color} px-2 py-0.5 text-[10px] font-bold text-white`}>{s.change}</div>
                    <div className="mt-3 text-2xl font-extrabold text-white">{s.value}</div>
                    <div className="text-xs text-white/60">{s.label}</div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            {/* Charts */}
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <GlassCard>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-white/60">O'quvchilar o'sishi</h3>
                <div className="flex h-52 items-end gap-2">
                  {[30,42,55,50,68,72,80,75,88,92,86,95].map((h,i)=>(
                    <motion.div key={i} initial={{height:0}} whileInView={{height:`${h}%`}} viewport={{once:true}} transition={{delay:i*0.05, duration:0.7}}
                      className="flex-1 rounded-t-lg bg-gradient-to-t from-magic-purple to-magic-pink"
                    />
                  ))}
                </div>
              </GlassCard>
              <GlassCard>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-white/60">Kunlik faollik</h3>
                <svg viewBox="0 0 400 200" className="h-52 w-full">
                  <defs>
                    <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.82 0.18 200)" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="oklch(0.82 0.18 200)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M 0 150 L 40 120 L 80 100 L 120 130 L 160 80 L 200 90 L 240 60 L 280 70 L 320 40 L 360 50 L 400 30 L 400 200 L 0 200 Z"
                    fill="url(#chartFill)"
                    initial={{pathLength:0, opacity:0}} whileInView={{pathLength:1, opacity:1}} viewport={{once:true}} transition={{duration:1.5}}
                  />
                  <motion.path
                    d="M 0 150 L 40 120 L 80 100 L 120 130 L 160 80 L 200 90 L 240 60 L 280 70 L 320 40 L 360 50 L 400 30"
                    stroke="oklch(0.82 0.18 200)" strokeWidth="2" fill="none"
                    initial={{pathLength:0}} whileInView={{pathLength:1}} viewport={{once:true}} transition={{duration:1.5}}
                  />
                </svg>
              </GlassCard>
            </div>

            {/* Table */}
            <div className="mt-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-extrabold text-white">Yangi o'quvchilar</h3>
                <button className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white/90 hover:bg-white/10">
                  <Download className="h-4 w-4" /> Excel
                </button>
              </div>
              <GlassCard className="!p-0 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] text-left text-sm">
                    <thead className="bg-white/5 text-xs uppercase tracking-wider text-white/60">
                      <tr>
                        <th className="p-4">Ism</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Orol</th>
                        <th className="p-4 text-right">XP</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recent.map((r) => (
                        <tr key={r.email} className="border-t border-white/5 text-white/90 hover:bg-white/[0.03]">
                          <td className="p-4 font-semibold">{r.name}</td>
                          <td className="p-4 text-white/60">{r.email}</td>
                          <td className="p-4">{r.island}</td>
                          <td className="p-4 text-right font-mono text-magic-gold">{r.xp.toLocaleString()}</td>
                          <td className="p-4">
                            <span className={`rounded-full px-2 py-0.5 text-xs ${r.status === "Active" ? "bg-emerald-500/20 text-emerald-300" : "bg-white/10 text-white/70"}`}>
                              {r.status}
                            </span>
                          </td>
                        </tr>
                      ))}
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
