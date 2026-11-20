# Plan de diseño único — AVANZA

**Fecha:** 19 de noviembre de 2026
**Quién implementa:** Claude (Gemini/Antigravity sin tokens disponibles).
**Base:** `AUDITORIA_2026-11-19.md`, `MEJORAS_VISUALES.md` y la skill oficial `frontend-design` de Anthropic, instalada hoy.
**Rama de trabajo:** `diseno/web-unica`, creada desde `main`. Nada se publica sin aprobación del dueño.

---

## 1. Decisiones del dueño

| Tema | Decisión |
|------|----------|
| Portada | La aprobada: "Software a medida / que hace crecer tu empresa", una frase y un botón. |
| Aspecto | Que no parezca hecho por IA: quitar recuadros, etiquetas y adornos genéricos. |
| Sello propio | **El trabajo real primero.** El portafolio es lo más grande de la página. |
| Servicios | Tres: páginas web, sistemas a medida y automatización con IA. Se quitan apps móviles, fintech, RPA y migración. |
| Animaciones | Suaves, como ahora (scroll con Lenis y entradas cortas). |
| Skills | `frontend-design` (Anthropic) y `web-design-guidelines` (Vercel), instaladas en Claude. |

---

## 2. Qué hace que hoy se vea "hecha por IA"

Inventario del código público (portada, páginas, componentes del sitio) frente a la lista de la skill `frontend-design`:

| Recurso genérico | Cantidad hoy | Destino |
|------------------|--------------|---------|
| Bordes (`border`) | 244 | Quedan solo en campos de formulario y foco de teclado. |
| Esquinas redondeadas | 68 | Solo en imágenes (un radio único) y en el botón flotante. |
| Sombras | 22 | Ninguna. |
| Puntos medios "A · B · C" | 26 | Ninguno. Se escribe una frase. |
| Etiquetas en mayúsculas con espaciado | 25 | Ninguna. Texto normal un tamaño menor. |
| Fuente mono para etiquetas | 17 | Ninguna. |
| Flechas pegadas a botones y enlaces | 6 | Ninguna. |
| Numeración 01–04 decorativa | 8 | Solo donde hay una secuencia real (los pasos de trabajo). |
| Frase del título en cursiva y otro color | 1 | Ninguna. |
| Pulsos y puntos de "estado activo" | 3 | Ninguno. |
| Tarjetas iguales en fila | 5 secciones | Ninguna. Listas y texto con espacio. |
| Cifra grande con etiqueta pequeña ("7 a 14 días / 100% / 24 h") | 1 sección | Se quita la franja; esos datos van en frases. |
| Tabla "nosotros vs agencias tradicionales" | 1 sección | Se quita; las diferencias reales van en "Cómo trabajamos". |

---

## 3. Sistema visual

### 3.1 Color (5 valores)

| Nombre | Hex | Uso |
|--------|-----|-----|
| Tinta | `#000000` | Fondos oscuros y texto sobre claro. Negro puro, no "casi negro". |
| Papel | `#FFFFFF` | Fondos claros y texto sobre oscuro. |
| Marino | `#021761` | Botón principal sobre papel, enlaces, foco. Nada más. |
| Gris claro | `#5F6368` | Texto secundario sobre papel. Contraste 6,3 : 1. |
| Gris oscuro | `#A3A3A3` | Texto secundario sobre tinta. Contraste 8,3 : 1. |

Sin degradados, sin brillos desenfocados, sin cuadrículas de fondo.

### 3.2 Tipografía

Una familia, **Geist**, con pesos 300, 400 y 500. Escala modular de razón 1,333:

| Clase | Móvil | Escritorio | Peso | Uso |
|-------|-------|------------|------|-----|
| `type-display` | 40 | 72 | 300 | Título de portada y `h1` de páginas |
| `type-section` | 28 | 44 | 300 | Títulos de sección |
| `type-card` | 20 | 26 | 400 | Nombre de proyecto o servicio |
| `type-body` | 16 | 18 | 400 | Texto corrido, máximo 64 caracteres por línea |
| `type-small` | 14 | 14 | 400 | Datos secundarios, ciudad, rubro |
| `type-button` | 15 | 15 | 500 | Botones, en minúscula de frase, sin espaciado extra |

El prefijo `type-` corrige el fallo A1/A2 de la auditoría: ninguna clase propia vuelve a empezar por `text-`.

### 3.3 Espacio y forma

- Contenedor centrado de 1.280 px; márgenes de 20 px en móvil y 48 px en escritorio.
- Aire vertical entre secciones: 120 px en móvil, 200 px en escritorio. El espacio separa; no hay líneas divisorias.
- Un solo radio, 4 px, y solo en imágenes.
- Alineación: todo a la izquierda, salvo la portada, que va centrada sobre la foto.

### 3.4 Movimiento

| Momento | Qué hace | Duración |
|---------|----------|----------|
| Carga de la portada (el único momento orquestado) | Título, frase y botón aparecen en secuencia | 0,9 s en total |
| Imágenes del portafolio (el sello) | Al entrar en pantalla pasan de escala 1,06 a 1 ligadas al scroll | Continuo, sin saltos |
| Títulos de sección | Fundido de 16 px | 0,6 s, una vez |
| Scroll | Lenis, igual que hoy | — |
| Respuesta al usuario | Pestañas, acordeón y simulador muestran qué cambió | 0,25 s |

Se quitan las entradas escalonadas de cada tarjeta y los efectos de hover que mueven elementos. Solo se animan `opacity` y `transform`. Con "reducir movimiento" todo aparece sin animación.

---

## 4. Estructura nueva de la portada

```
┌──────────────────────────────────────────────┐
│  AVANZA            Trabajo  Servicios  Nosotros  Contacto   [Cotizar] │
│                                                              │
│          (foto del escritorio de noche, a pantalla completa)  │
│                                                              │
│                 Software a medida                            │
│              que hace crecer tu empresa                      │
│     Páginas web, sistemas e IA para empresas del Perú.       │
│                    [ Cotizar proyecto ]                      │
└──────────────────────────────────────────────┘
  TRABAJO (fondo tinta)                             ← el sello
  ┌──────────────────────────────────────────┐
  │   captura a ancho completo 16:9             │
  └──────────────────────────────────────────┘
  Molinos Cusco                     Cusipata, Cusco
  Plataforma para distribuidores mayoristas.  Ver sitio
        … (los 6 proyectos, uno debajo del otro, alternando ancho 100% / 66%)

  QUÉ HACEMOS (fondo papel)
  Páginas web          Una frase.  Ejemplo: Qorikancha Expeditions
  Sistemas a medida    Una frase.  Ejemplo: Import L&R
  Automatización con IA Una frase. Ejemplo: asistente de cotización de esta web

  CÓMO TRABAJAMOS (papel)   1 Conversamos  2 Propuesta en 24 h  3 Entregas cada 1–2 semanas  4 El código es tuyo

  SIMULADOR (tinta)          opciones como texto; la elegida subrayada

  LO QUE DICEN (papel)       3 citas grandes, sin estrellas ni recuadros

  FUNDADORES Y CONTACTO (tinta)  nombres, WhatsApp, un botón
  PIE
```

**Revisión contra el encargo (paso exigido por la skill).** Una agencia de software genérica tendría: héroe con dos botones, franja de logos, tres tarjetas de servicios con icono, cifras grandes, testimonios con estrellas y un llamado final. Este plan cambia cuatro cosas de ese molde: el trabajo real ocupa la mitad de la página; los servicios son frases ligadas a un proyecto concreto; no hay cifras ni tarjetas; el cierre son personas con nombre y un teléfono, no un eslogan.

### 4.1 Textos de servicios (borrador para aprobar)

| Servicio | Frase | Prueba real |
|----------|-------|-------------|
| Páginas web | Sitios rápidos que explican lo que vendes y llevan al cliente a escribirte. | Qorikancha Expeditions, AOL-DOMO, SV Tuning |
| Sistemas a medida | Programas para vender, cobrar y controlar tu inventario, hechos para cómo trabaja tu negocio. | Import L&R, control de ceremonias |
| Automatización con IA | Asistentes que responden, cotizan y agendan por ti, conectados a tus datos. | El asistente de cotización de esta misma web |

### 4.2 Cómo trabajamos (borrador para aprobar)

1. **Conversamos.** Una llamada para entender tu negocio.
2. **Propuesta en 24 horas.** Alcance, plazo y precio por escrito.
3. **Entregas cada una o dos semanas.** Ves y usas el avance desde la primera.
4. **El código es tuyo.** Sin licencias mensuales ni dependencia de nosotros.

---

## 5. Páginas interiores

| Página | Cambio |
|--------|--------|
| `/servicios` | Un `h1` y los tres servicios en detalle: qué incluye, plazo típico y el proyecto que lo demuestra. Se quitan las 6 tarjetas y las fotos de Unsplash. |
| `/nosotros` | `h1`, la historia en texto corrido, los dos fundadores con su rol. Sin recuadros de misión y visión. |
| `/metodologia` | Los 4 pasos de 4.2 en detalle. Sin la jerga (Next.js, Supabase, RLS). |
| `/contacto` | `h1`, el formulario sin recuadros (campos con línea inferior), WhatsApp y correo como enlaces de texto. |
| Legales (`/privacidad`, `/terminos`, `/reclamaciones`) | Solo el sistema visual: sin recuadros ni sombras. El contenido legal no se toca. |

---

## 6. Correcciones de la auditoría incluidas

| Código | Corrección | Fase |
|--------|------------|------|
| A1, A2 | Renombrar `text-*` → `type-*` | 1 |
| A3 | `h1` en cada página interior | 1 |
| B2, B3 | Desaparecen las 6 imágenes negras: los servicios ya no llevan foto; la llamada final y los fundadores pasan a texto sobre tinta hasta tener foto real | 2 y 3 |
| B4, B5 | Portada aprobada, portafolio una sola vez | 2 |
| C2 | Títulos de pestaña sin marca duplicada | 3 |
| C3 | Encabezado sólido a partir de 80 px | 2 |
| C4, C5 | Desaparecen con la franja de cifras y el acordeón | 2 |
| C7 | Campo antispam oculto para lectores de pantalla | 3 |
| D4 | Borrar restos decorativos y `luxury-mesh-gradient.tsx` | 4 |
| B1 | Dominio principal en Vercel | **Dueño** |

Quedan fuera de este plan: C1 en páginas legales, C8, C9, D1, D3, D5.

---

## 7. Fases de implementación

| Fase | Contenido | Verificación |
|------|-----------|--------------|
| 1. Cimientos | Tokens de color y tipografía `type-*`; `SectionHeading` con `as="h1"`; reemplazo en los 23 archivos | Contraste 0 fallos; títulos interiores a 44 px |
| 2. Portada | Portada aprobada, sección Trabajo (sello), Qué hacemos, Cómo trabajamos, simulador sin recuadros, testimonios, fundadores, encabezado | Capturas a 375, 768, 1024, 1440; portada < 7.500 px en escritorio |
| 3. Páginas interiores | `/servicios`, `/nosotros`, `/metodologia`, `/contacto`, legales | Un `h1` por página; sin fotos externas |
| 4. Limpieza | Borrar componentes y estilos sin uso; skill `web-design-guidelines` sobre los archivos tocados | `tsc`, `eslint` y `next build` sin errores |

Un commit por fase. Al final de cada fase, el dueño ve el resultado en el navegador antes de seguir.

---

## 8. Pendientes del dueño

- [ ] Aprobar los textos de 4.1 y 4.2, o corregirlos.
- [ ] Confirmar la ciudad de cada proyecto del portafolio (AOL-DOMO, Import L&R, control de ceremonias).
- [ ] Captura del panel de Import L&R con datos de demostración.
- [ ] Foto de los fundadores (opcional: la sección funciona sin ella).
- [ ] Dominio principal en Vercel (B1).

---

## 9. Ronda 2 (20 de noviembre de 2026)

Pedidos del dueño e implementación:

| Pedido | Qué se hizo |
|--------|-------------|
| Apellido "Alomía" con tilde en todo el sitio | Unificado en configuración, páginas, panel y pruebas. |
| Volver al carrusel animado, solo con páginas web | `arc-carousel.tsx`: las 4 páginas públicas giran sobre medio círculo hacia abajo; avance automático cada 10 s con barra de progreso; botones anterior, pausa y siguiente; teclado; se pausa con el puntero, el foco o la pestaña oculta. |
| Ofrecer los sistemas aparte | `systems-offer.tsx`: Import L&R y control de ceremonias con lo que resuelven y un botón "Cotizar un sistema". |
| Modo claro y oscuro | Según el dispositivo la primera vez; botón en el encabezado (en el menú en celular); se recuerda la elección; sin destello al cargar. Las secciones claras pasan a oscuro y las negras se mantienen. |
| Libro de Reclamaciones visible y conforme a ley | Acceso con ícono en el pie de todas las páginas. Hoja con datos del proveedor, datos del consumidor (con padre, madre o apoderado si es menor), bien contratado y monto, definiciones de reclamo y queja, pedido, plazo de 15 días hábiles y leyendas. Constancia imprimible o en PDF. |
| Cookies (Ley 29733, D.S. 016-2024-JUS) | Google Analytics ya no se carga sin permiso: aviso con "Aceptar" y "Rechazar", y enlace "Cookies" en el pie para cambiar la elección. |
| Animaciones | Entradas suaves escalonadas en servicios, pasos, sistemas, testimonios, cierre y páginas interiores; ampliación al pasar el puntero sobre las capturas del carrusel. |
| Pantalla de carga | Logo de AVANZA y una línea fina que avanza, en el color del tema. |

### Pendientes del dueño para cumplir la ley

- [ ] **Ejecutar `supabase/migrations/20261120_complaints_book.sql` en Supabase.** Hasta entonces, las hojas no se guardan en la base de datos: el formulario avisa y ofrece enviarlas por correo a contacto@avanzape.com con un clic.
- [ ] **RUC, razón social y domicilio fiscal** en `src/lib/site-config.ts` (`legal.ruc`, `legal.fiscalAddress`). Son datos obligatorios del proveedor en la hoja; se muestran solos al completarse.
- [ ] Verificar los textos de la hoja con la herramienta oficial de Indecopi "Tu Libro de Reclamaciones".
- [ ] Responder cada hoja por escrito en 15 días hábiles y conservar las hojas.
