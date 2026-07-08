import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { SiteFooter } from "./SiteFooter";
import { MagicalBackground } from "./MagicalBackground";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  hideFooter?: boolean;
};

export function PageShell({ eyebrow, title, subtitle, children, hideFooter }: Props) {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />

      <section className="relative isolate overflow-hidden px-6 pb-16 pt-32 sm:pt-40">
        <MagicalBackground />
        <div className="relative mx-auto max-w-5xl text-center">
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-semibold text-white/90 backdrop-blur-md"
            >
              {eyebrow}
            </motion.div>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-5 text-balance text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mx-auto mt-5 max-w-2xl text-balance text-lg text-white/70"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </section>

      <div className="relative">{children}</div>

      {!hideFooter && <SiteFooter />}
    </main>
  );
}

export function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] ${className}`}
    >
      {children}
    </div>
  );
}
