# Tickets — XV Ana Valeria

Referencia obligatoria: `CONTEXT_XV_ANA_VALERIA.md` en la raíz del repo.
Consultar la documentación oficial de cada tecnología ANTES de implementar.

---

## Sprint 1 — Estructura + Secciones Estáticas

---

### XV-001: Setup del proyecto
**Branch:** `feat/XV-001-setup`
**Prioridad:** Crítica (bloqueante para todo lo demás)

**Descripción:**
Inicializar el proyecto Astro 5 con React, Tailwind CSS 4 y Supabase. Crear la estructura de carpetas completa. Configurar el cliente de Supabase. Hacer primer commit y push a main.

**Archivos a crear/modificar:**
- `package.json`
- `astro.config.mjs`
- `tailwind.config.mjs` (o `tailwind.config.ts`)
- `src/styles/global.css`
- `src/layouts/Layout.astro`
- `src/pages/index.astro`
- `src/lib/supabase.ts`
- `.env.example`
- `.gitignore`
- `README.md`

**Acceptance Criteria:**
- [ ] Proyecto Astro 5 inicializado con `@astrojs/react` y `@astrojs/tailwind`
- [ ] React 19 configurado como integration
- [ ] Tailwind CSS 4 funcionando con las clases base
- [ ] `global.css` con: reset básico, imports de Google Fonts (Playfair Display, Montserrat, Inter), utility classes de glassmorphismo (`.glass`, `.glass-strong`, `.glass-subtle`), variables CSS de la paleta de colores
- [ ] Layout.astro con: meta tags OG configurados (título "XV Años Ana Valeria", descripción, imagen OG placeholder), fuentes cargadas, viewport mobile
- [ ] `index.astro` con estructura skeleton de todas las secciones (secciones vacías con ids: `#hero`, `#invitation`, `#gallery`, `#family`, `#timeline`, `#dresscode`, `#gifts`, `#location`, `#guestbook`, `#photos`, `#footer`)
- [ ] Cliente Supabase configurado en `src/lib/supabase.ts` usando variables de entorno `PUBLIC_SUPABASE_URL` y `PUBLIC_SUPABASE_ANON_KEY`
- [ ] `.env.example` con las variables necesarias documentadas
- [ ] `@supabase/supabase-js` instalado
- [ ] Estructura de carpetas creada: `src/assets/gallery/`, `src/assets/family/`, `src/assets/icons/`, `src/components/`, `public/audio/`
- [ ] `.gitignore` configurado (node_modules, dist, .env, .astro)
- [ ] `npm run dev` corre sin errores en `localhost:4321`
- [ ] Primer commit y push a `main`

**Notas técnicas:**
- Verificar versiones actuales de Astro 5, @astrojs/react y @astrojs/tailwind en npm antes de instalar
- Tailwind 4 cambió la configuración respecto a v3 — consultar docs oficiales de @astrojs/tailwind
- Las Google Fonts se cargan vía `<link>` en el Layout, no vía @import en CSS (mejor performance)

---

### XV-002: Hero + Countdown
**Branch:** `feat/XV-002-hero`
**Prioridad:** Alta
**Depende de:** XV-001

**Descripción:**
Crear la sección Hero con el nombre de la quinceañera, subtítulo y countdown regresivo. El countdown es un React Island porque necesita actualización en tiempo real.

**Archivos a crear/modificar:**
- `src/components/Hero.astro`
- `src/components/Countdown.tsx` (React Island)
- `src/components/Butterflies.astro`
- `src/pages/index.astro` (integrar)

**Acceptance Criteria:**
- [ ] Sección hero ocupa viewport completo (100vh o 100svh para mobile)
- [ ] Background: gradiente suave de azul cielo a blanco con overlay sutil. Opcionalmente un patrón de luz/bokeh con CSS
- [ ] Nombre "Ana Valeria" en tipografía Playfair Display, tamaño grande, con estilo itálico elegante, color dorado o gris oscuro
- [ ] Subtítulo "MIS QUINCE AÑOS" en Montserrat, uppercase, letter-spacing amplio (0.3em), tamaño pequeño
- [ ] Componente `Countdown.tsx`:
  - Cuenta regresiva a: **16 de mayo de 2026, 18:00:00 hrs (CST / America/Mexico_City)**
  - Muestra: DÍAS | HORAS | MIN | SEG
  - Cada unidad en su propio bloque con número grande arriba y label pequeño abajo
  - Contenedor con clase `.glass` (glassmorphismo)
  - Se actualiza cada segundo con `setInterval`
  - Directiva de hidratación: `client:load`
  - Si la fecha ya pasó, mostrar "¡Hoy es el gran día!" o similar
- [ ] Componente `Butterflies.astro`:
  - 6-10 mariposas SVG flotando con animación CSS
  - Colores alternados: dorado (`#D4AF37`) y azul cielo (`#87CEEB`)
  - Animación: movimiento suave tipo float (translateY + rotate + scale sutil), duración larga (15-25s), infinite
  - Posicionadas con `position: absolute` dentro del hero, `pointer-events: none`
  - Diferentes tamaños (20px a 50px) y opacidades (0.3 a 0.7)
  - No deben tapar el contenido central
- [ ] Scroll indicator sutil al fondo del hero (chevron animado o "Desliza para ver más")
- [ ] Responsive: se ve bien en 375px (iPhone SE) hasta 1440px

**Notas técnicas:**
- El countdown DEBE usar timezone `America/Mexico_City` para calcular correctamente
- `100vh` tiene problemas en mobile Safari — usar `100svh` con fallback `100vh`
- Las mariposas usan `will-change: transform` para performance en la animación

---

### XV-003: Sección Invitación
**Branch:** `feat/XV-003-invitation`
**Prioridad:** Media
**Depende de:** XV-001

**Descripción:**
Sección con el mensaje de invitación de la familia. Diseño elegante y centrado.

**Archivos a crear/modificar:**
- `src/components/Invitation.astro`
- `src/pages/index.astro` (integrar)

**Acceptance Criteria:**
- [ ] Ícono decorativo arriba del título (libro abierto SVG o similar, color dorado/vino)
- [ ] Título: "Una Noche de Ensueño" en Playfair Display
- [ ] Texto de invitación en itálica, centrado, con comillas decorativas:

> "Hay momentos que se graban para siempre en el corazón. Con la bendición de Dios y el amor de mi familia, te invito a celebrar conmigo esta noche mágica donde mis sueños comienzan a volar. Tu presencia hará de este día un recuerdo inolvidable."

- [ ] Firma: "— Con cariño, Ana Valeria" alineada a la derecha
- [ ] Fondo blanco o muy ligeramente azul (#FAFCFF)
- [ ] Padding generoso arriba y abajo (min 80px)
- [ ] Ancho máximo del texto: ~600px centrado
- [ ] Mariposa decorativa pequeña como separador debajo del texto (SVG estático, dorada, centrada, opacity 0.5)
- [ ] Animación scroll-reveal: fade-in + slide-up al entrar al viewport

**Notas técnicas:**
- El texto es placeholder. La clienta lo cambiará después, así que debe ser fácil de editar (texto directo en el componente, no en una variable compleja)

---

### XV-004: Galería de Fotos
**Branch:** `feat/XV-004-gallery`
**Prioridad:** Alta
**Depende de:** XV-001

**Descripción:**
Galería/carousel de fotos de Ana Valeria. Las fotos serán subidas por el desarrollador en WebP.

**Archivos a crear/modificar:**
- `src/components/Gallery.astro`
- `src/pages/index.astro` (integrar)

**Acceptance Criteria:**
- [ ] Título de sección: "Galería" o sin título (depende del diseño)
- [ ] Layout tipo grid/masonry:
  - Mobile: 2 columnas
  - Tablet: 3 columnas
  - Desktop: 3-4 columnas
- [ ] Cada foto con:
  - Bordes redondeados (border-radius: 16px)
  - Sombra sutil
  - Hover: scale(1.03) con transición suave
  - Al hacer click: lightbox overlay fullscreen con la imagen ampliada
- [ ] Lightbox:
  - Fondo oscuro semitransparente (rgba(0,0,0,0.85))
  - Imagen centrada con max-width/max-height
  - Botón cerrar (X) en esquina superior derecha
  - Click fuera de la imagen o presionar Escape cierra el lightbox
  - Navegación prev/next con flechas (opcional pero deseable)
  - **Implementar el lightbox en vanilla JS o como React Island**, sin librerías externas
- [ ] Usar componente `<Image>` de Astro para optimización automática (lazy loading, srcset)
- [ ] Las fotos se leen de `src/assets/gallery/` con `import.meta.glob` o similar
- [ ] Animación scroll-reveal en las fotos (staggered, cada foto aparece con delay incremental)

**Notas técnicas:**
- Las fotos serán ~10 archivos WebP en `src/assets/gallery/`
- Si se usa `<Image>` de Astro, las fotos DEBEN estar en `src/` no en `public/`
- Para masonry real en CSS: `columns: 2` en mobile funciona bien. Grid con `grid-row: span` es más controlable
- El lightbox puede ser un `<dialog>` nativo de HTML

---

### XV-005: Sección Familia
**Branch:** `feat/XV-005-family`
**Prioridad:** Media
**Depende de:** XV-001

**Descripción:**
Cards tipo equipo/team con fotos y nombres de padres y padrino.

**Archivos a crear/modificar:**
- `src/components/Family.astro`
- `src/pages/index.astro` (integrar)

**Acceptance Criteria:**
- [ ] Título: "Con Amor, mi Familia" en Playfair Display
- [ ] Subtítulo "MIS PADRES" en Montserrat uppercase, letter-spacing amplio
- [ ] 2 cards lado a lado para los padres:
  - **Card 1:** Foto (circular, 120-150px), "Dr. Christian Alejandro Macías Conde", label "Papá"
  - **Card 2:** Foto (circular, 120-150px), "C.P. Asminda Ibarra Flores", label "Mamá"
- [ ] Subtítulo "MI PADRINO" debajo
- [ ] 1 card centrada:
  - Foto (circular), "Ing. Gustavo Morán Soto", label "Padrino"
- [ ] Cada card con efecto glassmorphismo (`.glass`)
- [ ] Cards con padding interno, centrado, hover sutil
- [ ] Fotos con `object-fit: cover`, borde sutil dorado o blanco
- [ ] Layout responsive:
  - Mobile: cards en stack vertical o 2 columnas para padres
  - Desktop: 3 cards en una fila o padres + padrino en layout equilibrado
- [ ] Animación scroll-reveal
- [ ] **Placeholder si no hay fotos:** usar un ícono de persona con fondo azul claro hasta que se suban las fotos reales

**Notas técnicas:**
- Las fotos de padres/padrino estarán en `src/assets/family/` — pueden no estar disponibles inmediatamente
- Preparar el componente para que sea fácil cambiar las imágenes (rutas claras, imports simples)

---

### XV-006: Cronograma / Timeline
**Branch:** `feat/XV-006-timeline`
**Prioridad:** Media
**Depende de:** XV-001

**Descripción:**
Timeline vertical con los eventos del día.

**Archivos a crear/modificar:**
- `src/components/Timeline.astro`
- `src/pages/index.astro` (integrar)

**Acceptance Criteria:**
- [ ] Título: "Cronograma" en Playfair Display
- [ ] Timeline vertical con línea conectora central o lateral
- [ ] 3 nodos/eventos:
  1. **18:00 hrs** — Ícono: iglesia/capilla — "Ceremonia Religiosa" — "Templo de Fátima"
  2. **21:00 hrs** — Ícono: cubiertos/cena — "Recepción y Cena" — "Centro de Convenciones Holiday Inn"
  3. **22:30 hrs** — Ícono: pareja bailando/vals — "Vals"
- [ ] Cada nodo:
  - Ícono dentro de un círculo con fondo glass y borde dorado sutil
  - Hora en color dorado o azul, fuente Montserrat
  - Título del evento en Playfair Display, bold
  - Lugar en Inter/Lato, color gris, tamaño menor
- [ ] Línea vertical conectora: color azul cielo claro o gris muy suave, 2px
- [ ] Los íconos pueden ser SVG inline simples o emojis estilizados
- [ ] Animación scroll-reveal: cada nodo aparece con delay incremental al scrollear
- [ ] Responsive: timeline centrado en mobile y desktop

**Notas técnicas:**
- Implementar con CSS puro (flexbox/grid + pseudo-elements para la línea). No usar librerías de timeline
- Los íconos SVG deben ser simples y monocromáticos para mantener elegancia

---

### XV-007: Dress Code
**Branch:** `feat/XV-007-dresscode`
**Prioridad:** Media
**Depende de:** XV-001

**Descripción:**
Card con el código de vestimenta y la restricción de color.

**Archivos a crear/modificar:**
- `src/components/DressCode.astro`
- `src/pages/index.astro` (integrar)

**Acceptance Criteria:**
- [ ] Card centrada con efecto glassmorphismo fuerte (`.glass-strong`)
- [ ] Ícono de percha/hanger SVG arriba, color dorado
- [ ] Título: "Dress Code" en Playfair Display
- [ ] Subtítulo: "FORMAL ELEGANTE" en Montserrat uppercase, letter-spacing
- [ ] Nota de restricción dentro de un sub-card o bloque con fondo azul cielo muy suave (`#EBF5FB`):
  - Texto: "Por favor, evitar el uso de azul claro (exclusivo de la quinceañera)."
  - Tipografía itálica, tamaño ligeramente menor
- [ ] Ancho máximo de la card: ~400px, centrada
- [ ] Padding generoso interno
- [ ] Animación scroll-reveal
- [ ] Mariposa decorativa pequeña debajo de la card (opcional)

---

### XV-008: Regalos
**Branch:** `feat/XV-008-gifts`
**Prioridad:** Media
**Depende de:** XV-001

**Descripción:**
Sección de regalos con opción de sobre con dinero y link a mesa de regalos Liverpool.

**Archivos a crear/modificar:**
- `src/components/Gifts.astro`
- `src/pages/index.astro` (integrar)

**Acceptance Criteria:**
- [ ] Ícono de regalo SVG, color dorado
- [ ] Título: "Regalos" en Playfair Display
- [ ] Mensaje: "Tu presencia es mi mayor regalo, pero si deseas tener un detalle conmigo:"
- [ ] Card glass con ícono de sobre y texto "SOBRE CON DINERO"
- [ ] Botón/link a Liverpool:
  - URL: `https://mesaderegalos.liverpool.com.mx/milistaderegalos/51971590`
  - Texto: "Ver Mesa de Regalos en Liverpool"
  - Abre en nueva pestaña (`target="_blank"`, `rel="noopener noreferrer"`)
  - Estilo: botón con gradiente elegante (rosa suave a dorado, o azul a dorado)
  - Hover: brillo o scale sutil
- [ ] Layout: contenido centrado, ancho máximo ~500px
- [ ] Animación scroll-reveal

---

### XV-009: Ubicación / Mapas
**Branch:** `feat/XV-009-location`
**Prioridad:** Alta
**Depende de:** XV-001

**Descripción:**
Dos cards con mapas embebidos de Google Maps para la ceremonia y la recepción.

**Archivos a crear/modificar:**
- `src/components/Location.astro`
- `src/pages/index.astro` (integrar)

**Acceptance Criteria:**
- [ ] Título: "Ubicación" en Playfair Display
- [ ] 2 cards, cada una con:
  - Mapa embebido (iframe de Google Maps, sin API key)
  - Nombre del lugar
  - Dirección
  - Botón "Ver en Maps" que abre Google Maps en nueva pestaña
- [ ] Card 1 — Ceremonia Religiosa:
  - Lugar: Templo de Fátima, Durango
  - Buscar la dirección exacta y coordenadas para el embed
  - Link a Google Maps directo
- [ ] Card 2 — Recepción:
  - Lugar: Centro de Convenciones Holiday Inn, Durango
  - Buscar la dirección exacta y coordenadas para el embed
  - Link a Google Maps directo
- [ ] Iframe del mapa:
  - `border-radius` en la parte superior (overflow hidden en el contenedor)
  - Altura: ~200px en mobile, ~250px en desktop
  - `loading="lazy"` en el iframe
- [ ] Botón "Ver en Maps" con ícono de pin/location
- [ ] Cards con bordes redondeados, sombra sutil
- [ ] Layout:
  - Mobile: cards apiladas verticalmente
  - Desktop: cards lado a lado
- [ ] Animación scroll-reveal

**Notas técnicas:**
- El iframe de Google Maps se genera con: `https://www.google.com/maps/embed?pb=...` — buscar el embed code para cada ubicación
- Alternativa: `https://maps.google.com/maps?q=LUGAR&output=embed` — más simple
- El desarrollador deberá confirmar las direcciones exactas en Durango

---

### XV-010: Footer
**Branch:** `feat/XV-010-footer`
**Prioridad:** Baja
**Depende de:** XV-001

**Descripción:**
Footer simple con agradecimiento y crédito al desarrollador.

**Archivos a crear/modificar:**
- `src/components/Footer.astro`
- `src/pages/index.astro` (integrar)

**Acceptance Criteria:**
- [ ] Fondo: gradiente oscuro elegante (azul muy oscuro → casi negro, o similar)
- [ ] Texto de agradecimiento: "Gracias por ser parte de este momento tan especial" — color blanco, centrado
- [ ] Separador: mariposa dorada pequeña o línea fina
- [ ] Crédito: "by [MarkiDev](https://markidev.com)" — link funcional a markidev.com, `target="_blank"`
- [ ] Copyright: "© 2026"
- [ ] Tipografía: Inter/Lato, tamaño pequeño para el crédito
- [ ] Padding generoso
- [ ] El footer NO debe quedar tapado por el BottomNav — agregar padding-bottom suficiente (~80px)

---

### XV-011: Reproductor de Música
**Branch:** `feat/XV-011-music`
**Prioridad:** Media
**Depende de:** XV-001

**Descripción:**
Reproductor de música de fondo, discreto, con play/pause.

**Archivos a crear/modificar:**
- `src/components/MusicPlayer.tsx` (React Island)
- `src/pages/index.astro` (integrar)

**Acceptance Criteria:**
- [ ] React Island con `client:load`
- [ ] Botón flotante fijo:
  - Posición: esquina inferior izquierda (para no chocar con el BottomNav centrado)
  - O integrado en el BottomNav como ícono adicional
  - Tamaño: ~44px (tap target mínimo)
  - Estilo glass con ícono de nota musical / play / pause
- [ ] Funcionalidad:
  - Al hacer click por primera vez: reproduce la canción
  - Toggle play/pause
  - Ícono cambia según estado (♫ animado cuando reproduce, ♫ estático cuando pausado)
  - Volumen: 40% por defecto
  - Loop: la canción se repite al terminar
- [ ] **NO autoplay** — los browsers lo bloquean. Requiere interacción del usuario
- [ ] Opción 1 (recomendada): al cargar la página, mostrar un modal/overlay sutil tipo "Toca para activar la música ♫" que al tocarlo reproduce y se cierra
- [ ] Opción 2: simplemente el botón flotante que el usuario toca cuando quiera
- [ ] El archivo de audio se carga de `public/audio/love-me-harder.mp3`
- [ ] Usar `<audio>` nativo de HTML, controlado con React refs

**Notas técnicas:**
- El MP3 será proporcionado por el desarrollador. Si no existe aún, el componente debe manejar gracefully la ausencia del archivo (no crashear)
- `<audio preload="none">` para no cargar el archivo hasta que el usuario interactúe
- Considerar `preload="metadata"` como alternativa para mostrar duración

---

### XV-012: Bottom Navigation Bar
**Branch:** `feat/XV-012-bottomnav`
**Prioridad:** Alta
**Depende de:** XV-001

**Descripción:**
Barra de navegación fija en la parte inferior de la pantalla con íconos que navegan a las secciones principales.

**Archivos a crear/modificar:**
- `src/components/BottomNav.tsx` (React Island)
- `src/pages/index.astro` (integrar)

**Acceptance Criteria:**
- [ ] React Island con `client:load`
- [ ] Barra fija en `position: fixed; bottom: 0;` con z-index alto
- [ ] Efecto glassmorphismo (backdrop-filter blur)
- [ ] 4-5 íconos de navegación (SVG inline):
  1. 📖 Invitación → scroll a `#invitation`
  2. ❤️ Galería → scroll a `#gallery`
  3. 📍 Ubicación → scroll a `#location`
  4. ✍️ Libro de visitas → scroll a `#guestbook`
- [ ] Cada ícono:
  - Tamaño: ~24px
  - Color inactivo: gris (#999)
  - Color activo: dorado (#D4AF37) o azul (#5BA3D9)
  - Transición de color suave
- [ ] Active state: detectar qué sección está visible con Intersection Observer y resaltar el ícono correspondiente
- [ ] Click: smooth scroll a la sección correspondiente (`element.scrollIntoView({ behavior: 'smooth' })`)
- [ ] Ancho: 100% pantalla, máx ~500px centrado en desktop
- [ ] Safe area: respetar `env(safe-area-inset-bottom)` para iPhones con notch/home indicator
- [ ] No visible en desktop si se prefiere (o adaptado como nav lateral/superior) — a criterio del diseño, pero lo principal es mobile

**Notas técnicas:**
- El Intersection Observer debe observar todas las secciones (`#invitation`, `#gallery`, etc.) con threshold apropiado (~0.3)
- `scroll-behavior: smooth` en CSS como fallback global
- El padding-bottom del body/main debe compensar la altura del BottomNav para que el contenido no quede tapado

---

## Sprint 2 — Interactivo + Polish + Deploy

---

### XV-013: Libro de Visitas (GuestBook)
**Branch:** `feat/XV-013-guestbook`
**Prioridad:** Alta
**Depende de:** XV-001, XV-015

**Descripción:**
Formulario para que los invitados dejen mensajes y un muro que muestra los mensajes existentes. React Island conectado a Supabase.

**Archivos a crear/modificar:**
- `src/components/GuestBook.tsx` (React Island)
- `src/pages/index.astro` (integrar)

**Acceptance Criteria:**
- [ ] React Island con `client:visible` (no necesita cargarse hasta que el usuario scrollee ahí)
- [ ] Título: "Libro de Visitas"
- [ ] Formulario:
  - Input "Tu Nombre" — required, maxlength 100
  - Textarea "Escribe un deseo para Ana Valeria..." — required, maxlength 500
  - Botón "Enviar Mensaje" — estilo elegante, gradiente o glass
  - Validación client-side antes de enviar
  - Estado de loading mientras envía (spinner o texto "Enviando...")
  - Feedback de éxito: "¡Mensaje enviado! 💕" (toast o texto temporal)
  - Feedback de error: "Hubo un error, intenta de nuevo"
  - Limpiar formulario después de envío exitoso
- [ ] Muro de mensajes debajo del formulario:
  - Fetch de mensajes al cargar el componente: `SELECT * FROM messages ORDER BY created_at DESC LIMIT 50`
  - Cada mensaje como mini-card glass:
    - Nombre del autor (bold)
    - Texto del mensaje
    - Fecha/hora formateada (ej: "5 de mayo, 2026")
  - Si no hay mensajes: "Sé el primero en dejar un mensaje 💌"
  - Después de enviar un mensaje nuevo, agregarlo al inicio de la lista sin recargar (optimistic update)
- [ ] Insert en Supabase: `INSERT INTO messages (name, message) VALUES (?, ?)`
- [ ] Protección básica: sanitizar inputs, trim whitespace, no permitir mensajes vacíos o solo espacios
- [ ] Animación scroll-reveal en el contenedor general

**Notas técnicas:**
- Usar el cliente de Supabase de `src/lib/supabase.ts`
- No requiere autenticación — insert y select son públicos (RLS configurado en XV-015)
- Considerar debounce o rate-limit en el botón de enviar para evitar spam (deshabilitar botón por 3 seg después de enviar)
- Formatear fechas con `Intl.DateTimeFormat('es-MX', { ... })`

---

### XV-014: Subir Fotos
**Branch:** `feat/XV-014-photo-upload`
**Prioridad:** Media
**Depende de:** XV-001, XV-015

**Descripción:**
Componente para que los invitados suban fotos del evento al storage de Supabase.

**Archivos a crear/modificar:**
- `src/components/PhotoUpload.tsx` (React Island)
- `src/pages/index.astro` (integrar)

**Acceptance Criteria:**
- [ ] React Island con `client:visible`
- [ ] Título: "Comparte tus Fotos"
- [ ] Subtítulo: "Sube los momentos capturados durante la fiesta para que Ana Valeria pueda verlos"
- [ ] Zona de upload:
  - Área de drag & drop con borde dashed, ícono de upload
  - También botón "Seleccionar Archivos" como fallback
  - Texto: "Arrastra tus fotos aquí o haz click para seleccionar"
- [ ] Restricciones:
  - Solo imágenes: `.jpg`, `.jpeg`, `.png`, `.webp`, `.heic`
  - Máximo **50MB por archivo**
  - Máximo **5 archivos por envío**
  - Validar tipo y tamaño antes de subir, mostrar error claro si no cumple
- [ ] Preview:
  - Mostrar thumbnails de las imágenes seleccionadas antes de subir
  - Botón "X" para remover una imagen de la selección
  - Mostrar nombre y tamaño de cada archivo
- [ ] Upload:
  - Botón "Subir Archivos" (deshabilitado si no hay archivos seleccionados)
  - Progress bar individual por archivo o global
  - Subir a Supabase Storage bucket `event-photos`
  - Nombre del archivo: `{timestamp}_{originalname}` para evitar colisiones
  - Al completar: feedback "¡Fotos subidas exitosamente! 📸"
  - Al error: feedback con detalle del error
- [ ] Después de subir exitosamente, limpiar la selección
- [ ] Card/contenedor con borde dashed decorativo (como en el mockup)

**Notas técnicas:**
- Supabase Storage upload: `supabase.storage.from('event-photos').upload(path, file)`
- Para HEIC: los browsers modernos no muestran preview de HEIC — mostrar ícono placeholder en ese caso
- El upload se hace directo del cliente a Supabase Storage (no pasa por un backend)
- Considerar `Promise.all` para subir múltiples archivos en paralelo

---

### XV-015: Setup de Supabase (DB + Storage)
**Branch:** `feat/XV-015-supabase-setup`
**Prioridad:** Crítica (bloqueante para XV-013 y XV-014)

**Descripción:**
Configurar la base de datos y storage en Supabase para el libro de visitas y la subida de fotos.

**Acceptance Criteria:**
- [ ] Tabla `messages` creada:
```sql
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
```
- [ ] RLS habilitado en `messages`:
```sql
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert messages" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read messages" ON messages FOR SELECT USING (true);
```
- [ ] Bucket `event-photos` creado y público:
```sql
INSERT INTO storage.buckets (id, name, public) VALUES ('event-photos', 'event-photos', true);
```
- [ ] Storage policies:
```sql
CREATE POLICY "Anyone can upload photos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'event-photos');
CREATE POLICY "Anyone can view photos" ON storage.objects FOR SELECT USING (bucket_id = 'event-photos');
```
- [ ] Verificar que los inserts y selects funcionan desde el cliente JS con la anon key
- [ ] Verificar que el upload de archivos funciona al bucket

**Notas técnicas:**
- Esto se ejecuta directamente en el SQL Editor del dashboard de Supabase
- El desarrollador debe copiar el `anon key` y `URL` al `.env` del proyecto
- **IMPORTANTE:** No crear policies de DELETE ni UPDATE desde el cliente — solo el dashboard puede borrar contenido

---

### XV-016: Scroll Reveal + Animaciones Globales
**Branch:** `feat/XV-016-animations`
**Prioridad:** Alta
**Depende de:** XV-002 a XV-010 (las secciones deben existir)

**Descripción:**
Implementar animaciones de entrada por scroll en todas las secciones y pulir las transiciones globales.

**Archivos a crear/modificar:**
- `src/components/ScrollReveal.astro` (wrapper) o implementar con directiva global
- `src/styles/global.css` (animaciones)
- Todos los componentes de sección (agregar clases/atributos de scroll-reveal)

**Acceptance Criteria:**
- [ ] Cada sección principal tiene animación de entrada al scrollear:
  - Default: fade-in + translateY(30px → 0) con duration 600ms, ease-out
  - Las cards dentro de secciones con stagger (delay incremental de 100-150ms entre ellas)
- [ ] Implementación con Intersection Observer:
  - Observar elementos con clase `.reveal` o atributo `data-reveal`
  - Al entrar al viewport (threshold 0.15), agregar clase `.revealed`
  - Una vez revelado, dejar de observar (solo anima una vez)
- [ ] CSS:
```css
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
.reveal[data-delay="1"] { transition-delay: 0.1s; }
.reveal[data-delay="2"] { transition-delay: 0.2s; }
.reveal[data-delay="3"] { transition-delay: 0.3s; }
```
- [ ] Verificar que las animaciones no causan layout shift (CLS)
- [ ] Las animaciones deben respetar `prefers-reduced-motion`: si el usuario tiene reducción de movimiento activada, desactivar las animaciones
- [ ] Performance: usar `will-change: opacity, transform` solo durante la transición, no permanentemente
- [ ] Las mariposas del hero deben seguir flotando independiente del scroll-reveal

**Notas técnicas:**
- Implementar el observer como un `<script>` en el Layout.astro (un solo observer global, no uno por componente)
- `IntersectionObserver` tiene buen soporte en browsers modernos, no necesita polyfill

---

### XV-017: Responsive + QA
**Branch:** `feat/XV-017-responsive-qa`
**Prioridad:** Alta
**Depende de:** Todo lo anterior

**Descripción:**
Verificar y corregir el diseño responsive en todas las secciones. El sitio es mobile-first.

**Acceptance Criteria:**
- [ ] Testear en los siguientes anchos:
  - 375px (iPhone SE / iPhone mini)
  - 390px (iPhone 14)
  - 412px (Pixel / Android promedio)
  - 768px (tablet)
  - 1024px (tablet landscape / laptop pequeña)
  - 1440px (desktop)
- [ ] Verificar:
  - Nada se desborda horizontalmente (no horizontal scroll)
  - Textos legibles en todos los tamaños
  - Imágenes no se estiran ni distorsionan
  - El BottomNav no tapa contenido
  - El footer es visible (scrolleable más allá del BottomNav)
  - Los iframes de mapas se ven bien
  - Las cards glass tienen el efecto correcto en todos los tamaños
  - El countdown es legible en pantallas pequeñas
  - La galería se adapta correctamente
  - El formulario del guestbook es usable en mobile (inputs de tamaño adecuado)
  - La zona de upload funciona en mobile (sin drag & drop, solo botón)
- [ ] Corregir cualquier issue encontrado
- [ ] Verificar `safe-area-inset` para iPhones con notch

**Notas técnicas:**
- En mobile no hay hover — asegurar que los elementos interactivos son claramente tappables sin depender de hover states
- Los iframes de mapas pueden necesitar `aspect-ratio` para mantener proporciones

---

### XV-018: SEO + OG Meta Tags
**Branch:** `feat/XV-018-seo`
**Prioridad:** Media
**Depende de:** XV-001

**Descripción:**
Configurar meta tags para que el link se vea bonito cuando se comparta por WhatsApp, Instagram, etc.

**Archivos a crear/modificar:**
- `src/layouts/Layout.astro`
- `public/og-image.jpg` (imagen OG, una de las fotos de la galería redimensionada a 1200x630)

**Acceptance Criteria:**
- [ ] Title: "XV Años Ana Valeria | 16 de Mayo 2026"
- [ ] Description: "Estás invitado a celebrar los XV años de Ana Valeria. 16 de mayo de 2026, Durango."
- [ ] OG Tags:
  - `og:title` = "XV Años Ana Valeria"
  - `og:description` = "Estás invitado a celebrar los XV años de Ana Valeria. 16 de mayo de 2026, Durango."
  - `og:image` = URL completa de la imagen OG (en Netlify será `https://xv-ana-valeria.netlify.app/og-image.jpg`)
  - `og:type` = "website"
  - `og:url` = URL del sitio
- [ ] Twitter Card tags:
  - `twitter:card` = "summary_large_image"
  - `twitter:title`, `twitter:description`, `twitter:image`
- [ ] Favicon: SVG de mariposa dorada o ícono temático
- [ ] `<html lang="es">`
- [ ] Canonical URL

**Notas técnicas:**
- La imagen OG debe ser exactamente 1200x630px para verse bien en WhatsApp
- WhatsApp cachea las previews agresivamente — si cambias la imagen, puede tardar en actualizarse
- Verificar con https://www.opengraph.xyz/ o las herramientas de debug de Facebook/Twitter después del deploy

---

### XV-019: Deploy Final a Netlify
**Branch:** `main` (merge de todo)
**Prioridad:** Crítica
**Depende de:** Todos los tickets anteriores

**Descripción:**
Build de producción, deploy a Netlify, pruebas finales en la URL pública.

**Acceptance Criteria:**
- [ ] `npm run build` sin errores ni warnings críticos
- [ ] Output en `dist/` es correcto
- [ ] Netlify conectado al repo, build command: `npm run build`, publish: `dist`
- [ ] Variables de entorno configuradas en Netlify:
  - `PUBLIC_SUPABASE_URL`
  - `PUBLIC_SUPABASE_ANON_KEY`
- [ ] Deploy exitoso en Netlify
- [ ] URL funcional (ej: `xv-ana-valeria.netlify.app`)
- [ ] Verificar en la URL pública:

  - [ ] Todas las secciones cargan correctamente
  - [ ] Countdown funciona y muestra la cuenta regresiva correcta
  - [ ] Galería de fotos carga (si las fotos están subidas)
  - [ ] Mapas embebidos se muestran
  - [ ] Libro de visitas: enviar y ver mensajes funciona
  - [ ] Upload de fotos funciona
  - [ ] Música reproduce al darle play
  - [ ] BottomNav funciona (smooth scroll)
  - [ ] Animaciones de scroll funcionan
  - [ ] Preview de WhatsApp (OG image) se ve bien
  - [ ] No errores en la consola del browser
- [ ] Performance: Lighthouse score > 80 en Performance, > 90 en Best Practices
- [ ] Si hay errores, corregir y re-deployar

**Notas técnicas:**
- Netlify detecta Astro automáticamente en la mayoría de los casos
- Si hay problemas con las variables de entorno, verificar que en Astro las variables públicas usan el prefijo `PUBLIC_`
- Netlify free tier soporta custom domain después si la clienta lo quiere en el futuro