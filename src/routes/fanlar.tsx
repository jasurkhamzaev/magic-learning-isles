import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { BookOpen, ChevronRight, Heart, Search, Sparkles, TrendingUp, Zap } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import { MagicalBackground } from "@/components/MagicalBackground";
import { subjects, type Subject } from "@/lib/subjects";

export const Route = createFileRoute("/fanlar")({
  head: () => ({
    meta: [
      { title: "Fanlarni tanlang — Hashimjon Akademiyasi" },
      {
        name: "description",
        content:
          "O'zingiz yoqtirgan fanlarni tanlang, darslarni o'rganing va yangi bilimlarni kashf eting. Matematika, fizika, ingliz tili va boshqa 12+ fan.",
      },
      { property: "og:title", content: "Fanlarni tanlang — Hashimjon Akademiyasi" },
      { property: "og:description", content: "12+ fan, minglab darslar, sehrli sayohat." },
    ],
  }),
  component: FanlarPage,
});

function FanlarPage() {
  const [query, setQuery] = useState("");
  const [favs, setFavs] = useState<Set<string>>(new Set(["matematika", "informatika"]));

  const toggleFav = (slug: string) => {
    setFavs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const filtered = subjects.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.tagline.toLowerCase().includes(query.toLowerCase()),
  );

  const recommended = subjects.slice(0, 3);
  const recent = subjects.slice(3, 6);
  const popular = [...subjects].sort((a, b) => b.xp - a.xp).slice(0, 3);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative isolate overflow-hidden px-6 pb-16 pt-36 text-center">
        <MagicalBackground />
        <div className="relative mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-semibold text-white/90 backdrop-blur-md"
          >
            📚 Fanlar kutubxonasi
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-balance text-6xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-8xl"
          >
            📚 <span className="text-gradient-magic">Fanlarni tanlang</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mx-auto mt-6 max-w-2xl text-balance text-lg text-white/75 sm:text-xl"
          >
            O'zingiz yoqtirgan fanlarni o'rganing va yangi bilimlarni kashf eting.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative mx-auto mt-8 max-w-md"
          >
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Fan qidiring..."
              className="w-full rounded-full border border-white/15 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-white/50 backdrop-blur-xl outline-none transition-colors focus:border-white/40"
            />
          </motion.div>
        </div>
      </section>

      {/* All subjects grid */}
      <section className="relative px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Barcha fanlar</h2>
            <span className="text-sm text-white/60">{filtered.length} ta fan</span>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((s, i) => (
              <SubjectCard
                key={s.slug}
                subject={s}
                index={i}
                fav={favs.has(s.slug)}
                onFav={() => toggleFav(s.slug)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Row sections */}
      <SubjectRow title="Tavsiya etilgan" icon={Sparkles} data={recommended} accent="oklch(0.75 0.22 350)" />
      <SubjectRow title="Yaqinda o'qilgan" icon={BookOpen} data={recent} accent="oklch(0.82 0.18 200)" />
      <SubjectRow title="Ommabop fanlar" icon={TrendingUp} data={popular} accent="oklch(0.78 0.2 50)" />

      <SiteFooter />
    </main>
  );
}

function SubjectRow({
  title,
  icon: Icon,
  data,
  accent,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  data: Subject[];
  accent: string;
}) {
  return (
    <section className="relative px-6 py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-2xl"
            style={{ background: accent, boxShadow: `0 0 30px ${accent}` }}
          >
            <Icon className="h-5 w-5 text-black" />
          </div>
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">{title}</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {data.map((s, i) => (
            <SubjectCard key={s.slug} subject={s} index={i} fav={false} onFav={() => {}} compact />
          ))}
        </div>
      </div>
    </section>
  );
}

function SubjectCard({
  subject,
  index,
  fav,
  onFav,
  compact = false,
}: {
  subject: Subject;
  index: number;
  fav: boolean;
  onFav: () => void;
  compact?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -10;
    setTilt({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06 }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        setTilt({ x: 0, y: 0 });
        setHover(false);
      }}
      onMouseEnter={() => setHover(true)}
      className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl"
      style={{
        transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: "transform 0.15s ease-out, box-shadow 0.4s ease",
        boxShadow: hover ? `0 30px 60px -20px ${subject.glow}, 0 0 60px ${subject.glow}` : "0 12px 30px -10px rgba(0,0,0,0.5)",
      }}
    >
      {/* halo */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-50 blur-3xl transition-opacity group-hover:opacity-90"
        style={{ background: subject.gradient }}
      />

      {/* Header row */}
      <div className="flex items-start justify-between">
        <motion.div
          className={`flex ${compact ? "h-14 w-14 text-3xl" : "h-20 w-20 text-5xl"} items-center justify-center rounded-2xl shadow-lg`}
          style={{ background: subject.gradient, boxShadow: `0 12px 30px ${subject.glow}` }}
          animate={{ rotate: hover ? [0, -6, 6, 0] : 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="drop-shadow">{subject.emoji}</span>
        </motion.div>
        <button
          onClick={(e) => {
            e.preventDefault();
            onFav();
          }}
          aria-label="Sevimli"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/30 backdrop-blur-md transition-colors hover:bg-white/10"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${fav ? "fill-rose-400 text-rose-400" : "text-white/70"}`}
          />
        </button>
      </div>

      {/* Title */}
      <div className="mt-4">
        <h3 className={`${compact ? "text-lg" : "text-xl"} font-extrabold text-white`}>{subject.name}</h3>
        <p className="mt-0.5 text-xs text-white/60">{subject.tagline}</p>
      </div>

      {/* Progress */}
      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between text-xs text-white/70">
          <span>Progress</span>
          <span className="font-bold text-white">{subject.progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${subject.progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ background: subject.gradient, boxShadow: `0 0 12px ${subject.glow}` }}
          />
        </div>
      </div>

      {/* Meta row */}
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-white/85">
          <BookOpen className="h-3 w-3" /> {subject.lessons} dars
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-white/85">
          <Zap className="h-3 w-3 text-yellow-300" /> {subject.xp} XP
        </span>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
            subject.difficulty === "Oson"
              ? "bg-emerald-500/20 text-emerald-200"
              : subject.difficulty === "O'rta"
                ? "bg-amber-500/20 text-amber-200"
                : "bg-rose-500/20 text-rose-200"
          }`}
        >
          {subject.difficulty}
        </span>
      </div>

      {/* CTA */}
      <button
        className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-full py-2.5 text-sm font-bold text-white shadow-md transition-transform group-hover:scale-[1.02]"
        style={{ background: subject.gradient }}
      >
        Davom etish <ChevronRight className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
