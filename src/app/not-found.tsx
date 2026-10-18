"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import {
  Compass,
  Home,
  Rocket,
  ArrowLeft,
  Sparkles,
  Layers,
  Users,
  MessageCircle,
  Terminal,
  RefreshCw,
  CheckCircle2
} from "lucide-react";

export default function NotFound() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [jumping, setJumping] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        setCurrentUrl(window.location.pathname);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Ambient interactive starfield canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.4 + 0.1,
      opacity: Math.random() * 0.7 + 0.3,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        ctx.fillStyle = `rgba(165, 180, 252, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Hyper-jump trigger effect
  const handleHyperjump = () => {
    setJumping(true);
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#6366f1", "#06b6d4", "#a855f7", "#ffffff"],
    });

    setTimeout(() => {
      router.push("/");
    }, 1200);
  };

  const handleCopyPath = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const alternativeRoutes = [
    {
      title: "Nuestros Servicios",
      badge: "17 Soluciones",
      desc: "Páginas web en 7 días, CRMs y sistemas cloud a medida.",
      href: "/servicios",
      icon: Layers,
      gradient: "from-indigo-500/10 to-indigo-500/5",
      border: "border-indigo-500/20 hover:border-indigo-500/50",
      iconColor: "text-indigo-400",
    },
    {
      title: "Metodología SCRUM",
      badge: "Sprints Ágiles",
      desc: "Entregables continuos cada semana con código limpio y testeado.",
      href: "/metodologia",
      icon: RefreshCw,
      gradient: "from-cyan-500/10 to-cyan-500/5",
      border: "border-cyan-500/20 hover:border-cyan-500/50",
      iconColor: "text-cyan-400",
    },
    {
      title: "Nuestro Equipo",
      badge: "Liderazgo Técnico",
      desc: "Conoce a Manuel Callañaupa y Magno Alomía.",
      href: "/nosotros",
      icon: Users,
      gradient: "from-purple-500/10 to-purple-500/5",
      border: "border-purple-500/20 hover:border-purple-500/50",
      iconColor: "text-purple-400",
    },
    {
      title: "Línea Directa WhatsApp",
      badge: "Respuesta < 5 min",
      desc: "Escribe directamente a Magno Alomía para asistencia inmediata.",
      href: "https://wa.me/51942498841?text=Hola%20Magno,%20me%20encontr%20con%20el%20Error%20404%20en%20la%20web%20de%20Avanza%20y%20quiero%20hacerles%20una%20consulta.",
      icon: MessageCircle,
      gradient: "from-emerald-500/10 to-emerald-500/5",
      border: "border-emerald-500/20 hover:border-emerald-500/50",
      iconColor: "text-emerald-400",
      isExternal: true,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden selection:bg-indigo-500/30">
      {/* Background canvas for ambient cosmic movement */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-60"
        aria-hidden="true"
      />

      {/* Radial lighting glows */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-indigo-600/15 blur-[140px] pointer-events-none rounded-full"
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-10 right-10 w-[450px] h-[350px] bg-cyan-500/10 blur-[130px] pointer-events-none rounded-full"
        aria-hidden="true" 
      />

      {/* Top Navigation Bar */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-black text-white text-base shadow-[0_0_20px_rgba(99,102,241,0.5)] group-hover:scale-105 transition-transform">
            A
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg text-white tracking-wider leading-none">
              AVANZA
            </span>
            <span className="text-[10px] text-indigo-400 font-mono tracking-widest uppercase">
              AI & Software Studio
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800/80 rounded-full px-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            <span className="hidden sm:inline">Volver Atrás</span>
          </Button>

          <Link href="/contacto">
            <Button
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-4 shadow-[0_0_15px_rgba(99,102,241,0.35)]"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              <span>Cotizar Proyecto</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Main 404 Hero Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 py-8 sm:py-12 text-center my-auto">
        {/* Radar Signal Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-medium mb-6 shadow-[0_0_25px_rgba(99,102,241,0.25)]"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
          <Compass className="w-3.5 h-3.5 text-indigo-400" />
          <span>SEÑAL FUERA DE RANGO · PROTOCOLO DE REUBICACIÓN</span>
        </motion.div>

        {/* Giant Holographic Animated 404 Typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-4 select-none"
        >
          <div className="text-8xl sm:text-[13rem] font-black tracking-tighter leading-none bg-gradient-to-b from-white via-indigo-200 to-indigo-600/30 bg-clip-text text-transparent drop-shadow-[0_0_60px_rgba(99,102,241,0.45)]">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-xs sm:text-sm font-mono text-cyan-400/80 bg-slate-950/80 px-4 py-1 rounded-full border border-cyan-500/30 backdrop-blur-md">
              COORDINATE_NOT_RESOLVED
            </span>
          </div>
        </motion.div>

        {/* H1 Heading compliant with accessibility and verification tests */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4"
        >
          Página no encontrada
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed"
        >
          La ruta solicitada saltó al hiperespacio, fue reubicada o nunca formó parte de la infraestructura de AVANZA. Elige una de nuestras coordenadas recomendadas para retomar la navegación.
        </motion.p>

        {/* Main Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12"
        >
          <Link href="/" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-8 py-6 font-semibold shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Home className="w-4 h-4 mr-2" />
              Volver a la Base (Inicio)
            </Button>
          </Link>

          <Button
            size="lg"
            variant="outline"
            onClick={handleHyperjump}
            disabled={jumping}
            className="w-full sm:w-auto border-indigo-500/40 hover:bg-indigo-950/40 text-indigo-300 rounded-full px-8 py-6 font-semibold transition-all hover:scale-[1.02] cursor-pointer relative overflow-hidden"
          >
            <Rocket className={`w-4 h-4 mr-2 text-cyan-400 ${jumping ? "animate-bounce" : ""}`} />
            {jumping ? "Iniciando Salto Hiperespacial..." : "Activar Salto Hiperespacial"}
          </Button>
        </motion.div>

        {/* Alternative Route Cards (Radar Grid) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-left mb-8"
        >
          {alternativeRoutes.map((route, i) => {
            const Icon = route.icon;
            const cardContent = (
              <div
                className={`h-full p-4 rounded-2xl bg-gradient-to-b ${route.gradient} bg-slate-900/60 border ${route.border} transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.5)] flex flex-col justify-between backdrop-blur-sm group cursor-pointer`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-xl bg-slate-950/80 border border-slate-800 ${route.iconColor} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/50">
                      {route.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-sm mb-1 group-hover:text-indigo-300 transition-colors">
                    {route.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {route.desc}
                  </p>
                </div>
              </div>
            );

            return route.isExternal ? (
              <a
                key={i}
                href={route.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {cardContent}
              </a>
            ) : (
              <Link key={i} href={route.href} className="block">
                {cardContent}
              </Link>
            );
          })}
        </motion.div>

        {/* Tech Diagnostic Console Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-400"
        >
          <div className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span>RUTA FALLIDA:</span>
            <code className="text-indigo-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              {currentUrl || "/ruta-inexistente"}
            </code>
          </div>

          <button
            onClick={handleCopyPath}
            className="text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1 text-[10px] cursor-pointer"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Enlace copiado</span>
              </>
            ) : (
              <span>[Copiar diagnóstico]</span>
            )}
          </button>
        </motion.div>
      </section>

      {/* Footer Minimalista */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <p>© 2026 AVANZA. Todos los sistemas operativos.</p>
        <div className="flex items-center gap-4">
          <Link href="/servicios" className="hover:text-slate-300 transition-colors">
            Servicios
          </Link>
          <span>·</span>
          <Link href="/metodologia" className="hover:text-slate-300 transition-colors">
            Metodología
          </Link>
          <span>·</span>
          <Link href="/contacto" className="hover:text-slate-300 transition-colors">
            Contacto
          </Link>
        </div>
      </footer>
    </main>
  );
}
