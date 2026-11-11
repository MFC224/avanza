import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormState {
  fullName: string;
  documentType: "DNI" | "CE" | "RUC" | "PASAPORTE";
  documentNumber: string;
  email: string;
  phone: string;
  address: string;
  serviceType: "SERVICIO" | "PRODUCTO";
  complaintType: "RECLAMO" | "QUEJA";
  amountClaimed: string;
  description: string;
  request: string;
  termsAccepted: boolean;
}

interface ConsumerSectionProps {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  errors: Record<string, string>;
}

export function ReclamacionConsumerSection({
  form,
  setForm,
  errors,
}: ConsumerSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3 mb-6">
        1. Identificación del Consumidor Reclamante
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="fullName" className="text-xs font-bold text-slate-700">
            Nombre Completo o Razón Social *
          </Label>
          <Input
            id="fullName"
            placeholder="Ej. Juan Pérez o Tech Solutions SAC"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            className={errors.fullName ? "border-red-400" : ""}
          />
          {errors.fullName && <p className="text-xs text-red-600">{errors.fullName}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="documentType" className="text-xs font-bold text-slate-700">
            Tipo de Documento *
          </Label>
          <select
            id="documentType"
            value={form.documentType}
            onChange={(e) =>
              setForm({
                ...form,
                documentType: e.target.value as "DNI" | "CE" | "RUC" | "PASAPORTE",
              })
            }
            className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="DNI">DNI (Documento Nacional de Identidad)</option>
            <option value="RUC">RUC (Registro Único de Contribuyentes)</option>
            <option value="CE">Carné de Extranjería (CE)</option>
            <option value="PASAPORTE">Pasaporte</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="documentNumber" className="text-xs font-bold text-slate-700">
            Número de Documento *
          </Label>
          <Input
            id="documentNumber"
            placeholder="Ej. 72345678"
            value={form.documentNumber}
            onChange={(e) => setForm({ ...form, documentNumber: e.target.value })}
            className={errors.documentNumber ? "border-red-400" : ""}
          />
          {errors.documentNumber && (
            <p className="text-xs text-red-600">{errors.documentNumber}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-bold text-slate-700">
            Correo Electrónico *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="tu@empresa.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={errors.email ? "border-red-400" : ""}
          />
          {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-xs font-bold text-slate-700">
            Teléfono / WhatsApp *
          </Label>
          <Input
            id="phone"
            placeholder="Ej. +51 987 654 321"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={errors.phone ? "border-red-400" : ""}
          />
          {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="address" className="text-xs font-bold text-slate-700">
            Dirección o Ciudad de Residencia *
          </Label>
          <Input
            id="address"
            placeholder="Ej. Av. Javier Prado Este 450, San Isidro, Lima"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className={errors.address ? "border-red-400" : ""}
          />
          {errors.address && <p className="text-xs text-red-600">{errors.address}</p>}
        </div>
      </div>
    </div>
  );
}
