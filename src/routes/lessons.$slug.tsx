import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Clock, Loader2, Sparkles, XCircle } from "lucide-react";
import { toast } from "sonner";
import { PageShell, GlassCard } from "@/components/PageShell";
import { RoleGuard } from "@/components/RoleGuard";
import { fetchLesson, fetchMyProgress, completeLesson } from "@/lib/content";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/lessons/$slug")({
  head: () => ({
    meta: [
      { title: "Dars — Hashimjon Akademiyasi" },
      { name: "description", content: "Darsni o'qing, testni yechib XP va yulduzlar yig'ing." },
      { property: "og:title", content: "Dars — Hashimjon Akademiyasi" },
      { property: "og:description", content: "Interaktiv dars va kichik test bilan bilim oling." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <RoleGuard>
      <LessonPage />
    </RoleGuard>
  ),
});

function LessonPage() {
  const { slug } = Route.useParams();
  const { user, refresh } = useAuth();
  const queryClient = useQueryClient();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [checked, setChecked] = useState(false);

  const { data, isLoading } = useQuery({ queryKey: ["lesson", slug], queryFn: () => fetchLesson(slug) });
  const { data: progress = [] } = useQuery({
    queryKey: ["progress", user?.id],
    queryFn: () => fetchMyProgress(user!.id),
    enabled: !!user,
  });

  const finish = useMutation({
    mutationFn: (vars: { score: number }) =>
      completeLesson({
        userId: user!.id,
        lessonId: data!.lesson.id,
        score: vars.score,
        xpReward: data!.lesson.xp_reward,
      }),
    onSuccess: async (res) => {
      toast.success(res.firstTime ? `Ajoyib! +${res.xpEarned} XP olindi 🎉` : "Natija saqlandi ✅");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["progress", user?.id] }),
        refresh(),
      ]);
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Saqlab bo'lmadi"),
  });

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
      <PageShell title="Dars topilmadi" subtitle="Bunday dars mavjud emas.">
        <div className="mx-auto max-w-md px-6 pb-20 text-center">
          <Link to="/subjects" className="rounded-2xl bg-gradient-sunset px-5 py-2.5 text-sm font-bold text-white">
            Fanlarga qaytish
          </Link>
        </div>
      </PageShell>
    );
  }

  const { lesson, subject, questions } = data;
  const alreadyDone = progress.some((p) => p.lesson_id === lesson.id);
  const correctCount = questions.filter((q) => answers[q.id] === q.correct_index).length;
  const score = questions.length ? Math.round((correctCount / questions.length) * 100) : 100;
  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  function onCheck() {
    setChecked(true);
    if (score < 50) {
      toast.error("Yana bir marta urinib ko'ring 💪");
      return;
    }
    finish.mutate({ score });
  }

  return (
    <PageShell
      eyebrow={
        <span>
          {subject?.icon} {subject?.name}
        </span>
      }
      title={<span className="text-gradient-magic">{lesson.title}</span>}
      subtitle={lesson.summary}
    >
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div className="mb-6 flex flex-wrap items-center gap-3 text-xs">
          <span className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70">
            <Clock className="h-3.5 w-3.5" /> {lesson.duration_min} daqiqa
          </span>
          <span className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-bold text-magic-gold">
            <Sparkles className="h-3.5 w-3.5" /> +{lesson.xp_reward} XP
          </span>
          {alreadyDone && (
            <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 font-bold text-emerald-300">
              <CheckCircle2 className="h-3.5 w-3.5" /> Tugatilgan
            </span>
          )}
          {subject && (
            <Link
              to="/subjects/$slug"
              params={{ slug: subject.slug }}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70"
            >
              ← {subject.name} darslari
            </Link>
          )}
        </div>

        <GlassCard>
          <div className="whitespace-pre-line text-[15px] leading-relaxed text-white/80">{lesson.content}</div>
        </GlassCard>

        {questions.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-extrabold text-white">Kichik test</h2>
            <p className="mt-1 text-sm text-white/60">To'g'ri javoblarning 50%+ qismini toping va XP oling.</p>

            <div className="mt-5 space-y-5">
              {questions.map((q, qi) => (
                <GlassCard key={q.id}>
                  <div className="text-base font-bold text-white">
                    {qi + 1}. {q.question}
                  </div>
                  <div className="mt-3 grid gap-2">
                    {q.options.map((opt, oi) => {
                      const selected = answers[q.id] === oi;
                      const isCorrect = q.correct_index === oi;
                      const state = checked
                        ? isCorrect
                          ? "border-emerald-400/60 bg-emerald-500/15"
                          : selected
                            ? "border-rose-400/60 bg-rose-500/15"
                            : "border-white/10 bg-white/[0.03]"
                        : selected
                          ? "border-magic-pink/60 bg-white/10"
                          : "border-white/10 bg-white/[0.03] hover:bg-white/[0.07]";
                      return (
                        <button
                          key={oi}
                          type="button"
                          disabled={checked}
                          onClick={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                          className={`flex items-center justify-between gap-3 rounded-2xl border p-3 text-left text-sm text-white transition-colors ${state}`}
                        >
                          <span>{opt}</span>
                          {checked && isCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                          {checked && selected && !isCorrect && <XCircle className="h-4 w-4 text-rose-400" />}
                        </button>
                      );
                    })}
                  </div>
                </GlassCard>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {!checked ? (
                <button
                  onClick={onCheck}
                  disabled={!allAnswered || finish.isPending}
                  className="flex items-center gap-2 rounded-2xl bg-gradient-sunset px-6 py-3 text-sm font-extrabold text-white disabled:opacity-50"
                >
                  {finish.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Tekshirish va tugatish
                </button>
              ) : (
                <>
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white"
                  >
                    Natija: <span className="text-magic-gold">{score}%</span> ({correctCount}/{questions.length})
                  </motion.div>
                  <button
                    onClick={() => {
                      setChecked(false);
                      setAnswers({});
                    }}
                    className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white/80"
                  >
                    Qayta yechish
                  </button>
                  {subject && (
                    <Link
                      to="/subjects/$slug"
                      params={{ slug: subject.slug }}
                      className="rounded-2xl bg-gradient-magic px-5 py-3 text-sm font-extrabold text-white"
                    >
                      Keyingi darsga →
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </section>
    </PageShell>
  );
}
