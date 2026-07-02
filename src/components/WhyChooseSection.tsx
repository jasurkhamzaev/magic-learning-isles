import { motion } from "motion/react";
import { BookOpen, Trophy, Gift, Users } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    emoji: "📚",
    title: "Interaktiv Darslar",
    desc: "O'yin, animatsiya va sarguzasht orqali fanlarni oson o'rganing.",
    color: "from-fuchsia-500/40 to-pink-500/10",
    ring: "ring-fuchsia-400/40",
  },
  {
    icon: Trophy,
    emoji: "🏆",
    title: "Reyting Tizimi",
    desc: "Do'stlar bilan raqobatlashing va yulduzli darajaga chiqing.",
    color: "from-cyan-400/40 to-blue-500/10",
    ring: "ring-cyan-300/40",
  },
  {
    icon: Gift,
    emoji: "🎁",
    title: "Mukofotlar",
    desc: "Har bir yutuq uchun tanga, nishon va sirli sovg'alar.",
    color: "from-orange-400/40 to-amber-500/10",
    ring: "ring-orange-300/40",
  },
  {
    icon: Users,
    emoji: "👨‍👩‍👧",
    title: "Jamoa",
    desc: "Ota-onalar, o'qituvchilar va bolalar uchun yagona olam.",
    color: "from-purple-500/40 to-violet-500/10",
    ring: "ring-purple-300/40",
  },
];

export function WhyChooseSection() {
  return (
    <section id="fanlar" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-semibold text-white/90 backdrop-blur-md">
            <span>💎</span> Nima uchun biz?
          </div>
          <h2 className="mt-6 text-balance text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
            <span className="text-gradient-magic">Sehr</span> ta'lim bilan uchrashadi
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
            Bilim olishning eng qiziqarli va samarali usuli — bir olamda.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-shadow hover:shadow-2xl hover:ring-2 ${f.ring}`}
            >
              <div
                className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${f.color} blur-2xl transition-opacity group-hover:opacity-100`}
              />
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl backdrop-blur-md ring-1 ring-white/15">
                  <span>{f.emoji}</span>
                </div>
                <h3 className="mt-5 text-xl font-extrabold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{f.desc}</p>
                <div className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 transition-colors group-hover:text-white">
                  <f.icon className="h-3.5 w-3.5" /> Batafsil
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
