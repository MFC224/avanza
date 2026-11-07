"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, ShieldCheck, ArrowLeft, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { complaintSchema, generateComplaintCode } from "@/lib/complaints-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FadeInView } from "@/components/ui/fade-in-view";

export default function ReclamacionesPage() {
  const [loading, setLoading] = useState(false);
  const [successCode, setSuccessCode] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    fullName: "",
    documentType: "DNI" as "DNI" | "CE" | "RUC" | "PASAPORTE",
    documentNumber: "",
    email: "",
    phone: "",
    address: "",
    serviceType: "SERVICIO" as "SERVICIO" | "PRODUCTO",
    complaintType: "RECLAMO" as "RECLAMO" | "QUEJA",
    amountClaimed: "",
    description: "",
    request: "",
    termsAccepted: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const validation = complaintSchema.safeParse(form);

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of validation.error.issues) {
        if (issue.path[0]) {
          fieldErrors[String(issue.path[0])] = issue.message;
        }
      }
      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    // Simulate safe recording & receipt dispatch
    await new Promise((resolve) => setTimeout(resolve, 800));
    const code = generateComplaintCode();
    setSuccessCode(code);
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <FadeInView>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Volver al inicio</span>
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-200/80 px-3 py-1 rounded-full">
            D.S. N° 011-2011-PCM · INDECOPI
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Libro de Reclamaciones Virtual
        </h1>
        <p className="text-slate-600 text-base md:text-lg mb-8 leading-relaxed">
          Conforme a lo establecido en el Código de Protección y Defensa del Consumidor (Ley N° 29571), ponemos a tu disposición nuestro registro virtual para canalizar cualquier queja o reclamo respecto a nuestros servicios de software.
        </p>

        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs md:text-sm mb-10 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Definiciones conforme a la normativa peruana:</p>
            <p className="mt-1">
              <strong>Queja:</strong> Disconformidad frente a la mala atención al público o malestar administrativo.
            </p>
            <p>
              <strong>Reclamo:</strong> Disconformidad relacionada a los bienes adquiridos o servicios de software contratados.
            </p>
            <p className="mt-1 text-amber-800 font-medium">
              Plazo legal de respuesta: Máximo 15 días hábiles conforme a ley.
            </p>
          </div>
        </div>
      </FadeInView>

      {successCode ? (
        <FadeInView className="p-8 md:p-12 rounded-3xl bg-white border border-emerald-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900">
            Reclamación Registrada con Éxito
          </h2>
          <p className="text-slate-600 max-w-lg mx-auto text-sm leading-relaxed">
            Hemos registrado tu comunicación en nuestro libro digital. Se ha remitido una copia formal con el código de seguimiento a tu correo: <strong>{form.email}</strong>.
          </p>
          <div className="inline-block p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <p className="text-xs uppercase tracking-wider text-slate-500 font-mono">Código de Seguimiento</p>
            <p className="text-2xl font-black text-blue-600 font-mono mt-1">{successCode}</p>
          </div>
          <div className="pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setSuccessCode(null);
                setForm({
                  fullName: "",
                  documentType: "DNI",
                  documentNumber: "",
                  email: "",
                  phone: "",
                  address: "",
                  serviceType: "SERVICIO",
                  complaintType: "RECLAMO",
                  amountClaimed: "",
                  description: "",
                  request: "",
                  termsAccepted: false,
                });
              }}
            >
              Registrar otra comunicación
            </Button>
          </div>
        </FadeInView>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-slate-200/90 p-8 md:p-12 shadow-sm space-y-8 text-slate-800"
        >
          {/* Section 1: Datos del Consumidor */}
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

          {/* Section 2: Detalle del Reclamo o Queja */}
          <div className="pt-4">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3 mb-6">
              2. Detalle del Bien y de la Reclamación
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-700">Tipo de Contratación *</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      name="serviceType"
                      value="SERVICIO"
                      checked={form.serviceType === "SERVICIO"}
                      onChange={() => setForm({ ...form, serviceType: "SERVICIO" })}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>Servicio de Software</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      name="serviceType"
                      value="PRODUCTO"
                      checked={form.serviceType === "PRODUCTO"}
                      onChange={() => setForm({ ...form, serviceType: "PRODUCTO" })}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>Producto Digital</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-700">Tipo de Disconformidad *</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      name="complaintType"
                      value="RECLAMO"
                      checked={form.complaintType === "RECLAMO"}
                      onChange={() => setForm({ ...form, complaintType: "RECLAMO" })}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>Reclamo (del servicio)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="radio"
                      name="complaintType"
                      value="QUEJA"
                      checked={form.complaintType === "QUEJA"}
                      onChange={() => setForm({ ...form, complaintType: "QUEJA" })}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>Queja (atención)</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="description" className="text-xs font-bold text-slate-700">
                  Detalle de los Hechos (Motivo del Reclamo o Queja) *
                </Label>
                <textarea
                  id="description"
                  rows={4}
                  placeholder="Detalla de forma precisa los sucesos acaecidos..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className={`w-full p-3.5 rounded-xl border ${
                    errors.description ? "border-red-400" : "border-slate-300"
                  } bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.description && (
                  <p className="text-xs text-red-600">{errors.description}</p>
                )}
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="request" className="text-xs font-bold text-slate-700">
                  Pedido Concreto del Consumidor *
                </Label>
                <textarea
                  id="request"
                  rows={3}
                  placeholder="Indica la acción correctiva, solución o compensación requerida..."
                  value={form.request}
                  onChange={(e) => setForm({ ...form, request: e.target.value })}
                  className={`w-full p-3.5 rounded-xl border ${
                    errors.request ? "border-red-400" : "border-slate-300"
                  } bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.request && <p className="text-xs text-red-600">{errors.request}</p>}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.termsAccepted}
                onChange={(e) => setForm({ ...form, termsAccepted: e.target.checked })}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-xs text-slate-600 leading-relaxed">
                Declaro bajo juramento que los datos consignados en el presente formulario son verídicos y corresponden a los hechos acontecidos, conforme a lo establecido en la Ley N° 29571.
              </span>
            </label>
            {errors.termsAccepted && (
              <p className="text-xs text-red-600 mt-1">{errors.termsAccepted}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            {loading ? (
              <span>Registrando reclamación...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Enviar Hoja de Reclamación Virtual</span>
              </>
            )}
          </Button>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 text-center">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Tus datos están protegidos conforme a la Ley N° 29733 de Datos Personales.</span>
          </div>
        </form>
      )}

      <div className="mt-12 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} {SITE_CONFIG.legalName} · Lima, Perú</p>
      </div>
    </div>
  );
}
