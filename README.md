# XV Ana Valeria — Invitación Digital

Invitación digital web para XV años. Single page, mobile-first, temática elegante con glassmorphismo y mariposas.

## Stack

- **Astro 6** + **React 19** + **Tailwind CSS 4**
- **Supabase** (PostgreSQL + Storage)
- **Netlify** (deploy)

## Desarrollo

```bash
npm install
npm run dev      # localhost:4321
npm run build    # build de producción en /dist
```

## Variables de entorno

Crear `.env` en la raíz:

```
PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
```

En Netlify agregar las mismas variables en **Site configuration → Environment variables**.

## Supabase — Setup

Ejecutar en el SQL Editor:

```sql
-- Tabla de mensajes
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert messages" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read messages" ON messages FOR SELECT USING (true);

-- Bucket de fotos
INSERT INTO storage.buckets (id, name, public) VALUES ('event-photos', 'event-photos', true);

CREATE POLICY "Anyone can upload photos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'event-photos');
CREATE POLICY "Anyone can view photos" ON storage.objects FOR SELECT USING (bucket_id = 'event-photos');
```

## Administración

### Borrar mensajes
Supabase Dashboard → **Table Editor → messages** → seleccionar filas → eliminar.

### Borrar fotos
Supabase Dashboard → **Storage → event-photos** → seleccionar archivos → eliminar.

### Páginas privadas (solo para el cliente)
- **Muro de mensajes:** `/mensajes?key=anavaleria2026`
- **Galería de fotos:** `/fotos?key=anavaleria2026`

## Estructura del proyecto

```
src/
├── components/       # Componentes Astro y React Islands
├── layouts/          # Layout principal con meta tags y scroll reveal
├── lib/              # Cliente de Supabase
├── pages/            # Páginas (index, mensajes, fotos)
├── styles/           # CSS global (tema, glass, reveal)
└── assets/           # Imágenes procesadas por Astro
public/
├── audio/            # Música de fondo
├── gallery/          # Fotos accesibles directamente
└── og-image.jpg      # Imagen para compartir en redes
```

## Reutilizar para otra invitación (Fork)

Para crear otra invitación a partir de esta:

1. **Fork** del repo en GitHub
2. **Supabase**: crear un nuevo proyecto y ejecutar el SQL de arriba
3. **`.env`**: actualizar con las nuevas keys de Supabase
4. **Personalizar contenido:**
   - `Hero.astro` — nombre, fecha
   - `Countdown.tsx` — fecha del evento
   - `Invitation.astro` — texto de invitación
   - `Family.astro` — fotos, nombres, mensajes
   - `Timeline.astro` — eventos y horarios
   - `DressCode.astro` — código de vestimenta
   - `Gifts.astro` — link mesa de regalos
   - `Location.astro` — direcciones y mapas
   - `SplashScreen.tsx` — foto de portada
   - `index.astro` — sección de confirmación (número WhatsApp)
5. **Fotos**: reemplazar en `src/assets/gallery/` y `src/assets/family/`
6. **Música**: reemplazar en `public/audio/` y actualizar ruta en `MusicPlayer.tsx`
7. **Colores**: editar `src/styles/global.css` (variables `@theme`)
8. **SEO**: actualizar `Layout.astro` (títulos, descripción, og-image)
9. **Key privada**: cambiar `anavaleria2026` en `MessageWall.tsx` y `PhotoGallery.tsx`
10. **Deploy**: conectar a Netlify con las nuevas env vars

---

by [MarkiDev](https://markidev.com)
