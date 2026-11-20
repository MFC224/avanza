import React from "react";

export interface ComplaintFormState {
  fullName: string;
  documentType: "DNI" | "CE" | "RUC" | "PASAPORTE";
  documentNumber: string;
  email: string;
  phone: string;
  address: string;
  isMinor: boolean;
  guardianName: string;
  guardianDocument: string;
  serviceType: "SERVICIO" | "PRODUCTO";
  serviceDescription: string;
  complaintType: "RECLAMO" | "QUEJA";
  amountClaimed: string;
  description: string;
  request: string;
  termsAccepted: boolean;
}

export const FIELD =
  "w-full h-12 px-0 border-0 border-b bg-transparent text-[var(--ink)] type-body focus:outline-none focus:border-[var(--ink)] placeholder:text-[var(--muted-on-paper)]";

interface FieldProps {
  id: keyof ComplaintFormState;
  label: string;
  form: ComplaintFormState;
  setForm: React.Dispatch<React.SetStateAction<ComplaintFormState>>;
  errors: Record<string, string>;
  type?: string;
  placeholder?: string;
  className?: string;
  autoComplete?: string;
}

export function TextField({ id, label, form, setForm, errors, type = "text", placeholder, className, autoComplete }: FieldProps) {
  const error = errors[id];
  return (
    <div className={className}>
      <label htmlFor={id} className="type-small text-[var(--muted-on-paper)] block">
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={String(form[id] ?? "")}
        onChange={(e) => setForm({ ...form, [id]: e.target.value })}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${FIELD} ${error ? "border-red-600" : "border-[var(--muted-on-paper)]"}`}
      />
      {error && (
        <p id={`${id}-error`} className="type-small text-red-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

interface ConsumerSectionProps {
  form: ComplaintFormState;
  setForm: React.Dispatch<React.SetStateAction<ComplaintFormState>>;
  errors: Record<string, string>;
}

export function ReclamacionConsumerSection({ form, setForm, errors }: ConsumerSectionProps) {
  const common = { form, setForm, errors };
  return (
    <fieldset>
      <legend className="type-card">1. Tus datos</legend>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
        <TextField {...common} id="fullName" label="Nombre completo o razón social" autoComplete="name" className="md:col-span-2" />

        <div>
          <label htmlFor="documentType" className="type-small text-[var(--muted-on-paper)] block">
            Tipo de documento
          </label>
          <select
            id="documentType"
            value={form.documentType}
            onChange={(e) => setForm({ ...form, documentType: e.target.value as ComplaintFormState["documentType"] })}
            className={`${FIELD} border-[var(--muted-on-paper)] cursor-pointer`}
          >
            <option value="DNI">DNI</option>
            <option value="RUC">RUC</option>
            <option value="CE">Carné de extranjería</option>
            <option value="PASAPORTE">Pasaporte</option>
          </select>
        </div>
        <TextField {...common} id="documentNumber" label="Número de documento" />
        <TextField {...common} id="email" label="Correo electrónico (aquí te responderemos)" type="email" autoComplete="email" />
        <TextField {...common} id="phone" label="Teléfono" type="tel" autoComplete="tel" />
        <TextField {...common} id="address" label="Domicilio" autoComplete="street-address" className="md:col-span-2" />

        <label className="md:col-span-2 flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.isMinor}
            onChange={(e) => setForm({ ...form, isMinor: e.target.checked })}
            className="mt-1 w-4 h-4 cursor-pointer accent-[var(--brand)]"
          />
          <span className="type-body">Soy menor de edad</span>
        </label>
        {form.isMinor && (
          <>
            <TextField {...common} id="guardianName" label="Nombre del padre, madre o apoderado" />
            <TextField {...common} id="guardianDocument" label="Documento del padre, madre o apoderado" />
          </>
        )}
      </div>
    </fieldset>
  );
}
