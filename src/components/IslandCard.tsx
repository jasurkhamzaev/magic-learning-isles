import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import hashimjon from "@/assets/hashimjon.png";
import type { Island } from "@/lib/islands";

type Props = {
  island: Island;
  index: number;
};

export function IslandCard({ island, index }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <Link
        to="/islands/$slug"
        params={{ slug: island.slug }}
        className="group relative block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Glow halo */}
        <motion.div
          aria-hidden
          className="absolute inset-0 -z-10 rounded-[40%] blur-3xl"
          style={{ background: island.accent }}
          animate={{
            opacity: hovered ? 0.7 : 0.35,
            scale: hovered ? 1.15 : 1,
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Floating island image */}
        <motion.div
          className="relative mx-auto aspect-square w-full max-w-[420px]"
          animate={{ y: [0, -18, 0] }}
          transition={{
            duration: 6 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.4,
          }}
          whileHover={{ scale: 1.05, rotate: -1 }}
        >
          <img
            src={island.image}
            alt={island.name}
            loading="lazy"
            width={1024}
            height={1024}
            className="h-full w-full object-contain drop-shadow-[0_40px_50px_rgba(0,0,0,0.55)]"
          />

          {/* Orbiting sparkles */}
          {[0, 1, 2, 3].map((s) => (
            <motion.span
              key={s}
              className="absolute rounded-full"
              style={{
                width: 8,
                height: 8,
                top: `${15 + s * 18}%`,
                left: `${10 + (s % 2) * 75}%`,
                background: island.accentSoft,
                boxShadow: `0 0 14px ${island.accentSoft}`,
              }}
              animate={{
                opacity: hovered ? [0.4, 1, 0.4] : [0.2, 0.6, 0.2],
                scale: hovered ? [1, 1.6, 1] : [1, 1.2, 1],
              }}
              transition={{ duration: 2 + s * 0.4, repeat: Infinity, delay: s * 0.3 }}
            />
          ))}

          {/* Hashimjon mascot */}
          <motion.div
            className="absolute -bottom-2 -right-6 flex items-end gap-2 sm:-right-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative max-w-[180px] rounded-2xl rounded-br-sm bg-white/95 px-3 py-2 text-xs font-semibold text-slate-800 shadow-lg">
              {island.hashimjonQuote}
            </div>
            <img
              src={hashimjon}
              alt=""
              loading="lazy"
              className="h-24 w-auto drop-shadow-xl sm:h-28"
            />
          </motion.div>
        </motion.div>

        {/* Floating name plate */}
        <motion.div
          className="relative z-10 mx-auto mt-2 w-fit max-w-[90%]"
          animate={{ y: hovered ? -6 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <div
            className="rounded-full border border-white/20 bg-black/40 px-6 py-3 text-center backdrop-blur-xl"
            style={{ boxShadow: hovered ? island.glow : undefined }}
          >
            <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: island.accent }}>
              {island.badge} · {island.grades}
            </div>
            <div className="mt-0.5 text-2xl font-extrabold text-white">{island.name}</div>
          </div>
        </motion.div>

        {/* Subjects ring (revealed on hover) */}
        <motion.div
          className="mt-5 flex flex-wrap justify-center gap-2"
          initial={false}
          animate={{ opacity: hovered ? 1 : 0.75, y: hovered ? 0 : 4 }}
          transition={{ duration: 0.4 }}
        >
          {island.subjects.map((s) => (
            <span
              key={s.name}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/85 backdrop-blur-sm"
            >
              <span className="mr-1">{s.icon}</span>
              {s.name}
            </span>
          ))}
        </motion.div>
      </Link>
    </motion.div>
  );
}
