import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { islands } from "@/lib/islands";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Sehrli Xarita — Hashimjon Akademiyasi" },
      { name: "description", content: "Interaktiv sehrli dunyo xaritasi va uchayotgan orollar." },
    ],
  }),
  component: MapPage,
});

const positions = [
  { top: "22%", left: "18%" },
  { top: "35%", left: "58%" },
  { top: "62%", left: "32%" },
];

function MapPage() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <PageShell
      eyebrow={<span>🗺️ Sehrli Xarita</span>}
      title={<span className="text-gradient-magic">Dunyo Xaritasi</span>}
      subtitle="Orolni tanlang va uning sirlarini kashf eting."
      hideFooter
    >
      <section className="relative mx-auto max-w-7xl px-6 pb-24">
        <div className="relative h-[80vh] min-h-[600px] overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-b from-indigo-950/60 via-purple-950/40 to-slate-950/60 backdrop-blur-xl">
          {/* Aurora + stars already provided by MagicalBackground under hero; add sky glow here */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(120,80,255,0.35),transparent_60%),radial-gradient(circle_at_75%_60%,rgba(80,200,255,0.3),transparent_55%)]" />

          {/* Animated clouds */}
          {[0,1,2].map(i => (
            <motion.div key={i}
              initial={{ x: "-20%" }} animate={{ x: "120%" }}
              transition={{ duration: 60 + i * 20, repeat: Infinity, ease: "linear", delay: i * -20 }}
              className="absolute h-16 w-40 rounded-full bg-white/10 blur-xl"
              style={{ top: `${15 + i * 25}%` }}
            />
          ))}

          {/* Birds */}
          {[0,1].map(i => (
            <motion.div key={i}
              initial={{ x: "-5%", y: 0 }} animate={{ x: "105%", y: [0,-15,0] }}
              transition={{ duration: 25 + i * 10, repeat: Infinity, ease: "linear" }}
              className="absolute text-xl"
              style={{ top: `${20 + i * 30}%` }}
            >🕊️</motion.div>
          ))}

          {/* Bridges */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
            <defs>
              <linearGradient id="mapBridge" x1="0" x2="1">
                <stop offset="0%" stopColor="oklch(0.75 0.22 350)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="oklch(0.62 0.25 300)" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <motion.path d="M 22 26 Q 40 5 60 39" stroke="url(#mapBridge)" strokeWidth="0.4" strokeDasharray="0.5 1.5" fill="none"
              initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:2.5, delay:0.5}} />
            <motion.path d="M 60 39 Q 45 60 36 66" stroke="url(#mapBridge)" strokeWidth="0.4" strokeDasharray="0.5 1.5" fill="none"
              initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:2.5, delay:1.2}} />
          </svg>

          {/* Water waves */}
          <motion.div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cyan-500/20 to-transparent" animate={{opacity:[0.5,0.8,0.5]}} transition={{duration:4,repeat:Infinity}} />

          {/* Islands */}
          {islands.map((isl, i) => (
            <motion.button
              key={isl.slug}
              onClick={() => setActive(active === isl.slug ? null : isl.slug)}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={positions[i]}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.2, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.1 }}
            >
              <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }} className="relative">
                <div className="absolute inset-0 -z-10 rounded-full blur-2xl opacity-70" style={{ background: isl.accent }} />
                <img src={isl.image} alt={isl.name} className="h-40 w-40 object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] sm:h-52 sm:w-52" />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                  {isl.name}
                </div>
              </motion.div>

              {active === isl.slug && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute left-1/2 top-full mt-8 w-72 -translate-x-1/2 rounded-3xl border border-white/15 bg-black/80 p-5 text-left backdrop-blur-2xl"
                >
                  <div className="text-xs font-bold uppercase tracking-widest" style={{ color: isl.accent }}>{isl.grades}</div>
                  <div className="mt-1 text-lg font-extrabold text-white">{isl.name}</div>
                  <p className="mt-2 text-xs text-white/70">{isl.description}</p>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                    <div><div className="font-bold text-magic-gold">1200</div><div className="text-white/50">XP</div></div>
                    <div><div className="font-bold text-magic-cyan">68%</div><div className="text-white/50">Bajarildi</div></div>
                    <div><div className="font-bold text-magic-pink">32</div><div className="text-white/50">Darslar</div></div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px]">👹 Boss</span>
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px]">💰 Xazina</span>
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px]">🔒 Yashirin</span>
                  </div>
                  <Link to="/islands/$slug" params={{ slug: isl.slug }} className="mt-4 block rounded-full bg-gradient-magic px-4 py-2 text-center text-sm font-bold text-white">
                    Orolga kirish
                  </Link>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
