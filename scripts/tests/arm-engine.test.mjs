// Pruebas del motor ARM sobre el código real de src/lib (no copias de la lógica).
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  detectIntents,
  detectService,
  extractBudget,
  extractEmail,
  extractName,
  extractPhone,
  extractTimeline,
} from "../../src/lib/arm/extract.ts";
import { buildProfile } from "../../src/lib/arm/profile.ts";
import { planTurn, summarizeProfile, WELCOME_CHIPS } from "../../src/lib/arm/engine.ts";
import { scoreLead } from "../../src/lib/crm/scoring.ts";

test("lee teléfono, correo, nombre y presupuesto del texto", () => {
  assert.equal(extractPhone("mi número es 987 654 321"), "+51987654321");
  assert.equal(extractPhone("+51 942-498-841"), "+51942498841");
  assert.equal(extractPhone("tengo 3 locales"), undefined);
  assert.equal(extractEmail("escríbeme a Juan.Perez@Empresa.pe"), "juan.perez@empresa.pe");
  assert.equal(extractName("Hola, me llamo Rosa Quispe y tengo una botica"), "Rosa Quispe");
  assert.equal(extractName("soy de Arequipa"), undefined);
  assert.equal(extractName("Soy Carlos, gerente de una clínica"), "Carlos");
  assert.equal(extractBudget("tengo S/ 3,500"), 3500);
  assert.equal(extractBudget("unos 5 mil soles"), 5000);
  assert.equal(extractBudget("Menos de S/ 2,000"), 1500);
  assert.equal(extractBudget("$1000"), 3750);
  assert.equal(extractBudget("tengo 3 locales"), undefined);
});

test("detecta plazo, servicio e intención sin confundir pedidos de servicio con reuniones", () => {
  assert.equal(extractTimeline("lo necesito urgente"), "urgente");
  assert.equal(extractTimeline("Solo estoy averiguando"), "explorando");
  assert.equal(detectService("quiero dejar el Excel"), "crm");
  assert.equal(detectService("Quiero una página web"), "web");
  assert.equal(detectService("un chatbot que responda WhatsApp"), "ai");
  assert.equal(detectIntents("necesito un sistema de citas para mi clínica").wantsMeeting, false);
  assert.equal(detectIntents("un bot de WhatsApp").wantsHuman, false);
  assert.equal(detectIntents("¿podemos agendar una videollamada?").wantsMeeting, true);
  assert.equal(detectIntents("quiero hablar con Magno").wantsHuman, true);
});

test("el perfil acumula lo dicho en varios mensajes", () => {
  const p = buildProfile([
    "Hola, tengo una ferretería con 2 locales",
    "Quiero dejar el Excel para controlar inventario y ventas",
    "Este mes",
    "S/ 2,000 a S/ 5,000",
  ]);
  assert.equal(p.serviceId, "crm");
  assert.equal(p.businessType, "Comercio");
  assert.equal(p.timeline, "este_mes");
  assert.equal(p.budgetPEN, 3500);
  assert.match(summarizeProfile(p), /Sistema web o CRM a medida/);
});

test("el puntaje separa un lead caliente de uno frío", () => {
  const hot = scoreLead({ serviceId: "crm", businessType: "Comercio", budgetPEN: 4000, timeline: "este_mes", wantsMeeting: true, hasContact: true, messageCount: 5 });
  assert.equal(hot.temperature, "caliente");
  assert.ok(hot.score >= 60);
  assert.equal(hot.estimatedValuePEN, 4000);
  const cold = scoreLead({ timeline: "explorando" });
  assert.equal(cold.temperature, "frio");
  assert.equal(cold.estimatedValuePEN, null);
  const lowBudget = scoreLead({ serviceId: "mobile", budgetPEN: 1000 });
  assert.ok(lowBudget.reasons.some((r) => r.includes("por debajo")));
});

function turn(messages, asked = []) {
  const profile = buildProfile(messages);
  return planTurn({ profile, lastMessage: messages[messages.length - 1], asked });
}

test("saludo: pregunta qué necesita y ofrece atajos", () => {
  const plan = turn(["hola"]);
  assert.equal(plan.action, "none");
  assert.deepEqual(plan.quickReplies, WELCOME_CHIPS);
  assert.ok(plan.asked.includes("need"));
});

test("precio de un servicio: da el rango del catálogo y sigue calificando", () => {
  const plan = turn(["¿cuánto cuesta una página web?"]);
  assert.match(plan.reply, /S\/ 1,200 a S\/ 2,400/);
  assert.ok(plan.asked.includes("business"));
});

test("precio sin servicio: lista todos los rangos", () => {
  const plan = turn(["¿Cuánto cuesta?"]);
  assert.match(plan.reply, /Página web: S\/ 1,200/);
  assert.match(plan.reply, /App móvil/);
});

test("acciones: reunión → agenda, teléfono → formulario, humano → WhatsApp", () => {
  assert.equal(turn(["quiero agendar una reunión"]).action, "offer_booking");
  assert.equal(turn(["mi whatsapp es 987654321"]).action, "capture_contact");
  assert.equal(turn(["Que me escriban por WhatsApp"]).action, "capture_contact");
  assert.equal(turn(["quiero hablar con un asesor"]).action, "whatsapp_handoff");
});

test("objeción de precio: ofrece etapa inicial y pago 50/50", () => {
  const plan = turn(["quiero un sistema", "está muy caro"]);
  assert.match(plan.reply, /primera etapa/);
  assert.match(plan.reply, /50%/);
});

test("calificación completa sin repetir preguntas hasta proponer el siguiente paso", () => {
  const msgs = ["Quiero dejar el Excel"];
  let plan = turn(msgs);
  assert.ok(plan.asked.includes("business"));
  msgs.push("Tengo una distribuidora de abarrotes");
  plan = turn(msgs, plan.asked);
  assert.ok(plan.asked.includes("timeline"));
  msgs.push("Este mes");
  plan = turn(msgs, plan.asked);
  assert.ok(plan.asked.includes("budget"));
  msgs.push("Aún no lo sé");
  plan = turn(msgs, plan.asked);
  assert.ok(plan.asked.includes("next_step"));
  assert.deepEqual(plan.quickReplies, ["Agendar videollamada", "Que me escriban por WhatsApp"]);
  assert.equal(turn([...msgs, "Agendar videollamada"], plan.asked).action, "offer_booking");
});

import { isFaithful, redactPersonalData } from "../../src/lib/arm/guard.ts";

test("a la IA no le llegan datos personales", () => {
  const out = redactPersonalData("Soy Rosa Quispe, mi correo es rosa@botica.pe, cel 987 654 321, DNI 45678912. Presupuesto 3500 - 5000");
  assert.ok(!out.includes("rosa@botica.pe"));
  assert.ok(!out.includes("987 654 321"));
  assert.ok(!out.includes("45678912"));
  assert.ok(!out.includes("Rosa Quispe"));
  assert.ok(out.includes("3500 - 5000"));
});

test("se descarta la respuesta de la IA si inventa precios u ofertas", () => {
  const draft = "Para una página web la inversión va de S/ 1,200 a S/ 2,400. ¿Para cuándo lo necesitas?";
  assert.equal(isFaithful("Una web cuesta entre S/ 1,200 y S/ 2,400. ¿Para cuándo la necesitas?", draft), true);
  assert.equal(isFaithful("Hoy te la dejamos en S/ 900. ¿Para cuándo?", draft), false);
  assert.equal(isFaithful("Tenemos un descuento del 20% este mes.", draft), false);
  assert.equal(isFaithful("Pagas 50% al empezar.", draft), true);
  assert.equal(isFaithful("La videollamada es gratis.", "Es una videollamada de 25 minutos, sin costo."), true);
});
