import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { Globe, Moon, Sun, Menu, X, LogIn } from "lucide-react";

const links: { to: "/orollar" | "/fanlar" | "/reyting" | "/mukofotlar" | "/blog"; label: string }[] = [
  { to: "/orollar", label: "Orollar" },
  { to: "/fanlar", label: "Fanlar" },
  { to: "/reyting", label: "Reyting" },
  { to: "/mukofotlar", label: "Mukofotlar" },
  { to: "/blog", label: "Blog" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(true);
  const [lang, setLang] = useState<"UZ" | "EN">("UZ");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-6 sm:pt-5"
    >
      <nav
        className={`flex w-full max-w-7xl items-center justify-between gap-4 rounded-3xl border border-white/10 px-4 py-2.5 backdrop-blur-2xl transition-all sm:px-6 ${
          scrolled ? "bg-black/50 shadow-2xl shadow-purple-900/30" : "bg-white/5"
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-magic text-lg shadow-lg shadow-fuchsia-500/40">
            <span className="drop-shadow">✨</span>
          </span>
          <span className="hidden text-base font-extrabold tracking-tight text-white sm:block">
            Hashimjon <span className="text-gradient-magic">Akademiyasi</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "bg-white/10 text-white" }}
              className="rounded-full px-3.5 py-1.5 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setLang(lang === "UZ" ? "EN" : "UZ")}
            className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-white/90 transition-colors hover:bg-white/10 md:inline-flex"
            aria-label="Language"
          >
            <Globe className="h-3.5 w-3.5" /> {lang}
          </button>
          <button
            onClick={() => setDark(!dark)}
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/90 transition-colors hover:bg-white/10 md:inline-flex"
            aria-label="Theme"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href="#login"
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-sunset px-4 py-2 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition-transform hover:scale-105"
          >
            <LogIn className="h-4 w-4" /> Kirish
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/90 lg:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-x-3 top-full mt-2 rounded-3xl border border-white/10 bg-black/70 p-4 backdrop-blur-2xl lg:hidden"
        >
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-2.5 text-sm font-semibold text-white/85 hover:bg-white/10"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
