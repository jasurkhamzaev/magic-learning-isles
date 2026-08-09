import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";
import { MagicalBackground } from "@/components/MagicalBackground";
import { GlassCard } from "@/components/PageShell";

export const Route = createFileRoute("/no-access")({
  head: () => ({
    meta: [
      { title: "Ruxsat yo'q — Hashimjon Akademiyasi" },
      { name: "description", content: "Bu bo'limga kirish uchun sizda yetarli ruxsat yo'q." },
      { property: "og:title", content: "Ruxsat yo'q — Hashimjon Akademiyasi" },
      { property: "og:description", content: "Bu sahifa boshqa rol uchun mo'ljallangan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NoAccessPage,
});

function NoAccessPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-6">
      <MagicalBackground />
      <GlassCard className="relative max-w-md text-center !p-8">
        <ShieldAlert className="mx-auto h-12 w-12 text-magic-pink" />
        <h1 className="mt-4 text-3xl font-extrabold text-white">Ruxsat yo'q</h1>
        <p className="mt-2 text-sm text-white/65">
          Bu bo'lim sizning rolingiz uchun ochiq emas. Agar bu xato bo'lsa, administrator bilan bog'laning.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/dashboard" className="rounded-2xl bg-gradient-sunset px-5 py-2.5 text-sm font-bold text-white">
            Panel
          </Link>
          <Link
            to="/"
            className="rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-bold text-white/80"
          >
            Bosh sahifa
          </Link>
        </div>
      </GlassCard>
    </main>
  );
}
