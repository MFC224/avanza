"use client";

import { useState, useEffect } from "react";
import { Play, Pause, Film } from "lucide-react";

export function CinematicReel() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      time: "00:04",
      tag: "AI PIPELINE",
      label: "Compilando modelo y orquestador de agentes",
      code: "const agent = await avanzaAI.createAgent({ model: 'gpt-4o-mini', tools: [crmSync, payments] });",
      output: "✓ Agente autónomo activo · Latencia: 14ms · RAG Indexado",
    },
    {
      time: "00:08",
      tag: "DATABASE 3NF",
      label: "Generando migraciones con Row Level Security",
      code: "create policy \"tenant_isolation\" on public.leads for select using (auth.uid() = user_id);",
      output: "✓ 12 Políticas RLS aplicadas · Conexiones cifradas SSL",
    },
    {
      time: "00:12",
      tag: "TURBOPACK 16",
      label: "Optimizando bundles y streaming SSR",
      code: "npm run build --turbo // 18 static/dynamic routes in 621ms",
      output: "✓ Compilación completa · 100% Type-Safe · 0 Advertencias",
    },
    {
      time: "00:16",
      tag: "PRODUCCIÓN",
      label: "Despliegue distribuido en Edge CDN global",
      code: "git push origin main // Automated GitHub Actions pipeline triggered",
      output: "🚀 Despliegue en vivo en https://avanza.dev · 99.99% Uptime",
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-28 md:py-36 relative z-10 border-t border-slate-200/70">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/[0.04] border border-slate-900/[0.08] text-slate-700 text-[11px] font-mono uppercase tracking-[0.18em] font-semibold mb-6">
          <Film className="w-3.5 h-3.5 text-[#021761]" /> Arquitectura en Movimiento
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-slate-950 mb-6 tracking-[-0.035em]">
          La ingeniería de AVANZA en tiempo real
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg md:text-xl font-normal leading-relaxed">
          Observa cómo se construye y despliega una solución de élite en una secuencia de alta velocidad.
        </p>
      </div>

      {/* Cinematic Frame Container (21:9 Ultra-Wide Screen) */}
      <div className="relative rounded-3xl border border-slate-200/80 bg-slate-950 p-2 shadow-2xl overflow-hidden">
        <div className="rounded-[22px] bg-slate-950 p-6 md:p-10 backdrop-blur-2xl relative overflow-hidden">
          {/* Ambient Video Glow Inside */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Film Monitor Bar */}
          <div className="flex flex-wrap items-center justify-between pb-6 mb-6 border-b border-slate-800 text-xs font-mono text-slate-400 gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="font-bold text-white tracking-wider">STUDIO ARCHITECTURE // AVANZA</span>
              <span className="hidden sm:inline text-slate-600">|</span>
              <span className="hidden sm:inline text-cyan-400 font-semibold">120 FPS HIGH REFRESH · WEBP READY</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 hover:border-blue-500/50 text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                <span>{isPlaying ? "Pausar Reel" : "Reproducir"}</span>
              </button>
              <span className="text-slate-500 font-mono">ESCENA {activeStep + 1}/4</span>
            </div>
          </div>

          {/* Reel Content Playback Grid */}
          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Left: Step navigation scrubber */}
            <div className="md:col-span-5 space-y-3">
              {steps.map((s, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                      isActive
                        ? "bg-slate-900/90 border-blue-500/60 shadow-[0_0_20px_rgba(37,99,235,0.25)] translate-x-1"
                        : "bg-slate-950/40 border-slate-900 hover:border-slate-800 text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                        isActive ? "bg-blue-600 text-white shadow-sm" : "bg-slate-900 text-slate-600"
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[10px] font-mono uppercase tracking-widest ${isActive ? "text-blue-400 font-bold" : "text-slate-500"}`}>
                          {s.tag}
                        </span>
                        <span className="text-[10px] font-mono text-slate-600">{s.time}</span>
                      </div>
                      <p className={`text-sm font-semibold truncate ${isActive ? "text-white" : "text-slate-400"}`}>
                        {s.label}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Simulated Terminal & Motion Visualizer */}
            <div className="md:col-span-7">
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 font-mono text-xs shadow-2xl relative min-h-[280px] flex flex-col justify-between">
                <div>
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="text-slate-500 text-[11px] ml-2">terminal ~ avanza-deploy</span>
                    </div>
                    <span className="text-[10px] text-slate-500 uppercase">{steps[activeStep].tag}</span>
                  </div>

                  {/* Code Line */}
                  <div className="space-y-3">
                    <div className="text-slate-400">
                      <span className="text-emerald-400">$</span> {steps[activeStep].code}
                    </div>
                    <div className="text-emerald-400/90 pl-3 border-l-2 border-emerald-500/40">
                      {steps[activeStep].output}
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-600">
                  <span>Engine: Turbopack v16.3.3</span>
                  <span className="text-blue-400 font-semibold">100% PASS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
