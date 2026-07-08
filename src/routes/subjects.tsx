import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Heart, Play } from "lucide-react";
import { PageShell, GlassCard } from "@/components/PageShell";

export const Route = createFileRoute("/subjects")({
  head: () => ({
    meta: [
      { title: "Fanlar — Hashimjon Akademiyasi" },
      { name: "description", content: "O'zingiz yoqtirgan fanlarni o'rganing va yangi bilimlarni kashf eting." },
      { property: "og:title", content: "Fanlar — Hashimjon Akademiyasi" },
      { property: "og:description", content: "12 ta fan, minglab darslar, cheksiz sarguzasht." },
    ],
  }),
  component: SubjectsPage,
});

type Subject = {
  icon: string;
  name: string;
  progress: number;
  lessons: number;
  xp: number;
  difficulty: "Oson" | "O'rta" | "Qiyin";
  gradient: string;
};

const subjects: Subject[] = [
  { icon: "➕", name: "Matematika", progress: 62, lessons: 48, xp: 1200, difficulty: "O'rta", gradient: "from-pink-500 to-rose-500" },
  { icon: "🧪", name: "Kimyo", progress: 34, lessons: 32, xp: 900, difficulty: "Qiyin", gradient: "from-emerald-400 to-teal-500" },
  { icon: "⚛️", name: "Fizika", progress: 48, lessons: 40, xp: 1100, difficulty: "Qiyin", gradient: "from-indigo-500 to-blue-500" },
  { icon: "🌱", name: "Biologiya", progress: 71, lessons: 36, xp: 950, difficulty: "O'rta", gradient: "from-lime-400 to-green-500" },
  { icon: "🌍", name: "Geografiya", progress: 55, lessons: 28, xp: 800, difficulty: "Oson", gradient: "from-sky-400 to-cyan-500" },
  { icon: "📖", name: "Tarix", progress: 40, lessons: 30, xp: 850, difficulty: "O'rta", gradient: "from-amber-500 to-orange-500" },
  { icon: "📚", name: "Ona tili", progress: 82, lessons: 44, xp: 1050, difficulty: "Oson", gradient: "from-fuchsia-500 to-pink-500" },
  { icon: "🇬🇧", name: "Ingliz tili", progress: 66, lessons: 52, xp: 1300, difficulty: "O'rta", gradient: "from-red-500 to-rose-600" },
  { icon: "💻", name: "Informatika", progress: 78, lessons: 46, xp: 1400, difficulty: "Qiyin", gradient: "from-violet-500 to-purple-600" },
  { icon: "🕌", name: "Tarbiya", progress: 90, lessons: 24, xp: 700, difficulty: "Oson", gradient: "from-teal-400 to-emerald-500" },
  { icon: "🎨", name: "San'at", progress: 35, lessons: 22, xp: 650, difficulty: "Oson", gradient: "from-orange-400 to-pink-500" },
  { icon: "🎵", name: "Musiqa", progress: 50, lessons: 20, xp: 600, difficulty: "Oson", gradient: "from-yellow-400 to-amber-500" },
];

function SubjectCard({ s, i }: { s: Subject; i: number }) {
  const [fav, setFav] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative"
    >
      <div className={`absolute -inset-1 rounded-3xl bg-gradient-to-br ${s.gradient} opacity-30 blur-xl transition-opacity group-hover:opacity-60`} />
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
        <div className="flex items-start justify-between">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: "easeInOut" }}
            className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${s.gradient} text-3xl shadow-lg`}
          >
            {s.icon}
          </motion.div>
          <button
            onClick={() => setFav(!fav)}
            className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition-colors hover:bg-white/10"
            aria-label="Favorite"
          >
            <Heart className={`h-4 w-4 ${fav ? "fill-pink-500 text-pink-500" : ""}`} />
          </button>
        </div>

        <h3 className="mt-4 text-xl font-extrabold text-white">{s.name}</h3>

        <div className="mt-2 flex items-center gap-2 text-xs">
          <span className={`rounded-full px-2 py-0.5 font-bold ${
            s.difficulty === "Oson" ? "bg-emerald-500/20 text-emerald-300" :
            s.difficulty === "O'rta" ? "bg-amber-500/20 text-amber-300" :
            "bg-rose-500/20 text-rose-300"
          }`}>{s.difficulty}</span>
          <span className="text-white/60">{s.lessons} dars</span>
          <span className="text-magic-gold font-bold">+{s.xp} XP</span>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-xs text-white/60">
            <span>Progress</span>
            <span className="font-bold text-white">{s.progress}%</span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${s.progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className={`h-full rounded-full bg-gradient-to-r ${s.gradient}`}
            />
          </div>
        </div>

        <button className={`mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${s.gradient} px-4 py-2.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-[1.02]`}>
          <Play className="h-4 w-4" /> Davom etish
        </button>
      </div>
    </motion.div>
  );
}

function SubjectsPage() {
  return (
    <PageShell
      eyebrow={<span>📚 Fanlar</span>}
      title={<span className="text-gradient-magic">Fanlarni tanlang</span>}
      subtitle="O'zingiz yoqtirgan fanlarni o'rganing va yangi bilimlarni kashf eting."
    >
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {subjects.map((s, i) => (
            <SubjectCard key={s.name} s={s} i={i} />
          ))}
        </div>
      </section>

      {[
        { title: "Tavsiya etilgan fanlar", list: subjects.slice(0, 4) },
        { title: "So'nggi o'rganilgan", list: subjects.slice(4, 8) },
        { title: "Ommabop fanlar", list: subjects.slice(8, 12) },
      ].map((section, si) => (
        <section key={section.title} className="mx-auto max-w-7xl px-6 py-10">
          <h2 className="mb-6 text-2xl font-extrabold text-white">{section.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {section.list.map((s, i) => (
              <GlassCard key={s.name + si} className="flex items-center gap-4">
                <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${s.gradient} text-2xl`}>
                  {s.icon}
                </div>
                <div className="min-w-0">
                  <div className="truncate font-bold text-white">{s.name}</div>
                  <div className="text-xs text-white/60">{s.lessons} dars · +{s.xp} XP</div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>
      ))}
    </PageShell>
  );
}
