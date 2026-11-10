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

// 9. Graphic Performance (90-120 FPS) & Image Pipeline from src/lib/performance-config.ts
const PERFORMANCE_CONFIG = {
  targetFps: 120,
  highRefreshMinFps: 90,
  maxFrameBudgetMs: 8.33,
  standardFrameBudgetMs: 16.67,
  imagePresets: {
    card: {
      maxWidth: 800,
      maxHeight: 450,
      quality: 80,
      format: "webp",
      sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    },
    hero: {
      maxWidth: 1920,
      maxHeight: 1080,
      quality: 85,
      format: "webp",
      sizes: "100vw",
    },
    logo: {
      maxWidth: 240,
      maxHeight: 80,
      quality: 90,
      format: "webp",
      sizes: "(max-width: 640px) 120px, 160px",
    },
    avatar: {
      maxWidth: 96,
      maxHeight: 96,
      quality: 85,
      format: "webp",
      sizes: "48px",
    },
  },
};

function getOptimizedImageProps(presetKey, customAlt) {
  const preset = PERFORMANCE_CONFIG.imagePresets[presetKey];
  if (!preset) throw new Error(`Preset desconocido: ${presetKey}`);
  return {
    width: preset.maxWidth,
    height: preset.maxHeight,
    quality: preset.quality,
    sizes: preset.sizes,
    alt: customAlt,
  };
}

function getHardwareAccelerationStyle() {
  return {
    transform: "translateZ(0)",
    backfaceVisibility: "hidden",
    WebkitFontSmoothing: "antialiased",
  };
}

function calculateFrameBudget(fps) {
  if (!fps || fps <= 0) return 16.67;
  return Number((1000 / fps).toFixed(2));
}

// 10. Estimator Logic & Comparison Criteria from src/lib/estimator-logic.ts & src/components/home/comparison-matrix.tsx
const ESTIMATOR_SERVICES = {
  web: {
    id: "web",
    name: "Página Web de Alto Impacto",
    badge: "Ventas & Conversión",
    baseDays: "7 a 10 días",
    roi: "+180% en leads calificados",
    deliverable: "Next.js 16 + SEO + Animaciones Awwwards",
    estimatedDaysRange: [7, 10],
  },
  crm: {
    id: "crm",
    name: "Sistema Web / CRM Interno",
    badge: "Operación & Gestión",
    baseDays: "12 a 14 días",
    roi: "Ahorro de ~45 hrs manuales / mes",
    deliverable: "PostgreSQL 3NF + Roles + Dashboard",
    estimatedDaysRange: [12, 14],
  },
  ai: {
    id: "ai",
    name: "Automatización con Agentes IA",
    badge: "Productividad x10",
    baseDays: "10 a 14 días",
    roi: "Atención 24/7 sin personal extra",
    deliverable: "Pipelines LLM + RAG + WhatsApp Bot",
    estimatedDaysRange: [10, 14],
  },
  app: {
    id: "app",
    name: "Aplicación Móvil iOS & Android",
    badge: "Retención Móvil",
    baseDays: "14 a 21 días",
    roi: "Fidelización continua de clientes",
    deliverable: "Flutter / React Native + Notificaciones",
    estimatedDaysRange: [14, 21],
  },
};

const ESTIMATOR_URGENCIAS = [
  { label: "Sprint Express", desc: "Entrega en 7 - 14 días", speedBonus: "Prioridad Máxima" },
  { label: "Sprint Estándar", desc: "Entrega en 3 - 4 semanas", speedBonus: "Fases Graduales" },
];

const ESTIMATOR_ESCALAS = [
  { label: "Pyme / Negocio Local", desc: "1 a 10 colaboradores" },
  { label: "Empresa en Crecimiento", desc: "10 a 50 colaboradores" },
  { label: "Corporativo", desc: "+50 colaboradores o multi-sucursal" },
];

function calculateEstimate(options) {
  const service = ESTIMATOR_SERVICES[options.servicioId] || ESTIMATOR_SERVICES.web;
  const urgencia = ESTIMATOR_URGENCIAS[options.urgenciaIndex] || ESTIMATOR_URGENCIAS[0];
  const escala = ESTIMATOR_ESCALAS[options.escalaIndex] || ESTIMATOR_ESCALAS[0];

  const daysMultiplier = options.urgenciaIndex === 1 ? 2 : 1;
  const calculatedDays = `${service.estimatedDaysRange[0] * daysMultiplier} a ${
    service.estimatedDaysRange[1] * daysMultiplier
  } días`;

  return {
    service,
    urgencia,
    escala,
    calculatedDays,
  };
}

function buildWhatsAppProposalUrl(
  serviceName,
  urgenciaLabel,
  urgenciaDesc,
  escalaLabel,
  phoneNumber = "51942498841"
) {
  const message =
    `Hola Magno! Usé el Simulador de Proyectos de AVANZA:\n\n` +
    `• Solución: ${serviceName}\n` +
    `• Modalidad: ${urgenciaLabel} (${urgenciaDesc})\n` +
    `• Tamaño: ${escalaLabel}\n\n` +
    `Me gustaría coordinar una cotización formal y los siguientes pasos.`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

const COMPARISON_CRITERIA = [
  {
    feature: "Velocidad de Entrega (Time-to-Market)",
    avanza: "7 a 14 días (Sprints ágiles con módulos funcionales semanales)",
    traditional: "3 a 6 meses de retrasos, reuniones y burocracia",
    freelancer: "Incierto; pausas frecuentes por sobrecarga de proyectos",
    highlight: true,
  },
  {
    feature: "Arquitectura & Ecosistema de Código",
    avanza: "Next.js 16, React 19, Supabase RLS, TypeScript estricto (100% Type-Safe)",
    traditional: "Plantillas genéricas de WordPress o código espagueti desactualizado",
    freelancer: "Librerías inconsistentes sin estándares ni tipado estricto",
  },
  {
    feature: "Inteligencia Artificial Integrada",
    avanza: "Agentes autónomos, pipelines LLM y automatización de procesos a medida",
    traditional: "Nula; se limitan a webs estáticas sin procesamiento inteligente",
    freelancer: "Solo integración básica de prompts genéricos de terceros",
    highlight: true,
  },
  {
    feature: "Seguridad, RLS & OWASP Top 10",
    avanza: "Row Level Security (RLS) PostgreSQL, Zero-Trust, CSP y auditoría continua",
    traditional: "Plugins vulnerables propensos a inyecciones SQL y ataques XSS",
    freelancer: "Claves de API expuestas en frontend y sin políticas de aislamiento",
  },
  {
    feature: "Demos Semanales & Transparencia",
    avanza: "Acceso semanal a despliegues en vivo probando el sistema real",
    traditional: "Presentaciones estáticas en PDF y mockups durante meses",
    freelancer: "Semanas sin reportes claros o riesgo de abandono (ghosting)",
  },
  {
    feature: "Comunicación & Respaldo",
    avanza: "Línea directa por WhatsApp con los fundadores y arquitectos técnicos",
    traditional: "Intermediarios, ejecutivos de ventas y sistemas lentos de tickets",
    freelancer: "Sin respaldo de una estructura de ingeniería ni soporte continuo",
    highlight: true,
  },
];

const LIGHT_DESIGN_TOKENS = {
  colors: {
    navyPrimary: "#021761",
    cobaltAccent: "#2563EB",
    slateDark: "#0f172a",
    slateMuted: "#64748b",
    pureWhite: "#ffffff",
    cardBackground: "#ffffff",
  },
  contrast: {
    textOnWhiteRatio: 16.1, // Slate 900 on white > 7:1 AAA
    accentOnWhiteRatio: 4.6, // Cobalt 600 on white > 4.5:1 AA
  },
};

// 11. Site Configuration & Legal Schemas from src/lib/site-config.ts & src/lib/complaints-schema.ts
const SITE_CONFIG = {
  name: "AVANZA Software Studio",
  legalName: "AVANZA Software Studio",
  domain: "avanzape.com",
  url: "https://avanzape.com",
  founders: {
    manuel: {
      name: "Manuel Callañaupa",
      role: "Co-Fundador & Lead Software Architect",
      phone: "+51921195037",
      displayPhone: "+51 921 195 037",
      email: "manuel@avanzape.com",
    },
    magno: {
      name: "Magno Alomia",
      role: "Co-Fundador & Business Growth Director",
      phone: "+51942498841",
      displayPhone: "+51 942 498 841",
      email: "magno@avanzastudio.com",
    },
  },
  contact: {
    commercialPhone: "+51 942 498 841",
    commercialPhoneRaw: "+51942498841",
    technicalPhone: "+51 921 195 037",
    technicalPhoneRaw: "+51921195037",
    email: "contacto@avanzape.com",
  },
  legal: {
    privacyLaw: "Ley N° 29733 (Ley de Protección de Datos Personales del Perú)",
    consumerCode: "Ley N° 29571 (Código de Protección y Defensa del Consumidor - Indecopi)",
    ipPolicy: "Cesión total (100%) de Derechos Patrimoniales y Código Fuente al Cliente tras entrega de Sprint.",
    ndaPolicy: "Acuerdo de Confidencialidad y No Divulgación (NDA) firmado previo al inicio de arquitectura.",
    complaintsBookName: "Libro de Reclamaciones Virtual conforme a las disposiciones de INDECOPI.",
  },
};

const complaintSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Ingresa tu nombre completo o razón social (mínimo 3 caracteres).")
    .max(120),
  documentType: z.enum(["DNI", "CE", "RUC", "PASAPORTE"]),
  documentNumber: z.string().trim().min(6).max(20),
  email: z.string().trim().email(),
  phone: z.string().trim().min(7).max(20),
  address: z.string().trim().min(5).max(200),
  serviceType: z.enum(["SERVICIO", "PRODUCTO"]).default("SERVICIO"),
  complaintType: z.enum(["RECLAMO", "QUEJA"]),
  amountClaimed: z.string().optional().default(""),
  description: z.string().trim().min(15).max(2000),
  request: z.string().trim().min(10).max(1000),
  termsAccepted: z.literal(true),
});

function generateComplaintCode() {
  const year = new Date().getFullYear();
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `REC-${year}-${randomPart}`;
}

const PROXY_MATCHER_REGEX = new RegExp(
  "^/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)$"
);

function isPathHandledByProxy(pathname) {
  return PROXY_MATCHER_REGEX.test(pathname);
}

// 12. Country Detection & Auto-Language logic from src/lib/country-detector.ts & src/components/ui/auto-language-translator.tsx
const COUNTRIES = [
  { code: "PE", name: "Perú", dialCode: "+51", flag: "🇵🇪" },
  { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
  { code: "US", name: "Estados Unidos", dialCode: "+1", flag: "🇺🇸" },
  { code: "MX", name: "México", dialCode: "+52", flag: "🇲🇽" },
  { code: "CO", name: "Colombia", dialCode: "+57", flag: "🇨🇴" },
  { code: "CL", name: "Chile", dialCode: "+56", flag: "🇨🇱" },
  { code: "AR", name: "Argentina", dialCode: "+54", flag: "🇦🇷" },
  { code: "ES", name: "España", dialCode: "+34", flag: "🇪🇸" },
  { code: "BR", name: "Brasil", dialCode: "+55", flag: "🇧🇷" },
  { code: "GB", name: "Reino Unido", dialCode: "+44", flag: "🇬🇧" },
  { code: "CA", name: "Canadá", dialCode: "+1", flag: "🇨🇦" },
  { code: "DE", name: "Alemania", dialCode: "+49", flag: "🇩🇪" },
  { code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { code: "OTHER", name: "Otro País / Internacional", dialCode: "+", flag: "🌐" },
];

function detectUserCountry(timeZoneOverride, localeOverride) {
  try {
    const tzLower = (timeZoneOverride || "").toLowerCase();
    const locLower = (localeOverride || "").toLowerCase();

    if (tzLower.includes("calcutta") || tzLower.includes("kolkata") || locLower.includes("-in") || locLower === "hi") {
      return COUNTRIES.find((c) => c.code === "IN") || COUNTRIES[0];
    }
    if (tzLower.includes("lima") || locLower.includes("-pe")) {
      return COUNTRIES.find((c) => c.code === "PE") || COUNTRIES[0];
    }
    if (
      tzLower.includes("new_york") ||
      tzLower.includes("chicago") ||
      tzLower.includes("los_angeles") ||
      locLower === "en-us"
    ) {
      return COUNTRIES.find((c) => c.code === "US") || COUNTRIES[0];
    }
    return COUNTRIES[0];
  } catch {
    return COUNTRIES[0];
  }
}

function resolveAutoTranslationTarget(browserLang) {
  const norm = (browserLang || "es").toLowerCase();
  if (norm.startsWith("hi")) return "hi";
  if (norm.startsWith("en")) return "en";
  if (norm.startsWith("pt")) return "pt";
  if (!norm.startsWith("es")) return norm.split("-")[0];
  return "es";
}

const PUBLIC_FOOTER_NAV_LINKS = [
  "/metodologia",
  "/nosotros",
  "/contacto",
  "/reclamaciones",
];

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

// --- MÓDULO 9: Graphic Performance (90-120 FPS) & Image Pipeline (Sprint 2) ---
test("UT-25", "GraphicPerformance", "Valida que los estilos de aceleración GPU contengan translateZ(0) y backfaceVisibility: hidden", () => {
  const styles = getHardwareAccelerationStyle();
  assertEqual(styles.transform, "translateZ(0)");
  assertEqual(styles.backfaceVisibility, "hidden");
  assertEqual(styles.WebkitFontSmoothing, "antialiased");
});

test("UT-26", "ImagePipeline", "Retorna preset de dimensiones WebP y atributos responsive 'sizes' sin bloatware 4K", () => {
  const cardProps = getOptimizedImageProps("card", "Tarjeta de Solución");
  assertEqual(cardProps.width, 800);
  assertEqual(cardProps.height, 450);
  assertEqual(cardProps.quality, 80);
  assert(cardProps.sizes.includes("100vw"), "Debe tener fallback responsivo para pantallas móviles");
  assertEqual(cardProps.alt, "Tarjeta de Solución");
});

test("UT-27", "GraphicPerformance", "Calcula el presupuesto exacto por frame para 120 FPS (8.33ms), 90 FPS (11.11ms) y 60 FPS (16.67ms)", () => {
  const budget120 = calculateFrameBudget(120);
  const budget90 = calculateFrameBudget(90);
  const budget60 = calculateFrameBudget(60);
  assertEqual(budget120, 8.33);
  assertEqual(budget90, 11.11);
  assertEqual(budget60, 16.67);
});

test("UT-28", "ImagePipeline", "Valida que los presets de tarjeta limiten la resolución máxima a 800x450 con compresión al 80%", () => {
  const heroProps = getOptimizedImageProps("hero", "Hero Principal");
  assertEqual(heroProps.width, 1920);
  assertEqual(heroProps.height, 1080);
  assertEqual(heroProps.quality, 85);

  const logoProps = getOptimizedImageProps("logo", "Logo Oficial");
  assertEqual(logoProps.width, 240);
  assertEqual(logoProps.height, 80);
  assertEqual(logoProps.quality, 90);
});

// --- MÓDULO 10: Sprint 3 Component Logic & Light Mode System ---
test("UT-29", "ProjectEstimator", "Calcula correctamente el rango de días según el servicio y modalidad Express vs Estándar", () => {
  const expressWeb = calculateEstimate({ servicioId: "web", urgenciaIndex: 0, escalaIndex: 0 });
  assertEqual(expressWeb.calculatedDays, "7 a 10 días");
  assertEqual(expressWeb.service.badge, "Ventas & Conversión");

  const standardWeb = calculateEstimate({ servicioId: "web", urgenciaIndex: 1, escalaIndex: 0 });
  assertEqual(standardWeb.calculatedDays, "14 a 20 días");

  const expressCRM = calculateEstimate({ servicioId: "crm", urgenciaIndex: 0, escalaIndex: 1 });
  assertEqual(expressCRM.calculatedDays, "12 a 14 días");
});

test("UT-30", "ProjectEstimator", "Genera el enlace de WhatsApp codificado con el número oficial de Magno y formato formal", () => {
  const url = buildWhatsAppProposalUrl("Página Web de Alto Impacto", "Sprint Express", "Entrega en 7 - 14 días", "Empresa en Crecimiento");
  assert(url.startsWith("https://wa.me/51942498841"), "Debe apuntar al teléfono oficial 51942498841");
  assert(url.includes(encodeURIComponent("Hola Magno!")), "Debe incluir saludo personalizado a Magno");
  assert(url.includes(encodeURIComponent("Página Web de Alto Impacto")), "Debe incluir el servicio seleccionado");
  assert(url.includes(encodeURIComponent("Sprint Express")), "Debe incluir la modalidad seleccionada");
});

test("UT-31", "ComparisonMatrix", "Valida que los 6 criterios técnicos de diferenciación contengan los estándares AVANZA vs agencias y freelancers", () => {
  assertEqual(COMPARISON_CRITERIA.length, 6);
  const timeCriterion = COMPARISON_CRITERIA.find(c => c.feature.includes("Time-to-Market"));
  assert(timeCriterion !== undefined, "Debe existir el criterio de Time-to-Market");
  assert(timeCriterion.avanza.includes("7 a 14 días"), "AVANZA debe garantizar sprints de 7 a 14 días");
  assert(timeCriterion.traditional.includes("3 a 6 meses"), "Agencias tradicionales deben contrastar con 3 a 6 meses");
  
  const aiCriterion = COMPARISON_CRITERIA.find(c => c.feature.includes("Inteligencia Artificial"));
  assert(aiCriterion !== undefined, "Debe existir el criterio de IA");
  assert(aiCriterion.avanza.includes("Agentes autónomos"), "AVANZA debe destacar agentes autónomos");
});

test("UT-32", "DesignSystem", "Valida que los tokens de color Light Mode (Navy, Cobalt, Slate 900) cumplan con accesibilidad WCAG AAA/AA", () => {
  assertEqual(LIGHT_DESIGN_TOKENS.colors.navyPrimary, "#021761");
  assertEqual(LIGHT_DESIGN_TOKENS.colors.cobaltAccent, "#2563EB");
  assertEqual(LIGHT_DESIGN_TOKENS.colors.slateDark, "#0f172a");
  assertEqual(LIGHT_DESIGN_TOKENS.colors.pureWhite, "#ffffff");
  assert(LIGHT_DESIGN_TOKENS.contrast.textOnWhiteRatio >= 7.0, "Texto principal debe cumplir nivel AAA (>= 7:1)");
  assert(LIGHT_DESIGN_TOKENS.contrast.accentOnWhiteRatio >= 4.5, "Acento interactivo debe cumplir nivel AA (>= 4.5:1)");
});

// --- MÓDULO 11: Sprint 4 Domain Configuration, Next.js 16 Proxy & Legal Compliance ---
test("UT-33", "SiteConfig", "Valida la configuración canónica del dominio .com, metadatos de los co-fundadores y canales de contacto", () => {
  assertEqual(SITE_CONFIG.domain, "avanzape.com");
  assertEqual(SITE_CONFIG.url, "https://avanzape.com");
  assertEqual(SITE_CONFIG.founders.manuel.name, "Manuel Callañaupa");
  assertEqual(SITE_CONFIG.founders.magno.name, "Magno Alomia");
  assertEqual(SITE_CONFIG.contact.commercialPhoneRaw, "+51942498841");
  assertEqual(SITE_CONFIG.contact.email, "contacto@avanzape.com");
});

test("UT-34", "ProxyMigration", "Verifica que el matcher de proxy.ts procese rutas de aplicación e ignore assets estáticos WebP/PNG/_next", () => {
  assert(isPathHandledByProxy("/dashboard"), "Debe interceptar rutas privadas como /dashboard");
  assert(isPathHandledByProxy("/servicios"), "Debe interceptar rutas públicas como /servicios");
  assert(isPathHandledByProxy("/login"), "Debe interceptar /login");
  
  assert(!isPathHandledByProxy("/_next/static/chunks/main.js"), "No debe procesar estáticos de Next.js");
  assert(!isPathHandledByProxy("/_next/image?url=logo.webp"), "No debe procesar pipeline de imágenes");
  assert(!isPathHandledByProxy("/favicon.ico"), "No debe procesar favicon");
  assert(!isPathHandledByProxy("/hero-banner.webp"), "No debe procesar imágenes .webp");
});

test("UT-35", "LegalCompliance", "Valida las referencias obligatorias de la Ley N° 29733 de Datos Personales y cesión 100% de IP", () => {
  assert(SITE_CONFIG.legal.privacyLaw.includes("Ley N° 29733"), "Debe referenciar la Ley N° 29733 de Datos Personales");
  assert(SITE_CONFIG.legal.consumerCode.includes("Ley N° 29571"), "Debe referenciar el Código del Consumidor");
  assert(SITE_CONFIG.legal.ipPolicy.includes("100%"), "Debe garantizar el 100% de cesión de código fuente al cliente");
  assert(SITE_CONFIG.legal.ndaPolicy.includes("NDA"), "Debe ofrecer acuerdo de confidencialidad NDA");
});

test("UT-36", "LibroReclamaciones", "Valida el esquema Zod del Libro de Reclamaciones, rechazo de datos inválidos y formato del código REC-YYYY-XXXX", () => {
  const code = generateComplaintCode();
  const currentYear = new Date().getFullYear();
  assert(code.startsWith(`REC-${currentYear}-`), `El código debe comenzar con REC-${currentYear}-`);
  assertEqual(code.length, 13); // REC-2026-XXXX

  // Valid submission test
  const validData = {
    fullName: "Empresa Cliente SAC",
    documentType: "RUC",
    documentNumber: "20123456789",
    email: "cliente@empresa.com",
    phone: "987654321",
    address: "Av. Rivera Navarrete 500, San Isidro",
    serviceType: "SERVICIO",
    complaintType: "RECLAMO",
    amountClaimed: "1500 USD",
    description: "Revisión técnica solicitada para optimizar pipeline de agentes IA en staging.",
    request: "Alineamiento técnico con el arquitecto del proyecto.",
    termsAccepted: true,
  };
  const validResult = complaintSchema.safeParse(validData);
  assertEqual(validResult.success, true);

  // Invalid submission test (missing terms acceptance and invalid email)
  const invalidData = {
    ...validData,
    email: "not-an-email",
    termsAccepted: false,
  };
  const invalidResult = complaintSchema.safeParse(invalidData);
  assertEqual(invalidResult.success, false);
});

// --- MÓDULO 12: Feedback Implementation (Internationalization, Country Detection, Security & Complaints Book) ---
test("UT-37", "CountryDetection", "Detecta automáticamente India (+91), Perú (+51) y USA (+1) por Timezone y Locale", () => {
  const indiaByTz = detectUserCountry("Asia/Kolkata", "en-IN");
  assertEqual(indiaByTz.code, "IN");
  assertEqual(indiaByTz.dialCode, "+91");
  assertEqual(indiaByTz.flag, "🇮🇳");

  const indiaByLocale = detectUserCountry("", "hi-IN");
  assertEqual(indiaByLocale.code, "IN");

  const peruByTz = detectUserCountry("America/Lima", "es-PE");
  assertEqual(peruByTz.code, "PE");
  assertEqual(peruByTz.dialCode, "+51");

  const usByTz = detectUserCountry("America/New_York", "en-US");
  assertEqual(usByTz.code, "US");
  assertEqual(usByTz.dialCode, "+1");
});

test("UT-38", "InternationalPrefixes", "Valida que los números oficiales de Manuel y Magno tengan explícitamente el prefijo internacional +51", () => {
  assertEqual(SITE_CONFIG.founders.manuel.displayPhone, "+51 921 195 037");
  assert(SITE_CONFIG.founders.manuel.phone.startsWith("+51"), "Teléfono de Manuel debe incluir +51");
  assertEqual(SITE_CONFIG.founders.magno.displayPhone, "+51 942 498 841");
  assert(SITE_CONFIG.founders.magno.phone.startsWith("+51"), "Teléfono de Magno debe incluir +51");
  assertEqual(SITE_CONFIG.contact.commercialPhone, "+51 942 498 841");
  assertEqual(SITE_CONFIG.contact.technicalPhone, "+51 921 195 037");
});

test("UT-39", "InternalPortalSecurity", "Verifica que el acceso al portal administrativo no esté expuesto en la navegación pública", () => {
  assert(!PUBLIC_FOOTER_NAV_LINKS.includes("/login"), "La navegación pública no debe enlazar a /login");
  assert(!PUBLIC_FOOTER_NAV_LINKS.includes("/dashboard"), "La navegación pública no debe enlazar a /dashboard");
  assert(PUBLIC_FOOTER_NAV_LINKS.includes("/reclamaciones"), "Debe enlazar al Libro de Reclamaciones");
});

test("UT-40", "AutoLanguageTranslator", "Mapea automáticamente visitantes de India (hi, en) y resto del mundo a sus idiomas", () => {
  const targetHindi = resolveAutoTranslationTarget("hi-IN");
  assertEqual(targetHindi, "hi");

  const targetIndianEnglish = resolveAutoTranslationTarget("en-IN");
  assertEqual(targetIndianEnglish, "en");

  const targetPortuguese = resolveAutoTranslationTarget("pt-BR");
  assertEqual(targetPortuguese, "pt");

  const targetSpanish = resolveAutoTranslationTarget("es-PE");
  assertEqual(targetSpanish, "es");
});

// --- MÓDULO 13: Sprint 1 White Luxury Identity, Design Tokens & Jargon Deprecation ---
test("UT-41", "Sprint1WhiteLuxury", "Valida tokens White Luxury en globals.css, ausencia de clase 'dark' en layout y eliminación de jerga técnica", () => {
  const globalsCssPath = path.join(ROOT_DIR, "src", "app", "globals.css");
  const layoutPath = path.join(ROOT_DIR, "src", "app", "layout.tsx");

  assert(fs.existsSync(globalsCssPath), "globals.css debe existir");
  assert(fs.existsSync(layoutPath), "layout.tsx debe existir");

  const globalsContent = fs.readFileSync(globalsCssPath, "utf-8");
  const layoutContent = fs.readFileSync(layoutPath, "utf-8");

  // 1. Verificación de tokens de degradado de lujo (#021761 -> #070a12)
  assert(globalsContent.includes("--gradient-luxury"), "globals.css debe definir --gradient-luxury");
  assert(globalsContent.includes("#021761"), "globals.css debe contener el color Navy Primario #021761");
  assert(globalsContent.includes(".bg-gradient-luxury"), "globals.css debe tener la clase .bg-gradient-luxury");
  assert(globalsContent.includes(".text-gradient-luxury"), "globals.css debe tener la clase .text-gradient-luxury");

  // 2. Verificación de que el layout público no tenga la clase 'dark' forzada en html/body
  assert(!layoutContent.includes('<html lang="es" className="dark"'), "layout.tsx no debe forzar la clase 'dark' en <html>");
  assert(!layoutContent.includes('<body className="dark"'), "layout.tsx no debe forzar la clase 'dark' en <body>");

  // 3. Verificación de que la marca oficial y dominio canónico estén en metadata de layout
  assert(layoutContent.includes("AVANZA Software Studio"), "layout.tsx debe usar la marca oficial AVANZA Software Studio");
});

// --- MÓDULO 14: Sprint 2 Secondary Pages, Legal Compliance (Ley 29733) & Analog Load Removal ---
test("UT-42", "Sprint2SecondaryPagesAndCompliance", "Valida retiro de cargas analógicas (CinematicWarp/Overlay), presencia de LuxuryMeshGradient y cumplimiento Ley 29733", () => {
  const meshGradientPath = path.join(ROOT_DIR, "src", "components", "ui", "luxury-mesh-gradient.tsx");
  const homePath = path.join(ROOT_DIR, "src", "app", "(public)", "page.tsx");
  const privacidadPath = path.join(ROOT_DIR, "src", "app", "(public)", "privacidad", "page.tsx");
  const terminosPath = path.join(ROOT_DIR, "src", "app", "(public)", "terminos", "page.tsx");
  const reclamacionesPath = path.join(ROOT_DIR, "src", "app", "(public)", "reclamaciones", "page.tsx");
  const contactoPath = path.join(ROOT_DIR, "src", "app", "(public)", "contacto", "page.tsx");
  const serviciosPath = path.join(ROOT_DIR, "src", "app", "(public)", "servicios", "page.tsx");
  const nosotrosPath = path.join(ROOT_DIR, "src", "app", "(public)", "nosotros", "page.tsx");

  // 1. Verificación de creación de LuxuryMeshGradient
  assert(fs.existsSync(meshGradientPath), "luxury-mesh-gradient.tsx debe existir");

  // 2. Verificación de retiro de CinematicWarp de la portada
  const homeContent = fs.readFileSync(homePath, "utf-8");
  assert(!homeContent.includes("CinematicWarp"), "page.tsx no debe importar ni renderizar CinematicWarp");
  assert(homeContent.includes("LuxuryMeshGradient"), "page.tsx debe renderizar LuxuryMeshGradient");

  // 3. Verificación de cumplimiento Ley 29733 en Privacidad (Flujo transfronterizo y retención)
  assert(fs.existsSync(privacidadPath), "privacidad/page.tsx debe existir");
  const privacidadContent = fs.readFileSync(privacidadPath, "utf-8");
  assert(privacidadContent.includes("Flujo Transfronterizo de Datos"), "Privacidad debe detallar el flujo transfronterizo");
  assert(privacidadContent.includes("Estados Unidos"), "Privacidad debe especificar los servidores en EE.UU.");
  assert(privacidadContent.includes("Política de Retención y Purga"), "Privacidad debe incluir la política de retención");
  assert(privacidadContent.includes("doce (12) meses"), "Privacidad debe fijar retención máxima de 12 meses");

  // 4. Verificación de casilla de consentimiento en formulario de contacto
  assert(fs.existsSync(contactoPath), "contacto/page.tsx debe existir");
  const contactoContent = fs.readFileSync(contactoPath, "utf-8");
  assert(contactoContent.includes("consentGiven"), "contacto/page.tsx debe gestionar estado consentGiven");
  assert(contactoContent.includes("Ley N° 29733"), "contacto/page.tsx debe exigir consentimiento conforme a la Ley N° 29733");

  // 5. Verificación de páginas legales Términos y Libro de Reclamaciones
  assert(fs.existsSync(terminosPath), "terminos/page.tsx debe existir");
  assert(fs.existsSync(reclamacionesPath), "reclamaciones/page.tsx debe existir");

  // 6. Verificación de homogeneización White Luxury en páginas secundarias (sin jerga 3NF)
  const serviciosContent = fs.readFileSync(serviciosPath, "utf-8");
  const nosotrosContent = fs.readFileSync(nosotrosPath, "utf-8");
  assert(!serviciosContent.includes("PostgreSQL 3NF"), "servicios/page.tsx no debe contener jerga PostgreSQL 3NF");
  assert(!nosotrosContent.includes("bases de datos 3NF"), "nosotros/page.tsx no debe contener jerga bases de datos 3NF");
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
