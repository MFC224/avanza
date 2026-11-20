"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { complaintSchema } from "@/lib/complaints-schema";
import { Section } from "@/components/site/section";
import { Reveal } from "@/components/site/reveal";
import { submitComplaint } from "./actions";
import { ReclamacionSuccess } from "./reclamacion-success";
import {
  ReclamacionConsumerSection,
  TextField,
  FIELD,
  type ComplaintFormState,
} from "./reclamacion-consumer-section";
import { ProviderBlock, Definitions, LegalNotes } from "./reclamacion-legal";

const EMPTY: ComplaintFormState = {
  fullName: "",
  documentType: "DNI",
  documentNumber: "",
  email: "",
  phone: "",
  address: "",
  isMinor: false,
  guardianName: "",
  guardianDocument: "",
  serviceType: "SERVICIO",
  serviceDescription: "",
  complaintType: "RECLAMO",
  amountClaimed: "",
  description: "",
  request: "",
  termsAccepted: false,
};

/** Hoja completa en texto, para enviarla por correo si el registro en línea falla. */
function asEmail(form: ComplaintFormState) {
  const body = [
    `HOJA DE RECLAMACIÓN · ${SITE_CONFIG.legalName}`,
    `Fecha: ${new Date().toLocaleString("es-PE")}`,
    `Consumidor: ${form.fullName} · ${form.documentType} ${form.documentNumber}`,
    `Correo: ${form.email} · Teléfono: ${form.phone}`,
    `Domicilio: ${form.address}`,
    form.isMinor ? `Padre, madre o apoderado: ${form.guardianName} (${form.guardianDocument})` : "",
    `Bien contratado: ${form.serviceType} ${form.serviceDescription}`,
    `Monto reclamado: ${form.amountClaimed || "-"}`,
    `Tipo: ${form.complaintType}`,
    `Detalle: ${form.description}`,
    `Pedido: ${form.request}`,
  ]
    .filter(Boolean)
    .join("\n");
  return `mailto:${SITE_CONFIG.contact.email}?subject=${encodeURIComponent("Libro de Reclamaciones")}&body=${encodeURIComponent(body)}`;
}

export default function ReclamacionesPage() {
  const [form, setForm] = useState<ComplaintFormState>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ code: string; createdAt: string } | null>(null);
  const [storageFailed, setStorageFailed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setStorageFailed(false);

    const local = complaintSchema.safeParse(form);
    if (!local.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of local.error.issues) {
        if (issue.path[0] && !fieldErrors[String(issue.path[0])]) fieldErrors[String(issue.path[0])] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    const res = await submitComplaint(form);
    setLoading(false);
    if (res.ok) {
      setResult({ code: res.code, createdAt: res.createdAt });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (res.reason === "validation") {
      setErrors(res.errors);
    } else {
      setStorageFailed(true);
    }
  };

  const common = { form, setForm, errors };

  return (
    <div className="flex flex-col">
      <Section tone="paper" className="pt-[96px] lg:pt-[140px]">
        <div className="max-w-4xl">
          <Reveal>
            <BookOpen className="w-10 h-10 text-[var(--ink)]" aria-hidden="true" />
            <h1 className="type-display mt-6">Libro de Reclamaciones</h1>
            <p className="type-body text-[var(--muted-on-paper)] mt-6 max-w-[60ch]">
              Conforme a lo establecido en el Código de Protección y Defensa del Consumidor (Ley N° 29571), este
              establecimiento cuenta con un Libro de Reclamaciones virtual a tu disposición.
            </p>
          </Reveal>

          <div className="mt-14">
            <ProviderBlock />
          </div>

          {result ? (
            <div className="mt-16">
              <ReclamacionSuccess
                form={form}
                code={result.code}
                createdAt={result.createdAt}
                onReset={() => {
                  setResult(null);
                  setForm(EMPTY);
                }}
              />
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-16 flex flex-col gap-16">
              <ReclamacionConsumerSection {...common} />

              <fieldset>
                <legend className="type-card">2. Bien contratado</legend>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  <div role="radiogroup" aria-label="Bien contratado" className="flex gap-8">
                    {(["SERVICIO", "PRODUCTO"] as const).map((v) => (
                      <label key={v} className="flex items-center gap-2 cursor-pointer type-body">
                        <input
                          type="radio"
                          name="serviceType"
                          checked={form.serviceType === v}
                          onChange={() => setForm({ ...form, serviceType: v })}
                          className="accent-[var(--brand)] w-4 h-4"
                        />
                        {v === "SERVICIO" ? "Servicio" : "Producto"}
                      </label>
                    ))}
                  </div>
                  <TextField {...common} id="amountClaimed" label="Monto reclamado (opcional)" placeholder="Ej. S/ 1,500.00" />
                  <TextField {...common} id="serviceDescription" label="Descripción del servicio o producto" className="md:col-span-2" />
                </div>
              </fieldset>

              <fieldset>
                <legend className="type-card">3. Detalle de la reclamación</legend>
                <div className="mt-8">
                  <Definitions />
                </div>
                <div role="radiogroup" aria-label="Tipo" className="mt-8 flex gap-8">
                  {(["RECLAMO", "QUEJA"] as const).map((v) => (
                    <label key={v} className="flex items-center gap-2 cursor-pointer type-body">
                      <input
                        type="radio"
                        name="complaintType"
                        checked={form.complaintType === v}
                        onChange={() => setForm({ ...form, complaintType: v })}
                        className="accent-[var(--brand)] w-4 h-4"
                      />
                      {v === "RECLAMO" ? "Reclamo" : "Queja"}
                    </label>
                  ))}
                </div>
                {(["description", "request"] as const).map((id) => (
                  <div key={id} className="mt-8">
                    <label htmlFor={id} className="type-small text-[var(--muted-on-paper)] block">
                      {id === "description" ? "Detalle: ¿qué ocurrió?" : "Pedido: ¿qué solución esperas?"}
                    </label>
                    <textarea
                      id={id}
                      rows={4}
                      value={form[id]}
                      onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                      aria-invalid={Boolean(errors[id])}
                      aria-describedby={errors[id] ? `${id}-error` : undefined}
                      className={`${FIELD} h-auto py-3 resize-y ${errors[id] ? "border-red-600" : "border-[var(--muted-on-paper)]"}`}
                    />
                    {errors[id] && (
                      <p id={`${id}-error`} className="type-small text-red-600 mt-1">
                        {errors[id]}
                      </p>
                    )}
                  </div>
                ))}
              </fieldset>

              <div className="flex flex-col gap-8">
                <LegalNotes />
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.termsAccepted}
                    onChange={(e) => setForm({ ...form, termsAccepted: e.target.checked })}
                    className="mt-1 w-4 h-4 cursor-pointer accent-[var(--brand)]"
                  />
                  <span className="type-small">
                    Declaro que los datos consignados son verdaderos, conforme a la Ley N° 29571.
                  </span>
                </label>
                {errors.termsAccepted && <p className="type-small text-red-600 -mt-6">{errors.termsAccepted}</p>}

                {storageFailed && (
                  <div role="alert" className="type-body">
                    No pudimos registrar tu hoja en este momento. Para que no se pierda,{" "}
                    <a href={asEmail(form)} className="underline underline-offset-4">
                      envíala por correo con un clic
                    </a>{" "}
                    a {SITE_CONFIG.contact.email}. Tiene el mismo valor.
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="type-button px-8 py-4 bg-[var(--brand)] text-[var(--on-brand)] hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand)]"
                  >
                    {loading ? "Registrando…" : "Enviar hoja de reclamación"}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </Section>
    </div>
  );
}
