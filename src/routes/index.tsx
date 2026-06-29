import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { IslandsSection } from "@/components/IslandsSection";
import { MagicalBackground } from "@/components/MagicalBackground";
import hashimjon from "@/assets/hashimjon.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hashimjon Akademiyasi — Sehrli Bilim Orollari" },
      {
        name: "description",
        content:
          "Bolalar uchun sehrli ta'lim olami. Quvonch, Kashfiyot va Kelajak orollari bo'ylab sayohat qiling.",
      },
      { property: "og:title", content: "Hashimjon Akademiyasi" },
      {
        property: "og:description",
        content: "Sehrli bilim orollari — ta'lim sarguzashti.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Hero */}
      <section className="relative isolate overflow-hidden px-6 pb-12 pt-20 sm:pt-28">
        <MagicalBackground />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-semibold text-white/90 backdrop-blur-md"
            >
              <span>✨</span> Hashimjon Akademiyasi
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-6 text-balance text-5xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-7xl"
            >
              <span className="text-gradient-sunset">Sehrli</span>{" "}
              <span className="text-gradient-magic">Bilim Orollari</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-6 max-w-xl text-lg text-white/75"
            >
              Bu yerda ta'lim sehrga aylanadi. Orollar bo'ylab sayohat qiling,
              bilim oling, yutuqlarga erishing va yangi do'stlar orttiring.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a
                href="#orollar"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-sunset px-7 py-4 text-base font-bold text-white shadow-lg shadow-orange-500/30 transition-transform hover:scale-105"
              >
                Xaritani Ko'rish <span>🗺️</span>
              </a>
              <a
                href="#orollar"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-base font-bold text-white backdrop-blur-md transition-colors hover:bg-white/10"
              >
                Sarguzashtni Boshlash <span>🚀</span>
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative mx-auto max-w-md"
          >
            <motion.img
              src={hashimjon}
              alt="Hashimjon"
              className="relative z-10 mx-auto h-auto w-full max-w-[420px] drop-shadow-2xl"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 -z-0 rounded-full bg-gradient-magic opacity-40 blur-3xl" />
          </motion.div>
        </div>
      </section>

      <IslandsSection />
    </main>
  );
}
