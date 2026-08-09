-- SUBJECTS
CREATE TABLE public.subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  icon text NOT NULL DEFAULT '📚',
  gradient text NOT NULL DEFAULT 'from-magic-pink to-rose-500',
  island text NOT NULL DEFAULT 'quvonch',
  difficulty text NOT NULL DEFAULT 'Oson',
  order_index int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.subjects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.subjects TO authenticated;
GRANT ALL ON public.subjects TO service_role;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
CREATE POLICY subjects_select_all ON public.subjects FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY subjects_write_staff ON public.subjects FOR ALL TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER subjects_touch BEFORE UPDATE ON public.subjects
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- LESSONS
CREATE TABLE public.lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  summary text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  xp_reward int NOT NULL DEFAULT 50,
  duration_min int NOT NULL DEFAULT 10,
  order_index int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.lessons TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lessons TO authenticated;
GRANT ALL ON public.lessons TO service_role;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY lessons_select_all ON public.lessons FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY lessons_write_staff ON public.lessons FOR ALL TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER lessons_touch BEFORE UPDATE ON public.lessons
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE INDEX lessons_subject_idx ON public.lessons(subject_id, order_index);

-- LESSON QUESTIONS
CREATE TABLE public.lesson_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  question text NOT NULL,
  options jsonb NOT NULL,
  correct_index int NOT NULL DEFAULT 0,
  order_index int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.lesson_questions TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.lesson_questions TO authenticated;
GRANT ALL ON public.lesson_questions TO service_role;
ALTER TABLE public.lesson_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY lesson_questions_select_auth ON public.lesson_questions FOR SELECT TO authenticated USING (true);
CREATE POLICY lesson_questions_write_staff ON public.lesson_questions FOR ALL TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE INDEX lesson_questions_lesson_idx ON public.lesson_questions(lesson_id, order_index);

-- LESSON PROGRESS
CREATE TABLE public.lesson_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id uuid NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  score int NOT NULL DEFAULT 0,
  completed_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, lesson_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lesson_progress TO authenticated;
GRANT ALL ON public.lesson_progress TO service_role;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY lesson_progress_own ON public.lesson_progress FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY lesson_progress_select_staff ON public.lesson_progress FOR SELECT TO authenticated
  USING (public.is_staff(auth.uid()) OR public.has_role(auth.uid(), 'teacher'));
CREATE TRIGGER lesson_progress_touch BEFORE UPDATE ON public.lesson_progress
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- DEMO STUDENTS (namunaviy reyting ma'lumotlari)
CREATE TABLE public.demo_students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  avatar_emoji text NOT NULL DEFAULT '🧑‍🚀',
  island text NOT NULL DEFAULT 'quvonch',
  grade int,
  xp int NOT NULL DEFAULT 0,
  stars int NOT NULL DEFAULT 0,
  level int NOT NULL DEFAULT 1,
  streak int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.demo_students TO anon, authenticated;
GRANT ALL ON public.demo_students TO service_role;
ALTER TABLE public.demo_students ENABLE ROW LEVEL SECURITY;
CREATE POLICY demo_students_select_all ON public.demo_students FOR SELECT TO anon, authenticated USING (true);

-- ===== SEED: SUBJECTS =====
INSERT INTO public.subjects (slug, name, icon, gradient, island, difficulty, order_index) VALUES
  ('matematika', 'Matematika', '➕', 'from-pink-500 to-rose-500', 'kashfiyot', 'O''rta', 1),
  ('kimyo', 'Kimyo', '🧪', 'from-emerald-400 to-teal-500', 'kashfiyot', 'Qiyin', 2),
  ('fizika', 'Fizika', '⚛️', 'from-indigo-500 to-blue-500', 'kelajak', 'Qiyin', 3),
  ('biologiya', 'Biologiya', '🌱', 'from-lime-400 to-green-500', 'kashfiyot', 'O''rta', 4),
  ('geografiya', 'Geografiya', '🌍', 'from-sky-400 to-cyan-500', 'kashfiyot', 'Oson', 5),
  ('tarix', 'Tarix', '📖', 'from-amber-500 to-orange-500', 'kelajak', 'O''rta', 6),
  ('ona-tili', 'Ona tili', '📚', 'from-fuchsia-500 to-pink-500', 'quvonch', 'Oson', 7),
  ('ingliz-tili', 'Ingliz tili', '🇬🇧', 'from-red-500 to-rose-600', 'kashfiyot', 'O''rta', 8),
  ('informatika', 'Informatika', '💻', 'from-violet-500 to-purple-600', 'kelajak', 'Qiyin', 9),
  ('tarbiya', 'Tarbiya', '🕌', 'from-teal-400 to-emerald-500', 'quvonch', 'Oson', 10),
  ('sanat', 'San''at', '🎨', 'from-orange-400 to-pink-500', 'quvonch', 'Oson', 11),
  ('musiqa', 'Musiqa', '🎵', 'from-yellow-400 to-amber-500', 'quvonch', 'Oson', 12);

-- ===== SEED: LESSONS (har bir fanga 3 dars) =====
INSERT INTO public.lessons (subject_id, slug, title, summary, content, xp_reward, duration_min, order_index)
SELECT
  s.id,
  s.slug || '-dars-' || g.i,
  CASE g.i
    WHEN 1 THEN s.name || ': Kirish va asosiy tushunchalar'
    WHEN 2 THEN s.name || ': Amaliy mashqlar'
    ELSE s.name || ': Sarguzasht darsi'
  END,
  CASE g.i
    WHEN 1 THEN s.name || ' fanining eng muhim asoslari bilan tanishamiz.'
    WHEN 2 THEN 'Bilimlarni amalda sinab ko''ramiz va mashqlar bajaramiz.'
    ELSE 'Qiziqarli topshiriqlar bilan bilimni mustahkamlaymiz.'
  END,
  'Salom, men Hashimjon! Bugun ' || s.name || ' fanidan ' || g.i || '-darsni birga o''tamiz.' || E'\n\n' ||
  '1. Avval asosiy tushunchalarni ko''rib chiqamiz.' || E'\n' ||
  '2. Keyin misollar bilan mustahkamlaymiz.' || E'\n' ||
  '3. Oxirida kichik test yechib, XP olamiz!' || E'\n\n' ||
  'Esda tut: har kuni 15 daqiqa o''qish katta natija beradi. Omad! ✨',
  40 + g.i * 10,
  8 + g.i * 4,
  g.i
FROM public.subjects s CROSS JOIN generate_series(1, 3) AS g(i);

-- ===== SEED: TEST SAVOLLARI (har bir darsga 2 savol) =====
INSERT INTO public.lesson_questions (lesson_id, question, options, correct_index, order_index)
SELECT
  l.id,
  CASE q.i
    WHEN 1 THEN 'Bu darsning asosiy maqsadi nima?'
    ELSE 'Darsni yaxshi o''zlashtirish uchun eng to''g''ri yo''l qaysi?'
  END,
  CASE q.i
    WHEN 1 THEN '["Asosiy tushunchalarni tushunish", "Faqat rasm ko''rish", "Hech narsa qilmaslik", "Darsni o''tkazib yuborish"]'::jsonb
    ELSE '["Mashqlarni bajarib, testni yechish", "Faqat sarlavhani o''qish", "Do''stdan javob so''rash", "Kutib turish"]'::jsonb
  END,
  0,
  q.i
FROM public.lessons l CROSS JOIN generate_series(1, 2) AS q(i);

-- ===== SEED: DEMO O'QUVCHILAR =====
INSERT INTO public.demo_students (full_name, avatar_emoji, island, grade, xp, stars, level, streak) VALUES
  ('Ali Karimov', '🦊', 'kelajak', 10, 12450, 320, 14, 21),
  ('Malika Yusupova', '🐰', 'kashfiyot', 7, 11820, 298, 13, 18),
  ('Bekzod Rahimov', '🦁', 'kelajak', 11, 10990, 275, 12, 15),
  ('Nilufar Tosheva', '🦄', 'kashfiyot', 6, 9640, 240, 11, 12),
  ('Javohir Aliyev', '🐼', 'quvonch', 4, 8710, 218, 10, 9),
  ('Zilola Ergasheva', '🐨', 'kashfiyot', 8, 7980, 201, 9, 11),
  ('Sardor Umarov', '🐯', 'kelajak', 9, 6850, 176, 8, 7),
  ('Oysha Nazarova', '🐧', 'quvonch', 3, 5420, 142, 7, 6),
  ('Islom Qodirov', '🐵', 'quvonch', 2, 4180, 118, 6, 5),
  ('Dilnoza Saidova', '🐝', 'quvonch', 1, 3260, 96, 5, 4);