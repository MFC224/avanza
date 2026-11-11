import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";

interface ReclamacionSuccessProps {
  email: string;
  code: string;
  onReset: () => void;
}

export function ReclamacionSuccess({
  email,
  code,
  onReset,
}: ReclamacionSuccessProps) {
  return (
    <Reveal className="p-8 md:p-12 rounded-3xl bg-white border border-emerald-200 shadow-xl text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-8 h-8" />
      </div>
      <h2 className="text-2xl md:text-3xl font-black text-slate-900">
        Reclamación Registrada con Éxito
      </h2>
      <p className="text-slate-600 max-w-lg mx-auto text-sm leading-relaxed">
        Hemos registrado tu comunicación en nuestro libro digital. Se ha remitido una copia formal con el código de seguimiento a tu correo: <strong>{email}</strong>.
      </p>
      <div className="inline-block p-4 rounded-2xl bg-slate-50 border border-slate-200">
        <p className="text-xs uppercase tracking-wider text-slate-500 font-mono">Código de Seguimiento</p>
        <p className="text-2xl font-black text-blue-600 font-mono mt-1">{code}</p>
      </div>
      <div className="pt-4">
        <Button variant="outline" onClick={onReset}>
          Registrar otra comunicación
        </Button>
      </div>
    </Reveal>
  );
}
