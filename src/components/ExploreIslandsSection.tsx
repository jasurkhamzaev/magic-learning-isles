import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { islands } from "@/lib/islands";

const gradients: Record<string, string> = {
  quvonch: "from-pink-500/30 via-rose-400/20 to-fuchsia-500/10",
  kashfiyot: "from-cyan-400/30 via-sky-400/20 to-blue-500/10",
  kelajak: "from-purple-500/30 via-violet-500/20 to-indigo-500/10",
};

const rings: Record<string, string> = {
  quvonch: "hover:ring-pink-400/50",
  kashfiyot: "hover:ring-cyan-300/50",
  kelajak: "hover:ring-purple-400/50",
};

export function ExploreIslandsSection() {
  return (
    <section id="mukofotlar" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-semibold text-white/90 backdrop-blur-md">
            <span>🧭</span> Orollarni O'rganing
          </div>
          <h2 className="mt-6 text-balance text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
            Uch <span className="text-gradient-magic">Sehrli Dunyo</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
            Yoshingizga mos orolni tanlang va sarguzashtni boshlang.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {islands.map((island, i) => (
            <motion.div
              key={island.slug}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/islands/$slug"
                params={{ slug: island.slug }}
                className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:-translate-y-2 hover:shadow-2xl hover:ring-2 ${rings[island.slug]}`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${gradients[island.slug]}`}
                />
                <div className="absolute -bottom-10 -right-10 h-60 w-60 rounded-full blur-3xl" style={{ background: island.accent, opacity: 0.4 }} />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md">
                      {island.badge}
                    </span>
                    <span className="text-xs font-semibold text-white/70">{island.grades}</span>
                  </div>

                  <motion.div
                    className="relative mx-auto mt-4 aspect-square w-full max-w-[280px]"
                    animate={{ y: [0, -14, 0] }}
                    transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={island.image}
                      alt={island.name}
                      loading="lazy"
                      className="h-full w-full object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.5)]"
                    />
                  </motion.div>

                  <h3 className="mt-4 text-2xl font-extrabold text-white">{island.name}</h3>
                  <p className="mt-1 text-sm font-semibold" style={{ color: island.accent }}>
                    {island.tagline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">{island.description}</p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {island.subjects.slice(0, 4).map((s) => (
                      <span
                        key={s.name}
                        className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/85"
                      >
                        <span className="mr-1">{s.icon}</span>
                        {s.name}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-white/10 px-5 py-2.5 text-sm font-bold text-white ring-1 ring-white/20 transition-all group-hover:bg-white group-hover:text-slate-900">
                    O'rganish <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
