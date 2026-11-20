# Mejoras visuales — sitio público de AVANZA

**Fecha:** 10 de noviembre de 2026
**Referencia de estilo:** https://es.squarespace.com/
**Sitio actual:** https://avanza-9djz.vercel.app/
**Reparto:** Claude planifica y revisa. Gemini (Antigravity) escribe el código.
**Documento hermano:** `PLAN_MEJORAS_WEB.md` (fallos, contenido y lanzamiento).

---

## 1. Objetivo

Que la portada de AVANZA transmita la misma calma y oficio que la referencia: pocas cosas por pantalla, fotografía grande, tipografía fina, movimiento suave y un solo llamado a la acción.

**Límite.** La referencia es una guía de estilo, no una plantilla para copiar. No se usan su tipografía (Clarkson es propietaria), sus imágenes, sus videos, sus textos ni su logo. El resultado debe reconocerse como AVANZA.

---

## 2. Skills

### 2.1 Skills de Claude (planificación y revisión)

| Skill | Para qué se usaría | Estado |
|-------|--------------------|--------|
| `frontend-design` (Anthropic) | Criterios de tipografía, color, espaciado y jerarquía al redactar cada tarea. | **No activa.** Se ofreció en una tarjeta de instalación; al comprobarlo, no figura como instalada. |
| `Design` → `design-critique` | Crítica sección por sección después de cada fase. | **No activa.** Mismo caso. |
| `Design` → `accessibility-review` | Contraste de texto sobre imagen, foco de teclado y movimiento reducido. | **No activa.** |
| `Design` → `ux-copy` | Títulos cortos y texto de botones. | **No activa.** |
| `Design` → `design-system` | Mantener la tabla de la sección 5 como fuente única de estilos. | **No activa.** |
| Navegador integrado de Claude | Recorrer la referencia y el sitio, medir estilos y revisar cada entrega. | Activa. Se usó para este documento. |

Claude no puede instalar skills por su cuenta: las activa el dueño desde la tarjeta. Este documento se escribió sin ellas, con medición directa en el navegador. Si se activan, Claude repasa el documento con `design-critique` y `accessibility-review` antes de la fase V2.

### 2.2 Herramientas del proyecto que Gemini debe usar

Ya están instaladas o descritas en `AVANZA_SKILLS_MANIFESTO.md`.

| Herramienta | Uso en este plan |
|-------------|------------------|
| `motion` (`motion/react`) | Todas las animaciones de entrada y de scroll. |
| `lenis` | Scroll suave. Ya está montado en `smooth-scroll.tsx`. |
| `next/image` | Todas las imágenes, con `sizes`, `alt` y `placeholder="blur"`. |
| `next/font` (Geist) | Tipografía. No se añade ninguna fuente nueva. |
| Tailwind CSS v4 | Estilos mediante las variables de la sección 5. |
| `lucide-react` | Iconos. |

**No usar en estas tareas:** GSAP, react-three-fiber, Spline, Aceternity, Magic UI ni confeti. El manifiesto los permite, pero van en contra del objetivo de sobriedad y pesan en la carga.

---

## 3. Qué hace la referencia (medido el 10 de noviembre de 2026, a 1024 px)

| Aspecto | Squarespace | AVANZA hoy |
|---------|-------------|------------|
| Alto de la portada | 7.100 px | 17.000 px |
| Título principal | 56 px, peso 300, 2 líneas, 6 palabras | ~100 px, peso 900, 4 líneas, 11 palabras |
| Subtítulos de sección | 32 px, peso 400 | 60 px, peso 900 |
| Fondos | Negro puro y blanco, alternados | Blanco, azul casi negro con cuadrícula y brillos |
| Color de acento | Ninguno | Azul marino, azul eléctrico, esmeralda, púrpura, ámbar |
| Imágenes y videos | 89 imágenes, 12 videos | 3 imágenes, 0 videos (todo son maquetas hechas en código) |
| Encabezado | Logo y un botón, transparente sobre la imagen | Logo, 5 enlaces en píldora, idioma, buscador, botón |
| Botones en portada | 1 | 2 |
| Etiquetas decorativas | Ninguna | Una píldora en mayúsculas mono sobre casi cada título |
| Fondos desenfocados (`blur-[…]`) | Ninguno | 18 en la parte pública |
| Texto en fuente mono | Ninguno | 140 usos solo en la portada |

**Secciones de la referencia, en orden:**

1. Video a pantalla completa, título, un botón. Abajo asoman tarjetas de sitios que se deslizan.
2. Tres cifras grandes sobre negro.
3. Fila de pestañas y, debajo, tarjetas fotográficas en carrusel horizontal.
4. Carrusel de tarjetas de funciones, cada una con foto de fondo y texto encima.
5. Bloque sobre IA.
6. Plantillas.
7. Buscador de dominio sobre negro.
8. Muro en perspectiva de sitios hechos por clientes.
9. Acordeones: cómo empezar y preguntas frecuentes.
10. Llamada final con un botón.

**Lo que produce la sensación de "profesional":**

- Una idea por pantalla.
- La imagen lleva el peso visual; el texto es poco y fino.
- Mucho aire: entre secciones hay de 120 a 200 px vacíos.
- Sin bordes, sombras, píldoras ni brillos.
- El movimiento es lento, corto y siempre con la misma curva.

---

## 4. Decisiones del dueño

| Tema | Decisión |
|------|----------|
| Tipografía | Fina, como la referencia. Sin cursiva serif. |
| Color | Negro, blanco y azul marino `#021761` solo en botones y detalles. |
| Portada | Imagen o video a pantalla completa, título corto, un botón. |
| Encabezado | Logo, enlaces simples y un botón "Cotizar". Sin buscador ni píldora. Idioma al pie. |
| Imágenes | Pueden ser generadas o tomadas de la web con acceso que el dueño autoriza. Toda imagen lleva descripción. |

---

## 5. Sistema visual

Gemini define estas variables en `src/app/globals.css` (tarea V1.1) y las usa en todas las tareas. No se escriben valores sueltos en los componentes.

### 5.1 Color

| Variable | Valor | Uso |
|----------|-------|-----|
| `--ink` | `#000000` | Fondo de secciones oscuras. Texto sobre blanco. |
| `--paper` | `#ffffff` | Fondo de secciones claras. Texto sobre negro. |
| `--brand` | `#021761` | Botón principal sobre blanco, enlaces, foco de teclado. |
| `--muted-on-paper` | `#5f6368` | Texto secundario sobre blanco. |
| `--muted-on-ink` | `#a3a3a3` | Texto secundario sobre negro. |
| `--line-on-paper` | `#e5e5e5` | Líneas divisorias sobre blanco. |
| `--line-on-ink` | `#262626` | Líneas divisorias sobre negro. |

**Reglas.**

- Cada sección es negra o blanca. No hay grises de fondo, degradados ni cuadrículas.
- Se eliminan esmeralda, púrpura, ámbar y azul eléctrico como decoración. El verde solo queda en el indicador de "enviado con éxito" de los formularios.
- Sobre negro, el botón principal es blanco con texto negro. Sobre blanco, es `--brand` con texto blanco.
- Contraste mínimo 4,5:1 en todo texto. Sobre imagen, el texto lleva debajo una capa negra al 40% como mínimo.

### 5.2 Tipografía

Una sola familia: **Geist** (ya cargada). Se retira Playfair Display de `src/app/layout.tsx`. Geist Mono queda solo para código real dentro de las maquetas.

| Nivel | Móvil | Escritorio | Peso | Interlineado | Espaciado |
|-------|-------|------------|------|--------------|-----------|
| Título de portada | 40 px | 64 px | 300 | 1,05 | −0,04em |
| Título de sección | 28 px | 40 px | 400 | 1,15 | −0,02em |
| Título de tarjeta | 20 px | 24 px | 400 | 1,25 | −0,01em |
| Texto | 16 px | 18 px | 400 | 1,6 | 0 |
| Texto pequeño | 14 px | 14 px | 400 | 1,5 | 0 |
| Botón | 13 px | 13 px | 500 | 1 | 0,08em, mayúsculas |

**Reglas.**

- Ningún título pasa de 2 líneas en escritorio ni de 3 en móvil.
- Se eliminan las etiquetas en mayúsculas mono sobre los títulos. Si una sección necesita antetítulo, usa "Texto pequeño" en `--muted-*`, sin píldora ni punto.
- No se usa peso 700 ni superior en ningún lugar de la parte pública.
- Ancho máximo de un párrafo: 60 caracteres.

### 5.3 Espaciado y forma

| Elemento | Valor |
|----------|-------|
| Aire vertical de cada sección | 96 px en móvil, 160 px en escritorio |
| Ancho máximo del contenido | 1.280 px |
| Margen lateral | 20 px en móvil, 48 px en escritorio |
| Separación título → contenido | 48 px en móvil, 72 px en escritorio |
| Radio de tarjetas e imágenes | 12 px |
| Radio de botones | 0 (rectos) |
| Sombras | Ninguna |
| Bordes de tarjeta | Ninguno. La tarjeta se distingue por su imagen o su fondo. |

### 5.4 Movimiento

| Parámetro | Valor |
|-----------|-------|
| Curva única | `[0.22, 1, 0.36, 1]` |
| Entrada de un bloque | Opacidad 0 → 1 y desplazamiento de 16 px, en 0,6 s |
| Escalonado entre hermanos | 0,08 s, máximo 4 elementos |
| Hover de tarjeta | La imagen escala a 1,03 en 0,5 s. La tarjeta no se mueve. |
| Hover de botón | Cambio de fondo en 0,2 s. Sin desplazamiento. |
| Carruseles | Arrastre con inercia y ajuste a la tarjeta. Avance automático cada 6 s, se pausa con hover, foco o pestaña oculta. |
| Scroll suave | Lenis con `duration: 1.0`. Sin cambios. |

**Reglas.**

- Solo se animan `opacity` y `transform`. Nunca `width`, `height`, `top`, `filter` ni `box-shadow`.
- El contenido de la primera pantalla no depende de JavaScript para verse.
- Se eliminan: inclinación 3D de la maqueta, pulsos (`animate-pulse`, `animate-ping`), brillos que siguen al cursor, destellos en etiquetas y la barra de progreso de scroll.
- Con `prefers-reduced-motion`, todo aparece sin animación y los carruseles no avanzan solos.
- Objetivo de fluidez: 60 cuadros por segundo en un celular de gama media, sin saltos de diseño (CLS menor a 0,05).

---

## 6. Imágenes

### 6.1 Regla de descripción

**Toda imagen o video que entre al proyecto lleva tres descripciones.** Gemini no añade ningún archivo sin ellas.

1. **Ficha en `IMAGENES.md`** (archivo nuevo en la raíz), una fila por archivo:

   | Campo | Contenido |
   |-------|-----------|
   | Archivo | Ruta dentro de `public/images/` |
   | Dónde se usa | Componente y sección |
   | Descripción | Qué se ve, en 1 o 2 frases: sujeto, encuadre, luz, colores dominantes |
   | Origen | "Generada", "Captura propia" o "Banco de imágenes" |
   | Fuente | Herramienta y texto de la instrucción usada, o dirección exacta de la página de origen |
   | Licencia | Nombre de la licencia y fecha de descarga. "Propia" si es captura de un proyecto de AVANZA. |

2. **Texto alternativo (`alt`)** en el código: describe lo que se ve, en español, en menos de 125 caracteres. Las imágenes puramente decorativas llevan `alt=""`.

3. **Nombre de archivo descriptivo** en inglés y minúsculas: `hero-studio-desk-night.webp`, no `img1.webp`.

### 6.2 Orígenes permitidos

| Origen | Condición |
|--------|-----------|
| Capturas de proyectos propios | Preferido para portafolio y catálogo. Sin datos reales de clientes a la vista. |
| Generadas con IA | Permitido para ambiente y fondos. Sin rostros reconocibles, sin logos de terceros, sin texto dentro de la imagen. |
| Bancos de imágenes libres | Solo de sitios con licencia de uso comercial sin atribución obligatoria (por ejemplo Unsplash o Pexels). Se guarda la dirección de origen. |
| Cualquier otra página web | **No.** Tampoco imágenes ni videos de Squarespace. Que el navegador pueda abrir una imagen no da derecho a usarla. |

Si Gemini necesita una imagen y no encuentra una con licencia clara, deja un marcador de color sólido `--ink` con el tamaño correcto y lo anota en `IMAGENES.md` como "Pendiente".

### 6.3 Requisitos técnicos

- Formato WebP o AVIF. Peso máximo: 250 KB por imagen, 400 KB la de portada.
- Tamaño máximo: 2.400 px de ancho.
- Siempre con `next/image`, `sizes` correcto y `placeholder="blur"`.
- Solo la imagen de portada lleva `priority`.
- Video de portada (si se usa): MP4 y WebM, sin audio, en bucle, menos de 3 MB, de 8 a 12 segundos, con imagen `poster`. No se carga en móvil ni con ahorro de datos; ahí se muestra el `poster`.

### 6.4 Imágenes que hacen falta

Dirección de arte común: luz natural lateral, tonos neutros (negro, gris cálido, madera, piedra), un solo toque de azul marino por imagen como máximo. Encuadres amplios con espacio vacío para el texto. Sin personas mirando a cámara, sin pantallas con código de colores, sin robots ni cerebros luminosos.

| # | Uso | Qué debe mostrar | Proporción | Origen sugerido |
|---|-----|------------------|------------|-----------------|
| 1 | Fondo de portada | Mesa de estudio de noche, un portátil abierto visto desde atrás y de lado, luz cálida de una lámpara, fondo oscuro desenfocado. Zona central despejada para el título. | 16:9 y 9:16 | Generada o banco |
| 2–7 | Portafolio (6 proyectos) | Captura real de la pantalla principal de cada proyecto, a 1440 px, sin datos de clientes. | 16:10 | Captura propia |
| 8 | Tarjeta "Páginas web" | Mano sosteniendo un celular con un sitio abierto, sobre una mesa clara. | 4:5 | Generada o banco |
| 9 | Tarjeta "Sistemas y CRM" | Monitor en un escritorio de oficina mostrando un panel con tablas, visto en diagonal. | 4:5 | Captura propia montada |
| 10 | Tarjeta "Agentes de IA" | Celular con una conversación de mensajería abierta, apoyado en un mostrador de tienda. | 4:5 | Generada |
| 11 | Tarjeta "Fintech y ERP" | Terminal de cobro y portátil sobre un mostrador, luz de ventana. | 4:5 | Generada o banco |
| 12 | Fundadores | Retrato de los dos fundadores, fondo neutro, luz lateral. | 3:2 | Foto propia |
| 13 | Llamada final | Vista amplia de una sala de trabajo vacía al amanecer, mucho espacio negativo. | 21:9 | Generada o banco |
| 14 | Imagen para redes | Logo de AVANZA sobre negro con el título de portada. | 1200×630 | Ya se genera en `opengraph-image.tsx`; actualizar estilo |

**Pendiente del dueño:** entregar las capturas 2–7 y la foto 12, o indicar de dónde puede tomarlas Gemini.

---

## 7. Nueva estructura de la portada

Parte del orden ya aprobado en `PLAN_MEJORAS_WEB.md` (T4.1) y lo adapta al nuevo estilo. Objetivo: menos de 9.000 px en escritorio.

| # | Sección | Fondo | Contenido | Componente actual |
|---|---------|-------|-----------|-------------------|
| 1 | Portada | Imagen | Título de 2 líneas, una frase, un botón. Abajo asoma la fila del portafolio. | `hero-motion.tsx` (se rehace) |
| 2 | Portafolio | Negro | Fila horizontal de 6 capturas reales que se desliza. Nombre y rubro bajo cada una. | `squarespace-showcase-carousel.tsx` (se rehace) |
| 3 | Cifras | Negro | Tres cifras grandes con una línea de texto cada una. | Hoy dentro de la portada |
| 4 | Qué hacemos | Blanco | Fila de 4 pestañas y una tarjeta fotográfica grande por pestaña con 3 beneficios. | `scrollytelling-showcase.tsx` (se rehace, sin scroll fijo) |
| 5 | Testimonios | Blanco | Tres citas, sin estrellas ni tarjetas con borde. | `testimonials.tsx` |
| 6 | Simulador | Negro | El simulador actual con el nuevo estilo. | `project-estimator.tsx` |
| 7 | Cómo trabajamos | Blanco | Los 4 pilares como acordeón de 4 filas. | Bloque en `page.tsx` |
| 8 | Comparación | Blanco | Tabla simple de 2 columnas: AVANZA y agencia tradicional. | `comparison-matrix.tsx` |
| 9 | Fundadores | Negro | Foto, la cita del manifiesto y los nombres. | Bloque en `page.tsx` |
| 10 | Llamada final | Imagen | Un título, un botón. | Bloque en `page.tsx` |

**Cambios respecto al plan anterior.**

- La sección animada con scroll fijo (360vh) se reemplaza por pestañas. La tarea T1.1 de `PLAN_MEJORAS_WEB.md` sigue siendo necesaria mientras tanto, porque el sitio publicado está roto hoy.
- La tarea T2.1 (título invisible) queda cubierta por V2.2.
- La tarea T3.4 (reducir "élite") queda cubierta por V3.1.

---

## 8. Tareas para Gemini

Reglas generales: las mismas de `PLAN_MEJORAS_WEB.md`. Una tarea por vez, un commit por tarea, `npm run lint` y `npm run build` al terminar. Ningún archivo nuevo pasa de 300 líneas.

### Fase V1 — Cimientos

**V1.1 — Variables de diseño.**
En `src/app/globals.css`, define las variables de color de la sección 5.1 y expónlas a Tailwind dentro de `@theme inline`. Añade utilidades de texto para los 6 niveles de la sección 5.2 (`text-display`, `text-section`, `text-card`, `text-body`, `text-small`, `text-button`). No borres las variables de shadcn: el panel interno las usa.
*Aceptación:* las clases nuevas funcionan en una página de prueba; el panel interno se ve igual que antes.

**V1.2 — Tipografía.**
En `src/app/layout.tsx`, retira `Playfair_Display`. En `globals.css`, haz que `--font-serif` apunte a la familia sans para que nada se rompa mientras se migran los componentes.
*Aceptación:* no se descarga ninguna fuente serif; ningún texto cae a Times.

**V1.3 — Componentes base.**
Crea en `src/components/site/`:
- `section.tsx`: recibe `tone="ink" | "paper"` y aplica fondo, color de texto, aire vertical y ancho máximo de la sección 5.3.
- `section-heading.tsx`: antetítulo opcional, título y párrafo, con los niveles de 5.2.
- `reveal.tsx`: animación de entrada de 5.4, con `useReducedMotion`. Reemplaza a `fade-in-view.tsx`.
- `site-button.tsx`: variantes `primary` y `ghost`, que eligen color según el `tone` de la sección.
*Aceptación:* una página de prueba en `/dev-estilos` muestra los cuatro componentes en ambos tonos. La página se borra al terminar la fase V3.

**V1.4 — Encabezado.**
En `src/app/(public)/layout.tsx`:
- Quita la píldora que envuelve los enlaces; quedan como texto simple de nivel "Texto pequeño".
- Quita `CommandMenuTrigger`, `ScrollProgress` y el punto verde animado del logo.
- Mueve `AutoLanguageTranslator` al pie.
- El encabezado es transparente con texto blanco sobre la portada, y pasa a fondo blanco con texto negro al bajar 80 px. Transición de 0,3 s.
- Menú completo desde 1024 px; por debajo, logo, "Cotizar" y botón de menú.
*Aceptación:* sin desborde a 375, 768, 1024, 1280 y 1440 px; contraste del texto del encabezado de al menos 4,5:1 sobre la imagen de portada.

### Fase V2 — Primera pantalla

**V2.1 — Imágenes de portada y portafolio.**
Crea `public/images/` e `IMAGENES.md`. Consigue o genera la imagen 1 de la tabla 6.4 en sus dos proporciones. Coloca las capturas 2–7 cuando el dueño las entregue; mientras tanto, usa marcadores y anótalos como "Pendiente". Cumple la sección 6 completa.
*Aceptación:* cada archivo tiene su fila en `IMAGENES.md` con los 6 campos; ningún archivo pasa del peso máximo.

**V2.2 — Portada nueva.**
Rehaz `hero-motion.tsx` como componente de servidor con una isla cliente mínima:
- Imagen a pantalla completa (`100svh`), con capa negra al 45%.
- Título de 2 líneas: "Software a medida / que hace crecer tu empresa". Aprobado por el dueño el 10 de noviembre de 2026.
- Una frase de apoyo de máximo 14 palabras.
- Un solo botón: "Cotizar proyecto".
- El título y la frase son visibles en el HTML del servidor.
- Sin etiqueta superior, sin segundo botón, sin cifras, sin maqueta inclinada.
*Aceptación:* con JavaScript desactivado se lee todo; LCP menor a 2,5 s en móvil según PageSpeed; un único `h1`.

**V2.3 — Fila de portafolio.**
Rehaz el carrusel como fila horizontal: tarjetas de 16:10, 3 visibles y media en escritorio, 1 y un cuarto en móvil. Arrastre con inercia, flechas discretas, teclado. Bajo cada captura: nombre del proyecto y rubro. Sin filtros, sin contador, sin barra de rotación, sin métricas. El archivo nuevo se llama `portfolio-row.tsx`; se borra `squarespace-showcase-carousel.tsx`.
*Aceptación:* se puede recorrer con ratón, dedo y teclado; no genera scroll horizontal en la página.

**V2.4 — Cifras.**
Sección negra con tres cifras en nivel "Título de portada" y una línea debajo cada una. Usa solo cifras que el dueño haya marcado como "Mantener" en la tarea T3.2 de `PLAN_MEJORAS_WEB.md`.
*Aceptación:* las cifras se leen en una fila en escritorio y apiladas en móvil.

### Fase V3 — Resto de la portada

**V3.1 — Qué hacemos.**
Reemplaza `scrollytelling-showcase.tsx` por `services-tabs.tsx`: 4 pestañas (Páginas web, Sistemas y CRM, Agentes de IA, Fintech y ERP). Cada una muestra una tarjeta con la imagen 8–11, un título, una frase y 3 beneficios en lenguaje de negocio. Cambio entre pestañas con fundido de 0,4 s. Sin altura de 360vh, sin scroll fijo, sin maquetas de interfaz en código.
*Aceptación:* pestañas accesibles (`role="tablist"`, flechas del teclado); la sección mide menos de 900 px de alto en escritorio.

**V3.2 — Testimonios.**
Tres columnas sobre blanco. Cada una: la cita en nivel "Título de tarjeta", una línea divisoria y el cargo con rubro. Sin estrellas, sin tarjetas con borde, sin efecto de luz. Mantiene el anonimato de la tarea T1.3.
*Aceptación:* ningún nombre de persona ni empresa; sin `SpotlightCard`.

**V3.3 — Simulador.**
Aplica el nuevo estilo a `project-estimator.tsx` sobre fondo negro: opciones como botones rectos de borde fino, la seleccionada en blanco. El resultado a la derecha, sin tarjeta flotante. No cambies `estimator-logic.ts`.
*Aceptación:* el cálculo y el envío a WhatsApp funcionan igual que antes.

**V3.4 — Cómo trabajamos y comparación.**
Los 4 pilares pasan a un acordeón de 4 filas con el título a la izquierda y el texto al abrir. La tabla comparativa queda en 2 columnas (AVANZA y agencia tradicional), con texto simple y sin iconos de colores; en móvil se apila por fila.
*Aceptación:* acordeón operable con teclado; la tabla no produce scroll horizontal en móvil.

**V3.5 — Fundadores y llamada final.**
Sección negra con la foto 12 a un lado y la cita del manifiesto al otro, en nivel "Título de sección". Llamada final sobre la imagen 13 con un título y un botón.
*Aceptación:* un solo botón en la llamada final.

**V3.6 — Pie.**
Fondo negro. Cuatro columnas de enlaces en "Texto pequeño". Selector de idioma, Libro de Reclamaciones, Privacidad y Términos en la última fila. Sin la píldora "Sistemas operativos 24/7".
*Aceptación:* todos los enlaces legales siguen presentes.

### Fase V4 — Limpieza

**V4.1 — Retirar lo que ya no se usa.**
Borra de la parte pública, si ya nadie los importa: `background-grid.tsx`, `luxury-mesh-gradient.tsx`, `shimmer-badge.tsx`, `spotlight-card.tsx`, `infinite-marquee.tsx`, `scroll-progress.tsx`, `fade-in-view.tsx`, `cinematic-reel.tsx`, `template-carousel.tsx` (o muévelos a `/servicios` y `/metodologia` según T4.1). Antes de borrar cada archivo, comprueba con `grep` que no se usa en el panel interno.
*Aceptación:* `npm run build` sin errores; ningún `blur-[` de decoración en `src/app/(public)` ni en `src/components/home`.

**V4.2 — Páginas interiores.**
Aplica `Section`, `SectionHeading`, `Reveal` y `SiteButton` a `/servicios`, `/metodologia`, `/nosotros` y `/contacto`. Sin rediseñar su contenido.
*Aceptación:* las cuatro páginas usan solo los dos fondos y los seis niveles de texto.

**V4.3 — Flotantes.**
Deja un solo elemento flotante: el botón del asistente, con texto "Cotizar" y sin el globo "¿Tienes un proyecto en mente?" abierto por defecto. El globo aparece una vez, a los 20 segundos o al 50% de scroll.
*Aceptación:* en la primera pantalla no hay nada flotando sobre el contenido salvo el botón.

---

## 9. Cómo se revisa cada fase

Al terminar una fase, Claude abre el sitio en el navegador y comprueba:

1. **Recorrido completo** a 375, 768, 1024 y 1440 px, sin scroll horizontal ni pantallas vacías.
2. **Tipografía:** ningún peso mayor a 500; ningún título de más líneas que las permitidas.
3. **Color:** solo los fondos `--ink` y `--paper`; `--brand` solo en botones, enlaces y foco.
4. **Movimiento:** ninguna animación de más de 0,8 s; todo visible con movimiento reducido.
5. **Imágenes:** cada archivo de `public/images/` tiene su fila en `IMAGENES.md` y su `alt`.
6. **Largo:** portada por debajo de 9.000 px en escritorio y 13.000 px en móvil.
7. **Comparación lado a lado** con la referencia, para confirmar que se parece en calma y orden, y que no reproduce sus textos ni sus imágenes.

---

## 10. Pendientes del dueño

- [ ] Activar las skills `frontend-design` y `Design` desde la tarjeta, si quiere que Claude las use en las revisiones.
- [ ] Entregar capturas de los 6 proyectos del portafolio (imágenes 2–7).
- [ ] Entregar o autorizar una foto de los fundadores (imagen 12).
- [x] Título de portada aprobado: "Software a medida que hace crecer tu empresa".
- [ ] Decidir si la portada lleva video o solo imagen. Este plan asume **imagen**; el video se puede añadir después sin rehacer nada.
- [ ] Marcar las cifras de la tarea T3.2 para poder hacer V2.4.

---

## 11. Orden recomendado junto con el otro plan

1. `PLAN_MEJORAS_WEB.md`, Fase 1 completa (T1.1 a T1.4). Arregla lo que hoy está roto en producción.
2. Este documento, fases V1 y V2.
3. Revisión de Claude.
4. Este documento, fases V3 y V4.
5. Revisión de Claude.
6. `PLAN_MEJORAS_WEB.md`: T3.1 a T3.3 sobre los componentes nuevos, luego T6.1 y la Fase 5.

Las tareas T2.1, T2.2, T3.4, T4.1 y T4.2 del otro plan quedan absorbidas por este documento y no hace falta ejecutarlas por separado.
