# 📋 Resumen Ejecutivo y Hitos de Proyecto

**Tags:** #proyecto #timeline #hitos #kpis #go-to-market  
**Project:** Pet Shop Mockup  
**Type:** Executive Summary  
**Última actualización:** 2026-06-10  

---

## 🎯 Propuesta de Valor (Elevator Pitch)

**Petty Shop** es un e-commerce especializado en nutrición y accesorios para mascotas que posiciona exclusividad mediante refinamiento estético (no precio) y conveniencia operativa (suscripción flexible, entrega rápida, servicio personalizado).

**Diferenciadores vs Competencia:**
- ✅ **Diseño editorial premium** (not "supermercado")
- ✅ **Suscripción sin fricción** (pausar/cambiar/cancelar con 1 clic)
- ✅ **Calculadora nutricional interactiva** (predicción precio mensual)
- ✅ **Telemedicina veterinaria** (integrada, Año 2)
- ✅ **Recomendaciones personalizadas** (perfil mascota + IA)

**Target Primario:** ABC1-C1a (30-35%) + Millennial/Gen Z (57% ownership)

**Mercado Oportunidad:** Chile US$1.15B+ (2026), ecommerce global US$95B+, CAGR 7.8% hasta 2030

---

## 💰 Modelo de Negocio

### Ingresos
- **Venta de productos:** 95% de ingresos
  - Alimentos: 60% (margen bruto 30-40%)
  - Accesorios: 25% (margen bruto 40-50%)
  - Servicios (Año 2): 15% (telemedicina, seguros, asesoría)
- **Comisión de Marketplace** (opcional, Año 3): 5% ingresos

### Costos Variables
- **COGS (Cost of Goods Sold):** 50-55% de ventas
- **Comisiones pago:** 3-5% (Webpay, Mercado Pago)
- **Logística:** $2-4K CLP por orden (15-20% para órdenes <$30k)
- **Notificaciones (WhatsApp):** ~$0.01-0.05 por mensaje

### Costos Fijos (Mes 12)
- **Team:** 3-4 personas ($50-80K CLP/mes c/u)
- **Hosting + infraestructura:** $10-20K CLP/mes
- **Marketing:** $20-30K CLP/mes (variable)
- **Operaciones (office, tools):** $10-15K CLP/mes

### Proyección Ingresos Año 1
- **M1-M3:** ~$5-8M CLP/mes (validación)
- **M4-M6:** ~$15-25M CLP/mes (growth)
- **M7-M12:** ~$35-50M CLP/mes (escala)
- **Año 1 Total:** $35-40M CLP

### Proyección LTV / CAC
- **CAC (Costo Adquisición Cliente):** <$15.000 CLP (paid) + referral + organic
- **LTV Suscriptor 36 meses:** $200.000+ CLP (si retención >75%)
- **Payback Period:** <2 meses (agresivo pero posible con alta retención)

---

## 📈 KPIs Críticos y Benchmarks

### Métricas de Tráfico
| Métrica | M1 Target | M6 Target | M12 Target |
|---------|-----------|-----------|-----------|
| **Usuarios Únicos/Mes** | 500 | 2.000 | 5.000 |
| **Sesiones/Mes** | 700 | 3.500 | 10.000 |
| **Páginas/Sesión** | 3 | 4 | 5 |
| **Tasa Rebote** | 40% | 30% | 25% |

### Métricas de Conversión
| Métrica | Target | Fuente |
|---------|--------|--------|
| **Add-to-Cart Rate** | >8% | Baymard industry std |
| **Conversión PDP** | >2.5% | Ecommerce benchmark |
| **Tasa Abandono Carrito** | <65% | Baymard avg 70.22% |
| **AOV (Average Order Value)** | $50.000 CLP | Mix products + suscripción |

### Métricas de Suscripción
| Métrica | M12 Target | Fuente |
|---------|-----------|--------|
| **% Ventas via Autoship** | 25-30% | Chewy 83%, target conservador |
| **Tasa Churn Mensual** | <5% | Chewy 3%, industry 5-8% |
| **NSPAC** | $250-350 CLP | Chewy $591 USD, scaled para LATAM |
| **LTV Suscriptor** | $200k+ CLP | 36 meses, >75% retention |

### Métricas de Satisfacción
| Métrica | Target |
|---------|--------|
| **NPS (Net Promoter Score)** | >50 |
| **Rating Medio** | >4.5★ |
| **Tasa de Repeat Purchase** | >60% |

---

## 📅 Hitos y Timeline (Fase 1: 12 Meses)

### **Fase 0: Validación y Setup (Semanas 1-4)**

**Objetivo:** Confirmar demanda, setup técnico, sourcing inicial

**Deliverables:**
- [ ] Maqueta Figma de Home + PDP + Checkout (1 semana)
- [ ] Acuerdos de sourcing con 2-3 proveedores (Ludipek, Marben)
- [ ] Catálogo inicial: 75-100 SKUs cargados en BD
- [ ] Repo monorepo (Next.js + NestJS), CI/CD básico
- [ ] Documentación técnica y setup local

**KPI:** 
- Cierre sourcing con margen 35%+
- Catálogo listo para testing
- Demo técnica funcional

**Riesgo:** Proveedores demoran entregas

---

### **Fase 1: MVP (Semanas 5-12) — "Landing + Catálogo + Carrito"**

**Objetivo:** Producto mínimo funcional, capturar primeros 100 clientes

**Sprint Breakdown:**

**Sprint 1 (Semanas 5-6): Home + Catálogo**
- [ ] Home page responsive (Hero, pillares confianza, segmentación)
- [ ] Catálogo con filtros (tipo mascota, categoría)
- [ ] PDP con imágenes carousel
- [ ] Búsqueda básica (nombre/SKU)
- [ ] Mobile-first verificado

**Sprint 2 (Semanas 7-8): Carrito + Checkout Core**
- [ ] Carrito (Zustand client)
- [ ] Direcciones con Google Maps
- [ ] Webpay Plus integración (modo test)
- [ ] Mercado Pago integración (modo test)
- [ ] Confirmación email automática

**Sprint 3 (Semanas 9-10): Autenticación + Dashboard**
- [ ] Signup/Login JWT
- [ ] Panel usuario (mi perfil, mis pedidos)
- [ ] Direcciones guardadas
- [ ] Historial órdenes
- [ ] Wishlist básica

**Sprint 4 (Semanas 11-12): Pulida y Deployment**
- [ ] Testing críticos (E2E checkout)
- [ ] SEO meta tags
- [ ] Lighthouse >80
- [ ] Vercel + Railway deployment
- [ ] Monitoreo (Sentry, Datadog)

**KPI Fase 1:**
- 100+ órdenes en primeros 30 días
- CVR >2.5% (promedio ecommerce)
- Abandono carrito <70%
- Uptime 99.5%+

**Inversión:** 2-3 devs full-time, 1 product/design

---

### **Fase 2: Suscripción (Semanas 13-20) — "Autoship + Retención"**

**Objetivo:** 25%+ de ventas via suscripción, churn <5% mensual

**Sprint Breakdown:**

**Sprint 5-6 (Semanas 13-14): Suscripción Core**
- [ ] Modelo Subscription + Subscription Items (Prisma)
- [ ] Flujo AutoCompra en PDP
- [ ] Calculadora nutricional interactiva
- [ ] Selector de frecuencia (15, 30, 45 días)
- [ ] Descuento 10% bien visible

**Sprint 7-8 (Semanas 15-16): Panel Autogestión + Recurrencia**
- [ ] Dashboard: mis suscripciones (estado, próxima fecha)
- [ ] Modificar fecha (adelantar/postergar)
- [ ] Modificar catálogo (cambiar producto, agregar snacks)
- [ ] Pausar suscripción (por cuánto tiempo)
- [ ] Cancelar con modal de retención
- [ ] Job recurrente (Bull): procesar suscripciones cada noche

**Sprint 9-10 (Semanas 17-20): Notificaciones + Retención**
- [ ] Integración Interakt (WhatsApp)
- [ ] Templates de notificación
  - Confirmación suscripción (T+0)
  - Recordatorio cobro (T-3 días)
  - Confirmación pago (T-1 día)
  - Reactivación pausada (auto)
  - Recuperación churn (T+90d sin compra)
- [ ] Recomendaciones personalizadas (IA/SQL)
- [ ] Testing automatizaciones

**KPI Fase 2:**
- 25-30% de ingresos via Autoship
- Churn <5% mensual
- Open rate WhatsApp >80%
- Reactivación churn >10%

**Inversión:** 2 devs backend, 1 product, contractor Interakt

---

### **Fase 3: Diferenciación (Semanas 21-32) — "Contenido + Servicios + Comunidad"**

**Objetivo:** Defensible moat, escalabilidad, NSPAC $300+ CLP

**Sprint Breakdown:**

**Sprint 11-12 (Semanas 21-24): Contenido + SEO**
- [ ] Blog MVP (10-15 artículos)
  - "Nutrición para perro senior," "Alergia alimentaria," etc.
  - Optimizado SEO (keywords: "better cat food", "best dog food")
  - Linkeo a productos relevantes
- [ ] Videos YouTube (5-10 vídeos cortos)
  - Cómo introducir alimento nuevo
  - Señales de alergia
  - Cálculo de dosis
- [ ] FAQ expandida (esquema FAQ en HTML)
- [ ] Google Analytics 4 + Search Console

**Sprint 13-14 (Semanas 25-28): Telemedicina + Servicios (Año 2 Light)**
- [ ] Integración con plataforma vet (ej. Instavet, DoctorVet)
- [ ] Chat con veterinario certificado (15-30min)
- [ ] Precio: $5-10K CLP
- [ ] Prescripciones digitales → integración catálogo

**Sprint 15-16 (Semanas 29-32): Comunidad + UGC**
- [ ] Página de testimonios (fotos mascotas + reseñas)
- [ ] Reto mensual (#MyPetEatsWell)
- [ ] Programa de embajadores (mascotas con >100 followers)
- [ ] Integración UGC en PDP
- [ ] Email de solicitud reviews (post-purchase)

**KPI Fase 3:**
- 500+ palabras clave ranking top 3 Google (Año 2)
- 50+ reseñas con foto mascota
- 100+ seguidores en retos
- Telemedicina: 20+ consultas/mes

**Inversión:** 1 content writer, 1 dev backend (APIs), 1 contractor SEO

---

## 💰 Presupuesto Estimado (Año 1)

| Rubro | Estimado |
|-------|----------|
| **Team (3-4 FTE)** | $1.8M - $2.4M CLP |
| **Infraestructura + SaaS** | $150K CLP |
| **Marketing (orgánico + paid)** | $300K - $500K CLP |
| **Sourcing + Catálogo** | $100K CLP (inicial) |
| **Operaciones** | $150K CLP |
| **Buffer (20%)** | $700K CLP |
| **TOTAL AÑO 1** | **~$3.2M - $4.2M CLP** |

**Comparativa:**
- Laika levantó $65M total (pero es regional multi-país)
- Chewy levantó $358M antes IPO
- Target para este proyecto: $200-300K USD (~$150-225M CLP) en seed si future LATAM expansion

---

## 🚨 Riesgos y Mitigación

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-----------|--------|-----------|
| **Logística costosa en LATAM** | Alta | Alto | Comenzar solo Santiago metro; fullfillment local |
| **Sourcing y márgenes** | Media | Alto | Pilotar con 2-3 proveedores; target 35% margen |
| **Competencia Laika + SuperZoo** | Alta | Medio | Diferenciarse en contenido + servicios; UX superior |
| **Churn suscripción >7%** | Media | Medio | Diseño "pause" en lugar de cancel; WhatsApp reactivación |
| **Pago contra entrega ineficiente** | Baja | Bajo | Comenzar sin, agregar en M3 si demanda |
| **Market traction lento** | Baja | Alto | Validar 100+ órdenes en M1; else pivot rápido |

---

## ✅ Criterios de Éxito (Go / No-Go)

### **End of Fase 0 (Semana 4)**
- [ ] Sourcing confirmado (75+ SKUs, margen >30%)
- [ ] Prototipo Figma validado con 3+ stakeholders
- [ ] Repo técnico deployable en staging

**Go / No-Go:** Si 2/3 criterios → Go Phase 1

### **End of Fase 1 (Semana 12)**
- [ ] 100+ órdenes, $3-5M CLP GMV
- [ ] CVR >2%, abandono carrito <70%
- [ ] Uptime 99.5%+, Lighthouse >80

**Go / No-Go:** Si 3/3 criterios → Go Phase 2

### **End of Fase 2 (Semana 20)**
- [ ] 300+ órdenes/mes, 25%+ Autoship
- [ ] Churn <5% mensual, NPS >50
- [ ] Rentable bruto (ingresos > COGS + comisiones)

**Go / No-Go:** Si 3/3 criterios → Go Phase 3 (scaling)

---

## 📚 Documentación de Referencia

Este vault contiene 8 archivos maestros:

1. **00-INDEX** — Mapa de contenido, instrucciones para IA
2. **01-Diagnostico-Mercado** — Mercado global + LATAM, sourcing
3. **02-Psicologia-Pet-Parent** — Comportamiento consumidor, copy
4. **03-Benchmarking-Competencia** — Análisis competitivo detallado
5. **04-Identidad-Visual** — Paleta colores, tipografía, design tokens
6. **05-Arquitectura-UXUI** — Navegación, PDP, flujos
7. **06-Suscripciones-Checkout** — Autoship, checkout, retención
8. **08-Especificaciones-Tecnicas** — Stack, DB, integraciones, APIs

**Para OpenCode/Claude AI:**
- Usa 00-INDEX como guía de lectura
- Consulta 04-Identidad-Visual para colores/tipografía exactas
- Consulta 05-Arquitectura-UXUI para specs de componentes
- Consulta 08-Especificaciones-Tecnicas para APIs e integraciones

---

## 🎬 Próximos Pasos

1. **Aprobación cliente:** Presentar maqueta Figma con propuesta de valor
2. **Kick-off técnico:** Align stack, crear repo, assign roles
3. **Sprint 0 (Setup):** Dockerizar, CI/CD, variables de entorno
4. **Sprint 1:** Comenzar con Home + Catálogo
5. **Weekly syncs:** Retroalimentación, pivots rápidos

---

**Última revisión:** 2026-06-10  
**Status:** ✅ Ready para presentar a cliente y comenzar development
