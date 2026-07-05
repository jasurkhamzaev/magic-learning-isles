import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import { MagicalBackground } from "@/components/MagicalBackground";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Hashimjon Akademiyasi" },
      { name: "description", content: "Bilimlar, yangiliklar va foydali maqolalar." },
    ],
  }),
  component: () => (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <section className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden px-6 pt-32 text-center">
        <MagicalBackground />
        <div className="relative mx-auto max-w-2xl">
          <h1 className="text-balance text-6xl font-extrabold tracking-tight text-white sm:text-7xl">
            <span className="text-gradient-magic">📝 Blog</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/75">
            Bilimlar, yangiliklar va foydali maqolalarni o'qing.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 backdrop-blur-md">
            ✨ Tez orada
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  ),
});
