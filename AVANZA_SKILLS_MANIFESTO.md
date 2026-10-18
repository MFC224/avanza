# AVANZA Skills & Architecture Manifesto
> Guía maestra de estándares de ingeniería, diseño visual, animación, ciberseguridad y observabilidad para **AVANZA** (Agencia de IA & Software de Élite).

---

## 1. Animación, 3D e Interactividad (Awwwards-Level Polish)

| Librería / Skill | Función en AVANZA | Regla de Implementación |
| :--- | :--- | :--- |
| **`motion` / `framer-motion`** | Animaciones declarativas, transiciones de entrada y layout animations. | Usar `import { motion } from "motion/react"` en componentes cliente. Aplicar curvas bezier orgánicas (`ease: [0.22, 1, 0.36, 1]`) evitando movimientos mecánicos lineales. |
| **`greensock/GSAP`** | ScrollTrigger y timelines de alta precisión gráfica. | Emplear para micro-efectos complejos que requieren sincronización milimétrica con el scroll sin recargar el hilo principal de React. |
| **`darkroomengineering/lenis`** | Smooth scrolling ultraligero y fluido. | Integrar un wrapper de scroll suave que elimine saltos bruscos entre secciones y proporcione sensación de producto de lujo. |
| **`magicuidesign/magicui`** | Componentes de landing page (shimmer badges, bordes resplandecientes, particle beams). | Adaptar directamente como componentes nativos de Tailwind (`shimmer-badge.tsx`, `background-grid.tsx`) sin bloatware de dependencias externas. |
| **`aceternity-ui`** | Spotlight cards, background beams, efectos 3D tilt y cards interactivas. | Utilizar el patrón de escucha de coordenadas `(clientX, clientY)` para proyectar haces de luz radial (`SpotlightCard`) sobre fondos `bg-slate-900/950`. |
| **`pmndrs/react-three-fiber` + `drei`** | Escenas 3D interactivas y shaders en tiempo real. | Usar de forma lazy (`next/dynamic` con `{ ssr: false }`) en el Hero o elementos insignia para no penalizar el First Contentful Paint (FCP). |
| **`splinetool/react-spline`** | Integración de objetos 3D interactivos exportados de Spline. | Ideal para modelos futuristas (robots, nodos de red neuronales) con interactividad por mouse hover. |
| **`catdad/canvas-confetti`** | Micro-interacciones de feedback visual y celebración. | Disparar tras el envío exitoso de formularios comerciales o hitos completados (`confetti({ particleCount: 120, spread: 80 })`). |
| **`emilkowalski/vaul`** | Drawers móviles con físicas de arrastre naturales (drag-to-dismiss). | Usar en lugar de modales estándar en smartphones para una experiencia tipo app nativa. |

---

## 2. Diseño Visual, Componentes y UI/UX Polish

- **`shadcn/ui` + `radix-ui/primitives`:** Base de componentes accesibles (WAI-ARIA compliance, navegación por teclado completa). Todos los componentes se colocan en `src/components/ui/` sin estilos rígidos impuestos.
- **`tailwindlabs/tailwindcss` (v4) + `tailwind-merge`:** Resolución de clases dinámicas (`cn(...)`) evitando bugs de especificidad en componentes reutilizables.
- **`lucide-react`:** Iconografía unificada, moderna y optimizada por SVG.
- **`emilkowalski/sonner`:** Sistema de notificaciones tipo Toast flotantes con colas apilables y animaciones de resorte fluidas.
- **`pacocoursey/cmdk`:** Paleta de comandos (`Ctrl + K` / `Cmd + K`) en el panel interno del Dashboard para navegar rápido entre Clientes, Proyectos y Métricas.
- **`pacocoursey/next-themes`:** Soporte de tema oscuro nativo sin parpadeo de pantalla blanca (FOUC).

---

## 3. Creación de Páginas Web y Arquitectura Next.js

- **Next.js 16 (App Router):** Separación estricta entre `app/(public)` (rutas estáticas/SSG/ISR con SEO de alto impacto) y `app/(dashboard)` (rutas dinámicas con SSR y autenticación protegida).
- **`alan2207/bulletproof-react`:** Estructura modular dividida en características (`features`), hooks desacoplados y servicios aislados.
- **`colinhacks/zod`:** Validación estricta en tiempo de ejecución tanto en formularios cliente como en Server Actions y endpoints API.
- **`@supabase/ssr`:** Clientes dedicados de browser (`createBrowserClient`) y servidor (`createServerClient` con gestión segura de cookies).
- **`date-fns`:** Manejo inmutable y ligero de fechas para el cálculo de Sprints, hitos de pago y auditorías temporales.

---

## 4. Pruebas de Calidad (QA), Testing y Accesibilidad

- **`microsoft/playwright`:** Pruebas End-to-End automatizadas para validar flujos críticos:
  - Intento de acceso no autenticado a `/dashboard` -> Redirección a `/login`.
  - Envío del formulario en `/contacto` -> Creación de `companies` y `leads` en Supabase.
- **`vitest` + `@testing-library/react`:** Pruebas unitarias de componentes aislados y Server Actions.
- **`dequelabs/axe-core` & `GoogleChrome/lighthouse`:** Auditoría de accesibilidad WCAG 2.1 AA y puntuaciones superiores a 95 en Core Web Vitals (LCP < 2.5s, CLS < 0.1, INP < 200ms).

---

## 5. Ciberseguridad, Protección Web y RLS

- **PostgreSQL Row Level Security (RLS) en Supabase:**
  - `leads`: Inserción pública (`ANON`) restringida a creación de prospectos; lectura y actualización exclusiva para usuarios autenticados con rol `admin`.
  - `projects`, `sprints`, `qa_tests`, `financial_milestones`: Políticas RLS estrictas vinculadas al ID de usuario o cliente respectivo.
- **OWASP Top 10 Mitigation:** Sanitización de inputs, protección CSRF nativa en Server Actions, cabeceras seguras (`Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`).
- **Secret Scanning (`trufflehog`):** Prohibición absoluta de comitear tokens de Supabase Service Role o claves API privadas en repositorios públicos.

---

## 6. Observabilidad, Rendimiento y Ecosistema de Skills/MCP

- **Sentry / PostHog:** Monitoreo en tiempo real de excepciones no capturadas, sesiones de usuario y embudos de conversión de prospectos.
- **Core Web Vitals (`web-vitals`):** Medición de métricas de usuario real (RUM) para optimización constante de tiempos de renderizado.
- **MCP (Model Context Protocol):** Conexión de herramientas y servidores para acelerar el desarrollo asistido por IA garantizando que el agente siempre conozca la base de código real y el esquema de base de datos.
