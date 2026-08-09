import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { PageShell, GlassCard } from "@/components/PageShell";
import { RoleGuard } from "@/components/RoleGuard";

export const Route = createFileRoute("/rewards")({
  head: () => ({
    meta: [
      { title: "Mukofotlar — Hashimjon Akademiyasi" },
      { name: "description", content: "Har bir dars sizni yangi sovg'alar sari olib boradi." },
      { property: "og:title", content: "Mukofotlar — Hashimjon Akademiyasi" },
      { property: "og:description", content: "Kunlik, haftalik va oylik mukofotlar." },
    ],
  }),
  component: () => (
    <RoleGuard>
      <RewardsPage />
    </RoleGuard>
  ),
});

type Reward = { icon: string; name: string; desc: string; gradient: string; progress: number };

const sections: { title: string; items: Reward[] }[] = [
  {
    title: "Kunlik mukofotlar",
    items: [
      { icon: "🏅", name: "Kunlik Badge", desc: "Har kuni yangi belgi", gradient: "from-yellow-400 to-orange-500", progress: 80 },
      { icon: "⭐", name: "5 yulduz", desc: "Kundalik topshiriq", gradient: "from-amber-400 to-yellow-500", progress: 60 },
      { icon: "🔥", name: "Streak +1", desc: "Kuningizni saqlang", gradient: "from-red-500 to-orange-500", progress: 100 },
    ],
  },
  {
    title: "Haftalik mukofotlar",
    items: [
      { icon: "💎", name: "10 Gems", desc: "Haftalik missiya", gradient: "from-cyan-400 to-blue-500", progress: 45 },
      { icon: "🪙", name: "500 Coins", desc: "Do'kondan foydalaning", gradient: "from-yellow-500 to-amber-600", progress: 30 },
      { icon: "🎁", name: "Mystery Box", desc: "Sirli sovg'a", gradient: "from-fuchsia-500 to-purple-600", progress: 70 },
    ],
  },
  {
    title: "Oylik mukofotlar",
    items: [
      { icon: "🎓", name: "Sertifikat", desc: "Rasmiy tasdiqnoma", gradient: "from-indigo-500 to-purple-600", progress: 20 },
      { icon: "🏆", name: "Oy chempioni", desc: "TOP-3 o'rinlar uchun", gradient: "from-orange-500 to-pink-500", progress: 55 },
      { icon: "🌟", name: "100 yulduz", desc: "Oylik yutuq", gradient: "from-yellow-300 to-amber-400", progress: 40 },
    ],
  },
];

function RewardCard({ r, i }: { r: Reward; i: number }) {
  const [opened, setOpened] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative"
    >
      <div className={`absolute -inset-1 rounded-3xl bg-gradient-to-br ${r.gradient} opacity-30 blur-xl transition-opacity group-hover:opacity-70`} />
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl text-center">
        <motion.div
          animate={opened ? { rotate: [0, -20, 20, 0], scale: [1, 1.3, 1] } : { y: [0, -6, 0] }}
          transition={opened ? { duration: 0.8 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br ${r.gradient} text-5xl shadow-[0_0_50px_rgba(255,200,100,0.4)]`}
        >
          {r.icon}
        </motion.div>
        <h3 className="mt-4 text-lg font-extrabold text-white">{r.name}</h3>
        <p className="text-sm text-white/70">{r.desc}</p>

        <div className="mt-4">
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${r.progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className={`h-full bg-gradient-to-r ${r.gradient}`}
            />
          </div>
          <div className="mt-1 text-xs text-white/60">{r.progress}% keyingi mukofotgacha</div>
        </div>

        <button
          onClick={() => setOpened(!opened)}
          className={`mt-4 w-full rounded-2xl bg-gradient-to-r ${r.gradient} px-4 py-2 text-sm font-bold text-white transition-transform hover:scale-[1.03]`}
        >
          {opened ? "🎉 Ochildi!" : "Ochish"}
        </button>
      </div>
    </motion.div>
  );
}

function RewardsPage() {
  return (
    <PageShell
      eyebrow={<span>🎁 Mukofotlar</span>}
      title={<span className="text-gradient-sunset">Mukofotlar Do'koni</span>}
      subtitle="Har bir dars sizni yangi sovg'alar sari olib boradi."
    >
      {sections.map((s) => (
        <section key={s.title} className="mx-auto max-w-7xl px-6 py-10">
          <h2 className="mb-6 text-2xl font-extrabold text-white sm:text-3xl">{s.title}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {s.items.map((r, i) => <RewardCard key={r.name} r={r} i={i} />)}
          </div>
        </section>
      ))}

      {/* XP Shop */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="mb-6 text-2xl font-extrabold text-white sm:text-3xl">XP Do'koni</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: "🎨", name: "Yangi avatar", price: 500 },
            { icon: "🏰", name: "Orol skini", price: 1200 },
            { icon: "🎇", name: "Effektlar", price: 800 },
            { icon: "🦄", name: "Premium unvon", price: 2000 },
          ].map((item, i) => (
            <motion.div key={item.name} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.08}}>
              <GlassCard className="text-center">
                <div className="text-5xl">{item.icon}</div>
                <div className="mt-3 font-bold text-white">{item.name}</div>
                <div className="mt-1 text-magic-gold">🪙 {item.price}</div>
                <button className="mt-4 w-full rounded-2xl bg-gradient-magic px-4 py-2 text-sm font-bold text-white">Sotib olish</button>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
