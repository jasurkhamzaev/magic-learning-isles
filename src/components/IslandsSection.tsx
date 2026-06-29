import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { MagicalBackground } from "./MagicalBackground";
import { IslandCard } from "./IslandCard";
import { islands } from "@/lib/islands";

export function IslandsSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax layers
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const yMid = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
    <section
      ref={ref}
      id="orollar"
      className="relative isolate overflow-hidden py-24 sm:py-32"
    >
      {/* Parallax background */}
      <motion.div style={{ y: yBackground }} className="absolute inset-0 -z-10">
        <MagicalBackground />
      </motion.div>

      {/* Section header */}
      <motion.div
        style={{ y: yMid }}
        className="relative mx-auto max-w-3xl px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-semibold text-white/90 backdrop-blur-md"
        >
          <span className="text-lg">🗺️</span> Bilim Xaritasi
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 text-balance text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl"
        >
          <span className="text-gradient-magic">Sehrli Bilim Orollari</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mx-auto mt-6 max-w-xl text-balance text-lg text-white/75"
        >
          O'zingizga mos bilim dunyosini tanlang va sarguzashtni boshlang.
        </motion.p>
      </motion.div>

      {/* The map — three floating islands */}
      <div className="relative mx-auto mt-20 max-w-7xl px-6">
        {/* Connecting magic path (desktop only) */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-[280px] w-full -translate-y-1/2 md:block"
          viewBox="0 0 1200 280"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="pathGrad" x1="0" x2="1">
              <stop offset="0%" stopColor="oklch(0.75 0.22 350)" stopOpacity="0.6" />
              <stop offset="50%" stopColor="oklch(0.82 0.18 200)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="oklch(0.62 0.25 300)" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 100 200 Q 350 60 600 180 T 1100 100"
            stroke="url(#pathGrad)"
            strokeWidth="3"
            strokeDasharray="2 14"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: "easeOut" }}
          />
        </svg>

        <div className="grid grid-cols-1 gap-20 md:grid-cols-3 md:gap-6 lg:gap-10">
          {islands.map((island, i) => (
            <div
              key={island.slug}
              className={
                // Alternate vertical offset for an organic floating layout
                i === 1 ? "md:mt-24" : i === 2 ? "md:mt-8" : ""
              }
            >
              <IslandCard island={island} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
