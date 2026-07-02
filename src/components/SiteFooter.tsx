import { Send, Instagram, Youtube } from "lucide-react";

const columns = [
  {
    title: "Platforma",
    links: ["Orollar", "Fanlar", "Reyting", "Mukofotlar"],
  },
  {
    title: "Foydali",
    links: ["Blog", "Yordam", "FAQ", "Aloqa"],
  },
  {
    title: "Huquqiy",
    links: ["Maxfiylik", "Shartlar", "Cookies", "Litsenziya"],
  },
];

export function SiteFooter() {
  return (
    <footer id="blog" className="relative mt-16 border-t border-white/10 bg-black/40 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-magic text-lg shadow-lg shadow-fuchsia-500/40">
                ✨
              </span>
              <span className="text-base font-extrabold text-white">
                Hashimjon <span className="text-gradient-magic">Akademiyasi</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              Bolalar uchun sehrli ta'lim olami. Bilim, o'yin va sarguzasht bir joyda.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[
                { icon: Send, label: "Telegram" },
                { icon: Instagram, label: "Instagram" },
                { icon: Youtube, label: "YouTube" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/85 transition-all hover:scale-110 hover:bg-white/15 hover:text-white"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((c) => (
            <div key={c.title}>
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-white/60">
                {c.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm font-medium text-white/80 transition-colors hover:text-white"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row">
          <p>© {new Date().getFullYear()} Hashimjon Akademiyasi. Barcha huquqlar himoyalangan.</p>
          <p>Made with ✨ in Uzbekistan</p>
        </div>
      </div>
    </footer>
  );
}
