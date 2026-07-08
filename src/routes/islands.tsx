import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Sparkles, Trophy, Star, Award, BookOpen, Users } from "lucide-react";
import { PageShell, GlassCard } from "@/components/PageShell";
import { islands } from "@/lib/islands";

export const Route = createFileRoute("/islands")({
  head: () => ({
    meta: [
      { title: "Bilim Orollari — Hashimjon Akademiyasi" },
      { name: "description", content: "Sehrli bilim orollarini kashf qiling — o'z sinfingizga mos orolni tanlang." },
      { property: "og:title", content: "Bilim Orollari — Hashimjon Akademiyasi" },
      { property: "og:description", content: "Har bir orol yangi bilimlar va mukofotlarga olib boradi." },
    ],
  }),
  component: IslandsPage,
});

const gradients = [
  "from-pink-500 via-rose-500 to-orange-400",
  "from-sky-400 via-cyan-400 to-blue-500",
  "from-fuchsia-500 via-purple-500 to-indigo-500",
];

const stats = [
  { label: "Students", value: "12,480", icon: Users },
  { label: "Lessons", value: "320", icon: BookOpen },
  { label: "Stars", value: "94K", icon: Star },
];

const timeline = [
  { n: 1, title: "Orolni tanlang", desc: "O'z sinfingizga mos bilim olamini toping." },
  { n: 2, title: "Darslarni yakunlang", desc: "Qiziqarli topshiriqlar va o'yinlarni bajaring." },
  { n: 3, title: "Mukofotlarni yuting", desc: "XP, yulduzlar va sertifikatlarni to'plang." },
];

const achievements = [
  { icon: Trophy, label: "Yakunlangan orollar", value: 2 },
  { icon: Sparkles, label: "Umumiy XP", value: 12840 },
  { icon: Star, label: "Yulduzlar", value: 246 },
  { icon: Award, label: "Sertifikatlar", value: 5 },
];

const leaderboard = [
  { rank: 1, name: "Aziza K.", island: "Kelajak", xp: 24800 },
  { rank: 2, name: "Bekzod M.", island: "Kashfiyot", xp: 22150 },
  { rank: 3, name: "Dilnoza R.", island: "Kelajak", xp: 20340 },
  { rank: 4, name: "Sardor T.", island: "Kashfiyot", xp: 18720 },
  { rank: 5, name: "Malika S.", island: "Quvonch", xp: 17280 },
];

function IslandsPage() {
  return (
    <PageShell
      eyebrow={<span>🏝️ Bilim Xaritasi</span>}
      title={<span className="text-gradient-magic">Bilim Orollari</span>}
      subtitle="Har bir orol yangi bilimlar, qiziqarli topshiriqlar va mukofotlarga olib boradi. Sinfingizga mos orolni tanlang va bilim sayohatingizni boshlang."
    >
      {/* Islands grid */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {islands.map((island, i) => (
            <motion.div
              key={island.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ y: -10, rotateX: 3, rotateY: -3 }}
              style={{ transformStyle: "preserve-3d" }}
              className="group relative"
            >
              <div
                className={`absolute -inset-2 rounded-[32px] bg-gradient-to-br ${gradients[i]} opacity-40 blur-2xl transition-opacity group-hover:opacity-70`}
              />
              <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-black/40 p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <span className={`rounded-full bg-gradient-to-r ${gradients[i]} px-3 py-1 text-xs font-bold text-white shadow-lg`}>
                    {island.grades}
                  </span>
                  <span className="text-2xl">{i === 0 ? "🌈" : i === 1 ? "🔬" : "🚀"}</span>
                </div>

                <motion.img
                  src={island.image}
                  alt={island.name}
                  className="mx-auto my-4 h-56 w-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)]"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
                />

                <h3 className="text-2xl font-extrabold text-white">{island.name}</h3>
                <p className="mt-2 text-sm text-white/70">{island.description}</p>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  {stats.map((s) => (
                    <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-2">
                      <s.icon className="mx-auto h-4 w-4 text-white/60" />
                      <div className="mt-1 text-sm font-extrabold text-white">{s.value}</div>
                      <div className="text-[10px] uppercase tracking-wider text-white/50">{s.label}</div>
                    </div>
                  ))}
                </div>

                <Link
                  to="/islands/$slug"
                  params={{ slug: island.slug }}
                  className={`mt-6 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${gradients[i]} px-5 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.03]`}
                >
                  {i === 0 ? "✨ Sayohatni boshlash" : i === 1 ? "🔍 Kashf qilish" : "🚀 Kelajak sari"}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Adventure timeline */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-center text-3xl font-extrabold text-white sm:text-4xl">
          <span className="text-gradient-sunset">Sarguzasht yo'li</span>
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {timeline.map((t, i) => (
            <motion.div
              key={t.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative"
            >
              <GlassCard className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-magic text-2xl font-extrabold text-white shadow-[0_0_40px_rgba(200,100,255,0.5)]">
                  {t.n}
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">{t.title}</h3>
                <p className="mt-2 text-sm text-white/70">{t.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-center text-3xl font-extrabold text-white sm:text-4xl">
          🏆 <span className="text-gradient-magic">Orol Yutuqlari</span>
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <GlassCard className="text-center">
                <a.icon className="mx-auto h-8 w-8 text-magic-gold" />
                <div className="mt-3 text-4xl font-extrabold text-white">
                  {a.value.toLocaleString()}
                </div>
                <div className="mt-1 text-sm text-white/70">{a.label}</div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Leaderboard preview */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-3xl font-extrabold text-white">Top o'quvchilar</h2>
          <Link to="/leaderboard" className="text-sm font-semibold text-magic-cyan hover:underline">
            Barchasini ko'rish →
          </Link>
        </div>
        <GlassCard className="!p-0 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase text-white/60">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">Ism</th>
                <th className="p-4">Orol</th>
                <th className="p-4 text-right">XP</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((s) => (
                <tr key={s.rank} className="border-t border-white/5 text-white/90 hover:bg-white/[0.03]">
                  <td className="p-4 font-bold">
                    {s.rank === 1 ? "🥇" : s.rank === 2 ? "🥈" : s.rank === 3 ? "🥉" : s.rank}
                  </td>
                  <td className="p-4 font-semibold">{s.name}</td>
                  <td className="p-4 text-white/60">{s.island}</td>
                  <td className="p-4 text-right font-mono font-bold text-magic-gold">
                    {s.xp.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <GlassCard className="relative overflow-hidden !p-12 text-center">
          <div className="absolute inset-0 -z-10 bg-gradient-magic opacity-30 blur-3xl" />
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            Sarguzashtni boshlashga tayyormisiz?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Bir orolni tanlang va bugun bilim sayohatingizni boshlang.
          </p>
          <Link
            to="/map"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-sunset px-8 py-4 text-base font-bold text-white shadow-2xl shadow-orange-500/40 transition-transform hover:scale-105"
          >
            🚀 Orolga kirish
          </Link>
        </GlassCard>
      </section>
    </PageShell>
  );
}
