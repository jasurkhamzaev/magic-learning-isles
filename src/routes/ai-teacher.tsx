import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { Mic, Send, Sparkles, Brain, Calculator, Languages, BookOpen, HelpCircle, ClipboardList, Beaker } from "lucide-react";
import { PageShell, GlassCard } from "@/components/PageShell";
import { RoleGuard } from "@/components/RoleGuard";

export const Route = createFileRoute("/ai-teacher")({
  head: () => ({
    meta: [
      { title: "AI Ustoz — Hashimjon Akademiyasi" },
      { name: "description", content: "Sun'iy intellekt yordamida istalgan fan bo'yicha savol bering." },
    ],
  }),
  component: () => (
    <RoleGuard allow={["student", "teacher", "parent", "manager", "superadmin"]}>
      <AIPage />
    </RoleGuard>
  ),
});

const features = [
  { icon: HelpCircle, label: "Uy vazifasi" },
  { icon: ClipboardList, label: "Test generatori" },
  { icon: BookOpen, label: "Mavzuni tushuntirish" },
  { icon: Sparkles, label: "Darsni qisqartirish" },
  { icon: Languages, label: "Tarjima" },
  { icon: Mic, label: "Ovozli chat" },
  { icon: Calculator, label: "Math solver" },
  { icon: Beaker, label: "Ilm-fan yordamchisi" },
];

const suggestions = [
  "Kasrlarni qanday qo'shish mumkin?",
  "Nyutonning uchinchi qonuni nima?",
  "Present Perfect qanday ishlatiladi?",
  "Fotosintez jarayonini tushuntir",
];

type Msg = { role: "user" | "ai"; text: string };

function AIPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Salom! Men sizning AI Ustozingizman 🤖 Bugun qanday yordam bera olaman?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "ai", text: `Ajoyib savol! "${text}" haqida tushuntirib beraman: bu mavzu bir necha bosqichdan iborat. Birinchi bosqich — asosiy tushunchani o'rganish, keyin misollar orqali mustahkamlash va nihoyat mustaqil topshiriqlar bajarish.` }]);
      setTyping(false);
    }, 900);
  };

  return (
    <PageShell
      eyebrow={<span>🤖 AI Ustoz</span>}
      title={<span className="text-gradient-magic">Sun'iy intellekt ustozingiz</span>}
      subtitle="Istalgan fan bo'yicha savol bering — men 24/7 yordam beraman."
    >
      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[280px_1fr_260px]">
        {/* Features */}
        <GlassCard className="h-fit">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-white/60">Imkoniyatlar</h3>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
            {features.map((f) => (
              <button key={f.label} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-left text-sm text-white/90 transition-colors hover:bg-white/10">
                <f.icon className="h-4 w-4 text-magic-cyan" /> {f.label}
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Chat */}
        <GlassCard className="!p-0 flex h-[70vh] flex-col overflow-hidden">
          <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] p-4">
            <motion.div animate={{scale:[1,1.1,1]}} transition={{duration:2,repeat:Infinity}}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-magic shadow-[0_0_30px_rgba(200,100,255,0.5)]">
              <Brain className="h-5 w-5 text-white" />
            </motion.div>
            <div>
              <div className="font-bold text-white">Hashimjon AI</div>
              <div className="text-xs text-emerald-400">● Online</div>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <motion.div key={i} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-3xl px-4 py-3 text-sm ${
                  m.role === "user" ? "bg-gradient-magic text-white" : "border border-white/10 bg-white/5 text-white/90"
                }`}>{m.text}</div>
              </motion.div>
            ))}
            {typing && (
              <div className="flex gap-1 pl-2">
                {[0,1,2].map(i=>(
                  <motion.span key={i} animate={{y:[0,-4,0]}} transition={{duration:0.6,repeat:Infinity,delay:i*0.15}}
                    className="h-2 w-2 rounded-full bg-white/60" />
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-white/10 bg-white/[0.02] p-3">
            <div className="mb-2 flex flex-wrap gap-2">
              {suggestions.slice(0,3).map((s) => (
                <button key={s} onClick={() => send(s)} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 hover:bg-white/10">
                  {s}
                </button>
              ))}
            </div>
            <form onSubmit={(e)=>{e.preventDefault();send(input);}} className="flex gap-2">
              <button type="button" className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10" aria-label="Voice">
                <Mic className="h-4 w-4" />
              </button>
              <input
                value={input}
                onChange={(e)=>setInput(e.target.value)}
                placeholder="Savolingizni yozing..."
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-5 text-sm text-white placeholder:text-white/50 focus:outline-none"
              />
              <button type="submit" className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-magic text-white shadow-lg">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </GlassCard>

        {/* History */}
        <GlassCard className="h-fit">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-white/60">Chat tarixi</h3>
          <div className="space-y-2">
            {["Matematika savoli", "Fizika masalasi", "Ingliz tili grammatikasi", "Biologiya"].map((c) => (
              <button key={c} className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-left text-sm text-white/85 hover:bg-white/10">
                {c}
                <div className="text-xs text-white/50">Bugun</div>
              </button>
            ))}
          </div>
        </GlassCard>
      </section>
    </PageShell>
  );
}
