import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Ban, Copy, KeyRound, Link2, Loader2, Sparkles, Timer } from "lucide-react";
import { GlassCard } from "@/components/PageShell";
import {
  createDemoMagicLink,
  listDemoAccounts,
  provisionDemoAccounts,
  revokeDemoMagicLink,
} from "@/lib/demo-accounts.functions";
import { DEMO_PASSWORD, type MagicLinkStatus } from "@/lib/demo-accounts";

type LinkState = {
  link: string;
  expiresAt: number;
  status: MagicLinkStatus;
};

function mmss(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function DemoAccountsPanel() {
  const fetchAccounts = useServerFn(listDemoAccounts);
  const provision = useServerFn(provisionDemoAccounts);
  const magicLink = useServerFn(createDemoMagicLink);
  const revoke = useServerFn(revokeDemoMagicLink);
  const queryClient = useQueryClient();
  const [links, setLinks] = useState<Record<string, LinkState>>({});
  const [now, setNow] = useState(() => Date.now());

  const { data: accounts = [], isLoading } = useQuery({
    queryKey: ["admin", "demo-accounts"],
    queryFn: () => fetchAccounts(),
  });

  // Sanoq taymeri
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  // Muddati tugagan havolalarni avtomatik bekor qilish
  useEffect(() => {
    setLinks((prev) => {
      let changed = false;
      const next: Record<string, LinkState> = {};
      for (const [email, st] of Object.entries(prev)) {
        if (st.status === "active" && st.expiresAt <= now) {
          next[email] = { ...st, status: "expired" };
          changed = true;
        } else {
          next[email] = st;
        }
      }
      return changed ? next : prev;
    });
  }, [now]);

  const provisionMutation = useMutation({
    mutationFn: () => provision(),
    onSuccess: async (res) => {
      toast.success(`Demo hisoblar tayyor: ${res.created} yangi, ${res.updated} yangilandi`);
      await queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Demo hisoblarni yaratib bo'lmadi"),
  });

  const linkMutation = useMutation({
    mutationFn: (email: string) =>
      magicLink({ data: { email, redirectTo: `${window.location.origin}/dashboard` } }).then((r) => ({
        email,
        ...r,
      })),
    onSuccess: async (res) => {
      if (!res.link) {
        toast.error("Havola yaratilmadi");
        return;
      }
      setLinks((prev) => ({
        ...prev,
        [res.email]: { link: res.link!, expiresAt: res.expiresAt, status: "active" },
      }));
      await copy(res.link, "Magic link nusxalandi 🔗 — 1 martalik, 60 daqiqa amal qiladi");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Magic link yaratilmadi"),
  });

  const revokeMutation = useMutation({
    mutationFn: (email: string) =>
      revoke({ data: { email, redirectTo: `${window.location.origin}/dashboard` } }).then(() => email),
    onSuccess: (email) => {
      setLinks((prev) => (prev[email] ? { ...prev, [email]: { ...prev[email]!, status: "revoked" } } : prev));
      toast.success("Havola bekor qilindi — endi ishlamaydi");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Bekor qilib bo'lmadi"),
  });

  async function copy(text: string, msg: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(msg);
    } catch {
      toast.error("Nusxalash imkonsiz — havolani qo'lda tanlang");
    }
  }

  const readyCount = accounts.filter((a) => a.exists).length;

  return (
    <div className="mt-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-extrabold text-white">Demo o'quvchi hisoblari</h3>
          <p className="text-sm text-white/60">
            Har bir demo o'quvchi uchun avtomatik kirish: vaqtinchalik parol{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-magic-gold">{DEMO_PASSWORD}</code> yoki
            bir martalik magic link (60 daqiqa, muddati tugasa avtomatik bekor bo'ladi).
          </p>
        </div>
        <button
          onClick={() => provisionMutation.mutate()}
          disabled={provisionMutation.isPending}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-sunset px-4 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-orange-500/30 disabled:opacity-60"
        >
          {provisionMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          Demo hisoblarni yaratish / tiklash
        </button>
      </div>

      <GlassCard className="!p-0 overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-xs text-white/60">
          <span>{isLoading ? "Yuklanmoqda..." : `${readyCount} / ${accounts.length} hisob tayyor`}</span>
          <button
            onClick={() =>
              copy(
                accounts.map((a) => `${a.fullName} — ${a.email} / ${a.password}`).join("\n"),
                "Barcha kirish ma'lumotlari nusxalandi 📋",
              )
            }
            className="inline-flex items-center gap-1.5 font-semibold text-magic-cyan hover:underline"
          >
            <Copy className="h-3.5 w-3.5" /> Hammasini nusxalash
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-wider text-white/60">
              <tr>
                <th className="p-4">O'quvchi</th>
                <th className="p-4">Email</th>
                <th className="p-4">Parol</th>
                <th className="p-4">Havola holati</th>
                <th className="p-4 text-right">Kirish</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((a) => {
                const st = links[a.email];
                const remaining = st ? st.expiresAt - now : 0;
                return (
                  <tr key={a.email} className="border-t border-white/5 text-white/90 hover:bg-white/[0.03]">
                    <td className="p-4 font-semibold">{a.fullName}</td>
                    <td className="p-4 font-mono text-xs text-white/70">{a.email}</td>
                    <td className="p-4 font-mono text-xs text-magic-gold">{a.password}</td>
                    <td className="p-4 text-xs">
                      {!st && (
                        <span className="rounded-full bg-white/10 px-2 py-1 font-bold text-white/60">
                          {a.exists ? "havola yo'q" : "hisob yaratilmagan"}
                        </span>
                      )}
                      {st?.status === "active" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2 py-1 font-bold text-emerald-300">
                          <Timer className="h-3 w-3" /> faol · {mmss(remaining)} · 1 martalik
                        </span>
                      )}
                      {st?.status === "expired" && (
                        <span className="rounded-full bg-amber-500/20 px-2 py-1 font-bold text-amber-300">
                          muddati tugadi — avtomatik bekor qilindi
                        </span>
                      )}
                      {st?.status === "revoked" && (
                        <span className="rounded-full bg-rose-500/20 px-2 py-1 font-bold text-rose-300">
                          bekor qilingan
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => copy(`${a.email} / ${a.password}`, "Kirish ma'lumotlari nusxalandi")}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/10"
                        >
                          <KeyRound className="h-3.5 w-3.5" /> Parol
                        </button>
                        <button
                          onClick={() => linkMutation.mutate(a.email)}
                          disabled={!a.exists || linkMutation.isPending}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-magic-cyan hover:bg-white/10 disabled:opacity-40"
                        >
                          <Link2 className="h-3.5 w-3.5" /> Magic link
                        </button>
                        <button
                          onClick={() => revokeMutation.mutate(a.email)}
                          disabled={!st || st.status !== "active" || revokeMutation.isPending}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-rose-400/25 bg-rose-500/10 px-2.5 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 disabled:opacity-40"
                        >
                          <Ban className="h-3.5 w-3.5" /> Bekor qilish
                        </button>
                      </div>
                      {st && st.status === "active" && (
                        <div className="mt-2 max-w-[320px] truncate text-right text-[10px] text-white/40">
                          {st.link}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
              {!isLoading && accounts.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-white/60">
                    Demo o'quvchilar topilmadi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
