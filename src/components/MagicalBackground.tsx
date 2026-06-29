import { useMemo } from "react";

/**
 * Magical night-sky backdrop: aurora gradients, twinkling stars,
 * drifting clouds and floating particles. Pure CSS — runs at 60fps.
 */
export function MagicalBackground() {
  const stars = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 3,
      })),
    [],
  );

  const particles = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 6,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Aurora ribbons */}
      <div
        className="absolute inset-x-0 top-0 h-[60%] animate-aurora opacity-60 blur-3xl"
        style={{
          background:
            "linear-gradient(110deg, transparent 0%, oklch(0.7 0.25 160 / 0.35) 30%, oklch(0.65 0.25 200 / 0.35) 55%, oklch(0.65 0.25 300 / 0.4) 75%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-10 h-[50%] animate-aurora opacity-40 blur-3xl"
        style={{
          animationDelay: "3s",
          background:
            "linear-gradient(70deg, transparent 0%, oklch(0.7 0.22 320 / 0.35) 40%, oklch(0.65 0.2 220 / 0.3) 70%, transparent 100%)",
        }}
      />

      {/* Twinkling stars */}
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: "0 0 6px rgba(255,255,255,0.8)",
          }}
        />
      ))}

      {/* Floating colored particles */}
      {particles.map((p) => (
        <span
          key={`p-${p.id}`}
          className="absolute rounded-full animate-float-slow opacity-70"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background:
              p.id % 3 === 0
                ? "var(--magic-pink)"
                : p.id % 3 === 1
                  ? "var(--magic-cyan)"
                  : "var(--magic-gold)",
            boxShadow: "0 0 12px currentColor",
            animationDelay: `${p.delay}s`,
            animationDuration: `${6 + (p.id % 4)}s`,
          }}
        />
      ))}

      {/* Drifting clouds */}
      <div
        className="absolute top-[15%] h-24 w-48 rounded-full bg-white/10 blur-2xl animate-drift"
        style={{ animationDuration: "80s" }}
      />
      <div
        className="absolute top-[45%] h-20 w-40 rounded-full bg-white/8 blur-2xl animate-drift"
        style={{ animationDuration: "110s", animationDelay: "-30s" }}
      />
      <div
        className="absolute top-[70%] h-28 w-56 rounded-full bg-white/8 blur-2xl animate-drift"
        style={{ animationDuration: "95s", animationDelay: "-60s" }}
      />
    </div>
  );
}
