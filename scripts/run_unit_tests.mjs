import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.dirname(__dirname);
const SCREENSHOT_DIR = path.join(ROOT_DIR, "screenshots");

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

// -------------------------------------------------------------
// SUT: Functions Under Test (Replicated / Imported Logic)
// -------------------------------------------------------------

// 1. cn() utility function from src/lib/utils.ts
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// 2. robots() function from src/app/robots.ts
function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard",
        "/leads",
        "/clients",
        "/projects",
        "/sprints",
        "/finances",
        "/settings",
        "/login",
      ],
    },
    sitemap: "https://avanza.dev/sitemap.xml",
  };
}

// 3. sitemap() function from src/app/sitemap.ts
function sitemap() {
  const baseUrl = "https://avanza.dev";
  const currentDate = new Date();

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/metodologia`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}

// 4. contactSchema & validation from src/app/(public)/contacto/actions.ts
const contactSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "Por favor ingresa tu nombre (mínimo 2 letras).")
    .max(100),
  contacto: z
    .string()
    .trim()
    .min(5, "Ingresa un número de WhatsApp o correo válido.")
    .max(150),
  servicio: z
    .string()
    .trim()
    .optional()
    .default("Página Web de Alto Impacto"),
  mensaje: z
    .string()
    .trim()
    .optional()
    .default("Solicitud de cotización rápida."),
  _honey: z
    .string()
    .optional()
    .default(""),
});

function sanitizeAndValidateContact(rawInput) {
  const validation = contactSchema.safeParse(rawInput);
  if (!validation.success) {
    return { success: false, error: validation.error.issues[0]?.message };
  }
  const data = validation.data;
  // Honeypot check
  if (data._honey && data._honey.length > 0) {
    return { success: true, isBot: true };
  }

  const isEmail = data.contacto.includes("@");
  const normalizedEmail = isEmail
    ? data.contacto.toLowerCase()
    : `${data.contacto.replace(/\D/g, "")}@lead-whatsapp.avanza.dev`;

  return {
    success: true,
    isBot: false,
    lead: {
      contact_name: data.nombre,
      contact_email: normalizedEmail,
      interest_level: "Alto",
      funnel_status: "Contacto Inicial",
    },
  };
}

// 5. ProjectEstimator Business Logic from src/components/home/project-estimator.tsx
const estimatorServices = [
  { id: "web", name: "Página Web de Alto Impacto", baseDays: "7 a 10 días", roi: "+180% en leads calificados" },
  { id: "crm", name: "Sistema Web / CRM Interno", baseDays: "12 a 14 días", roi: "Ahorro de ~45 hrs manuales / mes" },
  { id: "ai", name: "Automatización con Agentes IA", baseDays: "10 a 14 días", roi: "Atención 24/7 sin personal extra" },
  { id: "app", name: "Aplicación Móvil iOS & Android", baseDays: "14 a 21 días", roi: "Fidelización continua de clientes" },
];

const estimatorUrgencies = [
  { label: "Sprint Express", desc: "Entrega en 7 - 14 días" },
  { label: "Sprint Estándar", desc: "Entrega en 3 - 4 semanas" },
];

const estimatorScales = [
  { label: "Pyme / Negocio Local", desc: "1 a 10 colaboradores" },
  { label: "Empresa en Crecimiento", desc: "10 a 50 colaboradores" },
  { label: "Corporativo", desc: "+50 colaboradores o multi-sucursal" },
];

function generateEstimatorWhatsAppUrl(serviceIdx, urgencyIdx, scaleIdx) {
  const service = estimatorServices[serviceIdx] || estimatorServices[0];
  const urgency = estimatorUrgencies[urgencyIdx] || estimatorUrgencies[0];
  const scale = estimatorScales[scaleIdx] || estimatorScales[0];

  const text = encodeURIComponent(
    `Hola Magno! Usé el Simulador de Proyectos de AVANZA:\n\n` +
    `• Solución: ${service.name}\n` +
    `• Modalidad: ${urgency.label} (${urgency.desc})\n` +
    `• Tamaño: ${scale.label}\n\n` +
    `Me gustaría coordinar una cotización formal y los siguientes pasos.`
  );
  return `https://wa.me/51942498841?text=${text}`;
}

// 6. CommandMenu Search & Filter from src/components/ui/command-menu.tsx
const mockCommands = [
  { id: "nav-home", title: "Ir a Inicio", category: "Navegación" },
  { id: "nav-services", title: "Explorar Servicios", category: "Navegación" },
  { id: "nav-scrum", title: "Metodología SCRUM", category: "Navegación" },
  { id: "nav-about", title: "Conocer al Equipo", category: "Navegación" },
  { id: "nav-contact", title: "Contacto Directo", category: "Navegación" },
  { id: "act-wa", title: "Chatear por WhatsApp", category: "Contacto" },
  { id: "act-call", title: "Llamar a Dirección Técnica", category: "Contacto" },
];

function filterCommands(query, items = mockCommands) {
  if (!query || query.trim() === "") return items;
  const q = query.toLowerCase().trim();
  return items.filter(
    (item) => item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
  );
}

// 7. Client Form Validation from src/app/(dashboard)/clients/actions.ts
function validateClientForm(data) {
  const { name, company, email, status } = data;
  if (!name || !company || !email) {
    throw new Error("Faltan campos requeridos");
  }
  return {
    name: name.trim(),
    company: company.trim(),
    email: email.trim().toLowerCase(),
    status: status || "Activo",
  };
}

// 8. SSR Protected Routes Logic from src/utils/supabase/middleware.ts
const PROTECTED_ROUTES = [
  "/dashboard",
  "/leads",
  "/clients",
  "/projects",
  "/sprints",
  "/finances",
  "/settings",
];

function evaluateSessionProtection(pathname, user) {
  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  if (!user && isProtected) {
    return { shouldRedirect: true, destination: "/login" };
  }
  if (user && pathname === "/login") {
    return { shouldRedirect: true, destination: "/dashboard" };
  }
  return { shouldRedirect: false, destination: null };
}

// -------------------------------------------------------------
// Test Execution Harness
// -------------------------------------------------------------

const unitResults = [];

function test(id, module, description, fn) {
  const start = performance.now();
  let passed = false;
  let details = "";
  try {
    fn();
    passed = true;
    details = "Aserciones superadas satisfactoriamente";
  } catch (err) {
    passed = false;
    details = err.message || String(err);
  }
  const duration = Math.round(performance.now() - start);
  const statusStr = passed ? "PASS" : "FAIL";
  const icon = passed ? "[OK]" : "[XX]";

  unitResults.push({
    id,
    module,
    description,
    status: statusStr,
    details,
    latency_ms: duration,
  });

  console.log(`[${statusStr}] ${icon} ${id} [${module}] ${description} (${duration}ms)`);
  if (!passed) {
    console.error(`      Fallo: ${details}`);
  }
}

function assert(condition, message = "Assertion failed") {
  if (!condition) throw new Error(message);
}

function assertEqual(actual, expected, message = "") {
  if (actual !== expected) {
    throw new Error(`${message} - Esperado: ${JSON.stringify(expected)}, Obtenido: ${JSON.stringify(actual)}`);
  }
}

// -------------------------------------------------------------
// Running Unit Tests Suite
// -------------------------------------------------------------

console.log("=".repeat(75));
console.log("SUITE DE PRUEBAS UNITARIAS AUTOMATIZADAS POR FUNCIÓN: AVANZA");
console.log("Arquitectura: TypeScript + Node 24 + Zod + Tailwind-Merge + Supabase Logic");
console.log("=".repeat(75) + "\n");

// --- MÓDULO 1: cn() (Classnames & Tailwind Merge) ---
test("UT-01", "cn()", "Fusiona clases estándar de Tailwind sin conflictos", () => {
  const res = cn("flex", "items-center", "text-white");
  assertEqual(res, "flex items-center text-white");
});

test("UT-02", "cn()", "Resuelve conflictos de especificidad (Tailwind Merge overrides)", () => {
  const res = cn("p-4 text-red-500", "p-8 text-blue-500");
  assertEqual(res, "p-8 text-blue-500", "p-8 y text-blue-500 deben sobreescribir p-4 y text-red-500");
});

test("UT-03", "cn()", "Filtra valores falsy, undefined, null y booleanos condicionales", () => {
  const res = cn("bg-slate-950", false && "hidden", null, undefined, 0 && "opacity-50", true && "border");
  assertEqual(res, "bg-slate-950 border");
});

// --- MÓDULO 2: robots() (SEO Rules & Crawlers) ---
test("UT-04", "robots()", "Retorna User-Agent comodín '*' permitiendo '/'", () => {
  const res = robots();
  assertEqual(res.rules.userAgent, "*");
  assertEqual(res.rules.allow, "/");
});

test("UT-05", "robots()", "Protege explícitamente todas las rutas de administración y dashboard", () => {
  const res = robots();
  const disallows = res.rules.disallow;
  assert(disallows.includes("/dashboard"), "Debe deshabilitar /dashboard");
  assert(disallows.includes("/leads"), "Debe deshabilitar /leads");
  assert(disallows.includes("/clients"), "Debe deshabilitar /clients");
  assert(disallows.includes("/projects"), "Debe deshabilitar /projects");
  assert(disallows.includes("/sprints"), "Debe deshabilitar /sprints");
  assert(disallows.includes("/finances"), "Debe deshabilitar /finances");
  assert(disallows.includes("/login"), "Debe deshabilitar /login");
});

test("UT-06", "robots()", "Apunta al sitemap canónico de AVANZA", () => {
  const res = robots();
  assertEqual(res.sitemap, "https://avanza.dev/sitemap.xml");
});

// --- MÓDULO 3: sitemap() (Dynamic XML Sitemap Generator) ---
test("UT-07", "sitemap()", "Genera las 5 rutas canónicas públicas principales", () => {
  const items = sitemap();
  assertEqual(items.length, 5, "Deben ser exactamente 5 rutas públicas");
  const urls = items.map((i) => i.url);
  assert(urls.includes("https://avanza.dev"));
  assert(urls.includes("https://avanza.dev/servicios"));
  assert(urls.includes("https://avanza.dev/metodologia"));
  assert(urls.includes("https://avanza.dev/nosotros"));
  assert(urls.includes("https://avanza.dev/contacto"));
});

test("UT-08", "sitemap()", "Asigna prioridades jerárquicas válidas (1.0 raíz, 0.9 comercial, 0.8 institucional)", () => {
  const items = sitemap();
  const root = items.find((i) => i.url === "https://avanza.dev");
  const servicios = items.find((i) => i.url === "https://avanza.dev/servicios");
  const metodologia = items.find((i) => i.url === "https://avanza.dev/metodologia");

  assertEqual(root.priority, 1.0);
  assertEqual(servicios.priority, 0.9);
  assertEqual(metodologia.priority, 0.8);
});

// --- MÓDULO 4: contactSchema & Form Sanitization ---
test("UT-09", "contactForm", "Acepta datos válidos y normaliza correos electrónicos", () => {
  const res = sanitizeAndValidateContact({
    nombre: "  Valeria Rios  ",
    contacto: "  VALERIA@TECHCORP.COM  ",
    servicio: "Automatización con Agentes IA",
    mensaje: "Consulta sobre pipeline LLM.",
  });
  assert(res.success, "Debe ser exitoso");
  assertEqual(res.lead.contact_name, "Valeria Rios");
  assertEqual(res.lead.contact_email, "valeria@techcorp.com");
  assertEqual(res.lead.interest_level, "Alto");
});

test("UT-10", "contactForm", "Normaliza números de teléfono/WhatsApp a dirección lead-whatsapp", () => {
  const res = sanitizeAndValidateContact({
    nombre: "Roberto Vega",
    contacto: "+51 (987) 654-321",
  });
  assert(res.success);
  assertEqual(res.lead.contact_email, "51987654321@lead-whatsapp.avanza.dev");
});

test("UT-11", "contactForm", "Rechaza nombres menores a 2 caracteres con mensaje amigable", () => {
  const res = sanitizeAndValidateContact({
    nombre: "A",
    contacto: "contacto@test.com",
  });
  assert(!res.success);
  assert(res.error.includes("mínimo 2 letras"));
});

test("UT-12", "contactForm", "Rechaza datos de contacto menores a 5 caracteres", () => {
  const res = sanitizeAndValidateContact({
    nombre: "Carlos Gómez",
    contacto: "123",
  });
  assert(!res.success);
  assert(res.error.includes("número de WhatsApp o correo válido"));
});

test("UT-13", "contactForm", "Intercepta envíos de bots automáticamente mediante honeypot (_honey)", () => {
  const res = sanitizeAndValidateContact({
    nombre: "Spam Bot",
    contacto: "spambot@spam.org",
    _honey: "filled_by_malicious_script",
  });
  assert(res.success);
  assertEqual(res.isBot, true, "Debe clasificarlo como bot y descartar inserción a DB");
});

// --- MÓDULO 5: ProjectEstimator Business Calculations ---
test("UT-14", "ProjectEstimator", "Calcula tiempos base y ROI correctos por tipo de solución", () => {
  assertEqual(estimatorServices[0].baseDays, "7 a 10 días");
  assertEqual(estimatorServices[1].baseDays, "12 a 14 días");
  assertEqual(estimatorServices[2].baseDays, "10 a 14 días");
  assertEqual(estimatorServices[3].baseDays, "14 a 21 días");
});

test("UT-15", "ProjectEstimator", "Construye URL de WhatsApp con teléfono oficial y parámetros codificados", () => {
  const url = generateEstimatorWhatsAppUrl(2, 0, 1);
  assert(url.startsWith("https://wa.me/51942498841?text="));
  const decoded = decodeURIComponent(url);
  assert(decoded.includes("Automatización con Agentes IA"));
  assert(decoded.includes("Sprint Express"));
  assert(decoded.includes("Empresa en Crecimiento"));
});

// --- MÓDULO 6: CommandMenu Search Filtering ---
test("UT-16", "CommandMenu", "Filtra comandos por coincidencia de subcadena insensible a mayúsculas", () => {
  const results = filterCommands("servicios");
  assertEqual(results.length, 1);
  assertEqual(results[0].id, "nav-services");
});

test("UT-17", "CommandMenu", "Filtra por categoría (ej. 'Contacto')", () => {
  const results = filterCommands("Contacto");
  assert(results.length >= 2, "Debe contener los comandos de contacto");
});

test("UT-18", "CommandMenu", "Retorna todos los comandos si la búsqueda está vacía", () => {
  const results = filterCommands("");
  assertEqual(results.length, mockCommands.length);
});

// --- MÓDULO 7: Client Administration Validation ---
test("UT-19", "ClientActions", "Valida datos de cliente completos y aplica status 'Activo' por defecto", () => {
  const client = validateClientForm({
    name: "Juan Pérez",
    company: "Inversiones del Sur",
    email: "JUAN@INVERSIONES.COM",
  });
  assertEqual(client.name, "Juan Pérez");
  assertEqual(client.company, "Inversiones del Sur");
  assertEqual(client.email, "juan@inversiones.com");
  assertEqual(client.status, "Activo");
});

test("UT-20", "ClientActions", "Lanza excepción controlada si falta algún campo obligatorio", () => {
  let threw = false;
  try {
    validateClientForm({ name: "Juan", company: "" });
  } catch (err) {
    threw = true;
    assertEqual(err.message, "Faltan campos requeridos");
  }
  assert(threw, "Debe arrojar error cuando faltan campos");
});

// --- MÓDULO 8: SSR Middleware Route Protection Logic ---
test("UT-21", "SSRMiddleware", "Redirige a /login cuando un usuario anónimo intenta acceder a /dashboard", () => {
  const evaluation = evaluateSessionProtection("/dashboard", null);
  assertEqual(evaluation.shouldRedirect, true);
  assertEqual(evaluation.destination, "/login");
});

test("UT-22", "SSRMiddleware", "Protege todas las subrutas administrativas (ej. /projects, /finances)", () => {
  const evalProjects = evaluateSessionProtection("/projects", null);
  const evalFinances = evaluateSessionProtection("/finances/milestones", null);
  assertEqual(evalProjects.shouldRedirect, true);
  assertEqual(evalProjects.destination, "/login");
  assertEqual(evalFinances.shouldRedirect, true);
  assertEqual(evalFinances.destination, "/login");
});

test("UT-23", "SSRMiddleware", "Redirige a /dashboard si un usuario ya autenticado visita /login", () => {
  const evaluation = evaluateSessionProtection("/login", { id: "user_123" });
  assertEqual(evaluation.shouldRedirect, true);
  assertEqual(evaluation.destination, "/dashboard");
});

test("UT-24", "SSRMiddleware", "Permite acceso sin redirección a rutas públicas para cualquier usuario", () => {
  const evalHome = evaluateSessionProtection("/", null);
  const evalServicios = evaluateSessionProtection("/servicios", null);
  assertEqual(evalHome.shouldRedirect, false);
  assertEqual(evalServicios.shouldRedirect, false);
});

// -------------------------------------------------------------
// Resumen Final y Persistencia
// -------------------------------------------------------------

const total = unitResults.length;
const passedCount = unitResults.filter((u) => u.status === "PASS").length;
const rate = ((passedCount / total) * 100).toFixed(1);

console.log("\n" + "=".repeat(75));
console.log(`RESUMEN FINAL UNIT TESTS: ${passedCount}/${total} PRUEBAS SUPERADAS (${rate}%)`);
console.log("=".repeat(75));

const outputPath = path.join(SCREENSHOT_DIR, "unit_test_results.json");
fs.writeFileSync(outputPath, JSON.stringify(unitResults, null, 2), "utf-8");
console.log(`Resultados unitarios guardados en: ${outputPath}`);

if (passedCount !== total) {
  process.exit(1);
} else {
  process.exit(0);
}
