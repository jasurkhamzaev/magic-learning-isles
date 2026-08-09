import { supabase } from "@/integrations/supabase/client";

export type Subject = {
  id: string;
  slug: string;
  name: string;
  icon: string;
  gradient: string;
  island: string;
  difficulty: string;
  order_index: number;
};

export type Lesson = {
  id: string;
  subject_id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  xp_reward: number;
  duration_min: number;
  order_index: number;
};

export type LessonQuestion = {
  id: string;
  lesson_id: string;
  question: string;
  options: string[];
  correct_index: number;
  order_index: number;
};

export async function fetchSubjects(): Promise<Subject[]> {
  const { data, error } = await supabase
    .from("subjects")
    .select("id, slug, name, icon, gradient, island, difficulty, order_index")
    .order("order_index");
  if (error) throw new Error(error.message);
  return (data ?? []) as Subject[];
}

export async function fetchSubjectWithLessons(slug: string) {
  const { data: subject, error } = await supabase
    .from("subjects")
    .select("id, slug, name, icon, gradient, island, difficulty, order_index")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!subject) return null;

  const { data: lessons, error: le } = await supabase
    .from("lessons")
    .select("id, subject_id, slug, title, summary, content, xp_reward, duration_min, order_index")
    .eq("subject_id", subject.id)
    .order("order_index");
  if (le) throw new Error(le.message);

  return { subject: subject as Subject, lessons: (lessons ?? []) as Lesson[] };
}

export async function fetchLesson(slug: string) {
  const { data: lesson, error } = await supabase
    .from("lessons")
    .select("id, subject_id, slug, title, summary, content, xp_reward, duration_min, order_index")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!lesson) return null;

  const [{ data: subject }, { data: questions }] = await Promise.all([
    supabase
      .from("subjects")
      .select("id, slug, name, icon, gradient, island, difficulty, order_index")
      .eq("id", lesson.subject_id)
      .maybeSingle(),
    supabase
      .from("lesson_questions")
      .select("id, lesson_id, question, options, correct_index, order_index")
      .eq("lesson_id", lesson.id)
      .order("order_index"),
  ]);

  return {
    lesson: lesson as Lesson,
    subject: (subject ?? null) as Subject | null,
    questions: ((questions ?? []) as unknown as LessonQuestion[]).map((q) => ({
      ...q,
      options: Array.isArray(q.options) ? q.options : [],
    })),
  };
}

export async function fetchMyProgress(userId: string) {
  const { data, error } = await supabase
    .from("lesson_progress")
    .select("lesson_id, score, completed_at")
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
  return (data ?? []) as { lesson_id: string; score: number; completed_at: string }[];
}

/** Darsni tugatish: natijani saqlaydi va yangi bo'lsa XP/statistikani oshiradi. */
export async function completeLesson(params: {
  userId: string;
  lessonId: string;
  score: number;
  xpReward: number;
}) {
  const { data: existing } = await supabase
    .from("lesson_progress")
    .select("id, score")
    .eq("user_id", params.userId)
    .eq("lesson_id", params.lessonId)
    .maybeSingle();

  const { error } = await supabase.from("lesson_progress").upsert(
    {
      user_id: params.userId,
      lesson_id: params.lessonId,
      score: Math.max(params.score, existing?.score ?? 0),
    },
    { onConflict: "user_id,lesson_id" },
  );
  if (error) throw new Error(error.message);

  const firstTime = !existing;
  if (firstTime) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("xp, stars, lessons_done")
      .eq("id", params.userId)
      .maybeSingle();

    const xp = (profile?.xp ?? 0) + params.xpReward;
    await supabase
      .from("profiles")
      .update({
        xp,
        stars: (profile?.stars ?? 0) + Math.max(1, Math.round(params.score / 25)),
        lessons_done: (profile?.lessons_done ?? 0) + 1,
        level: Math.max(1, Math.floor(xp / 1000) + 1),
      })
      .eq("id", params.userId);
  }

  return { firstTime, xpEarned: firstTime ? params.xpReward : 0 };
}

export async function fetchDemoStudents() {
  const { data, error } = await supabase
    .from("demo_students")
    .select("id, full_name, avatar_emoji, island, grade, xp, stars, level, streak")
    .order("xp", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as {
    id: string;
    full_name: string;
    avatar_emoji: string;
    island: string;
    grade: number | null;
    xp: number;
    stars: number;
    level: number;
    streak: number;
  }[];
}
