import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ChevronDown, Map, Rocket } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { IslandsSection } from "@/components/IslandsSection";
import { WhyChooseSection } from "@/components/WhyChooseSection";
import { ExploreIslandsSection } from "@/components/ExploreIslandsSection";
import { SiteFooter } from "@/components/SiteFooter";
import { MagicalBackground } from "@/components/MagicalBackground";
import hashimjon from "@/assets/hashimjon.png";
import islandQuvonch from "@/assets/island-quvonch.png";
import islandKashfiyot from "@/assets/island-kashfiyot.png";
import islandKelajak from "@/assets/island-kelajak.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hashimjon Akademiyasi — Sehrli Bilim Orollari" },
      {
        name: "description",
        content:
          "Bolalar uchun sehrli ta'lim platformasi. Quvonch, Kashfiyot va Kelajak orollari bo'ylab sayohat qiling, fanlarni o'rganing va mukofotlar yuting.",
      },
      { property: "og:title", content: "Hashimjon Akademiyasi — Sehrli Bilim Orollari" },
      {
        property: "og:description",
        content: "Bolalar uchun sehrli ta'lim platformasi. Quvonch, Kashfiyot va Kelajak orollari bo'ylab sayohat qiling, fanlarni o'rganing va mukofotlar yuting.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function useParallax() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setPos({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return pos;
}

function Home() {
  const p = useParallax();

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative isolate flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-32 sm:pt-36">
        <MagicalBackground />
        <div className="relative mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-semibold text-white/90 backdrop-blur-md"
            >
              <span>✨</span> #1 Bolalar ta'lim platformasi
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-6 text-balance text-5xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-7xl lg:text-[5.25rem]"
            >
              <span className="text-gradient-sunset">Sehrli</span>{" "}
              <span className="text-gradient-magic">Bilim Orollari</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/75"
            >
              Hashimjon Akademiyasida bilim <span className="font-semibold text-white">o'yinga aylanadi</span>.
              Orollar bo'ylab sayohat qiling, fanlarni o'rganing, mukofotlar yuting va kelajak
              sari qadam tashlang.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a
                href="#orollar"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-sunset px-7 py-4 text-base font-bold text-white shadow-lg shadow-orange-500/30 transition-transform hover:scale-105"
              >
                <Map className="h-5 w-5" /> Xaritani ko'rish
              </a>
              <a
                href="#orollar"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-base font-bold text-white backdrop-blur-md transition-colors hover:bg-white/10"
              >
                <Rocket className="h-5 w-5" /> Sarguzashtni boshlash
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-10 flex items-center gap-6 text-sm text-white/65"
            >
              <div>
                <div className="text-2xl font-extrabold text-white">50K+</div>
                <div>O'quvchilar</div>
              </div>
              <div className="h-8 w-px bg-white/15" />
              <div>
                <div className="text-2xl font-extrabold text-white">300+</div>
                <div>Darslar</div>
              </div>
              <div className="h-8 w-px bg-white/15" />
              <div>
                <div className="text-2xl font-extrabold text-white">4.9★</div>
                <div>Reyting</div>
              </div>
            </motion.div>
          </div>

          {/* Right — floating 3D world */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-square w-full max-w-[560px]"
            style={{
              transform: `translate3d(${p.x * 12}px, ${p.y * 12}px, 0)`,
              transition: "transform 0.2s ease-out",
            }}
          >
            {/* Glow halo */}
            <div className="absolute inset-6 rounded-full bg-gradient-magic opacity-40 blur-3xl" />

            {/* Magical bridges (SVG) */}
            <svg
              aria-hidden
              viewBox="0 0 500 500"
              className="absolute inset-0 h-full w-full"
              fill="none"
            >
              <defs>
                <linearGradient id="bridge1" x1="0" x2="1">
                  <stop offset="0%" stopColor="oklch(0.75 0.22 350)" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="oklch(0.82 0.18 200)" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="bridge2" x1="0" x2="1">
                  <stop offset="0%" stopColor="oklch(0.82 0.18 200)" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="oklch(0.62 0.25 300)" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 120 180 Q 250 100 380 220"
                stroke="url(#bridge1)"
                strokeWidth="3"
                strokeDasharray="2 10"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.6 }}
              />
              <motion.path
                d="M 380 220 Q 300 380 150 360"
                stroke="url(#bridge2)"
                strokeWidth="3"
                strokeDasharray="2 10"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1 }}
              />
            </svg>

            {/* Three islands */}
            <motion.img
              src={islandQuvonch}
              alt="Quvonch Oroli"
              className="absolute left-[0%] top-[18%] w-[42%] drop-shadow-[0_25px_35px_rgba(255,80,180,0.35)]"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
              src={islandKashfiyot}
              alt="Kashfiyot Oroli"
              className="absolute right-[-2%] top-[8%] w-[46%] drop-shadow-[0_25px_35px_rgba(80,200,255,0.4)]"
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            />
            <motion.img
              src={islandKelajak}
              alt="Kelajak Oroli"
              className="absolute bottom-[2%] left-[18%] w-[50%] drop-shadow-[0_25px_35px_rgba(160,100,255,0.4)]"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            />

            {/* Mascot Hashimjon */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="absolute -bottom-8 -right-4 flex items-end gap-2 sm:-right-8"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.5 }}
                className="mb-16 rounded-2xl rounded-br-sm bg-white/95 px-4 py-2.5 text-sm font-bold text-slate-800 shadow-xl"
              >
                Salom! Men Hashimjonman 👋
              </motion.div>
              <motion.img
                src={hashimjon}
                alt="Hashimjon"
                className="h-40 w-auto drop-shadow-2xl sm:h-52"
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.a
          href="#orollar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-white/60 hover:text-white"
        >
          <span className="text-xs font-semibold uppercase tracking-widest">Pastga</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.a>
      </section>

      <WhyChooseSection />
      <IslandsSection />
      <ExploreIslandsSection />
      <SiteFooter />
    </main>
  );
}
