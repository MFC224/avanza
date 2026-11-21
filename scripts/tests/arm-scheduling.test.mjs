// Pruebas de agenda, teléfonos, plantillas y validación de solicitudes.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  googleCalendarUrl,
  isBusinessDay,
  isValidSlot,
  limaToUtc,
  openSlots,
  upcomingBusinessDays,
  utcToLima,
} from "../../src/lib/arm/scheduling.ts";
import { formatPhone, normalizePhone, templatesForStage, whatsappLink } from "../../src/lib/crm/whatsapp.ts";
import { chatRequestSchema, leadRequestSchema } from "../../src/lib/arm/schemas.ts";
import { weightedValue } from "../../src/lib/crm/stages.ts";

test("hora de Lima ↔ UTC (UTC-5, sin horario de verano)", () => {
  assert.equal(limaToUtc("2026-11-23", "10:00").toISOString(), "2026-11-23T15:00:00.000Z");
  assert.deepEqual(utcToLima("2026-11-24T02:30:00.000Z"), { date: "2026-11-23", time: "21:30" });
});

test("fines de semana, feriados fijos y Semana Santa no se agendan", () => {
  assert.equal(isBusinessDay("2026-11-23").valid, true); // lunes
  assert.equal(isBusinessDay("2026-11-22").valid, false); // domingo
  assert.equal(isBusinessDay("2026-12-08").valid, false); // Inmaculada Concepción
  assert.equal(isBusinessDay("2026-04-02").valid, false); // Jueves Santo 2026
  assert.equal(isBusinessDay("2026-04-03").valid, false); // Viernes Santo 2026
  assert.equal(isBusinessDay("2026-02-30").valid, false); // fecha imposible
});

test("horarios libres: sin pasados, con 2 h de antelación y sin los ya reservados", () => {
  const now = new Date("2026-11-23T15:30:00.000Z"); // lunes 10:30 a. m. en Lima
  const slots = openSlots("2026-11-23", [], now);
  assert.equal(slots[0], "14:00");
  assert.ok(!slots.includes("12:00"));
  const tomorrow = openSlots("2026-11-24", [limaToUtc("2026-11-24", "10:00").toISOString()], now);
  assert.ok(!tomorrow.includes("10:00"));
  assert.equal(tomorrow.length, 10);
  assert.equal(isValidSlot("2026-11-24", "10:15", now), false);
  assert.equal(isValidSlot("2026-11-24", "10:40", now), true);
  assert.equal(openSlots("2027-03-01", [], now).length, 0); // fuera de la ventana de 21 días
});

test("próximos días hábiles saltan el fin de semana", () => {
  const days = upcomingBusinessDays(3, new Date("2026-11-27T23:00:00.000Z")); // viernes 6 p. m. en Lima
  assert.deepEqual(days, ["2026-11-30", "2026-12-01", "2026-12-02"]);
});

test("enlace de Google Calendar con inicio y fin correctos", () => {
  const url = googleCalendarUrl({ title: "Reunión", details: "x", startUtc: limaToUtc("2026-11-24", "10:00") });
  assert.match(url, /dates=20261124T150000Z%2F20261124T152500Z/);
});

test("teléfonos peruanos y enlaces de WhatsApp", () => {
  assert.equal(normalizePhone("987 654 321"), "51987654321");
  assert.equal(normalizePhone("+51 987-654-321"), "51987654321");
  assert.equal(normalizePhone("123"), null);
  assert.equal(formatPhone("51987654321"), "+51 987 654 321");
  assert.match(whatsappLink("987654321", "Hola Ana"), /^https:\/\/wa\.me\/51987654321\?text=Hola%20Ana$/);
  assert.equal(templatesForStage("propuesta")[0].stages.includes("propuesta"), true);
  assert.equal(weightedValue(4000, "propuesta"), 2400);
});

test("las solicitudes del chat se validan antes de usarlas", () => {
  assert.equal(chatRequestSchema.safeParse({ sessionId: "x", message: "hola" }).success, false);
  assert.equal(chatRequestSchema.safeParse({ sessionId: "arm_abcdef123456", message: "hola" }).success, true);
  const base = { sessionId: "arm_abcdef123456", name: "Ana", phone: "987654321" };
  assert.equal(leadRequestSchema.safeParse(base).success, false); // sin consentimiento
  assert.equal(leadRequestSchema.safeParse({ ...base, consent: true }).success, true);
  assert.equal(leadRequestSchema.safeParse({ ...base, phone: "12", consent: true }).success, false); // sin contacto válido
  assert.equal(leadRequestSchema.safeParse({ ...base, phone: "", email: "ana@empresa.pe", consent: true }).success, true);
});
