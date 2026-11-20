# Plan de mejoras — sitio público de AVANZA

**Fecha:** 10 de noviembre de 2026
**Sitio revisado:** https://avanza-9djz.vercel.app/
**Reparto de trabajo:** Claude planifica y revisa. Gemini (Antigravity) escribe el código.

---

## Cómo usar este plan

1. Cada tarea tiene un código (`T1.1`, `T1.2`, …) y es independiente dentro de su fase.
2. Pásale a Gemini **una tarea a la vez**, copiando el bloque completo de la tarea.
3. Después de cada tarea, Gemini debe ejecutar `npm run lint` y `npm run build` y pegar el resultado.
4. Al terminar una fase, avísale a Claude para que revise el cambio en el navegador antes de seguir.

### Reglas para Gemini (aplican a todas las tareas)

- Lee `AGENTS.md` y `.agrules` antes de escribir código. Este proyecto usa Next.js 16: consulta `node_modules/next/dist/docs/` si dudas de una API.
- Cambia solo los archivos que nombra la tarea. No reformatees ni renombres nada más.
- Texto visible en español. Nombres de archivos, variables y funciones en inglés.
- No toques `src/app/(dashboard)/`, `src/app/api/` ni `src/lib/arm-*.ts`.
- No actualices `AUDITORIA_AVANZA.md` ni los archivos de `screenshots/` como parte de estas tareas.
- Un commit por tarea, con el código de la tarea en el mensaje. Ejemplo: `fix(home): T1.1 restore sticky scrollytelling`.

### Decisiones ya tomadas por el dueño del proyecto

| Tema | Decisión |
|------|----------|
| Portafolio y catálogo | Todos los proyectos son reales. Se mantienen. |
| Testimonios | Son reales, pero **no hay permiso para nombrar** a las personas ni a las empresas. |
| Público | Dueños y gerentes de pymes, y también jefes de TI. Beneficio de negocio primero, detalle técnico después. |

---

## Fase 1 — Corregir lo roto

### T1.1 — La sección animada con scroll no se queda fija

**Problema.** En la portada, la sección "Sistemas & arquitecturas en acción" mide 360vh y su contenido debería quedarse fijo mientras se hace scroll. No se queda fijo: sube y desaparece, y el visitante ve pantallas azul oscuro vacías.

**Causa 1.** `src/app/(public)/page.tsx`, línea 54. El contenedor raíz de la página tiene `overflow-hidden`. Un ancestro con `overflow: hidden` anula `position: sticky` en sus descendientes.

**Causa 2.** `src/components/home/scrollytelling-showcase.tsx`, líneas 173 y 179. Hay dos hermanos con `sticky top-0 h-screen`. El primero (los brillos de fondo) ocupa 100vh en el flujo, así que el segundo (el contenido) empieza 100vh más abajo. Aunque se arregle la causa 1, el primer tramo de scroll mostraría solo el fondo.

**Cambios.**

1. En `src/app/(public)/page.tsx` línea 54, reemplaza `overflow-hidden` por `overflow-x-clip`.
2. En `src/components/home/scrollytelling-showcase.tsx`, deja **un solo** contenedor `sticky top-0 h-screen`. Mueve el bloque de brillos (línea 173) dentro del contenedor fijo de la línea 179 como capa `absolute inset-0 overflow-hidden pointer-events-none`, detrás del contenido (`-z-10` o equivalente). El contenedor fijo necesita `relative` para eso; `sticky` ya crea el contexto de posicionamiento, así que basta con no quitarlo.
3. Ten en cuenta que el contenedor fijo tiene `max-w-7xl mx-auto`. Los brillos deben seguir cubriendo todo el ancho de la pantalla. Si hace falta, envuelve: un `div` exterior `sticky top-0 h-screen w-full` con los brillos, y dentro el `div` con `max-w-7xl mx-auto h-full` y el contenido.
4. No cambies `useScroll`, los umbrales de etapa ni el contenido de `STAGES`.

**Criterios de aceptación.**

- Al hacer scroll por la sección, las pestañas 01–04 se quedan arriba y el panel cambia de etapa 4 veces.
- No aparece ninguna pantalla vacía dentro de la sección, ni al entrar ni al salir.
- La página no tiene scroll horizontal a 375, 768, 1024 y 1440 px.
- Los brillos decorativos de la portada no generan scroll horizontal.

---

### T1.2 — El menú superior se desborda entre 768 y 1280 px

**Problema.** A 1024 px el contenido de la barra llega a unos 1.230 px. El botón "Cotizar proyecto" queda cortado y toda la página gana una barra de scroll horizontal.

**Dónde.** `src/app/(public)/layout.tsx`:

- Línea 49: `<nav className="hidden md:flex …">` muestra el menú completo desde 768 px.
- Línea 101: el botón del menú móvil usa `md:hidden`.
- Línea 91: el enlace "Cotizar Proyecto" usa `hidden sm:block`.

`src/components/ui/command-menu.tsx`, línea 391: el botón "Buscar" usa `hidden lg:flex`.

**Cambios.**

1. Menú de escritorio: `hidden md:flex` → `hidden xl:flex`.
2. Botón del menú móvil (`SheetTrigger`): `md:hidden` → `xl:hidden`.
3. Botón "Buscar" en `command-menu.tsx`: `hidden lg:flex` → `hidden xl:flex`.
4. No cambies el contenido del menú lateral (`SheetContent`).

**Criterios de aceptación.**

- A 768, 1024 y 1100 px se ve logo, selector de idioma, "Cotizar proyecto" y el botón hamburguesa, sin nada cortado.
- A 1280 y 1440 px se ve el menú completo, sin nada cortado.
- `document.documentElement.scrollWidth === document.documentElement.clientWidth` en todos esos anchos.
- El atajo de teclado del buscador sigue funcionando.

---

### T1.3 — Los testimonios muestran nombres sin permiso

**Problema.** `src/components/home/testimonials.tsx` (líneas 9–33 y 70–77) publica nombre, cargo y empresa de tres clientes. No hay permiso para nombrarlos.

**Cambios.**

1. En el arreglo `reviews`, elimina `name` y `company`. Añade `industry` (rubro) y `companySize` (tamaño). Usa estos valores:

   | Antes | `role` | `industry` | `companySize` |
   |-------|--------|------------|---------------|
   | Carlos Mendoza · Kallpa Pay | CEO y cofundador | Fintech | Startup |
   | Valeria Ríos · TransLogix Perú | Gerente de operaciones | Logística | Empresa mediana |
   | Diego Salcedo · Innova Propiedades | Director de marketing | Inmobiliaria | Empresa mediana |

2. En la tarjeta, reemplaza la inicial del nombre por un icono de Lucide acorde al rubro (`Landmark`, `Truck`, `Building2`).
3. Línea principal: el cargo. Línea secundaria: `{industry} · {companySize}`.
4. Debajo de las tres tarjetas, añade una línea pequeña centrada: "Nombres reservados por acuerdo de confidencialidad."
5. En las citas, quita la mención a "Supabase" de la primera (línea 15) y deja "ya teníamos la plataforma transaccional operando."
6. Busca en todo `src/` si esos nombres o empresas aparecen en otro archivo (`grep -ri "Kallpa Pay\|TransLogix\|Innova Propiedades\|Carlos Mendoza\|Valeria Ríos\|Diego Salcedo" src/`) y repórtalo sin cambiarlo.

**Criterios de aceptación.**

- Ningún nombre de persona ni de empresa cliente aparece en la sección.
- Las tres tarjetas mantienen estrellas, métrica y cita.
- El resultado del `grep` del paso 6 queda pegado en la respuesta.

---

### T1.4 — Etiqueta canónica

**Problema.** La página no declara `canonical`. El sitio ya responde en varias direcciones de Vercel (`avanza-9djz.vercel.app`, `avanza-one.vercel.app`) además del dominio final.

**Cambio.** En `src/app/layout.tsx`, dentro de `metadata`, añade `alternates: { canonical: "/" }`. `metadataBase` ya usa `SITE_CONFIG.url`.

**Criterios de aceptación.**

- El HTML de la portada incluye `<link rel="canonical" href="https://avanzape.com/">` (o el valor de `NEXT_PUBLIC_SITE_URL`).
- Cada página pública declara su propia ruta canónica, no la de la portada. Si alguna hereda `/`, añade `alternates` en su `metadata`.

---

## Fase 2 — Que el contenido se vea sin esperar

### T2.1 — El título de portada nace invisible

**Problema.** En `src/components/home/hero-motion.tsx` (líneas 40–72) la etiqueta, el `h1`, el subtítulo y los botones usan `initial={{ opacity: 0 }}`. El servidor los entrega con opacidad 0 y solo aparecen cuando el JavaScript carga y corre la animación. En un celular lento el visitante ve una pantalla en blanco, y el `h1` es el elemento principal para la métrica LCP.

**Cambios.**

1. El `h1` y el subtítulo deben ser visibles en el HTML del servidor. Quita `opacity: 0` de su estado inicial. Puedes conservar un desplazamiento corto (`y: 12 → 0`) si no oculta el texto.
2. La etiqueta superior y los botones pueden mantener su animación de entrada.
3. No cambies los textos ni los efectos ligados al scroll (`cameraY`, `deviceRotateX`, etc.).

**Criterios de aceptación.**

- Con JavaScript desactivado, el título y el subtítulo se leen.
- En el HTML que devuelve el servidor, el `h1` no tiene `opacity:0` en su atributo `style`.

---

### T2.2 — Secciones que aparecen tarde

**Problema.** `src/components/ui/fade-in-view.tsx` usa `viewport={{ once: true, margin: "-60px" }}` y `duration = 0.6`. Con scroll rápido, o al saltar con un enlace, las secciones de testimonios y la llamada final se ven en blanco un momento.

**Cambios.**

1. Cambia `margin` a `"0px 0px 15% 0px"` para que la animación empiece antes de que el bloque entre en pantalla.
2. Baja `duration` por defecto a `0.45` y `yOffset` a `16`.
3. Respeta `prefers-reduced-motion`: si está activo, renderiza el contenido sin animación (`useReducedMotion` de `motion/react`).

**Criterios de aceptación.**

- Al saltar directo al final de la página, la llamada final ya está visible o aparece en menos de medio segundo.
- Con "reducir movimiento" activado en el sistema, ningún bloque depende de una animación para verse.

---

### T2.3 — Medición en dispositivos reales (la hace el dueño, no Gemini)

- [ ] Abrir la página en un Android y un iPhone con datos móviles.
- [ ] Pasar la portada por PageSpeed Insights, móvil y escritorio. Guardar LCP, CLS e INP.
- [ ] Compartir los resultados con Claude para ajustar las fases siguientes.

---

## Fase 3 — Contenido y confianza

### T3.1 — Portafolio rotativo en español

**Problema.** `src/components/home/squarespace-showcase-carousel.tsx` mezcla inglés en las maquetas: "NEW YORK / LONDON / LIMA", "A creative agency creating iconic identities…", "SCHEDULE A LESSON", "ACADEMIC LESSONS", "Selected Work", "VIEW COLLECTION". `.agrules` pide todo el texto visible en español.

**Cambios.**

1. Traduce al español los textos de interfaz dentro de las maquetas. Conserva los nombres propios de los proyectos.
2. No cambies estructura, animaciones ni estilos.
3. Entrega una tabla "texto anterior → texto nuevo" para que el dueño la apruebe.

**Criterios de aceptación.**

- Ningún texto de interfaz en inglés en las 6 diapositivas, salvo nombres propios y nombres de tecnologías.

---

### T3.2 — Sustento de las cifras (requiere datos del dueño)

Las cifras siguientes están publicadas. Como los proyectos son reales, cada una necesita una fuente que el dueño pueda mostrar si un cliente pregunta.

| Archivo | Cifra |
|---------|-------|
| `squarespace-showcase-carousel.tsx` | +340% conversión de alumnos · +280% ticket promedio · 98.4% citas confirmadas · 12 ms Edge · 0.4 s LLM · 99.99% SLA |
| `template-carousel.tsx` | 0.58 s LCP · +312% conversión de venta · 24.6% ahorro de combustible · 0.4 s inferencia · +45% capacidad · 99.9% precisión de stock |
| `testimonials.tsx` | Lanzamiento en 11 días · Ahorro de 4 h/día · x3 en leads calificados |

**Antes de pasar esta tarea a Gemini, el dueño marca cada cifra:**

- **Mantener** — hay un dato medido que la respalda.
- **Ajustar** — el dato real es otro (indicar cuál).
- **Quitar** — no hay medición.

**Cambio para Gemini (cuando la tabla esté marcada).** Aplica las tres acciones en los archivos indicados. Donde se quite una cifra, reemplázala por un dato descriptivo del proyecto (rubro, alcance o tecnología), sin dejar huecos visuales.

---

### T3.3 — Beneficio primero, detalle técnico después

**Problema.** Varios textos le hablan solo al programador. El público incluye dueños y gerentes.

**Cambios.** En cada bloque, el título y la primera línea expresan el beneficio; el dato técnico pasa a la línea secundaria en letra mono.

| Archivo | Texto actual | Dirección |
|---------|--------------|-----------|
| `hero-motion.tsx` (cifras bajo la portada) | "100% Type-Safe — Next.js 16 & base de datos cloud" | "Menos errores en producción" + línea técnica debajo |
| `hero-motion.tsx` | "Zero Lock-In" | "El código es tuyo" + "sin licencias mensuales" |
| `page.tsx` (pilares, líneas 22–51) | "Arquitectura Cloud — Next.js 16 & bases de datos seguras" | "Rápido y seguro desde el primer día" + línea técnica |
| `page.tsx` (pilares) | "Cero Vendor Lock-In" | "Sin ataduras a proveedores" |
| `comparison-matrix.tsx` | "Row Level Security (RLS) PostgreSQL, Zero-Trust, CSP…" | "Cada usuario ve solo sus datos" + sigla entre paréntesis |

Gemini entrega primero la tabla completa "antes → después" de **todos** los textos que proponga cambiar. No edita código hasta que el dueño apruebe la tabla.

---

### T3.4 — Reducir "élite"

**Problema.** "Élite" aparece en la etiqueta de portada, el título del catálogo, las cuatro tarjetas de pilares ("Estándar Élite"), el simulador y el título de la pestaña del navegador.

**Cambios.**

1. Ejecuta `grep -rn -i "élite\|elite" src/` y lista todas las apariciones.
2. Conserva una sola en la portada. Propón un reemplazo para cada una de las demás (por ejemplo, en los pilares: el nombre del pilar o "Ver cómo trabajamos").
3. El `title` de `src/app/layout.tsx` (línea 32) pasa a "AVANZA Software Studio | Desarrollo de software y plataformas web con IA".
4. Entrega la lista para aprobación antes de editar.

---

## Fase 4 — Acortar y ordenar la portada

La portada mide unos 17.000 px en escritorio y unos 22.800 px en celular. Orden actual en `src/app/(public)/page.tsx`:

`HeroMotion` → `SquarespaceShowcaseCarousel` → `ScrollytellingShowcase` → `TemplateCarousel` → Pilares → Manifiesto → `CinematicReel` → `ComparisonMatrix` → `ProjectEstimator` → `TestimonialsSection` → Llamada final.

### T4.1 — Nuevo orden (aprobado)

**Propuesta de Claude:**

1. `HeroMotion`
2. `SquarespaceShowcaseCarousel` (prueba visual inmediata)
3. `TestimonialsSection` (confianza, sube desde el final)
4. `ScrollytellingShowcase` (qué hacemos)
5. `ProjectEstimator` (conversión, sube)
6. Pilares
7. `ComparisonMatrix`
8. Manifiesto
9. Llamada final

**Se mueven fuera de la portada:**

- `TemplateCarousel` → a `/servicios`. Repite la función del portafolio rotativo.
- `CinematicReel` → a `/metodologia`. Es una demo de terminal que le habla al público técnico.

**Decisión del dueño:** orden aprobado el 10 de noviembre de 2026.

**Cambio para Gemini.** Reordena los componentes en `page.tsx` y monta `TemplateCarousel` y `CinematicReel` en las páginas indicadas, sin cambiar su código interno. Comprueba que los fondos claros y oscuros se alternen sin dos bloques oscuros pegados.

**Criterios de aceptación.**

- Portada en celular (375 px) por debajo de 15.000 px de alto.
- `/servicios` y `/metodologia` cargan sin errores con los componentes nuevos.

---

### T4.2 — Dividir archivos grandes

`.agrules` fija un máximo de 300 líneas por archivo. Hoy:

- `squarespace-showcase-carousel.tsx`: 800 líneas.
- `scrollytelling-showcase.tsx`: 592 líneas.

**Cambios.** Extrae los datos (`SLIDES`, `STAGES`) a archivos `*-data.ts` y cada maqueta o panel a su propio componente en `src/components/home/showcase/` y `src/components/home/scrollytelling/`. Sin cambios visuales ni de comportamiento.

**Criterios de aceptación.**

- Ningún archivo de esas dos carpetas supera 300 líneas.
- Capturas antes y después idénticas a 375 y 1440 px.

Hacer esta tarea **después** de T1.1 y T3.1, que tocan los mismos archivos.

---

## Fase 5 — Lanzamiento en el dominio final

Tareas del dueño, con apoyo de Gemini donde se indica.

- [ ] Conectar `avanzape.com` en Vercel y definir `NEXT_PUBLIC_SITE_URL`.
- [ ] Comprobar que `https://avanzape.com/opengraph-image` carga, y probar la vista previa en WhatsApp y LinkedIn.
- [ ] Revisar `src/app/sitemap.ts` y `src/app/robots.ts` con el dominio final (Gemini).
- [ ] Decidir si los despliegues `*.vercel.app` deben llevar `noindex` (Gemini lo implementa según la variable `VERCEL_ENV`).
- [ ] Probar de punta a punta: simulador → WhatsApp, asistente ARM → agenda, formulario de contacto, Libro de Reclamaciones.
- [ ] Instalar analítica y registrar: clic en "Cotizar proyecto", envío del simulador, apertura del asistente ARM.

---

## Fase 6 — Que no vuelva a pasar

`AUDITORIA_AVANZA.md` certifica "100/100, 0 errores" con 61 pruebas, y los fallos T1.1 y T1.2 pasaron sin detectarse. Las pruebas actuales no miran la página renderizada.

### T6.1 — Pruebas de diseño en navegador

**Cambios.** Añade a `scripts/run_acceptance_tests.mjs` (o a un script nuevo `scripts/run_layout_tests.mjs`) pruebas con un navegador real que verifiquen, a 375, 768, 1024, 1280 y 1440 px:

1. `scrollWidth === clientWidth` en la portada y en cada página pública.
2. Dentro de `ScrollytellingShowcase`, el contenedor fijo tiene `getBoundingClientRect().top === 0` al 25%, 50% y 75% del recorrido de la sección.
3. El `h1` de la portada tiene opacidad 1 en el HTML inicial.
4. Ningún botón del encabezado queda fuera del ancho visible.

Si hace falta una dependencia nueva (por ejemplo Playwright), Gemini la propone y espera aprobación antes de instalarla.

---

## Orden de ejecución

| Orden | Tarea | Depende de | Quién decide antes |
|-------|-------|------------|--------------------|
| 1 | T1.1 | — | — |
| 2 | T1.2 | — | — |
| 3 | T1.3 | — | — |
| 4 | T1.4 | — | — |
| — | **Revisión de Claude en el navegador** | Fase 1 | — |
| 5 | T2.1 | — | — |
| 6 | T2.2 | — | — |
| 7 | T2.3 | T2.1, T2.2 | Dueño mide |
| 8 | T3.1 | — | Dueño aprueba tabla |
| 9 | T3.2 | — | Dueño marca cifras |
| 10 | T3.3 | — | Dueño aprueba tabla |
| 11 | T3.4 | — | Dueño aprueba lista |
| — | **Revisión de Claude** | Fase 3 | — |
| 12 | T4.1 | Fase 3 | Ya aprobado |
| 13 | T4.2 | T1.1, T3.1 | — |
| 14 | T6.1 | Fase 1 | Dueño aprueba dependencia |
| 15 | Fase 5 | Todo lo anterior | Dueño |

---

## Lo que este plan no cubre

- No se revisó el panel interno (`(dashboard)`), el asistente ARM ni las rutas de `api/`.
- No se probaron `/servicios`, `/metodologia`, `/nosotros`, `/contacto`, `/privacidad`, `/terminos` ni `/reclamaciones`. El fallo T1.2 las afecta a todas porque está en el layout compartido.
- No se midió velocidad con una herramienta dedicada. T2.3 lo resuelve.
- Los números de línea corresponden al commit `759572a`. Si el archivo cambió, Gemini debe ubicar el bloque por su contenido.
