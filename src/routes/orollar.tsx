import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Award, ChevronRight, Sparkles, Star, Trophy, Zap } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import { MagicalBackground } from "@/components/MagicalBackground";
import { islands } from "@/lib/islands";
import { leaderboard } from "@/lib/leaderboard";

export const Route = createFileRoute("/orollar")({
  head: () => ({
    meta: [
      { title: "Bilim Orollari — Hashimjon Akademiyasi" },
      {
        name: "description",
        content:
          "Sehrli bilim orollarini kashf eting. Har bir orol yangi bilimlar, qiziqarli topshiriqlar va mukofotlarga olib boradi.",
      },
      { property: "og:title", content: "Bilim Orollari — Hashimjon Akademiyasi" },
      {
        property: "og:description",
        content: "Sinfingizga mos orolni tanlang va bilim sayohatingizni boshlang.",
      },
    ],
  }),
  component: OrollarPage,
});

function useCounter(target: number, duration = 1500) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    let raf = 0;
    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / duration);
      setValue(Math.floor(p * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

function OrollarPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative isolate flex min-h-[80vh] items-center justify-center overflow-hidden px-6 pb-16 pt-36 text-center"
      >
        <motion.div style={{ y: yBg }} className="absolute inset-0 -z-10">
          <MagicalBackground />
        </motion.div>

        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-semibold text-white/90 backdrop-blur-md"
          >
            🗺️ Bilim Xaritasi
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 text-balance text-6xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-8xl"
          >
            <span className="text-gradient-magic">🏝️ Bilim Orollari</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-white/75 sm:text-xl"
          >
            Har bir orol yangi bilimlar, qiziqarli topshiriqlar va mukofotlarga olib boradi.
            Sinfingizga mos orolni tanlang va bilim sayohatingizni boshlang.
          </motion.p>
        </div>
      </section>

      {/* Three big island cards with 3D tilt */}
      <section className="relative px-6 py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          {islands.map((island, i) => (
            <BigIslandCard key={island.slug} island={island} index={i} />
          ))}
        </div>
      </section>

      {/* Adventure Timeline */}
      <section className="relative px-6 py-20">
        <div className="mx-auto max-w-5xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
          >
            Sarguzasht <span className="text-gradient-sunset">yo'li</span>
          </motion.h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Uch qadamda bilim olamiga qadam tashlang.
          </p>

          <div className="relative mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
            {/* Connecting line (desktop) */}
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-12 hidden h-1 w-full md:block"
              preserveAspectRatio="none"
              viewBox="0 0 1000 4"
            >
              <motion.line
                x1="80"
                y1="2"
                x2="920"
                y2="2"
                stroke="url(#timeline-grad)"
                strokeWidth="2"
                strokeDasharray="4 8"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
              />
              <defs>
                <linearGradient id="timeline-grad" x1="0" x2="1">
                  <stop offset="0%" stopColor="oklch(0.75 0.22 350)" />
                  <stop offset="50%" stopColor="oklch(0.82 0.18 200)" />
                  <stop offset="100%" stopColor="oklch(0.62 0.25 300)" />
                </linearGradient>
              </defs>
            </svg>

            {[
              { n: 1, title: "Orol tanla", desc: "Yoshingizga mos orolni tanlang", emoji: "🗺️", color: "var(--magic-pink)" },
              { n: 2, title: "Darsni bajar", desc: "Qiziqarli topshiriqlarni bajaring", emoji: "🎯", color: "var(--magic-cyan)" },
              { n: 3, title: "Mukofot yut", desc: "XP, yulduzlar va nishonlar to'plang", emoji: "🏆", color: "var(--magic-gold)" },
            ].map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative flex flex-col items-center"
              >
                <motion.div
                  className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-black/40 text-4xl backdrop-blur-xl"
                  style={{ boxShadow: `0 0 60px ${s.color}` }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
                >
                  {s.emoji}
                  <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-magic text-sm font-extrabold text-white shadow-lg">
                    {s.n}
                  </div>
                </motion.div>
                <div className="mt-5 text-xl font-extrabold text-white">{s.title}</div>
                <div className="mt-1 max-w-[240px] text-sm text-white/70">{s.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="relative px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
          >
            🏆 <span className="text-gradient-magic">Orol Yutuqlari</span>
          </motion.h2>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-5">
            {[
              { label: "Tugatilgan orollar", value: 2, icon: Trophy, color: "oklch(0.85 0.18 85)" },
              { label: "Jami XP", value: 12480, icon: Zap, color: "oklch(0.75 0.22 350)" },
              { label: "Yulduzlar", value: 342, icon: Star, color: "oklch(0.82 0.18 200)" },
              { label: "Sertifikatlar", value: 8, icon: Award, color: "oklch(0.62 0.25 300)" },
              { label: "Nishonlar", value: 24, icon: Sparkles, color: "oklch(0.78 0.2 50)" },
            ].map((a, i) => (
              <StatCard key={a.label} {...a} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard preview */}
      <section className="relative px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
              >
                🥇 Reyting cho'qqisi
              </motion.h2>
              <p className="mt-2 text-white/70">Bugungi eng faol o'quvchilar.</p>
            </div>
            <Link
              to="/reyting"
              className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-md hover:bg-white/10"
            >
              Barchasini ko'rish <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl">
            {leaderboard.map((e, i) => (
              <motion.div
                key={e.rank}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-4 border-b border-white/5 px-5 py-4 last:border-b-0 hover:bg-white/5"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-extrabold ${
                    e.rank === 1
                      ? "bg-gradient-to-br from-yellow-300 to-orange-500 text-black"
                      : e.rank === 2
                        ? "bg-gradient-to-br from-slate-200 to-slate-400 text-black"
                        : e.rank === 3
                          ? "bg-gradient-to-br from-orange-300 to-amber-700 text-black"
                          : "bg-white/10 text-white"
                  }`}
                >
                  {e.rank}
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-magic text-xl">
                  {e.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-base font-bold text-white">{e.name}</div>
                  <div className="text-xs text-white/60">{e.island} oroli · {e.streak} kun ketma-ket</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-extrabold text-white">{e.xp.toLocaleString()}</div>
                  <div className="text-xs text-white/60">XP</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-white/15 bg-white/5 p-10 text-center backdrop-blur-2xl sm:p-16"
          style={{ boxShadow: "0 40px 80px -20px oklch(0.62 0.25 300 / 0.4)" }}
        >
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gradient-magic opacity-40 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-gradient-sunset opacity-40 blur-3xl" />
          <h2 className="relative text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Sarguzashtni boshlashga <span className="text-gradient-sunset">tayyormisiz?</span>
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg text-white/75">
            O'zingizga mos orolni tanlang va bugundan sehrli bilim yo'liga qadam qo'ying.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#top"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-sunset px-8 py-4 text-base font-bold text-white shadow-lg shadow-orange-500/30 transition-transform hover:scale-105"
            >
              🚀 Orolga kirish
            </a>
            <Link
              to="/fanlar"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-md hover:bg-white/10"
            >
              📚 Fanlarni ko'rish
            </Link>
          </div>
        </motion.div>
      </section>

      <SiteFooter />
    </main>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
  delay,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  delay: number;
}) {
  const v = useCounter(value, 1400);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -6, scale: 1.03 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl"
    >
      <div
        className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-40 blur-2xl transition-opacity group-hover:opacity-70"
        style={{ background: color }}
      />
      <div
        className="relative mb-4 flex h-11 w-11 items-center justify-center rounded-2xl"
        style={{ background: `${color}`, boxShadow: `0 0 30px ${color}` }}
      >
        <Icon className="h-5 w-5 text-black" />
      </div>
      <div className="text-3xl font-extrabold text-white tabular-nums">{v.toLocaleString()}</div>
      <div className="mt-1 text-sm text-white/70">{label}</div>
    </motion.div>
  );
}

function BigIslandCard({ island, index }: { island: (typeof islands)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 12;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -12;
    setTilt({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to="/islands/$slug"
        params={{ slug: island.slug }}
        ref={ref as never}
        onMouseMove={onMove}
        onMouseLeave={() => {
          setTilt({ x: 0, y: 0 });
          setHover(false);
        }}
        onMouseEnter={() => setHover(true)}
        className="group relative block h-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(0)`,
          transition: "transform 0.15s ease-out, box-shadow 0.4s ease",
          boxShadow: hover ? island.glow : "0 20px 40px -10px rgba(0,0,0,0.5)",
        }}
      >
        {/* halo */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full opacity-40 blur-3xl transition-opacity group-hover:opacity-70"
          style={{ background: island.accent }}
        />

        {/* Badge */}
        <div className="flex items-center justify-between">
          <span
            className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs font-bold text-white backdrop-blur-md"
            style={{ color: island.accentSoft }}
          >
            {island.grades}
          </span>
          <span className="text-2xl">{island.slug === "quvonch" ? "🌈" : island.slug === "kashfiyot" ? "🔬" : "🚀"}</span>
        </div>

        {/* Island illustration */}
        <motion.img
          src={island.image}
          alt={island.name}
          loading="lazy"
          className="mx-auto mt-4 aspect-square w-full max-w-[320px] object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.5)]"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Text */}
        <h3 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">{island.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/70">{island.description}</p>

        {/* Progress bars */}
        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          {[
            { label: "O'quvchi", value: index === 0 ? "18K" : index === 1 ? "22K" : "10K" },
            { label: "Dars", value: index === 0 ? "120" : index === 1 ? "180" : "220" },
            { label: "Yulduz", value: index === 0 ? "5.2K" : index === 1 ? "8.1K" : "6.4K" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 px-2 py-2">
              <div className="text-base font-extrabold text-white">{s.value}</div>
              <div className="text-[10px] uppercase tracking-wider text-white/60">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="mt-6 flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white shadow-lg transition-transform group-hover:scale-[1.02]"
          style={{ background: `linear-gradient(135deg, ${island.accentSoft}, ${island.accent})`, boxShadow: `0 10px 30px ${island.accent}` }}
        >
          {island.slug === "quvonch" ? "✨ Sayohatni boshlash" : island.slug === "kashfiyot" ? "🔍 Kashf qilish" : "🚀 Kelajak sari"}
          <ChevronRight className="h-4 w-4" />
        </div>
      </Link>
    </motion.div>
  );
}
