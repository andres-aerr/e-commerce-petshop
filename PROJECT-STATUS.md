# 🐾 Ecommerce Mascotas "Savia" - Estado del Proyecto

**Stack:** Next.js 15 + NestJS 10 + SQLite/Prisma + pnpm workspaces
**Frontend:** http://localhost:3002 | **Backend:** http://localhost:3001
**Fecha inicio:** 2026-06-10 | **Última act.:** 2026-06-11

---

## 📊 Estado Actual: MVP Funcional con Home, Catálogo, PDP, Carrito y Checkout ✅

### Componentes funcionando (Fase 0-3 completadas):

| Componente | Estado |
|------------|--------|
| Monorepo pnpm + predev (mata puertos 3000-3002) | ✅ |
| Frontend: Next.js 15 + TS + Tailwind + Plus Jakarta Sans | ✅ |
| Backend: NestJS 10 + Prisma + SQLite | ✅ |
| Design System: Eclipse #3C3731, Terracota #ED6435, Turquesa #45C1C7, Bridesmaid #FFE6D4 | ✅ |
| Tipografía unificada: Plus Jakarta Sans (sin Lora) | ✅ |
| Prisma Schema: 10 modelos (Product, Review, User, Address, Order, OrderItem, Subscription, etc.) | ✅ |
| Seed Data: 22 productos + 7 reviews | ✅ |
| Products API: GET (filtros), GET /bestsellers, GET /:slug, POST, PATCH, CORS :3002 | ✅ |
| **Home Page:** Hero carousel (2 banners + promo card) | ✅ |
| **Home Page:** TrustPillars (3 pilares con SVG) | ✅ |
| **Home Page:** CategoryGrid (5 tarjetas mascota con colores pastel e imágenes overflow) | ✅ |
| **Home Page:** BrandsCarousel (5 marcas, scroll infinito) | ✅ |
| **Home Page:** CategoryShowcase (sección Perro y Gato: botones categoría circulares + carrusel productos) | ✅ |
| **Home Page:** BestSellersCarousel (conectado a API vía TanStack Query) | ✅ |
| **Header:** 🐾 Savia nav + buscador + cart badge + menú mobile | ✅ |
| **Footer:** 4 columnas con categorías, ayuda, copyright | ✅ |
| **Catálogo /products:** Grid con filtros (categoría, pet_type, sort) + paginación + Suspense | ✅ |
| **PDP /products/[slug]:** ProductImages, PriceSelector, NutritionalCalculator, Reviews, RelatedProducts | ✅ |
| **ProductCard:** Compacta (p-3, bg-white image container, aspect-[4/3], mt-auto buttons) | ✅ |
| **Cart:** Zustand store + localStorage, /cart page con resumen | ✅ |
| **Checkout /checkout:** 3 pasos (AddressForm → PaymentMethod → Confirmación) | ✅ |

---

## 🗺️ Roadmap

### FASE 0: Setup ✅
- [x] Monorepo con pnpm workspaces
- [x] Frontend Next.js 15 + Tailwind + TypeScript + Plus Jakarta Sans
- [x] Backend NestJS 10 + Prisma + SQLite
- [x] Design System con colores exactos
- [x] Tipografía Plus Jakarta Sans unificada
- [x] Prisma schema 10 modelos
- [x] Seed 22 productos reales chilenos
- [x] Products API funcional con CORS
- [x] Predev mata procesos en puertos 3000-3002

### FASE 1: Home Page Completa ✅
- [x] Hero carousel (2 banners horizontales + promo card derecha)
- [x] TrustPillars (envío gratis, stock siempre, suscripción ahorro)
- [x] CategoryGrid (Perro #DCF5DC, Gato #E8DCF5, Mascotas Pequeñas #FDE4D4, Peces #DCE8F8, Aves #F8F0D8)
- [x] BrandsCarousel (Royal Canin, Purina, Eukanuba, IAMS, Pedigree)
- [x] CategoryShowcase (Perro card #DCF5DC, Gato card #F5F0FA, Gatos texto #6B4F8A)
- [x] CategoryShowcase botones imagen circulares (4 por categoría desde /images/iconos-card/)
- [x] CategoryShowcase carrusel productos horizontal con flechas
- [x] BestSellersCarousel conectado a API (TanStack Query)
- [x] Header + Footer globales
- [x] "Los más vendidos para Perros" / "Los más vendidos para Gatos" en showcase

### FASE 2: Catálogo + PDP ✅
- [x] /products grid con filtros + sort + paginación
- [x] ProductCard compacta con precios one-time vs AutoCompra
- [x] PDP /products/[slug] con todas las secciones
- [ ] Breadcrumbs

### FASE 3: Carrito + Checkout ✅
- [x] Zustand store cart con persistencia localStorage
- [x] /cart page con lista, cantidades, eliminar, CartSummary
- [x] Badge contador en Header
- [x] Checkout 3 pasos con stepper
- [x] AddressForm (nombre, dirección, comuna, región, envío $2.990/$4.990)
- [x] PaymentMethod (Webpay/MercadoPago/ContraEntrega + cuotas)
- [x] Confirmación con resumen completo + CONFIRMAR COMPRA

### FASE 4: Backend - Auth + Orders + Payments 🔜
- [ ] Auth module (JWT, guest checkout)
- [ ] Orders module (crear orden, listar, tracking)
- [ ] Payments module (Webpay Plus, Mercado Pago)
- [ ] Webhooks
- [ ] Subscriptions module (AutoCompra)
- [ ] Panel autogestión suscripciones

### FASE 5: Admin + Notificaciones
- [ ] WhatsApp (Interakt)
- [ ] Email (SendGrid)
- [ ] Admin dashboard con gestión de productos, órdenes, reportes

---

## 🎨 Design System

### Colores
| Token | Hex | Uso |
|-------|-----|-----|
| `primary` | `#3C3731` | Eclipse - Headers, texto principal |
| `accent` | `#ED6435` | Terracota - CTAs, descuentos |
| `secondary` | `#45C1C7` | Turquesa - Trust, salud, links |
| `bg-warm` | `#FFE6D4` | Bridesmaid - Fondos cálidos |
| `white` | `#FFFFFF` | Lienzo |
| `gray-dark` | `#5A5A5A` | Texto secundario |
| `gray-light` | `#E8E8E8` | Dividers, fondos sutiles |
| `black-soft` | `#2C2C2C` | Texto muy oscuro |

### Colores Pastel Categorías
| Sección | Perro | Gato | Mascotas Pequeñas | Peces | Aves |
|---------|-------|------|-------------------|-------|------|
| CategoryGrid | `#DCF5DC` | `#E8DCF5` | `#FDE4D4` | `#DCE8F8` | `#F8F0D8` |
| CategoryShowcase | `#DCF5DC` (card) | `#F5F0FA` (card) + texto `#6B4F8A` | — | — | — |

### Tipografía
Unificada: **Plus Jakarta Sans** (variable, 300-800 weight) vía next/font.

---

## 📦 Seed Data - 22 Productos

### Alimento Perro
| Producto | Pet | Precio | AutoCompra (-10%) |
|----------|-----|--------|-------------------|
| Nomade Adulto Raza Mediana 20kg | Perro | $40.990 | $36.891 |
| Royal Canin Maxi Adulto 15kg | Perro | $58.990 | $53.091 |
| Acana Heritage Adult Large Breed 11.4kg | Perro | $64.990 | $58.491 |
| Hills Science Diet Adult Large Breed 1.1kg | Perro | $18.990 | $17.091 |

### Alimento Gato
| Producto | Pet | Precio | AutoCompra (-10%) |
|----------|-----|--------|-------------------|
| N&D Prime Gato Castrado 7.5kg | Gato | $64.990 | $58.491 |
| Nomade Gato Adulto 10kg | Gato | $31.990 | $28.791 |
| Royal Canin Gastro Intestinal Gato 2kg | Gato | $39.990 | $35.991 |
| Hills Prescription Diet i/d Gato 1.5kg | Gato | $27.990 | $25.191 |

### Snacks y Suplementos
| Producto | Pet | Precio | AutoCompra (-10%) |
|----------|-----|--------|-------------------|
| Dental Stix Perro Pack 280g | Perro | $6.990 | $6.291 |
| Greenies Snack Dental Gato 113g | Gato | $9.990 | $8.991 |
| Caldo Colágeno Natural Mascotas 1L | Ambos | $12.990 | $11.691 |
| Aceite Salmón Omega-3 Mascotas 500ml | Ambos | $15.990 | $14.391 |

### Arena
| Producto | Pet | Precio | AutoCompra (-10%) |
|----------|-----|--------|-------------------|
| Pride Litter Natural Premium 10kg | Gato | $13.990 | $12.591 |
| Sanicat Arena Aglomerante 10kg | Gato | $11.990 | $10.791 |

### Accesorios
| Producto | Pet | Precio | AutoCompra (-10%) |
|----------|-----|--------|-------------------|
| Comedero Acero Bambú Set 2 | Ambos | $18.990 | $17.091 |
| Fuente Agua Cerámica Gato 2L | Gato | $24.990 | $22.491 |
| Cepillo Cerdas Naturales Perro | Perro | $8.990 | $8.091 |
| Rascador Gato Mediano + Catnip | Gato | $34.990 | $31.491 |
| Jaula Transporte Mediana Plegable | Mascotas Pequeñas | $29.990 | $26.991 |
| Pecera 20L Kit Inicio | Peces | $45.990 | $41.391 |

### Otros
| Producto | Pet | Precio | AutoCompra (-10%) |
|----------|-----|--------|-------------------|
| Shampoo Avena Natural Mascotas 500ml | Perro | $8.990 | $8.091 |
| Snack Premio Cordero Natural 150g | Perro | $6.990 | $6.291 |

---

## 🖼️ Imágenes

### Banners (4)
| Archivo | Descripción |
|---------|-------------|
| banner-perro.jpg | Banner principal perro |
| banner-gato.jpg | Banner principal gato |
| perro-gato-card-hero.png | Imagen promo hero card |
| banner-gato-categorias.png | Banner categoría gato |
| banner-perro-categorias.png | Banner categoría perro |

### Categorías (6 iconos circulares en CategoryShowcase)
- comida-gato, arenero-gato, juguete-gato, accesorio-gato, accesorio-perro, snack-perro

### Productos (22 imágenes en /images/products/)
| Estado | Cantidad |
|--------|----------|
| ✅ Fotos reales descargadas | 15 productos |
| ⚠️ Placeholders (fondos degradados, ~13-15KB) | 7 productos |

**Pendientes de foto real:**
1. Nomade Adulto 20kg
2. Caldo Colágeno Natural 1L
3. Aceite Salmón Omega-3 500ml
4. Fuente Agua Cerámica Gato
5. Greenies Snack Dental Gato 113g
6. Sanicat Arena Aglomerante 10kg
7. Royal Canin Gastro Intestinal 2kg

**Nota:** Todas convertidas a PNG real (se corrigieron 14 archivos JPEG/WebP con extensión .png falsa).

---

## 🔧 Decisiones Técnicas

| Decisión | Opción | Razón |
|----------|--------|-------|
| DB dev | SQLite | Sin Docker, simple local |
| Auth | Guest checkout primero | MVP más rápido |
| Tipografía | Plus Jakarta Sans sola | Unificar, eliminar Lora |
| Categorías Home | 5 tarjetas pet-type (pastel) | En lugar de 7 cards producto |
| Hero | 2 banners + promo card | Reemplazó emoji/circle carousel |
| Color Perro | #DCF5DC (verde) | Swappeado con Mascotas Pequeñas |
| Color Gatos texto | #6B4F8A (morado intenso) | Combina con card #F5F0FA |
| ProductCard image bg | bg-white | Fotos con fondo blanco se mezclan |
| Formato imágenes | PNG | Evita MIME mismatch |

---

## 💻 Comandos

```bash
pnpm install           # Instalar todo
pnpm dev               # Frontend :3002 + Backend :3001 (predev mata puertos viejos)
pnpm build             # Build producción
cd backend && npx prisma db push && npx prisma db seed  # Reset DB + seed
cd backend && npx prisma generate   # Generar Prisma client
```

---

## 📁 Estructura

```
ecommerce-mascotas/
├── PROJECT-STATUS.md
├── package.json                ← Root con predev + dev scripts
├── pnpm-workspace.yaml
├── frontend/
│   ├── src/
│   │   ├── app/                ← Pages (layout, home, products, cart, checkout)
│   │   ├── components/
│   │   │   ├── home/           ← Hero, TrustPillars, CategoryGrid, BrandsCarousel, CategoryShowcase, BestSellersCarousel
│   │   │   ├── products/       ← ProductCard, ProductGrid
│   │   │   ├── pdp/            ← ProductImages, PriceSelector, NutritionalCalculator, Reviews, RelatedProducts
│   │   │   ├── cart/           ← CartItem, CartSummary
│   │   │   └── checkout/       ← CheckoutStepper, AddressForm, PaymentMethod
│   │   ├── lib/                ← design-system.ts, api.ts
│   │   └── store/              ← cartStore (Zustand)
│   ├── public/images/          ← banners/, categorias/, brands/, iconos-card/, products/
│   ├── tailwind.config.ts
│   └── next.config.ts
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.ts
│   │   └── dev.db
│   └── src/
│       └── products/           ← controller, service, dto
└── notas_obsidian_mascotas/    ← Vault Obsidian
```

---

## 📝 Pendientes Urgentes

1. **Descargar fotos reales** para los 7 productos placeholder (de zooplus, petsonline.cl, farmapet.cl, etc.)
2. **Breadcrumbs** en PDP
3. **Conectar checkout** a backend (POST /api/orders)
4. **Mega-menú** estilo zooplus en Header

---

## 📎 Referencias Rápidas

| Componente | Archivo clave |
|------------|--------------|
| CategoryGrid | `frontend/src/components/home/CategoryGrid.tsx` |
| CategoryShowcase | `frontend/src/components/home/CategoryShowcase.tsx` |
| ProductCard | `frontend/src/components/products/ProductCard.tsx` |
| Design tokens | `frontend/src/lib/design-system.ts` |
| Tailwind config | `frontend/tailwind.config.ts` |
| ProductImages | `frontend/src/components/pdp/ProductImages.tsx` |
| Cart store | `frontend/src/store/cartStore.ts` |
| Seed data | `backend/prisma/seed.ts` |
| Prisma schema | `backend/prisma/schema.prisma` |
