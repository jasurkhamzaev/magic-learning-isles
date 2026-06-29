import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, Trophy, Sparkles, Play } from "lucide-react";
import { MagicalBackground } from "@/components/MagicalBackground";
import { getIsland, islands } from "@/lib/islands";

export const Route = createFileRoute("/islands/$slug")({
  loader: ({ params }) => {
    const island = getIsland(params.slug);
    if (!island) throw notFound();
    return { island };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.island.name} — Hashimjon Akademiyasi` },
          { name: "description", content: loaderData.island.description },
          { property: "og:title", content: loaderData.island.name },
          { property: "og:description", content: loaderData.island.description },
          { property: "og:image", content: loaderData.island.image },
        ]
      : [],
  }),
  component: IslandDetail,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center text-white">
      Orol topilmadi.
    </div>
  ),
});

function IslandDetail() {
  const { island } = Route.useLoaderData();
  const progress = 35;

  return (
    <main className="relative min-h-screen overflow-hidden">
      <MagicalBackground />

      <div className="relative mx-auto max-w-6xl px-6 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-md transition-colors hover:bg-white/10"
        >
          <ArrowLeft className="size-4" /> Xaritaga qaytish
        </Link>

        {/* Hero banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-8 grid gap-10 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:grid-cols-2 md:p-12"
        >
          <div
            className="absolute -inset-20 -z-10 opacity-50 blur-3xl"
            style={{ background: island.accent }}
          />

          <div className="relative">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs font-bold uppercase tracking-widest"
              style={{ color: island.accent }}
            >
              {island.badge} · {island.grades}
            </div>
            <h1 className="mt-4 text-5xl font-extrabold leading-tight text-white sm:text-6xl">
              {island.name}
            </h1>
            <p className="mt-3 text-lg text-white/80">{island.tagline}</p>
            <p className="mt-4 max-w-md text-white/70">{island.description}</p>

            {/* Progress */}
            <div className="mt-8">
              <div className="mb-2 flex items-center justify-between text-sm text-white/75">
                <span>Sizning yutug'ingiz</span>
                <span className="font-bold text-white">{progress}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                  className="h-full rounded-full bg-gradient-magic"
                />
              </div>
            </div>

            <button
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-sunset px-6 py-3 text-base font-bold text-white shadow-lg transition-transform hover:scale-105"
            >
              <Play className="size-4 fill-current" /> O'qishni davom ettirish
            </button>
          </div>

          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative mx-auto"
          >
            <img
              src={island.image}
              alt={island.name}
              width={1024}
              height={1024}
              className="h-auto w-full max-w-md drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>

        {/* Subjects grid */}
        <section className="mt-16">
          <h2 className="text-2xl font-extrabold text-white">Fanlar</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {island.subjects.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -6, scale: 1.04 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-md"
              >
                <div className="text-3xl">{s.icon}</div>
                <div className="mt-2 text-sm font-semibold text-white">{s.name}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Achievements & rewards */}
        <section className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <Trophy className="size-6 text-amber-400" />
              <h3 className="text-xl font-bold text-white">Yutuqlar</h3>
            </div>
            <ul className="mt-4 space-y-3 text-white/80">
              <li className="flex items-center justify-between">
                <span>Birinchi qadam</span>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-300">
                  Olindi
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span>5 darsni yakunlang</span>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-bold text-white/70">
                  3 / 5
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span>Birinchi mukofot</span>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-bold text-white/70">
                  Yopiq
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <Sparkles className="size-6 text-pink-400" />
              <h3 className="text-xl font-bold text-white">Mukofotlar</h3>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {["🥇", "🎖️", "⭐", "💎", "🏅", "🎁", "🔓", "🔓"].map((r, i) => (
                <div
                  key={i}
                  className={`flex aspect-square items-center justify-center rounded-xl text-2xl ${
                    i < 3
                      ? "bg-gradient-magic"
                      : "border border-white/10 bg-white/5 opacity-50"
                  }`}
                >
                  {r}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Other islands */}
        <section className="mt-20">
          <h2 className="text-2xl font-extrabold text-white">Boshqa orollar</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {islands
              .filter((i) => i.slug !== island.slug)
              .map((other) => (
                <Link
                  key={other.slug}
                  to="/islands/$slug"
                  params={{ slug: other.slug }}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all hover:bg-white/10"
                >
                  <img
                    src={other.image}
                    alt=""
                    width={120}
                    height={120}
                    className="size-20 object-contain transition-transform group-hover:scale-110"
                  />
                  <div>
                    <div
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: other.accent }}
                    >
                      {other.grades}
                    </div>
                    <div className="text-lg font-bold text-white">{other.name}</div>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}
