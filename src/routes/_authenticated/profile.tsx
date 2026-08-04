import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Bell, Edit3, Globe, LogOut, Moon, BookOpen, Clock, Award, Flame, Save, X } from "lucide-react";
import { PageShell, GlassCard } from "@/components/PageShell";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { ROLE_EMOJI, ROLE_LABEL } from "@/lib/roles";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "Mening Profilim — Hashimjon Akademiyasi" },
      { name: "description", content: "Statistika, yutuqlar, rol va sozlamalar." },
      { property: "og:title", content: "Mening Profilim — Hashimjon Akademiyasi" },
      { property: "og:description", content: "XP, yulduzlar, yutuqlar va profil sozlamalari." },
    ],
  }),
  component: ProfilePage,
});

const badges = ["🥇", "🌟", "🚀", "🧠", "📚", "🎯", "⚡", "🏆", "🎨", "🔬", "💎", "🌈"];

const AVATARS = ["🧑‍🚀", "👩‍🚀", "🦸", "🧙", "🐉", "🦊", "🐼", "🦄", "🤖", "🎓", "👨‍👩‍👧", "🛡️"];

function ProfilePage() {
  const { profile, role, refresh, loading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("🧑‍🚀");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.full_name);
      setEmoji(profile.avatar_emoji);
    }
  }, [profile]);

  async function save() {
    if (!profile) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: name, avatar_emoji: emoji })
      .eq("id", profile.id);
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    await refresh();
    setEditing(false);
    toast.success("Profil saqlandi ✨");
  }

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    void navigate({ to: "/auth", replace: true });
  }

  const stats = [
    { icon: BookOpen, label: "Yakunlangan darslar", value: profile?.lessons_done ?? 0 },
    { icon: Clock, label: "O'rganilgan soatlar", value: profile?.hours_learned ?? 0 },
    { icon: Award, label: "Sertifikatlar", value: profile?.certificates ?? 0 },
    { icon: Flame, label: "Streak", value: profile?.streak ?? 0 },
  ];

  const levelPct = Math.min(100, ((profile?.xp ?? 0) % 1000) / 10);

  return (
    <PageShell
      eyebrow={<span>{ROLE_EMOJI[role]} {ROLE_LABEL[role]} profili</span>}
      title={<span className="text-gradient-magic">{profile?.full_name || "Mening Profilim"}</span>}
      subtitle={loading ? "Yuklanmoqda..." : `${profile?.island ?? "quvonch"} oroli · Level ${profile?.level ?? 1}`}
    >
      <section className="mx-auto max-w-7xl px-6 py-8">
        <GlassCard className="!p-8">
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-magic blur-2xl opacity-60" />
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-white/20 bg-gradient-magic text-7xl">
                {editing ? emoji : (profile?.avatar_emoji ?? "🧑‍🚀")}
              </div>
            </motion.div>

            <div className="flex-1 text-center md:text-left">
              {editing ? (
                <div className="space-y-3">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-lg font-bold text-white focus:outline-none"
                    placeholder="Ismingiz"
                  />
                  <div className="flex flex-wrap gap-2">
                    {AVATARS.map((a) => (
                      <button
                        key={a}
                        onClick={() => setEmoji(a)}
                        className={`h-10 w-10 rounded-xl border text-xl ${
                          emoji === a ? "border-magic-pink bg-white/15" : "border-white/10 bg-white/5"
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={save}
                      disabled={saving}
                      className="inline-flex items-center gap-2 rounded-2xl bg-gradient-sunset px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
                    >
                      <Save className="h-4 w-4" /> Saqlash
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white/80"
                    >
                      <X className="h-4 w-4" /> Bekor
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
                    <h2 className="text-3xl font-extrabold text-white">{profile?.full_name || "—"}</h2>
                    <span className="rounded-full bg-gradient-sunset px-3 py-1 text-xs font-bold text-white">
                      Level {profile?.level ?? 1}
                    </span>
                    <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold text-white/85">
                      {ROLE_EMOJI[role]} {ROLE_LABEL[role]}
                    </span>
                  </div>
                  <p className="mt-1 text-white/70">{profile?.email}</p>
                </>
              )}

              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-2xl font-extrabold text-magic-gold">{(profile?.xp ?? 0).toLocaleString()}</div>
                  <div className="text-xs text-white/60">XP</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-magic-pink">{profile?.stars ?? 0}</div>
                  <div className="text-xs text-white/60">Yulduzlar</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-magic-cyan">{profile?.certificates ?? 0}</div>
                  <div className="text-xs text-white/60">Sertifikat</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-xs text-white/60">
                  <span>Level {profile?.level ?? 1} progress</span>
                  <span>{Math.round(levelPct)}%</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${levelPct}%` }}
                    transition={{ duration: 1.2 }}
                    className="h-full bg-gradient-magic"
                  />
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <GlassCard>
                <s.icon className="h-6 w-6 text-magic-cyan" />
                <div className="mt-3 text-3xl font-extrabold text-white">{s.value}</div>
                <div className="text-sm text-white/60">{s.label}</div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <GlassCard>
            <h3 className="mb-4 text-lg font-extrabold text-white">Haftalik faollik</h3>
            <div className="flex h-40 items-end gap-2">
              {[40, 65, 55, 80, 72, 90, 60].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.7, ease: "easeOut" }}
                  className="flex-1 rounded-t-lg bg-gradient-to-t from-magic-purple to-magic-cyan"
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-xs text-white/50">
              {["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="mb-4 text-lg font-extrabold text-white">Yutuqlar galereyasi</h3>
            <div className="grid grid-cols-6 gap-3">
              {badges.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 120 }}
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  className="flex aspect-square items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-3xl backdrop-blur-md"
                >
                  {b}
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <GlassCard>
            <h3 className="mb-4 text-lg font-extrabold text-white">So'nggi darslar</h3>
            <div className="space-y-3">
              {[
                { subject: "Matematika", title: "Kasrlar bilan amallar", time: "2 soat oldin" },
                { subject: "Fizika", title: "Nyuton qonunlari", time: "Kecha" },
                { subject: "Ingliz tili", title: "Present Perfect", time: "2 kun oldin" },
                { subject: "Biologiya", title: "Fotosintez", time: "3 kun oldin" },
              ].map((l) => (
                <div key={l.title} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div>
                    <div className="text-xs font-bold uppercase text-magic-cyan">{l.subject}</div>
                    <div className="font-semibold text-white">{l.title}</div>
                  </div>
                  <div className="text-xs text-white/50">{l.time}</div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="mb-4 text-lg font-extrabold text-white">Sozlamalar</h3>
            <div className="space-y-2">
              <SettingButton icon={Edit3} label="Profilni tahrirlash" onClick={() => setEditing(true)} />
              <SettingButton icon={Bell} label="Bildirishnomalar" onClick={() => toast("Demo: bildirishnomalar yoqilgan 🔔")} />
              <SettingButton icon={Moon} label="Dark mode" onClick={() => document.documentElement.classList.toggle("dark")} />
              <SettingButton icon={Globe} label="Til: O'zbek" onClick={() => toast("Demo: UZ / EN")} />
              <SettingButton icon={LogOut} label="Chiqish" onClick={signOut} />
            </div>
          </GlassCard>
        </div>
      </section>
    </PageShell>
  );
}

function SettingButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-left text-sm text-white/90 transition-colors hover:bg-white/10"
    >
      <Icon className="h-4 w-4 text-magic-pink" /> {label}
    </button>
  );
}
