# ⚙️ Especificaciones Técnicas y Arquitectura de Sistema

**Tags:** #backend #frontend #architecture #integraciones #database  
**Project:** Pet Shop Mockup  
**Type:** Technical Specification  
**Última actualización:** 2026-06-10  
**Stack:** Next.js 15 | NestJS 10 | React 19 | TypeScript 5.3 | PostgreSQL 16 | MongoDB 7  

---

## 🏗️ Arquitectura de Sistema (High-Level)

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Next.js 15 (App Router, Server Components)      │  │
│  │  - Pages: Home, Catalog, PDP, Cart, Checkout    │  │
│  │  - Components: Reusable React 19 + TypeScript    │  │
│  │  - Styling: Tailwind CSS + CSS-in-JS             │  │
│  │  - State: Zustand (cart) + TanStack Query        │  │
│  │  - Forms: React Hook Form + Zod validation       │  │
│  │  - Analytics: Google Analytics, Sentry           │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Integraciones Cliente:                          │  │
│  │  - Google Maps Places (Autocomplete)             │  │
│  │  - Webpay Plus (iframe tokenizado)               │  │
│  │  - Mercado Pago Brick (checkout integrado)       │  │
│  │  - Interakt WhatsApp (webhooks)                  │  │
│  │  - Stripe Connect (future: payouts)              │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────┐
│                    API GATEWAY                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Cloudflare Workers / Vercel Edge (Optional)     │  │
│  │  - Rate limiting, CORS, request logging          │  │
│  │  - Request/Response transformation               │  │
│  │  - Caching de recursos públicos                  │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────┐
│                    BACKEND LAYER                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │  NestJS 10 (Microservicios monolítica)           │  │
│  │  Módulos:                                        │  │
│  │  - auth (JWT, sesiones)                          │  │
│  │  - products (catálogo, búsqueda)                 │  │
│  │  - orders (checkout, carrito)                    │  │
│  │  - subscriptions (Autoship, recurrente)          │  │
│  │  - payments (Webpay, Mercado Pago webhooks)     │  │
│  │  - users (perfiles, direcciones)                 │  │
│  │  - notifications (email, WhatsApp)               │  │
│  │  - admin (dashboard, reportes)                   │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Integraciones Backend:                          │  │
│  │  - Webpay Plus API (REST)                        │  │
│  │  - Mercado Pago API (REST + Webhooks)            │  │
│  │  - Interakt WhatsApp (API + Webhooks)            │  │
│  │  - SendGrid / SendBlue (email)                   │  │
│  │  - Sentry (error logging)                        │  │
│  │  - Datadog (APM)                                 │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────┐
│                    DATA LAYER                           │
│  ┌──────────────────────────────────────────────────┐  │
│  │  PostgreSQL 16 (OLTP - Transaccional)            │  │
│  │  Tablas principales:                            │  │
│  │  - users, addresses, auth_tokens                 │  │
│  │  - products, product_variants, categories        │  │
│  │  - carts, cart_items                             │  │
│  │  - orders, order_items                           │  │
│  │  - subscriptions, subscription_items             │  │
│  │  - payments, payment_methods                     │  │
│  │  - reviews, reviews_images                       │  │
│  │  - coupons, coupon_usage                         │  │
│  │  - notifications                                 │  │
│  │  - webhooks_log                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  MongoDB 7 (OLAP / Logs)                         │  │
│  │  Collections:                                    │  │
│  │  - analytics_events (pageviews, clicks, etc.)   │  │
│  │  - user_sessions (duración, devices)            │  │
│  │  - webhook_logs (Webpay, Mercado Pago)          │  │
│  │  - error_logs (Sentry, app logs)                │  │
│  │  - search_queries (para SEO analysis)           │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Redis (Cache + Sessions)                        │  │
│  │  - Sesiones de usuario (JWT + refresh)          │  │
│  │  - Cache de productos (15min TTL)                │  │
│  │  - Rate limiting (API calls)                     │  │
│  │  - Job queue (Bull) para:                        │  │
│  │    • Procesar suscripciones recurrentes          │  │
│  │    • Enviar notificaciones WhatsApp              │  │
│  │    • Generar reportes                            │  │
│  │    • Indexar productos (Elasticsearch)           │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 📦 Stack Tecnológico Detallado

### Frontend (Client)
| Tecnología | Versión | Propósito | Razón |
|-----------|---------|----------|-------|
| **Next.js** | 15 | Framework SSR/SSG | App Router, File-based routing, built-in API |
| **React** | 19 | UI componentes | Server Components (RSC) reduce JS al cliente |
| **TypeScript** | 5.3 | Type safety | Reduce bugs, mejor DX en equipo |
| **Tailwind CSS** | 3.4 | Styling | Utilidades, responsive, performance |
| **Zustand** | 4.5 | State management (Cart) | Ligero, no boilerplate |
| **TanStack Query** | 5 | Data fetching | Caching, revalidación, devtools |
| **React Hook Form** | 7.5 | Forms | Ligero, validaciones Zod |
| **Zod** | 3.22 | Schema validation | Type-safe, reutilizable server-side |
| **Framer Motion** | 10.16 | Animaciones | Smooth UX, solo si performance OK |

### Backend (Server)
| Tecnología | Versión | Propósito | Razón |
|-----------|---------|----------|-------|
| **NestJS** | 10 | Framework backend | Modular, Dependency Injection, TypeScript-first |
| **TypeScript** | 5.3 | Type safety | Consistency con frontend |
| **Prisma ORM** | 5.7 | PostgreSQL mapping | Type-safe, migrations, ergonomic |
| **Jest** | 29 | Testing | Unit + integration tests |
| **Bull** | 4.11 | Job queue | Suscripciones recurrentes, notificaciones |
| **Passport.js** | 0.7 | Authentication | JWT + Social (opcional Año 2) |
| **Nodemailer** | 6.9 | Email | Backup si SendGrid cae |
| **node-cron** | 3.0 | Scheduled tasks | Cron jobs para suscripciones |

### Databases
| BD | Versión | Propósito | Schema |
|----|---------|-----------|---------| 
| **PostgreSQL** | 16 | OLTP (transaccional) | SQL, ACID, relaciones |
| **MongoDB** | 7 | OLAP (logs, analytics) | JSON, escalabilidad |
| **Redis** | 7 | Cache, sessions, queue | In-memory, fast |
| **Elasticsearch** | 8.11 | Búsqueda full-text (Año 2) | Índices inversas, querys complejas |

### Hosted Platforms
| Servicio | Plan | Propósito | Costo Approx |
|----------|------|----------|-------------|
| **Vercel** | Pro | Next.js hosting, edge | $20-100/mes |
| **Railway / Render** | Hobby/Basic | NestJS hosting | $5-50/mes |
| **Railway / Neon** | Free/Paid | PostgreSQL | $0-50/mes |
| **MongoDB Atlas** | M0 Free / M5 | MongoDB hosting | $0-57/mes |
| **Redis Cloud** | Free/Paid | Redis hosting | $0-20/mes |
| **SendGrid / SendBlue** | Free/Starter | Email | $0-10/mes |
| **Interakt / AiSensy** | Starter | WhatsApp | $10-50/mes |

---

## 🗄️ Esquema de Base de Datos (PostgreSQL)

### Tabla: `products`
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  category_id UUID NOT NULL REFERENCES categories(id),
  sku VARCHAR(100) UNIQUE NOT NULL,
  
  -- Pricing
  price_one_time DECIMAL(10, 2) NOT NULL,
  price_autoship DECIMAL(10, 2) NOT NULL,
  autoship_discount_percentage INT DEFAULT 10,
  
  -- Inventory
  stock_quantity INT NOT NULL,
  is_published BOOLEAN DEFAULT FALSE,
  
  -- SEO
  meta_title VARCHAR(255),
  meta_description TEXT,
  
  -- Sourcing
  supplier_id UUID REFERENCES suppliers(id),
  supplier_sku VARCHAR(100),
  cost_price DECIMAL(10, 2),
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_published ON products(is_published);
```

### Tabla: `subscriptions` (AutoCompra)
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  
  -- Frecuencia
  frequency_days INT NOT NULL, -- 15, 30, 45
  status VARCHAR(50) DEFAULT 'active', -- active, paused, cancelled
  paused_until DATE, -- Si pausada temporalmente
  
  -- Siguiente envío
  next_delivery_date DATE NOT NULL,
  
  -- Pago
  payment_method_id UUID REFERENCES payment_methods(id),
  billing_address_id UUID REFERENCES addresses(id),
  shipping_address_id UUID REFERENCES addresses(id),
  
  -- Auditoría
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  cancelled_at TIMESTAMP,
  cancellation_reason VARCHAR(255)
);

CREATE TABLE subscription_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID NOT NULL REFERENCES subscriptions(id),
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INT NOT NULL DEFAULT 1,
  price_at_creation DECIMAL(10, 2) NOT NULL, -- Histórico
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_next_delivery ON subscriptions(next_delivery_date);
```

### Tabla: `orders`
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  subscription_id UUID REFERENCES subscriptions(id), -- NULL si compra única
  
  -- Detalles
  subtotal DECIMAL(10, 2) NOT NULL,
  shipping_cost DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  
  -- Dirección
  billing_address_id UUID REFERENCES addresses(id),
  shipping_address_id UUID REFERENCES addresses(id),
  
  -- Estado
  status VARCHAR(50) DEFAULT 'pending', -- pending, paid, shipped, delivered, cancelled
  payment_method_id UUID REFERENCES payment_methods(id),
  
  -- Tracking
  tracking_number VARCHAR(255),
  estimated_delivery_date DATE,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  delivered_at TIMESTAMP
);
```

### Tabla: `payments`
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id),
  
  -- Método pago
  payment_method VARCHAR(50) NOT NULL, -- webpay, mercado_pago, contra_entrega
  
  -- External References
  webpay_token_id VARCHAR(255), -- De Webpay
  mercado_pago_id VARCHAR(255), -- De Mercado Pago
  
  -- Status
  status VARCHAR(50) DEFAULT 'pending', -- pending, processing, completed, failed, refunded
  
  -- Amount
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'CLP',
  
  -- Audit
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  processed_at TIMESTAMP
);
```

### Tabla: `reviews`
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id),
  user_id UUID NOT NULL REFERENCES users(id),
  order_id UUID REFERENCES orders(id), -- Verificado: compró el producto
  
  -- Review
  rating INT NOT NULL, -- 1-5
  title VARCHAR(255),
  content TEXT,
  
  -- Mascota
  pet_name VARCHAR(100),
  pet_breed VARCHAR(100),
  pet_image_url VARCHAR(255),
  
  -- Moderation
  is_verified BOOLEAN DEFAULT FALSE, -- Compró realmente
  is_published BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reviews_published ON reviews(is_published);
```

---

## 🔌 Integraciones Externas

### 1. **Webpay Plus (Pagos Tarjeta)**

**Endpoint:** `POST /api/payments/webpay/create`

```typescript
// Request
{
  amount: 39431,
  buyOrder: "ORDER-20260610-001",
  sessionId: "user-session-id-123",
  returnUrl: "https://pettyshop.com/checkout/confirm"
}

// Response
{
  token: "0192612345678",
  url: "https://webpay.transbank.cl/webpayplus/initTransaction?token_ws=0192612345678"
}
```

**Webhook:** `POST /api/webhooks/webpay`
- Recibe: `TBK_TOKEN`, transacción data
- Valida y confirma cobro en BD

**Librería:** `transbank-sdk-nodejs`

### 2. **Mercado Pago (Pagos Flexible)**

**Endpoint:** `POST /api/payments/mercado-pago/create`

```typescript
// Request
{
  items: [{ title: "Nomade Adulto 20kg", quantity: 1, price: 36441 }],
  back_urls: {
    success: "https://pettyshop.com/checkout/success",
    failure: "https://pettyshop.com/checkout/failure",
    pending: "https://pettyshop.com/checkout/pending"
  },
  auto_return: "approved"
}

// Response
{
  preference_id: "1234567890",
  init_point: "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=1234567890"
}
```

**Webhook:** `POST /api/webhooks/mercado-pago`
- Tópicos: `payment.created`, `payment.updated`
- Valida firma, actualiza orden

**Librería:** `mercadopago`

### 3. **Interakt WhatsApp**

**Endpoint:** `POST /api/notifications/whatsapp`

```typescript
// Request
{
  phoneNumber: "+56912345678",
  templateName: "subscription_confirmed",
  variables: {
    name: "María",
    petName: "Max",
    alimento: "Nomade Adulto 20kg",
    fecha: "2026-07-10",
    precio: "$36.441 CLP"
  }
}

// Response
{
  success: true,
  messageId: "msg-123-456"
}
```

**Webhook:** `POST /api/webhooks/interakt` (incoming messages, delivery status)

**Librería:** `axios` + custom wrapper

### 4. **Google Maps Places**

**Frontend Integration:**
```typescript
import { useGooglePlacesAutocomplete } from '@react-google-maps/api';

// Autocomplete dirección en checkout
<GooglePlacesAutocomplete onSelect={(place) => setAddress(place)} />
```

**API Key:** Environment variable (restringir a dominio pettyshop.com)

### 5. **Elasticsearch (Búsqueda, Año 2)**

**Índice:** `products`
```json
{
  "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 1,
    "analysis": {
      "analyzer": {
        "spanish_analyzer": {
          "type": "standard",
          "stopwords": "_spanish_"
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "name": { "type": "text", "analyzer": "spanish_analyzer" },
      "description": { "type": "text", "analyzer": "spanish_analyzer" },
      "category": { "type": "keyword" },
      "price": { "type": "float" },
      "rating": { "type": "float" }
    }
  }
}
```

---

## 🔐 Autenticación y Seguridad

### JWT Tokens
```typescript
// Access Token (15min)
{
  sub: "user-id",
  email: "user@example.com",
  exp: 1624483200,
  iat: 1624482600,
  type: "access"
}

// Refresh Token (30 días, stored in httpOnly cookie)
{
  sub: "user-id",
  type: "refresh",
  exp: 1627161600
}
```

### Rate Limiting
```typescript
// Middleware NestJS + redis
throttle({
  ttl: 60, // 60 segundos
  limit: 10 // máximo 10 requests
})
```

### CORS
```typescript
// Permitir solo:
// - https://pettyshop.com
// - https://api.pettyshop.com
app.enableCors({
  origin: process.env.ALLOWED_ORIGINS.split(','),
  credentials: true
});
```

---

## 📊 Métricas de Performance

### Frontend
| Métrica | Target | Tool |
|---------|--------|------|
| **FCP (First Contentful Paint)** | <1.5s | Lighthouse, Core Web Vitals |
| **LCP (Largest Contentful Paint)** | <2.5s | Lighthouse |
| **CLS (Cumulative Layout Shift)** | <0.1 | Lighthouse |
| **TTL (Time to Interactive)** | <3.5s | Lighthouse |
| **Bundle Size (JS)** | <150KB | next/bundle-analyzer |

### Backend
| Métrica | Target | Tool |
|---------|--------|------|
| **API Response Time** | <200ms p95 | Datadog APM |
| **DB Query Time** | <50ms p95 | Datadog APM |
| **Error Rate** | <0.5% | Sentry |
| **Uptime** | 99.9% | UptimeRobot |

---

## 🚀 Deployment

### Development
```bash
# Frontend
npm run dev  # Next.js on http://localhost:3000

# Backend
npm run start:dev  # NestJS on http://localhost:3001

# Database
docker-compose up postgres mongo redis  # Local services
```

### Staging
- Frontend: Vercel (branch `staging`)
- Backend: Railway (branch `staging`)
- Database: Railway PostgreSQL (snapshot de prod)

### Production
- Frontend: Vercel (branch `main`, auto-deploy)
- Backend: Railway (branch `main`, manual deploy con CD/CI)
- Database: Railway PostgreSQL (backups diarios)
- CDN: Cloudflare (caching imágenes, assets)

---

## 📋 Checklist de Implementación (Fase 1: MVP)

### Semana 1-2: Setup
- [ ] Repo monorepo (frontend + backend)
- [ ] PostgreSQL + Redis + MongoDB locales (docker-compose)
- [ ] Variables de entorno (.env.local, .env.prod)
- [ ] CI/CD básico (GitHub Actions)

### Semana 3-4: Frontend Core
- [ ] Layout base (Header, Footer, Navigation)
- [ ] Home page (Hero, Featured, CTA)
- [ ] Catálogo (Categoría, búsqueda básica, filtros)
- [ ] PDP (Imágenes, descripción, precio, botones)

### Semana 5-6: Backend Core
- [ ] Modelos Prisma (Products, Orders, Subscriptions)
- [ ] CRUD productos (API)
- [ ] Carrito (Zustand client + state DB server)
- [ ] Autenticación (Signup, login, JWT)

### Semana 7-8: Checkout
- [ ] Direcciones (Autocomplete Google Maps)
- [ ] Webpay Plus integración
- [ ] Mercado Pago integración
- [ ] Orden creation

### Semana 9-10: Suscripciones
- [ ] Modelo Subscription (DB)
- [ ] Panel autogestión básico (dashboard)
- [ ] Recurrente job (Bull: procesar suscripciones cada noche)
- [ ] Email confirmación (SendGrid)

### Semana 11-12: Pulida
- [ ] Testing (Jest, E2E Cypress)
- [ ] SEO (Meta tags, sitemap)
- [ ] Performance (Image optimization, code splitting)
- [ ] Deployment (Vercel + Railway)

---

## 🔗 Environment Variables (Ejemplo)

```bash
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_GOOGLE_MAPS_KEY=AIzaSy...
NEXT_PUBLIC_ANALYTICS_ID=G-...

# Backend (.env)
DATABASE_URL=postgresql://user:pass@localhost:5432/pettyshop
REDIS_URL=redis://localhost:6379
MONGODB_URL=mongodb://localhost:27017/pettyshop

WEBPAY_COMMERCE_CODE=...
WEBPAY_API_KEY=...

MERCADO_PAGO_ACCESS_TOKEN=...

INTERAKT_API_KEY=...
INTERAKT_WORKSPACE_ID=...

SENDGRID_API_KEY=...
SENDGRID_FROM_EMAIL=noreply@pettyshop.com

JWT_SECRET=your-secret-key
JWT_EXPIRATION=15m

NODE_ENV=development
```

---

**Última revisión:** 2026-06-10  
**Status:** ✅ Ready para arquitecto de software y devops
