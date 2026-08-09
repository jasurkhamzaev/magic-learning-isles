import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Search } from "lucide-react";
import { PageShell, GlassCard } from "@/components/PageShell";
import { fetchSubjects, fetchMyProgress, type Subject } from "@/lib/content";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/subjects")({
  head: () => ({
    meta: [
      { title: "Fanlar — Hashimjon Akademiyasi" },
      { name: "description", content: "12 ta fan, real darslar va testlar. O'qing, XP yig'ing va darajangizni oshiring." },
      { property: "og:title", content: "Fanlar — Hashimjon Akademiyasi" },
      { property: "og:description", content: "12 ta fan, o'nlab darslar, cheksiz sarguzasht." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SubjectsPage,
});

function SubjectsPage() {
  const { user } = useAuth();
  const [q, setQ] = useState("");

  const { data: subjects = [], isLoading } = useQuery({ queryKey: ["subjects"], queryFn: fetchSubjects });
  const { data: progress = [] } = useQuery({
    queryKey: ["progress", user?.id],
    queryFn: () => fetchMyProgress(user!.id),
    enabled: !!user,
  });

  const doneCount = progress.length;

  const filtered = useMemo(
    () => subjects.filter((s) => s.name.toLowerCase().includes(q.toLowerCase())),
    [subjects, q],
  );

  return (
    <PageShell
      eyebrow={<span>📚 Bilim fanlari</span>}
      title={
        <>
          O'zingizga yoqqan <span className="text-gradient-magic">fanni</span> tanlang
        </>
      }
      subtitle="Har bir fanda darslar va kichik testlar bor. Testni yechsangiz XP va yulduzlar olasiz."
    >
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mx-auto mb-8 flex max-w-xl items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-xl">
          <Search className="h-4 w-4 text-magic-cyan" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Fan qidirish..."
            className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
          />
          {user && (
            <span className="whitespace-nowrap text-xs font-bold text-magic-gold">{doneCount} dars tugatildi</span>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-white/60" />
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s, i) => (
              <SubjectCard key={s.id} s={s} i={i} />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}

function SubjectCard({ s, i }: { s: Subject; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.04, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <div
        className={`absolute -inset-1 rounded-3xl bg-gradient-to-br ${s.gradient} opacity-25 blur-xl transition-opacity group-hover:opacity-60`}
      />
      <Link to="/subjects/$slug" params={{ slug: s.slug }} className="relative block">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${s.gradient} text-3xl shadow-lg`}
          >
            {s.icon}
          </div>
          <h3 className="mt-4 text-xl font-extrabold text-white">{s.name}</h3>
          <div className="mt-2 flex items-center gap-2 text-xs">
            <span
              className={`rounded-full px-2 py-0.5 font-bold ${
                s.difficulty === "Oson"
                  ? "bg-emerald-500/20 text-emerald-300"
                  : s.difficulty === "O'rta"
                    ? "bg-amber-500/20 text-amber-300"
                    : "bg-rose-500/20 text-rose-300"
              }`}
            >
              {s.difficulty}
            </span>
            <span className="capitalize text-white/60">{s.island} oroli</span>
          </div>
          <div className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-sm font-bold text-white transition-colors group-hover:bg-white/20">
            Darslarni ko'rish →
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
