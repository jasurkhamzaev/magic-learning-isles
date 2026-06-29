import islandQuvonch from "@/assets/island-quvonch.png";
import islandKashfiyot from "@/assets/island-kashfiyot.png";
import islandKelajak from "@/assets/island-kelajak.png";

export type IslandSubject = { icon: string; name: string };

export type Island = {
  slug: "quvonch" | "kashfiyot" | "kelajak";
  name: string;
  grades: string;
  tagline: string;
  description: string;
  image: string;
  hashimjonQuote: string;
  subjects: IslandSubject[];
  /** primary, secondary CSS colors (oklch tokens) */
  accent: string;
  accentSoft: string;
  glow: string;
  badge: string;
};

export const islands: Island[] = [
  {
    slug: "quvonch",
    name: "Quvonch Oroli",
    grades: "1–4 sinflar",
    tagline: "Ilk bilim sehri",
    description:
      "Rang-barang dunyoda harflar, raqamlar va do'stona hayvonlar bilan tanishing.",
    image: islandQuvonch,
    hashimjonQuote: "Bu yerda ilk bilimlar boshlanadi!",
    accent: "var(--magic-pink)",
    accentSoft: "oklch(0.85 0.12 350)",
    glow: "var(--shadow-glow-pink)",
    badge: "Boshlang'ich",
    subjects: [
      { icon: "📖", name: "O'qish" },
      { icon: "🔤", name: "Ona tili" },
      { icon: "➕", name: "Matematika" },
      { icon: "🌳", name: "Tabiat" },
      { icon: "🎨", name: "San'at" },
      { icon: "🎵", name: "Musiqa" },
    ],
  },
  {
    slug: "kashfiyot",
    name: "Kashfiyot Oroli",
    grades: "5–8 sinflar",
    tagline: "Ilm-fan sarguzashti",
    description:
      "Laboratoriya, robot va globus bilan dunyoning sirlarini birga kashf qiling.",
    image: islandKashfiyot,
    hashimjonQuote: "Keling, birga kashf qilamiz!",
    accent: "var(--magic-cyan)",
    accentSoft: "oklch(0.7 0.18 180)",
    glow: "var(--shadow-glow-cyan)",
    badge: "O'rta",
    subjects: [
      { icon: "🤖", name: "Texnologiya" },
      { icon: "🧪", name: "Kimyo" },
      { icon: "🌍", name: "Geografiya" },
      { icon: "📜", name: "Tarix" },
      { icon: "🧬", name: "Biologiya" },
      { icon: "📐", name: "Geometriya" },
    ],
  },
  {
    slug: "kelajak",
    name: "Kelajak Oroli",
    grades: "9–11 sinflar",
    tagline: "Kelajak texnologiyalari",
    description:
      "Sun'iy intellekt, kodlash va kosmik tadqiqotlar — kelajakni shu yerda yarating.",
    image: islandKelajak,
    hashimjonQuote: "Kelajak aynan shu yerda yaratiladi!",
    accent: "var(--magic-purple)",
    accentSoft: "oklch(0.55 0.25 290)",
    glow: "var(--shadow-glow-purple)",
    badge: "Yuqori",
    subjects: [
      { icon: "💻", name: "Dasturlash" },
      { icon: "🧠", name: "Sun'iy intellekt" },
      { icon: "⚛️", name: "Fizika" },
      { icon: "🧬", name: "Biologiya" },
      { icon: "📊", name: "Matematika" },
      { icon: "🎓", name: "Universitet" },
    ],
  },
];

export function getIsland(slug: string): Island | undefined {
  return islands.find((i) => i.slug === slug);
}
