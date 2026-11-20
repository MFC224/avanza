import React from "react";
import { SITE_CONFIG } from "@/lib/site-config";
import type { ComplaintFormState } from "./reclamacion-consumer-section";

interface ReclamacionSuccessProps {
  form: ComplaintFormState;
  code: string;
  createdAt: string;
  onReset: () => void;
}

/**
 * Constancia de la hoja registrada. Se puede imprimir o guardar como PDF
 * desde el navegador (estilos de impresión en globals.css).
 */
export function ReclamacionSuccess({ form, code, createdAt, onReset }: ReclamacionSuccessProps) {
  const date = new Date(createdAt).toLocaleString("es-PE", { dateStyle: "long", timeStyle: "short" });
  const rows: [string, string][] = [
    ["Número de hoja", code],
    ["Fecha y hora", date],
    ["Proveedor", SITE_CONFIG.legalName],
    ["Consumidor", form.fullName],
    ["Documento", `${form.documentType} ${form.documentNumber}`],
    ["Correo", form.email],
    ["Teléfono", form.phone],
    ["Domicilio", form.address],
    ...(form.isMinor ? ([["Padre, madre o apoderado", `${form.guardianName} (${form.guardianDocument})`]] as [string, string][]) : []),
    ["Bien contratado", form.serviceType === "SERVICIO" ? "Servicio" : "Producto"],
    ...(form.serviceDescription ? ([["Descripción", form.serviceDescription]] as [string, string][]) : []),
    ...(form.amountClaimed ? ([["Monto reclamado", form.amountClaimed]] as [string, string][]) : []),
    ["Tipo", form.complaintType === "RECLAMO" ? "Reclamo" : "Queja"],
    ["Detalle", form.description],
    ["Pedido", form.request],
  ];

  return (
    <section aria-labelledby="constancia-titulo" className="print-area">
      <h2 id="constancia-titulo" className="type-section">
        Tu hoja quedó registrada
      </h2>
      <p className="type-body text-[var(--muted-on-paper)] mt-4 max-w-[60ch]">
        Guarda o imprime esta constancia. Te responderemos por escrito a {form.email} en un plazo no mayor a quince (15)
        días hábiles.
      </p>

      <dl className="mt-10 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-x-8 gap-y-4">
        {rows.map(([label, value]) => (
          <React.Fragment key={label}>
            <dt className="type-small text-[var(--muted-on-paper)]">{label}</dt>
            <dd className="type-body whitespace-pre-wrap break-words">{value}</dd>
          </React.Fragment>
        ))}
      </dl>

      <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 no-print">
        <button
          type="button"
          onClick={() => window.print()}
          className="type-button px-8 py-4 bg-[var(--brand)] text-[var(--on-brand)] hover:opacity-90 transition-opacity cursor-pointer"
        >
          Imprimir o guardar en PDF
        </button>
        <button
          type="button"
          onClick={onReset}
          className="type-button underline underline-offset-[6px] text-[var(--ink)] cursor-pointer"
        >
          Registrar otra hoja
        </button>
      </div>
    </section>
  );
}
