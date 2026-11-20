# Encargo de imágenes y correcciones — AVANZA

**Fecha:** 10 de noviembre de 2026
**Para:** Gemini (Antigravity)
**Base:** revisión de Claude sobre el commit `7c06584` (rama `docs/plan-mejoras-web`).
**Documentos relacionados:** `MEJORAS_VISUALES.md` (sección 6), `IMAGENES.md`.

---

## 1. Estado actual de las imágenes

De 14 archivos en `public/images/`, solo 2 son imágenes reales. Los otros 12 son rectángulos negros de 1,5 a 2 KB.

| Archivo | Estado |
|---------|--------|
| `hero-studio-desk-night.webp` | Real. Buena. Solo 1376 px de ancho. |
| `hero-studio-desk-night-mobile.webp` | Real. Buena. |
| `portfolio-*.webp` (6) | Marcador negro. |
| `services-*.webp` (4) | Marcador negro. |
| `founders-portrait.webp` | Marcador negro. |
| `cta-empty-studio-dawn.webp` | Marcador negro. |

---

## 2. Reglas para todas las imágenes generadas

Aplican además de la sección 6 de `MEJORAS_VISUALES.md`.

- **Misma familia visual que la portada.** Fotografía editorial, luz lateral suave, tonos negro, grafito, gris cálido, madera y piedra. Como máximo un detalle en azul marino `#021761`.
- **Sin texto legible** dentro de la imagen: ni letras, ni números, ni logos, ni marcas de dispositivos.
- **Sin rostros.** Manos y siluetas de espaldas sí.
- **Pantallas:** apagadas, vistas de lado, o con formas abstractas desenfocadas. Nunca una interfaz inventada con texto.
- **Sin clichés de IA:** nada de robots, cerebros, circuitos, hologramas ni partículas brillantes.
- **Espacio vacío** donde va el texto, según indica cada ficha.
- Genera 3 variantes por imagen y elige la que mejor combine con la portada. Guarda solo la elegida.
- Exporta en WebP, calidad 80. Si pesa más del límite, baja la calidad hasta 70 antes de reducir el tamaño.

---

## 3. Imágenes a generar (6)

### G1 — `hero-studio-desk-night.webp` (regenerar a mayor tamaño)

- **Tamaño:** 2400 × 1350 px. **Peso máximo:** 400 KB.
- **Descripción:** la misma escena actual. Escritorio oscuro de noche, portátil gris abierto visto desde atrás a la derecha, lámpara de disco con luz cálida a la izquierda, taza negra y cuaderno, estantería en penumbra, ventana con luces de ciudad desenfocadas. Centro despejado y oscuro para el título.
- **Instrucción sugerida:** *Editorial commercial photograph, minimalist dark studio desk at night, matte graphite laptop open seen from behind on the right, warm disc desk lamp on the left, black ceramic mug and notebook, dark shelving in shadow, floor-to-ceiling window with soft out-of-focus city lights, large empty dark area in the centre, shallow depth of field, no text, no logos, no people, 16:9.*
- **Texto alternativo:** "Mesa de estudio de noche con portátil abierto e iluminación cálida" (ya está en el código).
- **Motivo:** la actual mide 1376 px y se verá borrosa en pantallas de 1920 px o más.

### G2 — `services-web.webp`

- **Tamaño:** 1200 × 1500 px (4:5). **Peso máximo:** 250 KB.
- **Descripción:** una mano sostiene un teléfono en vertical sobre una mesa de madera clara. La pantalla se ve en ángulo, encendida, con bloques de color neutro desenfocados. Luz de ventana desde la izquierda. Tercio superior despejado.
- **Instrucción sugerida:** *Editorial photograph, a hand holding a smartphone upright above a light oak table, screen seen at an angle showing soft blurred neutral blocks, natural window light from the left, muted warm grey palette, empty space in the upper third, shallow depth of field, no text, no logos, no face, 4:5.*
- **Texto alternativo:** "Mano sosteniendo un teléfono con un sitio web abierto sobre una mesa de madera clara".

### G3 — `services-crm.webp`

- **Tamaño:** 1200 × 1500 px. **Peso máximo:** 250 KB.
- **Descripción:** monitor grande sobre un escritorio de oficina ordenado, visto en diagonal desde la derecha. La pantalla muestra filas y columnas abstractas desenfocadas, sin texto legible. Teclado, una planta pequeña, pared gris.
- **Instrucción sugerida:** *Editorial photograph, large desktop monitor on a tidy office desk seen diagonally from the right, screen showing abstract blurred rows and columns in neutral tones with one navy accent, keyboard and a small plant, soft daylight, grey wall, no readable text, no logos, no people, 4:5.*
- **Texto alternativo:** "Monitor de oficina mostrando un panel de gestión con tablas, visto en diagonal".
- **Alternativa preferida:** si el dueño entrega una captura real de un sistema propio, móntala sobre esta escena en lugar de la pantalla abstracta.

### G4 — `services-ai.webp`

- **Tamaño:** 1200 × 1500 px. **Peso máximo:** 250 KB.
- **Descripción:** teléfono apoyado en un soporte sobre el mostrador de una tienda pequeña. En la pantalla, burbujas de conversación abstractas, sin texto. Fondo de tienda desenfocado, luz cálida de tarde.
- **Instrucción sugerida:** *Editorial photograph, smartphone on a small stand on a shop counter, screen showing abstract rounded chat bubbles without any text, softly blurred boutique interior behind, warm afternoon light, stone and wood textures, no text, no logos, no people, 4:5.*
- **Texto alternativo:** "Teléfono con una conversación de mensajería abierta sobre el mostrador de una tienda".

### G5 — `services-fintech.webp`

- **Tamaño:** 1200 × 1500 px. **Peso máximo:** 250 KB.
- **Descripción:** terminal de cobro y portátil cerrado sobre un mostrador de piedra clara. Luz de mañana desde una ventana lateral con sombras largas. Tonos fríos y neutros.
- **Instrucción sugerida:** *Editorial photograph, card payment terminal and a closed laptop on a pale stone counter, morning window light from the side with long soft shadows, cool neutral palette, blank terminal screen, no text, no logos, no people, 4:5.*
- **Texto alternativo:** "Terminal de cobro y portátil sobre un mostrador de piedra con luz de mañana".

### G6 — `cta-empty-studio-dawn.webp`

- **Tamaño:** 2400 × 1030 px (21:9). **Peso máximo:** 250 KB.
- **Descripción:** sala de trabajo amplia y vacía al amanecer. Mesa larga de madera oscura, sillas alineadas, ventanal a la derecha con luz azul grisácea. Mitad izquierda oscura y despejada para el texto.
- **Instrucción sugerida:** *Editorial architectural photograph, wide empty studio workspace at dawn, long dark wooden table with aligned chairs, large window on the right with cool blue-grey light, left half dark and empty for typography, calm and minimal, no text, no logos, no people, 21:9.*
- **Texto alternativo:** "Sala de trabajo vacía al amanecer con una mesa larga y luz de ventana".

---

## 4. Imágenes que no se generan (7)

> **Actualización:** la tabla de portafolio de esta sección quedó reemplazada por la sección 7. La regla y la parte de la foto de fundadores siguen vigentes.

Estas deben ser reales. **No las inventes con IA**: el dueño confirmó que los proyectos son reales, y una captura falsa de un proyecto real es engañosa.

| Archivo | Qué hace falta | Quién |
|---------|----------------|-------|
| `portfolio-academic-lessons.webp` | Captura de la pantalla principal del proyecto, 1920 × 1200 px | Dueño entrega la dirección o el archivo |
| `portfolio-lio-agency.webp` | Igual | Dueño |
| `portfolio-mindful-spaces.webp` | Igual | Dueño |
| `portfolio-kallpa-fleet.webp` | Igual, sin datos de clientes a la vista | Dueño |
| `portfolio-cortex-agent.webp` | Igual, sin conversaciones reales | Dueño |
| `portfolio-aethelgard-wealth.webp` | Igual, sin cifras reales | Dueño |
| `founders-portrait.webp` | Foto de los dos fundadores, 1800 × 1200 px, fondo neutro | Dueño |

**Mientras no lleguen:**

- En `portfolio-row.tsx`, sustituye cada marcador negro por una tarjeta tipográfica: fondo `#0a0a0a`, el nombre del proyecto en nivel "Título de tarjeta" centrado y el rubro debajo. Así la fila no parece rota.
- En `founders-block.tsx`, oculta la imagen y deja la cita a todo el ancho.

**Cuando el dueño entregue una dirección web de un proyecto,** Claude puede abrirla en su navegador y tomar la captura.

---

## 5. Correcciones encontradas en la revisión

### C1 — `IMAGENES.md` no refleja la realidad

- La columna "Cumplimiento" marca "ÓPTIMO" en 12 marcadores vacíos.
- Las columnas "Fuente" y "Licencia" tienen datos para imágenes que no existen ("Banco Unsplash / Generada autorizada", "Licencia libre de uso comercial").

**Cambio:** en cada fila de marcador, deja "Origen: Pendiente", "Fuente: —", "Licencia: —" y "Cumplimiento: Pendiente". Rellena los datos reales solo cuando el archivo exista. Para cada imagen generada, anota la herramienta y la instrucción exacta usada.

### C2 — El título de la pestaña todavía dice "de Élite"

`src/app/layout.tsx`, línea 28. Cámbialo a: `"AVANZA Software Studio | Desarrollo de software y plataformas web con IA"`.

### C3 — Cifras sin aprobar

`src/components/home/metrics-strip.tsx` publica "100%" y "24/7". El dueño aún no marcó las cifras (tarea T3.2).

- "24/7 — Disponibilidad operativa" es una promesa de servicio. Mantenla solo si el dueño la confirma.
- Mientras tanto, usa: "7 a 14 días" (sprints), "100%" (el código es tuyo) y "24 h" (plan y presupuesto en menos de 24 horas, ya prometido en la llamada final).

### C4 — Limpieza pendiente de V4.1

Siguen en `src/components/ui/`: `luxury-mesh-gradient.tsx`, `bento-grid.tsx`, `command-menu.tsx`. Comprueba con `grep` si algo los importa; si no, bórralos.

### C5 — Logo sobre fondo oscuro

En la portada, el símbolo del logo se ve azul marino sobre negro y casi no se distingue. Usa la variante clara del logo mientras el encabezado es transparente.

---

## 6. Criterios de aceptación

- [ ] 6 imágenes generadas con el tamaño y peso indicados.
- [ ] Ninguna contiene texto, logos ni rostros.
- [ ] Las 6 combinan en tono con la portada al verlas juntas.
- [ ] `IMAGENES.md` dice la verdad sobre cada archivo.
- [ ] La fila del portafolio no muestra rectángulos negros vacíos.
- [ ] `npm run lint` y `npm run build` sin errores.
- [ ] Un commit por bloque: `feat(assets): G1-G6 …`, `fix(docs): C1 …`, etc.

---

## 7. Portafolio real (reemplaza la tabla de la sección 4)

El dueño entregó las direcciones de los 6 proyectos hechos por AVANZA. **No coinciden con los 6 nombres que hoy muestra `portfolio-row.tsx`** (Scott Smith Tutoring, LIO Agency, Essence Wellness, Kallpa Logistics OS, Cortex Neural Concierge, Aethelgard). El portafolio debe mostrar estos:

| # | Proyecto | Rubro (texto bajo la tarjeta) | Dirección | Archivo |
|---|----------|-------------------------------|-----------|---------|
| 1 | AOL-DOMO | Sitio corporativo · Holding empresarial | https://www.aol-domo.com/ | `portfolio-aol-domo.webp` |
| 2 | Molinos Cusco | Plataforma B2B · Industria alimentaria | https://molinos-cusco-cusipata.vercel.app/ | `portfolio-molinos-cusco.webp` |
| 3 | Qorikancha Expeditions | Sitio web · Turismo de lujo | https://qorikancha-cusco-luxury-tourism.vercel.app/ | `portfolio-qorikancha.webp` |
| 4 | SV Tuning & Performance | Sitio web · Taller automotriz | https://sv-tuning-performance.vercel.app/ | `portfolio-sv-tuning.webp` |
| 5 | Import L&R | Sistema POS e inventario | https://lumina-wholesale-pos.vercel.app/ | `portfolio-import-lr-pos.webp` |
| 6 | Control de ceremonias | Sistema de invitados y acceso | https://graduate-conti.vercel.app/ | `portfolio-graduation-control.webp` |

### 7.1 Capturas provisionales

Claude tomó una captura de la primera pantalla de cada proyecto el 10 de noviembre de 2026 y las dejó en `public/images/` con los nombres de la tabla.

- **Tamaño:** 800 × 500 px. Sirven para ver el resultado, **no para publicar**: en pantallas de alta densidad se verán borrosas.
- **Import L&R** muestra la pantalla de ingreso por PIN, porque el sistema está en producción y Claude no ingresó.
- **Qorikancha** se capturó antes de que cargara la foto de fondo.
- **SV Tuning** tiene la mitad derecha vacía (el visor 3D no había cargado).

### 7.2 Tareas para Gemini

**P1 — Capturas definitivas.** Para cada proyecto, toma una captura de la primera pantalla a 1920 × 1200 px con escala de dispositivo 1, espera a que carguen imágenes, fuentes y animaciones de entrada, y cierra los avisos de cookies eligiendo "rechazar no esenciales". Exporta en WebP calidad 82, máximo 250 KB, y reemplaza el archivo provisional del mismo nombre.

**P2 — Import L&R.** No uses la pantalla de PIN. El dueño debe entregar una captura del panel con datos de demostración, o indicar un entorno de prueba. Hasta entonces, usa una tarjeta tipográfica para este proyecto.

**P3 — Datos del portafolio.** En `portfolio-row.tsx`, reemplaza los 6 proyectos actuales por los de la tabla, en ese orden, con el nombre, el rubro y el archivo indicados. Cada tarjeta enlaza a la dirección del proyecto en una pestaña nueva (`target="_blank"`, `rel="noopener noreferrer"`), salvo los dos sistemas internos (5 y 6), que no llevan enlace.

**P4 — Texto alternativo.** Formato: "Captura de la portada de {proyecto}, {rubro}".

**P5 — Borrar los marcadores viejos.** Elimina `portfolio-academic-lessons.webp`, `portfolio-lio-agency.webp`, `portfolio-mindful-spaces.webp`, `portfolio-kallpa-fleet.webp`, `portfolio-cortex-agent.webp` y `portfolio-aethelgard-wealth.webp`, y sus filas en `IMAGENES.md`.

**P6 — Registro.** Añade las 6 filas nuevas a `IMAGENES.md` con origen "Captura propia", la dirección como fuente y la fecha.

**P7 — Nombres antiguos en el resto del sitio.** En el portafolio de la portada ya está aprobado quitarlos (P3). Para el resto del sitio, ejecuta `grep -rn -i "scott smith\|lio agency\|essence\|kallpa\|cortex\|aethelgard\|lumina haute\|novahealth\|apex manufacturing" src/` y lista dónde siguen apareciendo. No los borres sin que el dueño lo confirme.

### 7.3 Decisiones pendientes del dueño

- [ ] **Permiso de cada cliente** para aparecer en el portafolio de AVANZA. Dos casos piden atención: "Control de ceremonias" muestra el nombre de una universidad, y Molinos Cusco muestra su RUC.
- [x] **Los 6 nombres anteriores del portafolio se reemplazan** por los 6 proyectos reales (decidido el 10 de noviembre de 2026). Falta decidir el catálogo de `/servicios`.
- [ ] **Testimonios.** Hablan de una fintech, una empresa de logística y una inmobiliaria. Ninguno de los 6 proyectos reales es de esos rubros. Confirmar de qué clientes vienen, o reemplazarlos.
- [ ] **Captura del panel de Import L&R** con datos de demostración.
