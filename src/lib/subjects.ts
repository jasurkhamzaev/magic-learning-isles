export type Subject = {
  slug: string;
  name: string;
  emoji: string;
  tagline: string;
  progress: number;
  lessons: number;
  xp: number;
  difficulty: "Oson" | "O'rta" | "Qiyin";
  gradient: string;
  glow: string;
  category: "fan" | "til" | "san'at" | "texnologiya" | "ijtimoiy";
};

export const subjects: Subject[] = [
  { slug: "matematika", name: "Matematika", emoji: "➕", tagline: "Raqamlar sehri", progress: 68, lessons: 42, xp: 1200, difficulty: "O'rta", gradient: "linear-gradient(135deg, oklch(0.72 0.22 260), oklch(0.65 0.25 300))", glow: "oklch(0.72 0.22 260 / 0.45)", category: "fan" },
  { slug: "kimyo", name: "Kimyo", emoji: "🧪", tagline: "Elementlar olami", progress: 34, lessons: 28, xp: 850, difficulty: "Qiyin", gradient: "linear-gradient(135deg, oklch(0.75 0.22 150), oklch(0.7 0.2 200))", glow: "oklch(0.75 0.22 150 / 0.45)", category: "fan" },
  { slug: "fizika", name: "Fizika", emoji: "⚛️", tagline: "Koinot qonunlari", progress: 52, lessons: 36, xp: 1050, difficulty: "Qiyin", gradient: "linear-gradient(135deg, oklch(0.7 0.22 220), oklch(0.62 0.25 280))", glow: "oklch(0.7 0.22 220 / 0.45)", category: "fan" },
  { slug: "biologiya", name: "Biologiya", emoji: "🌱", tagline: "Tirik dunyo", progress: 45, lessons: 32, xp: 920, difficulty: "O'rta", gradient: "linear-gradient(135deg, oklch(0.78 0.2 140), oklch(0.72 0.22 170))", glow: "oklch(0.78 0.2 140 / 0.45)", category: "fan" },
  { slug: "geografiya", name: "Geografiya", emoji: "🌍", tagline: "Yer sayohati", progress: 71, lessons: 24, xp: 780, difficulty: "Oson", gradient: "linear-gradient(135deg, oklch(0.75 0.2 190), oklch(0.7 0.22 230))", glow: "oklch(0.75 0.2 190 / 0.45)", category: "ijtimoiy" },
  { slug: "tarix", name: "Tarix", emoji: "📖", tagline: "O'tmish hikoyalari", progress: 60, lessons: 30, xp: 890, difficulty: "O'rta", gradient: "linear-gradient(135deg, oklch(0.78 0.2 60), oklch(0.7 0.22 30))", glow: "oklch(0.78 0.2 60 / 0.45)", category: "ijtimoiy" },
  { slug: "ona-tili", name: "Ona tili", emoji: "📚", tagline: "So'z va ma'no", progress: 82, lessons: 40, xp: 1400, difficulty: "Oson", gradient: "linear-gradient(135deg, oklch(0.75 0.22 350), oklch(0.7 0.24 20))", glow: "oklch(0.75 0.22 350 / 0.45)", category: "til" },
  { slug: "ingliz-tili", name: "Ingliz tili", emoji: "🇬🇧", tagline: "Global aloqa", progress: 55, lessons: 48, xp: 1320, difficulty: "O'rta", gradient: "linear-gradient(135deg, oklch(0.7 0.22 25), oklch(0.68 0.24 340))", glow: "oklch(0.7 0.22 25 / 0.45)", category: "til" },
  { slug: "informatika", name: "Informatika", emoji: "💻", tagline: "Kod va texnologiya", progress: 40, lessons: 44, xp: 1100, difficulty: "Qiyin", gradient: "linear-gradient(135deg, oklch(0.7 0.22 280), oklch(0.65 0.25 240))", glow: "oklch(0.7 0.22 280 / 0.45)", category: "texnologiya" },
  { slug: "tarbiya", name: "Tarbiya", emoji: "🕌", tagline: "Axloq va odob", progress: 78, lessons: 20, xp: 640, difficulty: "Oson", gradient: "linear-gradient(135deg, oklch(0.78 0.18 85), oklch(0.72 0.2 55))", glow: "oklch(0.78 0.18 85 / 0.45)", category: "ijtimoiy" },
  { slug: "sanat", name: "San'at", emoji: "🎨", tagline: "Ijodkorlik olami", progress: 63, lessons: 26, xp: 820, difficulty: "Oson", gradient: "linear-gradient(135deg, oklch(0.75 0.22 340), oklch(0.7 0.24 300))", glow: "oklch(0.75 0.22 340 / 0.45)", category: "san't" as never },
  { slug: "musiqa", name: "Musiqa", emoji: "🎵", tagline: "Ohang va ritm", progress: 50, lessons: 22, xp: 700, difficulty: "Oson", gradient: "linear-gradient(135deg, oklch(0.72 0.22 310), oklch(0.68 0.24 260))", glow: "oklch(0.72 0.22 310 / 0.45)", category: "san't" as never },
];
