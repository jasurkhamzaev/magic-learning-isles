import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, Clock, Loader2, Sparkles } from "lucide-react";
import { PageShell, GlassCard } from "@/components/PageShell";
import { fetchSubjectWithLessons, fetchMyProgress } from "@/lib/content";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/subjects/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} darslari — Hashimjon Akademiyasi` },
      { name: "description", content: "Fan bo'yicha darslar ro'yxati, testlar va XP mukofotlari." },
      { property: "og:title", content: "Fan darslari — Hashimjon Akademiyasi" },
      { property: "og:description", content: "Darsni o'qing, testni yechib XP yig'ing." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SubjectDetailPage,
});

function SubjectDetailPage() {
  const { slug } = Route.useParams();
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["subject", slug],
    queryFn: () => fetchSubjectWithLessons(slug),
  });
  const { data: progress = [] } = useQuery({
    queryKey: ["progress", user?.id],
    queryFn: () => fetchMyProgress(user!.id),
    enabled: !!user,
  });
  const done = new Set(progress.map((p) => p.lesson_id));

  if (isLoading) {
    return (
      <PageShell title="Yuklanmoqda...">
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-white/60" />
        </div>
      </PageShell>
    );
  }

  if (!data) {
    return (
      <PageShell title="Fan topilmadi" subtitle="Bunday fan mavjud emas.">
        <div className="mx-auto max-w-md px-6 pb-20 text-center">
          <Link to="/subjects" className="rounded-2xl bg-gradient-sunset px-5 py-2.5 text-sm font-bold text-white">
            Fanlarga qaytish
          </Link>
        </div>
      </PageShell>
    );
  }

  const { subject, lessons } = data;
  const completed = lessons.filter((l) => done.has(l.id)).length;
  const pct = lessons.length ? Math.round((completed / lessons.length) * 100) : 0;

  return (
    <PageShell
      eyebrow={
        <span>
          {subject.icon} {subject.difficulty} · {subject.island} oroli
        </span>
      }
      title={
        <>
          <span className="text-gradient-magic">{subject.name}</span> darslari
        </>
      }
      subtitle={`${lessons.length} dars · har bir darsdan keyin kichik test va XP mukofoti`}
    >
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <GlassCard className="mb-8">
          <div className="flex items-center justify-between text-sm text-white/70">
            <span>Sizning progressingiz</span>
            <span className="font-bold text-magic-gold">
              {completed}/{lessons.length} ({pct}%)
            </span>
          </div>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8 }}
              className="h-full bg-gradient-magic"
            />
          </div>
          {!user && (
            <p className="mt-3 text-xs text-white/50">
              Progressni saqlash uchun{" "}
              <Link to="/auth" className="font-bold text-magic-cyan">
                hisobingizga kiring
              </Link>
              .
            </p>
          )}
        </GlassCard>

        <div className="space-y-4">
          {lessons.map((l, i) => (
            <motion.div
              key={l.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link to="/lessons/$slug" params={{ slug: l.slug }}>
                <GlassCard className="flex items-center gap-4 transition-transform hover:-translate-y-1">
                  <div
                    className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${subject.gradient} text-lg font-extrabold text-white`}
                  >
                    {done.has(l.id) ? <CheckCircle2 className="h-6 w-6" /> : i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-lg font-extrabold text-white">{l.title}</div>
                    <div className="truncate text-sm text-white/60">{l.summary}</div>
                  </div>
                  <div className="hidden flex-shrink-0 items-center gap-3 text-xs sm:flex">
                    <span className="flex items-center gap-1 text-white/60">
                      <Clock className="h-3.5 w-3.5" /> {l.duration_min} daq
                    </span>
                    <span className="flex items-center gap-1 font-bold text-magic-gold">
                      <Sparkles className="h-3.5 w-3.5" /> +{l.xp_reward} XP
                    </span>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
