# Auditoría del sitio — AVANZA Software Studio

**Fecha:** 19 de noviembre de 2026
**Sitio auditado:** https://www.avanzape.com/ (producción) y https://avanza-9djz.vercel.app/
**Código:** rama `main`, commit `b21a56c`
**Autor:** Claude (planificación y revisión). La implementación la hace Gemini (Antigravity).

---

## 0. Resumen

El rediseño está publicado y el dominio final funciona. La estructura, el portafolio real y la portada fotográfica van en la dirección acordada.

Hay **un fallo de código que rompe la lectura en cinco lugares** y que hay que corregir antes que nada:

> Las clases tipográficas propias (`text-section`, `text-card`, `text-body`…) chocan con Tailwind y con `tailwind-merge`. Resultado: **10 textos son blancos sobre fondo blanco** (invisibles) y **los títulos de las páginas interiores salen en 16 px** en lugar de 40 px.

| Prioridad | Cantidad | Ejemplos |
|-----------|----------|----------|
| Crítica | 3 | Textos invisibles, títulos interiores diminutos, páginas sin `h1` |
| Alta | 6 | Canónica apunta a una redirección, 6 imágenes siguen en negro, portada se apartó de lo aprobado |
| Media | 9 | Jerga técnica, títulos de pestaña duplicados, encabezado transparente que se pisa con los botones |
| Baja | 6 | Avisos de lint, archivos largos, restos decorativos |

**Cómo se revisó:** recorrido en navegador a 1024 px y 375 px, medición de estilos y contraste con scripts en la página, descarga del HTML de las 8 páginas públicas, `tsc`, `eslint`, `tailwind-merge` ejecutado aparte y lectura del código.

---

## 1. Críticos

### A1 — 10 textos blancos sobre fondo blanco

**Dónde (portada):**

| Sección | Texto invisible |
|---------|-----------------|
| Testimonios | Las 3 citas completas |
| Simulador | El título de cada opción seleccionada ("Página Web de Alto Impacto", "Sprint Express", "Pyme / Negocio Local") |
| Cómo trabajamos | Los 4 títulos del acordeón ("Velocidad SCRUM", "Arquitectura Cloud"…) |

Contraste medido: **1,0 : 1** en los diez casos. El mínimo es 4,5 : 1.

**Causa.** `globals.css` define la variable de tema `--color-card: #ffffff` para shadcn. Tailwind v4 genera entonces una utilidad de color `.text-card { color: var(--color-card) }`. La clase tipográfica propia también se llama `text-card`, así que cada elemento que la usa recibe **color blanco**, y ese color gana sobre `text-[var(--ink)]`.

Archivos: `testimonials.tsx:62`, `pillars-accordion.tsx:86`, `project-estimator.tsx:82, 118, 153`.

### A2 — Títulos de páginas interiores en 16 px

En `/servicios`, `/nosotros`, `/metodologia` y `/contacto`, el título de cada sección se ve como texto normal (16 px, peso 400). Lo mismo pasa con los párrafos de descripción (16 px en vez de 18 px).

**Causa.** `section-heading.tsx` arma las clases con `cn()`, que usa `tailwind-merge`. Esa librería no conoce `text-section` ni `text-body`, las toma como clases de color y **las borra** cuando ve después `text-[var(--ink)]`. Comprobado ejecutando la función:

```
cn("text-section font-normal …", "text-[var(--ink)]")
→ "font-normal … text-[var(--ink)]"     ← text-section desaparece
```

En la portada los títulos sí miden 40 px porque esos bloques no pasan por `cn()`.

**Corrección para A1 y A2 (una sola tarea).** Renombrar las seis utilidades a un prefijo que no empiece por `text-`:

| Antes | Después |
|-------|---------|
| `text-display` | `type-display` |
| `text-section` | `type-section` |
| `text-card` | `type-card` |
| `text-body` | `type-body` |
| `text-small` | `type-small` |
| `text-button` | `type-button` |

Reemplazar en `globals.css` y en los 23 archivos de `src/` que las usan. No hace falta tocar `tailwind-merge`.

**Aceptación:** el script de contraste de la sección 7 devuelve 0 fallos en la portada; `SectionHeading` produce títulos de 40 px en escritorio en todas las páginas.

### A3 — Cuatro páginas sin título principal

`/servicios`, `/metodologia`, `/nosotros` y `/contacto` no tienen `h1`. Su encabezado más alto es un `h2`. Afecta al posicionamiento en buscadores y a los lectores de pantalla.

**Corrección.** Añadir a `SectionHeading` una propiedad `as?: "h1" | "h2"` (por defecto `h2`) y usar `as="h1"` en el primer encabezado de cada página interior. Aplicar a ese primer título el nivel `type-display`.

---

## 2. Altos

### B1 — La canónica y el sitemap apuntan a una redirección

`https://avanzape.com/` responde **308 → `https://www.avanzape.com/`**. Pero la etiqueta canónica, el `sitemap.xml`, `robots.txt`, el JSON-LD y la imagen para redes usan `https://avanzape.com` (sin `www`). Google recibe la señal de que la página principal es una dirección que redirige.

**Corrección (elegir una):**
- En Vercel, marcar `avanzape.com` como dominio principal y que `www` redirija a él. **Recomendado:** no requiere cambiar código.
- O definir `NEXT_PUBLIC_SITE_URL=https://www.avanzape.com` en Vercel y volver a desplegar.

### B2 — Seis imágenes siguen siendo rectángulos negros

`services-web`, `services-crm`, `services-ai`, `services-fintech`, `founders-portrait` y `cta-empty-studio-dawn` pesan entre 1,5 y 1,8 KB: son los marcadores de color sólido. En la sección "Qué hacemos" se ve un recuadro negro junto a cada servicio. Las tareas G2 a G6 de `ENCARGO_IMAGENES.md` siguen pendientes.

### B3 — `/servicios` usa fotos de Unsplash

Las 6 tarjetas de `/servicios` cargan fotos de `images.unsplash.com` (laptop con código, panel, celular con apps). No están en `IMAGENES.md` ni siguen la dirección de arte acordada (fotos con pantallas llenas de interfaces y logos). Reemplazarlas por las imágenes G2 a G5 cuando existan, o registrar su autor y licencia.

### B4 — La portada se apartó del diseño aprobado

El commit `1a6f436` ("super banner") cambió la primera pantalla:

| Aprobado (`MEJORAS_VISUALES.md`, V2.2) | Publicado |
|----------------------------------------|-----------|
| "Software a medida / que hace crecer tu empresa" (2 líneas) | 4 líneas en escritorio y móvil |
| Sin cursiva serif | Media frase en cursiva azul |
| Sin etiqueta superior | Píldora en mayúsculas mono "SOFTWARE STUDIO · PLATAFORMAS DIGITALES & IA" |
| Un botón | Dos botones |
| Debajo asoma la fila del portafolio | Debajo hay un "super banner" con pestañas, que repite el mismo portafolio de la sección siguiente |
| Pesos 300–500 | Vuelven 600, 700 y 900 |

La skill oficial de Anthropic `frontend-design` señala exactamente estos recursos (resaltar una sola frase del título, etiquetas en mayúsculas sobre el título, cadenas con punto medio, flechas en los botones, etiquetas en fuente mono) como las marcas más comunes de una página genérica.

**Decisión del dueño:** volver a la portada aprobada, o aprobar la nueva y actualizar `MEJORAS_VISUALES.md`.

### B5 — El portafolio aparece dos veces seguidas

El "super banner" de la portada y la fila "Sistemas y plataformas en producción" muestran los mismos proyectos, uno debajo del otro. Quedarse con uno.

### B6 — Testimonios sin respaldo en el portafolio

Las tres citas hablan de una fintech, una empresa de logística y una inmobiliaria. Ninguno de los 6 proyectos reales es de esos rubros. Sigue pendiente la decisión de la sección 7.3 de `ENCARGO_IMAGENES.md`.

---

## 3. Medios

| # | Hallazgo | Dónde | Corrección |
|---|----------|-------|------------|
| C1 | Jerga técnica en casi todas las páginas: Next.js, Supabase, PostgreSQL, RLS, Awwwards, Vendor Lock-In, Zero-Trust | `/`, `/servicios`, `/nosotros`, `/terminos`, `/privacidad` | Aplicar la tarea T3.3 a las páginas interiores. En privacidad y términos, la jerga puede quedarse si es necesaria para el sentido legal. |
| C2 | Marca duplicada en el título de la pestaña: "… \| AVANZA \| AVANZA Software Studio" | `servicios`, `metodologia`, `contacto`, `reclamaciones`, `nosotros` | Quitar "\| AVANZA" del `title` de cada página; la plantilla ya añade el nombre. `nosotros` además dice "AVANZA AI & Software Studio". |
| C3 | El encabezado queda transparente durante 1.312 px. Al bajar, los botones de la portada pasan por debajo del menú y se ven encimados. | `layout.tsx` (encabezado) | Volver al criterio de V1.4: fondo sólido a partir de 80 px de scroll. |
| C4 | La cifra "7 a 14 Días" se parte en dos líneas. | `metrics-strip.tsx` | `whitespace-nowrap` o "7–14 días". |
| C5 | El acordeón de pilares muestra "· Sprints de 7 a 14 días" con un punto suelto delante, y el título repite el mismo texto. | `pillars-accordion.tsx` | Mostrar el subtítulo una sola vez y quitar el punto. |
| C6 | Portada en móvil: 12.739 px de alto y un título de 4 líneas. | Portada | Meta del plan: menos de 13.000 px y máximo 3 líneas. Se resuelve con B4 y B5. |
| C7 | El campo trampa antispam (`_honey`) no está oculto para lectores de pantalla. | `/contacto` | `aria-hidden="true"` y `tabIndex={-1}` en el contenedor. |
| C8 | Los despliegues de `*.vercel.app` son indexables (`robots: Allow`). Solo los protege la canónica. | `robots.ts` | Devolver `Disallow: /` cuando el host no sea el dominio final. |
| C9 | Sin cabecera `Content-Security-Policy`. Las demás cabeceras de seguridad sí están. | `next.config.ts` | Añadir una CSP que permita Google Analytics y el traductor. Probar antes en modo `Report-Only`. |

---

## 4. Bajos

| # | Hallazgo |
|---|----------|
| D1 | `eslint`: 0 errores, 12 avisos. Varios en `auto-language-translator.tsx` por modificar `document.cookie` dentro del componente. |
| D2 | `tsc --noEmit`: sin errores. |
| D3 | Archivos de más de 300 líneas (límite de `.agrules`): `command-menu.tsx` (399), `not-found.tsx` (396), `arm-scheduling.ts` (313). Comprobar si `command-menu.tsx` sigue en uso; el buscador se quitó del encabezado. |
| D4 | Restos decorativos: `luxury-mesh-gradient.tsx` sigue en el proyecto; la portada conserva divs desenfocados de 1.100–1.200 px y pulsos `animate-ping`. |
| D5 | 17 enlaces o botones en móvil miden menos de 32 px de alto o ancho. El mínimo recomendado es 44 px. |
| D6 | El globo "¿Tienes un proyecto en mente?" se superpone al contenido en escritorio en varias secciones. |

---

## 5. Lo que está bien

- Dominio final activo con HTTPS, HSTS con `preload`, `X-Frame-Options`, `nosniff`, `Referrer-Policy` y `Permissions-Policy`.
- Las 8 páginas públicas responden 200; la página 404 responde 404.
- Sitemap con las 8 páginas; `robots.txt` bloquea el panel interno.
- JSON-LD de organización válido, Google Analytics instalado, íconos de la web completos.
- Sin scroll horizontal en 375 y 1024 px.
- Portafolio con los 6 proyectos reales y sus capturas.
- Sin menciones a "élite" ni a los nombres de proyectos anteriores.
- Formulario de contacto con etiquetas en todos los campos visibles y aceptación de la política de privacidad.

---

## 6. Skills de diseño encontradas en GitHub

Revisé los repositorios directamente (estrellas, licencia, última actividad y contenido de cada `SKILL.md`).

| Skill | Repositorio | Licencia | Estrellas | Qué aporta | Riesgo | Recomendación |
|-------|-------------|----------|-----------|------------|--------|---------------|
| **frontend-design** (oficial de Anthropic) | `anthropics/claude-plugins-official` | Apache-2.0 | 47.700 | Dirección de arte, escala tipográfica, lista de recursos que delatan una página genérica, proceso de plan → revisión → construcción → crítica. | Ninguno: un solo archivo de 9 KB, sin scripts. | **Instalar.** |
| **web-design-guidelines** (Vercel) | `vercel-labs/agent-skills` | No declarada | 34.600 | Auditoría de interfaz con más de 100 reglas (accesibilidad, formularios, foco, movimiento) y salida en formato `archivo:línea`. | Bajo: descarga sus reglas de GitHub en cada uso. | **Instalar** para auditorías. |
| **impeccable** | `pbakaus/impeccable` | Apache-2.0 | 113.500 | Comandos `critique`, `audit`, `polish`, `typeset`, `layout`, `animate`; crea un `DESIGN.md`. Trae versión para Gemini y Antigravity. | Medio: su lanzador **descarga y ejecuta un binario** la primera vez. Funciona sin él leyendo sus archivos de referencia. | Instalar **sin el lanzador**, o solo para Gemini. |
| taste-skill | `Leonxlnx/taste-skill` | MIT | 119.000 | Genera páginas completas con paletas y "momentos" propios, con verificación en navegador. | Alto: instala un *hook* que ejecuta scripts de Node en cada respuesta y empuja su propia estética. | No instalar: choca con la dirección ya aprobada. |
| ui-ux-pro-max | `nextlevelbuilder/ui-ux-pro-max-skill` | MIT | 151.800 | Base de datos de estilos, paletas y combinaciones tipográficas, con scripts de Python. | Medio: ejecuta Python. | No hace falta: la dirección visual ya está decidida. |
| hallmark | `Nutlope/hallmark` | MIT | 58.100 | Linter "anti-genérico" y flujo de `PRODUCT.md` / `DESIGN.md`. | No revisado a fondo. | Opcional, en una segunda etapa. |

**Cómo se usarían en este proyecto:**

- **Claude** usaría `frontend-design` y `web-design-guidelines` para revisar cada entrega de Gemini con criterios publicados, no solo con el plan.
- **Gemini** podría usar `impeccable` (tiene carpetas `.gemini/` y `.agent/`) con los comandos `polish` y `typeset` sobre cada sección.

Ninguna skill corrige los fallos A1 a A3: son errores de código y se arreglan con las tareas de este informe.

---

## 7. Tareas para Gemini, en orden

1. **A1 + A2** — Renombrar las utilidades `text-*` a `type-*`. Un commit.
2. **A3** — Propiedad `as` en `SectionHeading` y un `h1` por página interior.
3. **B1** — Lo hace el dueño en Vercel (dominio principal).
4. **C2, C4, C5, C7** — Correcciones pequeñas de texto y marcado. Un commit cada una.
5. **C3** — Fondo del encabezado a partir de 80 px.
6. **B4 + B5** — Solo después de la decisión del dueño sobre la portada.
7. **B2, B3** — Imágenes G2 a G6 de `ENCARGO_IMAGENES.md`.
8. **C1, C8, C9, D1–D6** — En una segunda ronda.

**Script de verificación de contraste.** Pegarlo en la consola del navegador en cada página después de corregir A1. Debe devolver `0`:

```js
(() => {
  const p = c => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const a = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); return { r: a[0], g: a[1], b: a[2], a: a[3] ?? 1 }; };
  const L = c => { const f = v => (v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); };
  const bg = e => { for (let n = e; n; n = n.parentElement) { const s = getComputedStyle(n); if (s.backgroundImage !== "none") return null; const q = p(s.backgroundColor); if (q && q.a > 0.5) return q; } return { r: 255, g: 255, b: 255 }; };
  const bad = [];
  for (const e of document.querySelectorAll("body *")) {
    if (![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 1)) continue;
    const r = e.getBoundingClientRect(); if (!r.width || !r.height) continue;
    const s = getComputedStyle(e), f = p(s.color), b = bg(e); if (!f || !b) continue;
    const cr = (Math.max(L(f), L(b)) + 0.05) / (Math.min(L(f), L(b)) + 0.05);
    if (cr < (parseFloat(s.fontSize) >= 24 ? 3 : 4.5)) bad.push([e.textContent.trim().slice(0, 40), cr.toFixed(2)]);
  }
  console.table(bad); return bad.length;
})();
```

---

## 8. Decisiones pendientes del dueño

- [ ] **Portada (B4):** volver a la aprobada o aprobar la nueva.
- [ ] **Dominio principal (B1):** con o sin `www`.
- [ ] **Testimonios (B6):** de qué clientes vienen, o reemplazarlos.
- [x] **Skills:** se instaló `web-design-guidelines` (Vercel) el 19 de noviembre de 2026. `frontend-design` e `impeccable` quedaron sin instalar por decisión del dueño.
