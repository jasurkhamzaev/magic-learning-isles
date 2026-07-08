import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Flame, Trophy, TrendingUp } from "lucide-react";
import { PageShell, GlassCard } from "@/components/PageShell";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Reyting — Hashimjon Akademiyasi" },
      { name: "description", content: "Eng faol o'quvchilarni kuzating va TOP o'rinlar uchun kurashing." },
      { property: "og:title", content: "Reyting — Hashimjon Akademiyasi" },
      { property: "og:description", content: "Global va sinf reytingi." },
    ],
  }),
  component: LeaderboardPage,
});

const scopes = ["Global", "Maktab", "Sinf", "Do'stlar"] as const;

const players = [
  { rank: 1, name: "Aziza Karimova", island: "Kelajak", xp: 24800, stars: 412, streak: 45, avatar: "👩‍🚀" },
  { rank: 2, name: "Bekzod Mahmudov", island: "Kashfiyot", xp: 22150, stars: 388, streak: 30, avatar: "🧑‍🔬" },
  { rank: 3, name: "Dilnoza Rahimova", island: "Kelajak", xp: 20340, stars: 356, streak: 28, avatar: "👩‍💻" },
  { rank: 4, name: "Sardor Toshev", island: "Kashfiyot", xp: 18720, stars: 320, streak: 22, avatar: "🧑‍🎓" },
  { rank: 5, name: "Malika Saidova", island: "Quvonch", xp: 17280, stars: 298, streak: 19, avatar: "👧" },
  { rank: 6, name: "Oybek Yusupov", island: "Kelajak", xp: 16120, stars: 274, streak: 15, avatar: "🧑" },
  { rank: 7, name: "Kamila Ergasheva", island: "Kashfiyot", xp: 15040, stars: 261, streak: 14, avatar: "👩" },
  { rank: 8, name: "Jasur Nurmatov", island: "Kelajak", xp: 14200, stars: 248, streak: 12, avatar: "🧑‍🎓" },
];

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 1200;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.floor(target * (0.5 - Math.cos(Math.PI * p) / 2)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return <>{n.toLocaleString()}{suffix}</>;
}

function LeaderboardPage() {
  const [scope, setScope] = useState<(typeof scopes)[number]>("Global");
  const top3 = players.slice(0, 3);
  const podiumOrder = [top3[1], top3[0], top3[2]]; // silver, gold, bronze
  const podiumHeights = ["h-32", "h-44", "h-24"];
  const medals = ["🥈", "🥇", "🥉"];

  return (
    <PageShell
      eyebrow={<span>🏆 Reyting</span>}
      title={<span className="text-gradient-sunset">Global Reyting</span>}
      subtitle="Eng faol o'quvchilarni kuzating va TOP o'rinlar uchun kurashing."
    >
      {/* Scope switcher */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto flex w-fit flex-wrap justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-xl">
          {scopes.map((s) => (
            <button
              key={s}
              onClick={() => setScope(s)}
              className={`rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                scope === s
                  ? "bg-gradient-magic text-white shadow-lg"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Podium */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid grid-cols-3 items-end gap-4">
          {podiumOrder.map((p, i) => (
            <motion.div
              key={p.rank}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * i, type: "spring", stiffness: 90 }}
              className="flex flex-col items-center"
            >
              <div className="text-5xl">{p.avatar}</div>
              <div className="mt-2 text-center">
                <div className="text-sm font-bold text-white">{p.name}</div>
                <div className="text-xs text-magic-gold">{p.xp.toLocaleString()} XP</div>
              </div>
              <div
                className={`mt-3 w-full ${podiumHeights[i]} rounded-t-2xl border border-white/10 bg-gradient-to-t ${
                  i === 1 ? "from-yellow-500/40 to-amber-300/40" : i === 0 ? "from-slate-400/40 to-slate-200/30" : "from-orange-700/40 to-orange-500/30"
                } backdrop-blur-xl flex items-start justify-center pt-3 text-3xl`}
              >
                {medals[i]}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats + Table */}
      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[1fr_320px]">
        <GlassCard className="!p-0 overflow-hidden">
          <div className="border-b border-white/10 p-5">
            <h2 className="text-lg font-extrabold text-white">O'quvchilar reytingi — {scope}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-white/5 text-xs uppercase tracking-wider text-white/60">
                <tr>
                  <th className="p-4">#</th>
                  <th className="p-4">O'quvchi</th>
                  <th className="p-4">Orol</th>
                  <th className="p-4 text-right">XP</th>
                  <th className="p-4 text-right">Yulduzlar</th>
                  <th className="p-4 text-right">Streak</th>
                </tr>
              </thead>
              <tbody>
                {players.map((p, i) => (
                  <motion.tr
                    key={p.rank}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className="border-t border-white/5 text-white/90 hover:bg-white/[0.04]"
                  >
                    <td className="p-4 font-bold">
                      {p.rank <= 3 ? ["🥇","🥈","🥉"][p.rank-1] : p.rank}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{p.avatar}</span>
                        <span className="font-semibold">{p.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-white/60">{p.island}</td>
                    <td className="p-4 text-right font-mono font-bold text-magic-gold">{p.xp.toLocaleString()}</td>
                    <td className="p-4 text-right">⭐ {p.stars}</td>
                    <td className="p-4 text-right">
                      <span className="inline-flex items-center gap-1 text-orange-400">
                        <Flame className="h-4 w-4" /> {p.streak}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <div className="space-y-4">
          {[
            { label: "Bugungi XP", value: 480, icon: TrendingUp, color: "text-magic-cyan" },
            { label: "Haftalik XP", value: 3240, icon: TrendingUp, color: "text-magic-pink" },
            { label: "Oylik XP", value: 12840, icon: TrendingUp, color: "text-magic-gold" },
            { label: "Yutuqlar", value: 24, icon: Trophy, color: "text-magic-purple" },
          ].map((c) => (
            <GlassCard key={c.label}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/60">{c.label}</div>
                  <div className="mt-1 text-3xl font-extrabold text-white">
                    <Counter target={c.value} />
                  </div>
                </div>
                <c.icon className={`h-8 w-8 ${c.color}`} />
              </div>
            </GlassCard>
          ))}

          <GlassCard>
            <div className="text-xs uppercase tracking-wider text-white/60">XP Progress</div>
            <div className="mt-4 flex h-24 items-end gap-1.5">
              {[35, 52, 40, 68, 55, 78, 90].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.8, ease: "easeOut" }}
                  className="flex-1 rounded-t-lg bg-gradient-to-t from-magic-purple to-magic-pink"
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-white/50">
              {["Du","Se","Ch","Pa","Ju","Sh","Ya"].map((d) => <span key={d}>{d}</span>)}
            </div>
          </GlassCard>
        </div>
      </section>
    </PageShell>
  );
}
