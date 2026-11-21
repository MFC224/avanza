# Auditoría integral y nuevo ARM CRM — AVANZA Software Studio

**Fecha:** 20 de noviembre de 2026
**Código:** rama `main` a partir de `ae4e2b3` (cambios de esta auditoría sin commit al momento de redactar)
**Producción revisada:** https://www.avanzape.com
**Cómo se revisó:** lectura completa del código; `tsc`, `eslint`, `npm audit`, `next build`; pruebas contra producción con solicitudes de solo lectura; pruebas del chat en el navegador con el servidor local; y dos revisiones independientes con Codex (OpenAI) en modo solo lectura (sección 5).

---

## 0. Resumen para el dueño

1. **El robot ARM no estaba vendiendo.** Ningún lead del chat llegaba a la base de datos: el chat nunca enviaba los datos de contacto y, aunque lo hubiera hecho, los valores que usaba ("Calificado por ARM", "Cita Agendada") estaban prohibidos por la tabla `leads`, así que el guardado fallaba en silencio.
2. **La agenda entregaba enlaces de Google Meet inventados** (`meet.google.com/avn-xxxx-avz`) que no existen, guardaba las citas en la memoria del servidor (se borran solas en Vercel) y las registraba 5 horas antes de lo pedido.
3. **Había datos de clientes expuestos al público.** `GET /api/arm/schedule` devolvía la lista de citas con nombre y teléfono (comprobado en producción el 20-11). La tabla `clients` permitía leer e insertar a cualquiera con la clave pública de Supabase.
4. **Next.js 16.3.3 tenía vulnerabilidades críticas** de ejecución remota de código, una de ellas en `next/og`, que el sitio usa para la imagen de redes sociales.
5. **El panel interno mostraba cifras falsas** (tasa de cierre 78,4% fija, dos citas de ejemplo de empresas que no existen) y su botón "Cerrar sesión" no hacía nada.

Todo lo anterior quedó corregido en el código. **Para que llegue a producción faltan tres pasos del dueño** (sección 3): ejecutar la migración SQL, agregar `SUPABASE_SERVICE_ROLE_KEY` en Vercel y desplegar.

| Origen | Hallazgos | Corregidos | Pendientes del dueño | Pendientes técnicos | Descartados |
|--------|----------:|-----------:|---------------------:|--------------------:|------------:|
| Claude (sección 2) | 27 | 21 | 1 (M10) | 5 | 0 |
| Codex A (sección 5.1) | 11 | 8 + 1 parcial | 0 | 1 | 1 |
| Codex B (sección 5.2) | 14 | 9 + 1 parcial | 3 (RUC/domicilio, plazos, testimonios) | 1 | 0 |

**Lo que solo tú puedes hacer:** completar RUC y domicilio fiscal (obligatorio para el Libro de Reclamaciones), decidir los plazos oficiales (sección 5.3), reemplazar los testimonios por casos verificables y seguir los pasos de la sección 3.

---

## 1. Qué es ahora el ARM (sistema de ventas)

El ARM dejó de ser un chat que respondía frases fijas. Ahora es un embudo completo: atrae, califica, registra, avisa y ayuda a cerrar.

```
Visitante ──► Chat ARM ──► califica (servicio, rubro, plazo, presupuesto)
                │            └─► puntaje 0-100 (frío / tibio / caliente)
                ├─► deja sus datos con consentimiento (Ley 29733) ─┐
                ├─► agenda una videollamada (horario real)  ───────┤
                └─► pasa a WhatsApp con un resumen ya escrito       │
                                                                    ▼
Formulario /contacto ─────────────────────────────────────► CRM (/leads)
                                                                    │
                                     Aviso inmediato al celular ◄───┤ (Telegram o webhook)
                                                                    ▼
                    Embudo: Nuevo → Contactado → Reunión → Propuesta → Negociación → Ganado → Cliente
```

### 1.1 Asistente (sitio público)

| Antes | Ahora |
|-------|-------|
| Respondía por palabras clave, sin memoria de la conversación | Reconstruye el perfil del cliente con todos sus mensajes en cada turno |
| Un solo flujo de precios | Califica en orden: necesidad → rubro → plazo → presupuesto → siguiente paso, sin repetir preguntas |
| Casilla de consentimiento siempre visible pero nunca enviaba datos | Formulario de contacto dentro del chat, con consentimiento obligatorio validado también en el servidor |
| "¿Qué día te acomoda?" y nada más | Selector real de día y hora (lunes a viernes, sin feriados ni Semana Santa, 2 h de antelación mínima, 21 días de ventana) |
| Enlace de Meet inventado | La cita queda "por confirmar"; el equipo pega el enlace real en `/agenda` y se lo envía con un clic |
| Botón de WhatsApp genérico | Botón con un resumen (servicio, rubro, plazo, presupuesto, necesidad) para que el cliente no repita nada |
| Objeciones sin manejo | Respuestas para precio, plazo, confianza, plantillas tipo Wix y mensualidades, siempre con el siguiente paso |
| Gemini sin historial, clave en la URL y respuestas vacías probables | Gemini solo redacta; el motor propio decide la acción y los precios. Si Gemini falla o tarda, responde el motor |
| Límite de 10 mensajes | 40 mensajes por conversación y 15 por minuto por IP |

### 1.2 CRM interno (`/dashboard`, `/leads`, `/agenda`, `/clients`)

- **Hoy:** seguimientos vencidos y del día, próximas videollamadas, embudo con valor por etapa, valor ponderado, tasa de cierre de 90 días, de dónde llegan los leads, por qué se pierden, y qué buscaban quienes se fueron del chat sin dejar datos (con sus objeciones).
- **Embudo:** tablero por etapas y lista con filtros (texto, temperatura, fuente, etapa) y alta manual de leads que llegan por WhatsApp, referidos o redes.
- **Ficha del lead:** datos, puntaje con sus motivos, siguiente paso con fecha, cambio de etapa con un clic, motivo obligatorio al perder, historial de actividad con recordatorio automático, la conversación completa con el asistente y mensajes de WhatsApp listos según la etapa (primer contacto, proponer reunión, confirmar, enviar propuesta, seguimiento, cierre, reactivar, bienvenida).
- **Ganado → cliente:** al marcar "Ganado" se crea el cliente automáticamente.
- **Agenda:** confirmar con enlace de Meet, enviar confirmación por WhatsApp, marcar realizada o no asistió (cada estado programa el siguiente paso en la ficha).
- **Acceso:** solo las cuentas de la tabla `crm_staff`; la base de datos aplica la misma regla con RLS.
- **Configuración:** muestra qué está activo de verdad (antes mostraba textos fijos como "RLS activado").

### 1.3 Archivos principales

| Parte | Archivos |
|-------|----------|
| Motor del asistente | `src/lib/arm/` (`catalog`, `extract`, `profile`, `engine`, `scheduling`, `gemini`, `schemas`, `rate-limit`) |
| CRM (servidor) | `src/lib/crm/` (`capture`, `conversations`, `queries`, `auth`, `notify`, `scoring`, `stages`, `whatsapp`, `admin`, `types`) |
| Rutas públicas | `src/app/api/arm/chat`, `src/app/api/arm/lead`, `src/app/api/arm/schedule` |
| Chat | `src/components/ui/arm-chat-widget.tsx`, `src/components/arm/` |
| Panel | `src/app/(dashboard)/` (`dashboard`, `leads`, `leads/[id]`, `agenda`, `clients`, `settings`) |
| Base de datos | `supabase/migrations/20261121_arm_crm.sql` |
| Pruebas | `scripts/tests/*.test.mjs` (17 pruebas que ejecutan el código real) — `npm run test:arm` |

---

## 2. Hallazgos verificados por Claude

### Críticos (todos corregidos en el código)

| # | Hallazgo | Evidencia | Corrección |
|---|----------|-----------|------------|
| C1 | Next.js 16.3.3 con vulnerabilidades críticas: ejecución remota de código en `next/og` (GHSA-vcvr-r3jv-pc5j; el sitio usa `opengraph-image.tsx`), en Image Optimization con SVG (GHSA-2464-fhr4-w9xw) y en `use cache` (GHSA-673q-mjm6-r5xr); SSRF en Image Optimization; DoS con Server Actions. | `npm audit` | Next.js 16.4.6 y `eslint-config-next` 16.4.6. Dependencias de producción: **0 vulnerabilidades**. |
| C2 | `GET /api/arm/schedule` sin parámetros devolvía todas las citas con nombre, teléfono o correo y notas. | Comprobado en producción el 20-11-2026. | Solo acepta `?date=` y devuelve horas libres, sin datos de nadie. |
| C3 | Los leads del chat nunca se guardaban: el widget no enviaba `contactInfo`, y los valores `"Calificado por ARM"`, `"Cita Agendada"` y `"Cierre"` violaban las restricciones `CHECK` de `leads` en `schema_avanza_v2.sql`. Los errores se tragaban con `console.error`. | `arm-chat-widget.tsx` (antes), `api/arm/chat/route.ts:85-98` (antes) | Captura con formulario y consentimiento, deduplicación por teléfono o correo, migración que elimina las restricciones viejas. |
| C4 | Enlaces de Google Meet inventados (`avn-` + 4 letras al azar + `-avz`) entregados al cliente como "sala generada". | `arm-scheduling.ts:245` (antes) | Sin enlaces falsos. Cita "por confirmar" + enlace real desde `/agenda`. Botón "Agregar a Google Calendar" con la hora correcta. |
| C5 | Tabla `clients` con políticas `USING (true)` para lectura e inserción públicas; tablas de `schema_avanza_v2.sql` sin RLS (leads, proyectos, hitos de pago…), legibles con la clave pública si se crearon así. | `database.sql`, `schema_avanza_v2.sql` | La migración borra esas políticas, activa RLS en 13 tablas y deja acceso solo a `crm_staff`. |
| C6 | Agenda y "fugas" guardadas en la memoria del servidor, con dos citas y dos "fugas" ficticias mostradas como reales. En Vercel cada instancia tiene su memoria: citas perdidas y doble reserva posible. | `arm-scheduling.ts` (antes) | Tabla `appointments` con índice único que bloquea la doble reserva en la base de datos. |

### Altos

| # | Hallazgo | Estado |
|---|----------|--------|
| A1 | Las citas se guardaban como si la hora de Lima fuera UTC: una cita a las 10:00 quedaba a las 05:00. | Corregido (`limaToUtc`, probado). |
| A2 | Tablero con cifras inventadas ("78,4%", "Confirmadas en Google Calendar") y Configuración con afirmaciones falsas ("RLS Activado (Estricto)", "AES-256"). | Corregido: todo sale de la base o del entorno real. |
| A3 | Panel sin cierre de sesión real, con usuario `admin@avanza.dev` y avatar de `github.com/shadcn` fijos, buscador decorativo y sin navegación en celular (la barra lateral se ocultaba). | Corregido. |
| A4 | Cualquier cuenta de Supabase tenía acceso completo, incluido el Libro de Reclamaciones (DNI, dirección, teléfono). Si el registro público de Supabase está activo, cualquiera puede crear una cuenta. | Corregido con `crm_staff` + `is_staff()`. **Además, desactivar el registro público en Supabase (sección 3).** |
| A5 | Formulario de contacto: el campo trampa antispam nunca se enviaba (el filtro no funcionaba), el consentimiento solo se validaba en el navegador, se inventaban correos `@lead-whatsapp.avanzape.com` y siempre respondía "éxito" aunque no se guardara nada. | Corregido: ahora, si no se guarda ni se avisa al equipo, se le pide a la persona escribir por WhatsApp. |
| A6 | Gemini: clave en la URL (`?key=`), sin historial, modelo con "pensamiento" que puede gastar los 350 tokens de salida y devolver vacío, 4 s de espera. | Corregido (cabecera `x-goog-api-key`, historial, `thinkingBudget: 0`, 6 s, motor de respaldo). |
| A7 | El límite de 10 mensajes cortaba conversaciones de venta y dependía de un identificador que el visitante controla. | Ajustado: 40 por conversación y 15 por minuto por IP. Ver M1. |
| A8 | `zod` se usaba sin estar declarado (llegaba por otra librería) y en una versión vulnerable; la CLI `shadcn` estaba en dependencias de producción y arrastraba 17 vulnerabilidades. | Corregido: `zod` 4.6.7 declarado; `shadcn` pasó a desarrollo. |
| A9 | Las pruebas "de aceptación" revisaban el texto de los archivos y exigían justamente los fallos (que existiera `https://meet.google.com/` y la tabla de fugas en memoria). | Corregido: 17 pruebas que ejecutan el código real + pruebas antiguas actualizadas (44/44 y 30/30). |
| A10 | La política de privacidad promete purgar los datos a los 12 meses de forma automática, pero no existía ningún proceso; nombraba a Resend (no se usa) y no a Telegram. | Corregido: función `crm_purge_stale_data()` en la migración (programarla con `pg_cron`, sección 3) y texto actualizado. |
| A11 | Error de hidratación en el carrusel en arco de la portada (decimales distintos entre servidor y navegador). | Corregido (redondeo a 2 decimales). |

### Medios y bajos

| # | Hallazgo | Estado |
|---|----------|--------|
| M1 | Los límites de uso viven en la memoria de cada instancia de Vercel. Sirven contra abusos casuales, no contra un ataque distribuido. | Pendiente: Upstash Redis o Vercel KV si aparece spam. |
| M2 | HSTS en producción: `max-age=63072000` sin `includeSubDomains; preload` (el informe del 19-11 decía lo contrario). Sin `Content-Security-Policy`. | CSP en modo de prueba agregada (ver 5.2, B7). `preload` queda a decisión del dueño: obliga a HTTPS en todos los subdominios y es difícil de revertir. |
| M3 | Campos del chat con letra de 14 px: en iPhone eso provoca zoom automático al escribir. | Corregido (16 px en celular). |
| M4 | Atajos repetidos en el chat ("Agendar videollamada" aparecía dos veces). | Corregido. |
| M5 | "Sistema web o crm a medida": la conversión a minúsculas bajaba las siglas. | Corregido. |
| M6 | Proyectos, Sprints y Finanzas: botones "Nuevo" sin acción, moneda USD por defecto y "USD $" en todos los montos. | Pendiente (siguiente módulo del CRM). |
| M7 | `vercel` CLI en devDependencies arrastra 39 vulnerabilidades de desarrollo. | Pendiente: quitarla y usar `npx vercel`. |
| M8 | Avisos de ESLint preexistentes (`auto-language-translator`, `cookie-consent`, `theme-toggle`). | Corregido: 0 avisos. |
| M9 | `package.json` se llama `avanza-temp`; `README.md` es el de plantilla de create-next-app; tres `.docx` de 2 a 13 MB en la raíz del repositorio. | Pendiente. |
| M10 | Los mensajes de Gemini solo son privados si la clave pertenece a un proyecto **de pago**; en el nivel gratuito Google puede usar los datos para mejorar sus modelos, lo que contradice la política de privacidad. | Verificar en Google AI Studio. |

---

## 3. Para activar el ARM CRM en producción (dueño)

1. **Supabase → SQL Editor → New query:** abrir `supabase/migrations/20261121_arm_crm.sql`, **revisar la lista de correos del paso 1** (hoy: `magno@avanzape.com` y `manuel@avanzape.com`; deben ser los correos con los que inician sesión en el panel), pegar y ejecutar. Al final muestra quién quedó con acceso; si sale vacío, los correos no coinciden con ninguna cuenta.
   - Si el Libro de Reclamaciones aún no está creado, ejecutar antes `supabase/migrations/20261120_complaints_book.sql`.
2. **Supabase → Authentication → Sign In / Providers:** desactivar "Allow new users to sign up". Las cuentas del equipo se crean a mano en Authentication → Users.
3. **Vercel → Settings → Environment Variables (Production):**
   - `SUPABASE_SERVICE_ROLE_KEY` (Supabase → Project Settings → API → service_role). **Obligatoria** para que el chat, la agenda y el formulario guarden leads. Nunca se pone en el código.
   - Recomendadas: `TELEGRAM_BOT_TOKEN` y `TELEGRAM_CHAT_ID` (aviso al celular por cada lead y cada cita; el bot se crea con @BotFather).
   - Opcionales: `GEMINI_API_KEY` (proyecto de pago), `GEMINI_MODEL`, `CRM_NOTIFY_WEBHOOK_URL`.
4. **Desplegar** la rama con estos cambios.
5. **Probar:** abrir el chat en avanzape.com, dejar datos de prueba → debe aparecer en `/leads` y llegar el aviso. Agendar una cita → debe aparecer en `/agenda`. Revisar `/settings`: todo en verde.
6. **Purga automática (privacidad):** Supabase → Database → Extensions → activar `pg_cron` y ejecutar:
   `select cron.schedule('crm-purge-mensual', '0 8 1 * *', 'select public.crm_purge_stale_data()');`

---

## 4. Cómo usar el CRM para vender más (rutina diaria)

1. **Al empezar el día, abrir "Hoy".** Atender primero los seguimientos en rojo (vencidos) y los leads calientes.
2. **Responder en menos de 1 hora a cada lead nuevo.** El aviso llega al celular; desde la ficha, "WhatsApp → Primer contacto" abre el mensaje ya escrito.
3. **Registrar cada contacto en el historial** y elegir el recordatorio ("Seguir en 2 días"). El lead pasa solo de "Nuevo" a "Contactado".
4. **Después de cada videollamada:** marcarla como realizada en `/agenda`; la ficha queda con "Enviar propuesta (máximo 24 h)".
5. **Nunca cerrar un lead sin motivo.** El motivo alimenta "Por qué perdimos" y se programa la reactivación a 60 días.
6. **Revisar cada semana** "Qué buscaban los que se fueron" y "Objeciones más comunes": ahí está lo que hay que cambiar en la web, los precios o los mensajes.

---

## 5. Revisión independiente con Codex

Dos revisiones de Codex (CLI 0.169, modo solo lectura) sobre el código ya reescrito: **A** = ARM, CRM, base de datos y seguridad; **B** = sitio público, SEO, accesibilidad, legal y textos. Cada hallazgo se verificó contra el código antes de actuar.

### 5.1 Codex A — ARM, CRM y seguridad (11 hallazgos)

| # | Sev. | Hallazgo | Decisión |
|---|------|----------|----------|
| A1 | Crítico | La migración daba acceso al CRM a **todas** las cuentas existentes de Supabase la primera vez. | **Corregido.** Solo los correos listados (`magno@` y `manuel@avanzape.com`); editar la lista antes de ejecutar. |
| A2 | Alto | El historial del chat (con teléfono, correo o nombre que escriba la persona) se enviaba a Gemini antes de su consentimiento. | **Corregido.** `src/lib/arm/guard.ts` reemplaza correos, teléfonos, documentos y nombres antes de enviar; aviso visible en el chat y texto de consentimiento ampliado. |
| A3 | Alto | El chat decía "Listo, Magno te escribirá" aunque el lead no se guardara ni se avisara. | **Corregido** (también confirmado en la prueba en navegador). Ahora ofrece WhatsApp directo. |
| A4 | Alto | La deduplicación buscaba solo por teléfono si había ambos datos. | **Corregido:** busca por teléfono y luego por correo. El caso de dos envíos en el mismo milisegundo queda como riesgo bajo (el botón se bloquea mientras envía). |
| A5 | Alto | La cita se creaba antes que el lead: si fallaba el resto, quedaba una cita sin ficha. | **Corregido:** primero el lead, luego la cita ya vinculada, luego etapa e historial, con errores registrados y un solo aviso combinado. Una transacción en la base sería la versión ideal (pendiente). |
| A6 | Alto | `gen_random_uuid()` sin la extensión `pgcrypto`. | **Descartado:** es función nativa de PostgreSQL desde la versión 13; Supabase usa 15 o superior. |
| A7 | Medio | La cita podía guardar un teléfono inválido como contacto aunque hubiera un correo válido. | **Corregido:** teléfono normalizado o, si no sirve, el correo. |
| A8 | Medio | Gemini podía cambiar precios o inventar descuentos. | **Corregido:** si su texto trae cifras, porcentajes u ofertas que no están en el borrador o el catálogo, se descarta y responde el motor propio (con pruebas). |
| A9 | Medio | Límite de uso evadible y en memoria. | **Parcial:** ahora usa las cabeceras de IP que pone Vercel (no falsificables). El límite compartido entre instancias (Upstash) queda pendiente. |
| A10 | Bajo | El foco del teclado no pasaba al formulario o a la agenda al abrirse. | **Corregido.** |
| A11 | Mejora | Faltan pruebas de integración contra una base Supabase real (RLS, concurrencia, fallos parciales). | **Pendiente** (recomendado antes de crecer el equipo). |

### 5.2 Codex B — sitio público (14 hallazgos)

| # | Sev. | Hallazgo | Decisión |
|---|------|----------|----------|
| B1 | Crítico | El Libro de Reclamaciones se muestra sin RUC ni domicilio del proveedor (`site-config.ts`, `legal.ruc` y `legal.fiscalAddress` vacíos). INDECOPI los exige. | **Pendiente del dueño:** completar ambos datos en `src/lib/site-config.ts` (se muestran solos). |
| B2 | Alto | Google Translate se cargaba y dejaba cookies al entrar, sin permiso, incluso después de "Rechazar". | **Corregido:** solo se activa si la persona elige otro idioma; el menú avisa que usa Google Translate. Verificado en navegador. |
| B3 | Alto | La política de privacidad citaba el reglamento derogado D.S. 003-2013-JUS. | **Corregido:** D.S. 016-2024-JUS. También se corrigió el texto que decía "sin cookies de terceros" (Analytics sí usa cookies, con permiso) y se listaron Google Analytics, Google Translate y Telegram. |
| B4 | Alto | Si falla el registro de un reclamo, la web decía que el correo "tiene el mismo valor". | **Corregido:** ya no afirma equivalencia; indica que se responderá con el número de hoja y que el correo enviado sirve de constancia. |
| B5 | Alto | La descripción del servicio contratado era opcional en el reclamo. | **Corregido:** obligatoria (mínimo 5 caracteres). |
| B6 | Medio | Las direcciones `*.vercel.app` de producción podían indexarse (C8 del informe anterior). | **Corregido** en `src/proxy.ts`: `robots.txt` con `Disallow` y cabecera `noindex` (verificado). |
| B7 | Medio | Sin `Content-Security-Policy` (C9 anterior). | **Parcial:** CSP en modo de prueba (`Report-Only`) solo en producción. Revisar la consola en avanzape.com y luego activarla. |
| B8 | Medio | El menú Ctrl/Cmd+K anunciaba "17 servicios" y copiaba `contacto@avanzastudio.com`. | **Corregido:** datos desde `SITE_CONFIG` (`contacto@avanzape.com`). |
| B9 | Medio | Plazos distintos según la página (ver tabla 5.3). | **Pendiente del dueño:** decidir los plazos oficiales. |
| B10 | Medio | Testimonios con resultados absolutos ("triplicamos la tasa de cierre") sin cliente verificable (B6 anterior). | **Pendiente del dueño.** |
| B11 | Medio | La portada precargaba dos imágenes (escritorio y celular). | **Corregido** con `<picture>`: se descarga solo una (verificado). |
| B12 | Bajo | `command-menu.tsx` y `not-found.tsx` superan 300 líneas; el menú Ctrl+K se carga en todas las páginas. | **Pendiente.** |
| B13 | Bajo | Avisos de React en `cookie-consent`, `theme-toggle` y el traductor. | **Corregido.** ESLint: 0 errores y 0 avisos en todo el proyecto. |
| B14 | Mejora | La política no describía el traductor ni sus cookies. | **Corregido** (ver B3). |

### 5.3 Plazos que hoy se contradicen (decisión del dueño)

| Servicio | Asistente ARM y base de conocimiento | Página de servicios (`projects.ts`) | Simulador (`estimator-logic.ts`) |
|----------|--------------------------------------|-------------------------------------|----------------------------------|
| Página web | 7 a 12 días | 1 a 2 semanas | 7 a 10 días |
| Sistema / CRM | 12 a 20 días | 2 a 4 semanas | 12 a 14 días |
| Automatización con IA | 10 a 25 días | Unas 2 semanas | 10 a 14 días |

Recomendación: elegir una sola cifra por servicio y que las tres partes lean de `src/lib/arm/catalog.ts`.

### 5.4 Encontrado por Claude durante la verificación en navegador

- El botón flotante "Cotizar" tapaba el selector de idioma del pie de página → **corregido** (más margen inferior en el pie).
- La agenda del chat decía "No quedan horarios libres" cuando en realidad la agenda en línea no estaba disponible → **corregido** (ofrece WhatsApp con la fecha elegida).
- "Soy Carlos…" al inicio de una frase no se reconocía como nombre → **corregido** (y probado).

### 5.5 Estado final de las verificaciones

| Verificación | Resultado |
|--------------|-----------|
| `tsc --noEmit` | Sin errores |
| `eslint .` | 0 errores, 0 avisos (antes: 14 avisos) |
| `npm run test:arm` | 19/19 |
| `node scripts/run_unit_tests.mjs` | 44/44 |
| `node scripts/run_acceptance_tests.mjs` | 30/30 |
| `next build` | Correcto (Next.js 16.4.6) |
| `npm audit --omit=dev` | 0 vulnerabilidades |
| Navegador (local) | Chat completo, agenda, formulario, cookies, idioma, portada y `noindex` en `*.vercel.app` comprobados |
| No verificado | Panel CRM con datos reales y escritura en Supabase (requiere la migración y las claves de producción; ver sección 3) |
