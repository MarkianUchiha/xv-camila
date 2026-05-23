# XV Ana Valeria — Context Document para Claude Code

## Resumen del Proyecto
Invitación digital web para los XV años de Ana Valeria Macías Ibarra. Landing page tipo app mobile-first con scroll vertical, temática Cinderella. El sitio debe sentirse premium, elegante y moderno.

**Repo:** https://github.com/MarkianUchiha/xv-ana-valeria
**Supabase Project URL:** https://xbvzqtgdkkukcptfgtqt.supabase.co
**Hosting:** Netlify (free tier, conectar después del primer push a main)
**Stack:** Astro 5 + React Islands + Tailwind CSS 4
**Deadline:** Jueves (2 días de desarrollo)

---

## Datos del Evento

| Campo | Valor |
|-------|-------|
| Quinceañera | Ana Valeria Macías Ibarra |
| Papá | Dr. Christian Alejandro Macías Conde |
| Mamá | C.P. Asminda Ibarra Flores |
| Padrino | Ing. Gustavo Morán Soto |
| Fecha del evento | 16 de Mayo de 2026 |
| Misa | Templo de Fátima, Durango — 6:00 PM |
| Recepción y Cena | Centro de Convenciones Holiday Inn, Durango — 9:00 PM |
| Vals | 10:30 PM |
| Dress Code | Formal Elegante |
| Restricción de color | Evitar azul claro (reservado para la quinceañera) |
| Regalo | Sobre con dinero |
| Mesa de regalos | https://mesaderegalos.liverpool.com.mx/milistaderegalos/51971590 |

---

## Diseño y Estética — CRITICAL

### Temática: Cinderella / Cenicienta
El diseño es el diferenciador principal de este proyecto. Debe verse como una invitación de lujo, no como un sitio web genérico.

### Paleta de Colores
- **Primario:** Azul cielo / celeste (#87CEEB variaciones, tonos suaves)
- **Secundario:** Blanco puro y blancos cálidos (#FFFFFF, #FAFAFA, #F8F9FA)
- **Acento:** Dorado (#D4AF37, #C9A84C, #B8860B — dorado elegante, no amarillo)
- **Texto:** Gris oscuro para legibilidad (#2D2D2D, #4A4A4A)
- **Background sections:** Alternar entre blanco y azul cielo muy suave (#F0F8FF, #E8F4FD)

### Glassmorphismo — OBLIGATORIO en todo el sitio
Este es el efecto visual principal. Implementar en:
- Cards de familia, dress code, regalos
- Contenedor del countdown
- Bottom navigation bar
- Cards de cronograma
- Cualquier contenedor/card del sitio

**Propiedades CSS del glassmorphismo:**
```css
.glass {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
}
```
Ajustar opacidad y blur según la sección. Las cards sobre fondos claros necesitan más opacidad (0.4-0.6). Las cards sobre fondos con imagen necesitan menos (0.15-0.25).

### Mariposas — OBLIGATORIO
Las mariposas son el elemento decorativo principal. Deben estar presentes en todo el sitio.

**Implementación requerida:**
1. **Mariposas flotantes animadas (CSS/JS):** Partículas de mariposas que flotan sutilmente por la pantalla. Usar SVG inline para las mariposas. Colores: doradas y azul cielo. Animación sutil y elegante (no frenética). Se ven en el hero y opcionalmente en otras secciones.
2. **Mariposas decorativas estáticas:** En separadores entre secciones, como adornos en los bordes de cards, junto a títulos de sección.
3. **Mariposas en hover/scroll:** Efecto sutil al hacer scroll entre secciones o al hacer hover sobre elementos interactivos.

**SVG de mariposa base (simplificado, estilizar con CSS):**
```svg
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M50 50 C30 20, 10 20, 10 45 C10 60, 30 70, 50 50 Z" fill="currentColor" opacity="0.8"/>
  <path d="M50 50 C70 20, 90 20, 90 45 C90 60, 70 70, 50 50 Z" fill="currentColor" opacity="0.8"/>
  <path d="M50 50 C35 60, 20 80, 25 90 C30 95, 45 80, 50 50 Z" fill="currentColor" opacity="0.6"/>
  <path d="M50 50 C65 60, 80 80, 75 90 C70 95, 55 80, 50 50 Z" fill="currentColor" opacity="0.6"/>
</svg>
```

### Tipografía
- **Títulos:** Usar una Google Font elegante tipo serif: `Playfair Display` o `Cormorant Garamond`
- **Subtítulos/etiquetas:** `Montserrat` o `Raleway` (sans-serif, light weight, tracking amplio para subtítulos tipo "MIS QUINCE AÑOS")
- **Body:** `Inter` o `Lato`
- Los títulos principales (nombre, sección headers) van en la serif elegante
- Las etiquetas (MIS PADRES, MIS PADRINOS, FORMAL ELEGANTE) van en sans-serif con letter-spacing amplio

### Animaciones y Transiciones
- **Scroll reveal:** Cada sección debe aparecer con una animación suave al entrar al viewport (fade-in + slide-up). Usar Intersection Observer.
- **Countdown:** Números con transición flip o fade al cambiar.
- **Cards:** Hover sutil con scale(1.02) y aumento del glow del glassmorphismo.
- **Transiciones globales:** Suaves, duración 300-500ms, easing ease-in-out.
- **NO usar librerías pesadas de animación.** Todo con CSS animations + Intersection Observer.

---

## Secciones del Sitio (en orden de scroll)

### 1. Hero
- Nombre grande: "Ana Valeria"
- Subtítulo: "MIS QUINCE AÑOS"
- Countdown regresivo a: **16 de mayo de 2026, 18:00 hrs** (hora de la misa)
- Formato countdown: DÍAS | HORAS | MIN | SEG
- El countdown va en un contenedor glass
- Background: gradiente suave azul cielo → blanco, con mariposas flotantes
- Posible imagen de fondo suave (flores o bokeh) con overlay

### 2. Invitación
- Ícono decorativo (libro abierto o similar)
- Título: "Una Noche de Ensueño"
- Mensaje de invitación (borrador, la clienta lo puede cambiar después):

> "Hay momentos que se graban para siempre en el corazón. Con la bendición de Dios y el amor de mi familia, te invito a celebrar conmigo esta noche mágica donde mis sueños comienzan a volar. Tu presencia hará de este día un recuerdo inolvidable."
>
> — Con cariño, Ana Valeria

### 3. Galería (Picks)
- Carousel o galería tipo masonry/grid
- 10 fotos (WebP, optimizadas, carpeta REDES)
- Lightbox al hacer click en cada foto
- Las fotos se colocan en: `src/assets/gallery/` o `public/gallery/`
- Responsive: 2 columnas en mobile, 3-4 en desktop
- Bordes redondeados, sombra sutil

### 4. Familia (Partners)
- Título: "Con Amor, mi Familia"
- Cards tipo team/equipo con:
  - Foto de la persona (redondeada o circular)
  - Nombre completo con título
  - Rol (MIS PADRES / MI PADRINO)
- Layout: 
  - "MIS PADRES" → 2 cards lado a lado (Papá y Mamá)
  - "MI PADRINO" → 1 card centrada
- Efecto glassmorphismo en cada card
- **Las fotos de padres y padrino serán subidas al repo directamente por el desarrollador**

### 5. Cronograma
- Título: "Cronograma"
- Timeline vertical con íconos:
  - 🕕 18:00 hrs — **Ceremonia Religiosa** — Templo de Fátima
  - 🍽️ 21:00 hrs — **Recepción y Cena** — Centro de Convenciones Holiday Inn
  - 💃 22:30 hrs — **Vals**
- Cada evento en un nodo del timeline
- Íconos dentro de círculos con fondo glass
- Línea vertical conectora entre nodos

### 6. Dress Code
- Card glass centrada
- Ícono de percha/hanger
- Título: "Dress Code"
- Subtítulo: "FORMAL ELEGANTE"
- Nota destacada (fondo azul cielo suave): "Por favor, evitar el uso de azul claro (exclusivo de la quinceañera)."

### 7. Regalos (Gifts)
- Ícono de regalo
- Título: "Regalos"
- Mensaje: "Tu presencia es mi mayor regalo, pero si deseas tener un detalle conmigo:"
- Card con: "SOBRE CON DINERO" y un ícono de sobre
- Botón que lleva a la mesa de regalos de Liverpool: https://mesaderegalos.liverpool.com.mx/milistaderegalos/51971590
  - Texto del botón: "Ver Mesa de Regalos en Liverpool"
  - Estilo: botón con gradiente rosa-dorado o similar elegante

### 8. Ubicación (Maps)
- Título: "Ubicación"
- 2 cards con mapas embebidos de Google Maps (iframe):
  - **Ceremonia Religiosa** — Templo de Fátima, Durango
    - Dirección debajo del mapa
    - Botón "Ver en Maps" (link a Google Maps)
  - **Recepción** — Centro de Convenciones Holiday Inn, Durango
    - Dirección debajo del mapa  
    - Botón "Ver en Maps" (link a Google Maps)
- Cards con bordes redondeados, overflow hidden para el iframe

### 9. Libro de Visitas (Book) — React Island
- Título: "Libro de Visitas"
- Formulario:
  - Input: "Tu Nombre"
  - Textarea: "Escribe un deseo para Ana Valeria..."
  - Botón: "Enviar Mensaje"
- Debajo del formulario: muro/feed de mensajes existentes
  - Cada mensaje muestra: nombre del autor + texto + fecha
  - Orden: más recientes primero
  - Diseño de cada mensaje como mini-card glass
- **Backend:** Supabase tabla `messages`
  - Columnas: `id` (uuid), `name` (text), `message` (text), `created_at` (timestamptz)
  - RLS: allow insert para anónimos, allow select para todos
  - NO requiere autenticación (es público)

### 10. Subir Fotos (Upload) — React Island
- Título: "Comparte tus Fotos"
- Subtítulo: "Sube los momentos capturados durante la fiesta para que Ana Valeria pueda verlos"
- Componente de upload:
  - Solo imágenes (jpg, jpeg, png, webp, heic)
  - Máx 50MB por archivo
  - Máx 5 archivos por envío
  - Preview de las imágenes seleccionadas antes de subir
  - Botón: "Subir Archivos"
  - Progress bar durante upload
- **Backend:** Supabase Storage bucket `event-photos`
  - Público para uploads (no requiere auth)
  - RLS policy: allow insert, no allow delete/update desde el cliente

### 11. Música de Fondo
- Reproductor fijo y discreto (esquina inferior izquierda o integrado en el nav)
- Play/Pause toggle
- **IMPORTANTE:** No puede ser autoplay por políticas de browsers — necesita interacción del usuario primero
- Archivo MP3 en `public/audio/` (el desarrollador lo proporciona)
- **Canción:** "Love Me Harder" — Ariana Grande ft. The Weeknd (el desarrollador proporcionará el archivo MP3)
- Volumen al 50% por default, con posibilidad de subir/bajar o mutear

### 12. Bottom Navigation Bar
- Fija en la parte inferior de la pantalla (mobile)
- Efecto glassmorphismo
- 4-5 íconos que navegan a las secciones principales:
  - 📖 Invitación (scroll a invitación)
  - ❤️ Galería (scroll a galería)
  - 📍 Ubicación (scroll a mapas)
  - ✍️ Libro (scroll a libro de visitas)
- Smooth scroll al hacer click
- Highlight del ícono activo según la sección visible (Intersection Observer)

### 13. Footer
- Texto de agradecimiento: "Gracias por ser parte de este momento tan especial"
- Crédito: "by [MarkiDev](https://markidev.com)"
- Copyright: "© 2026"
- Estilo: simple, elegante, fondo azul oscuro o gradiente oscuro

---

## Setup de Supabase

### Tabla: messages
```sql
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert messages"
  ON messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read messages"
  ON messages FOR SELECT
  USING (true);
```

### Storage Bucket: event-photos
```sql
-- Crear bucket público para uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('event-photos', 'event-photos', true);

-- Policy: cualquiera puede subir
CREATE POLICY "Anyone can upload photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'event-photos');

-- Policy: cualquiera puede ver
CREATE POLICY "Anyone can view photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'event-photos');
```

### Variables de entorno (.env)
```
PUBLIC_SUPABASE_URL=https://xbvzqtgdkkukcptfgtqt.supabase.co
PUBLIC_SUPABASE_ANON_KEY=<obtener del dashboard de Supabase>
```

---

## Estructura de Carpetas Sugerida

```
xv-ana-valeria/
├── public/
│   ├── audio/          # MP3 de la canción
│   ├── gallery/        # Fotos de galería (WebP) — alternativa a src/assets
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   ├── gallery/    # Fotos de Ana Valeria (WebP, 10 fotos)
│   │   ├── family/     # Fotos de padres y padrino
│   │   └── icons/      # SVGs de mariposas y decoraciones
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── Invitation.astro
│   │   ├── Gallery.astro
│   │   ├── Family.astro
│   │   ├── Timeline.astro
│   │   ├── DressCode.astro
│   │   ├── Gifts.astro
│   │   ├── Location.astro
│   │   ├── GuestBook.tsx        # React Island
│   │   ├── PhotoUpload.tsx      # React Island
│   │   ├── MusicPlayer.tsx      # React Island
│   │   ├── Countdown.tsx        # React Island
│   │   ├── BottomNav.tsx        # React Island
│   │   ├── Butterflies.astro    # Mariposas flotantes
│   │   └── ScrollReveal.astro   # Wrapper para animaciones de scroll
│   ├── layouts/
│   │   └── Layout.astro
│   ├── lib/
│   │   └── supabase.ts          # Cliente de Supabase
│   ├── pages/
│   │   └── index.astro          # Página principal (single page)
│   └── styles/
│       └── global.css           # Estilos globales, glass utilities, animaciones
├── .env.example
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── README.md
```

---

## Dependencias Principales

```json
{
  "dependencies": {
    "astro": "^5.x",
    "@astrojs/react": "^4.x",
    "@astrojs/tailwind": "^6.x",
    "react": "^19.x",
    "react-dom": "^19.x",
    "@supabase/supabase-js": "^2.x"
  }
}
```

---

## Notas Importantes

1. **Mobile-first:** El diseño base está pensado para móvil (los mockups son todos mobile). Desktop es una mejora progresiva.
2. **Performance:** Astro genera HTML estático por defecto. Solo los React Islands (GuestBook, PhotoUpload, MusicPlayer, Countdown, BottomNav) se hidratan en el cliente.
3. **Imágenes:** Usar el componente `<Image>` de Astro para optimización automática. Las fotos deben estar en `src/assets/` para que Astro las procese, o en `public/` si ya están optimizadas.
4. **SEO/OG Tags:** Configurar meta tags con una preview bonita para cuando compartan el link por WhatsApp. Título: "XV Años Ana Valeria", descripción corta, imagen OG (una de las fotos de la galería).
5. **Sin dominio:** El sitio estará en un subdominio de Netlify (ej: `xv-ana-valeria.netlify.app`). Asegurar que la URL sea limpia.
6. **Netlify:** Conectar después del primer push a main. Build command: `npm run build`, publish directory: `dist/`.
7. **La canción (MP3):** El archivo será proporcionado por el desarrollador y colocado en `public/audio/`. NO usar streaming de Spotify ni APIs de música.
8. **Glassmorphismo y mariposas son los elementos de diseño más importantes.** Si algo se ve genérico o plano, agregar más glass y más mariposas.