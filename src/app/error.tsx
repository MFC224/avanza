"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("AVANZA Runtime Exception Intercepted:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center relative overflow-hidden px-4">
      <BackgroundGrid />

      <div className="relative z-10 max-w-lg mx-auto text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <span className="text-xs font-mono font-bold tracking-widest text-red-400 uppercase bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
          Excepción de Ejecución
        </span>

        <h1 className="text-3xl sm:text-4xl font-black text-white mt-4 mb-3 tracking-tight">
          Ocurrió una interrupción imprevista
        </h1>

        <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
          El sistema defensivo interceptó una anomalía en el procesamiento de esta vista. Puedes reintentar la operación o regresar a un estado seguro.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-6 py-5 font-semibold shadow-[0_0_20px_rgba(79,70,229,0.4)]"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reintentar Carga
          </Button>
          <Link href="/">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-slate-800 hover:bg-slate-900 text-slate-300 rounded-full px-6 py-5 font-semibold"
            >
              <Home className="w-4 h-4 mr-2" />
              Ir a Página Principal
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
