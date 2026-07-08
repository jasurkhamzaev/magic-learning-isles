import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Bookmark, Heart, Search } from "lucide-react";
import { PageShell, GlassCard } from "@/components/PageShell";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Hashimjon Akademiyasi" },
      { name: "description", content: "Bilimlar, yangiliklar va foydali maqolalarni o'qing." },
      { property: "og:title", content: "Blog — Hashimjon Akademiyasi" },
      { property: "og:description", content: "Ta'lim, ilm-fan va texnologiyalar haqida maqolalar." },
    ],
  }),
  component: BlogPage,
});

const categories = ["Barchasi", "Ta'lim", "Ilm-fan", "Texnologiya", "AI", "Kosmos", "Tarix", "Matematika"];

const featured = {
  title: "Sun'iy intellekt bolalar ta'limini qanday o'zgartirmoqda",
  category: "AI",
  author: "Hashimjon Editorial",
  date: "8 Iyul, 2026",
  time: "8 daqiqa",
  emoji: "🤖",
};

const articles = [
  { title: "Kosmosga qanday sayohat qilinadi?", category: "Kosmos", time: "5 daq", emoji: "🚀", author: "Sardor T." },
  { title: "Matematika o'ynash oson: 10 usul", category: "Matematika", time: "6 daq", emoji: "➕", author: "Malika S." },
  { title: "DNK sirlari va kelajak tibbiyoti", category: "Ilm-fan", time: "9 daq", emoji: "🧬", author: "Aziza K." },
  { title: "Robotlar bilan tanishing", category: "Texnologiya", time: "4 daq", emoji: "🤖", author: "Bekzod M." },
  { title: "Buyuk kashfiyotlar tarixi", category: "Tarix", time: "7 daq", emoji: "📜", author: "Dilnoza R." },
  { title: "Bolaning motivatsiyasini oshirish", category: "Ta'lim", time: "5 daq", emoji: "🌟", author: "Kamila E." },
];

function BlogPage() {
  return (
    <PageShell
      eyebrow={<span>📝 Blog</span>}
      title={<span className="text-gradient-magic">Bilim va Ilhom</span>}
      subtitle="Bilimlar, yangiliklar va foydali maqolalarni o'qing."
    >
      {/* Search + Categories */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
            <input
              placeholder="Maqola qidirish..."
              className="w-full rounded-2xl border border-white/10 bg-white/[0.05] py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/50 backdrop-blur-md focus:border-white/30 focus:outline-none"
            />
          </div>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {categories.map((c, i) => (
            <button key={c} className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              i === 0 ? "bg-gradient-magic text-white" : "border border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
            }`}>{c}</button>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
          <GlassCard className="!p-0 overflow-hidden">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative flex aspect-video items-center justify-center bg-gradient-magic md:aspect-auto">
                <div className="text-9xl">{featured.emoji}</div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-8">
                <span className="rounded-full bg-magic-pink/20 px-3 py-1 text-xs font-bold text-magic-pink">{featured.category}</span>
                <h2 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl">{featured.title}</h2>
                <p className="mt-3 text-white/70">Sun'iy intellekt yordamida darslarni qanday shaxsiylashtirish, o'quvchining kuchli tomonlarini topish va bilim yo'lini avtomatik ravishda tuzish mumkinligi haqida.</p>
                <div className="mt-6 flex items-center gap-4 text-sm text-white/60">
                  <span>{featured.author}</span> · <span>{featured.date}</span> · <span>{featured.time}</span>
                </div>
                <button className="mt-6 rounded-full bg-gradient-sunset px-6 py-3 text-sm font-bold text-white shadow-lg">O'qishni boshlash →</button>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        <h2 className="mb-6 text-2xl font-extrabold text-white">So'nggi maqolalar</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a, i) => (
            <motion.article key={a.title} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.06}}
              whileHover={{y:-6}}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl"
            >
              <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-magic-purple/40 to-magic-cyan/40 text-7xl">
                {a.emoji}
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-bold text-magic-cyan">{a.category}</span>
                  <div className="flex items-center gap-2 text-white/60">
                    <button aria-label="Like"><Heart className="h-4 w-4 hover:text-pink-400" /></button>
                    <button aria-label="Bookmark"><Bookmark className="h-4 w-4 hover:text-magic-gold" /></button>
                  </div>
                </div>
                <h3 className="mt-3 text-lg font-extrabold leading-snug text-white group-hover:text-magic-cyan">{a.title}</h3>
                <div className="mt-3 flex items-center justify-between text-xs text-white/50">
                  <span>{a.author}</span><span>{a.time}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <GlassCard className="!p-10 text-center">
          <h2 className="text-3xl font-extrabold text-white">Yangi maqolalardan xabardor bo'ling</h2>
          <p className="mt-3 text-white/70">Har hafta eng zo'r maqolalarni pochtangizga yuboramiz.</p>
          <form className="mx-auto mt-6 flex max-w-md gap-2">
            <input type="email" placeholder="siz@example.com" className="flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-white/50" />
            <button type="submit" className="rounded-full bg-gradient-sunset px-6 py-3 text-sm font-bold text-white">Obuna</button>
          </form>
        </GlassCard>
      </section>
    </PageShell>
  );
}
