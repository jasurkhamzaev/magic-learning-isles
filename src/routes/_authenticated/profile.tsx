import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Bell, Edit3, Globe, LogOut, Moon, BookOpen, Clock, Award, Flame } from "lucide-react";
import { PageShell, GlassCard } from "@/components/PageShell";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Mening Profilim — Hashimjon Akademiyasi" },
      { name: "description", content: "Statistika, yutuqlar va sozlamalar." },
    ],
  }),
  component: ProfilePage,
});

const stats = [
  { icon: BookOpen, label: "Yakunlangan darslar", value: 142 },
  { icon: Clock, label: "O'rganilgan soatlar", value: 86 },
  { icon: Award, label: "Sertifikatlar", value: 5 },
  { icon: Flame, label: "Streak", value: 32 },
];

const badges = ["🥇","🌟","🚀","🧠","📚","🎯","⚡","🏆","🎨","🔬","💎","🌈"];

const lessons = [
  { subject: "Matematika", title: "Kasrlar bilan amallar", time: "2 soat oldin" },
  { subject: "Fizika", title: "Nyuton qonunlari", time: "Kecha" },
  { subject: "Ingliz tili", title: "Present Perfect", time: "2 kun oldin" },
  { subject: "Biologiya", title: "Fotosintez", time: "3 kun oldin" },
];

function ProfilePage() {
  return (
    <PageShell
      eyebrow={<span>👤 Mening Profilim</span>}
      title={<span className="text-gradient-magic">Aziza Karimova</span>}
      subtitle="Kelajak Oroli · Level 24 · Champion Explorer"
    >
      <section className="mx-auto max-w-7xl px-6 py-8">
        {/* Hero card */}
        <GlassCard className="!p-8">
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-magic blur-2xl opacity-60" />
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-white/20 bg-gradient-magic text-7xl">
                👩‍🚀
              </div>
            </motion.div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
                <h2 className="text-3xl font-extrabold text-white">Aziza Karimova</h2>
                <span className="rounded-full bg-gradient-sunset px-3 py-1 text-xs font-bold text-white">Level 24</span>
              </div>
              <p className="mt-1 text-white/70">Kelajak Oroli · aziza@example.uz</p>

              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div><div className="text-2xl font-extrabold text-magic-gold">24,800</div><div className="text-xs text-white/60">XP</div></div>
                <div><div className="text-2xl font-extrabold text-magic-pink">412</div><div className="text-xs text-white/60">Yulduzlar</div></div>
                <div><div className="text-2xl font-extrabold text-magic-cyan">18</div><div className="text-xs text-white/60">Yutuqlar</div></div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-xs text-white/60">
                  <span>Level 24 progress</span><span>72%</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div initial={{width:0}} animate={{width:"72%"}} transition={{duration:1.2}} className="h-full bg-gradient-magic" />
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}}>
              <GlassCard>
                <s.icon className="h-6 w-6 text-magic-cyan" />
                <div className="mt-3 text-3xl font-extrabold text-white">{s.value}</div>
                <div className="text-sm text-white/60">{s.label}</div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Activity + Badges */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <GlassCard>
            <h3 className="mb-4 text-lg font-extrabold text-white">Haftalik faollik</h3>
            <div className="flex h-40 items-end gap-2">
              {[40, 65, 55, 80, 72, 90, 60].map((h, i) => (
                <motion.div key={i}
                  initial={{height:0}} whileInView={{height:`${h}%`}} viewport={{once:true}}
                  transition={{delay:i*0.08, duration:0.7, ease:"easeOut"}}
                  className="flex-1 rounded-t-lg bg-gradient-to-t from-magic-purple to-magic-cyan"
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-xs text-white/50">
              {["Du","Se","Ch","Pa","Ju","Sh","Ya"].map(d=><span key={d}>{d}</span>)}
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="mb-4 text-lg font-extrabold text-white">Yutuqlar galereyasi</h3>
            <div className="grid grid-cols-6 gap-3">
              {badges.map((b, i) => (
                <motion.div key={i}
                  initial={{scale:0, opacity:0}} whileInView={{scale:1, opacity:1}} viewport={{once:true}}
                  transition={{delay:i*0.05, type:"spring", stiffness:120}}
                  whileHover={{scale:1.15, rotate:8}}
                  className="flex aspect-square items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-3xl backdrop-blur-md"
                >{b}</motion.div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Recent lessons + Settings */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <GlassCard>
            <h3 className="mb-4 text-lg font-extrabold text-white">So'nggi darslar</h3>
            <div className="space-y-3">
              {lessons.map((l) => (
                <div key={l.title} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div>
                    <div className="text-xs font-bold uppercase text-magic-cyan">{l.subject}</div>
                    <div className="font-semibold text-white">{l.title}</div>
                  </div>
                  <div className="text-xs text-white/50">{l.time}</div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="mb-4 text-lg font-extrabold text-white">Sozlamalar</h3>
            <div className="space-y-2">
              {[
                { icon: Edit3, label: "Profilni tahrirlash" },
                { icon: Bell, label: "Bildirishnomalar" },
                { icon: Moon, label: "Dark mode" },
                { icon: Globe, label: "Til: O'zbek" },
                { icon: LogOut, label: "Chiqish" },
              ].map((s) => (
                <button key={s.label} className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-left text-sm text-white/90 transition-colors hover:bg-white/10">
                  <s.icon className="h-4 w-4 text-magic-pink" /> {s.label}
                </button>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>
    </PageShell>
  );
}
