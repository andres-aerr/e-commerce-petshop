# 🐾 Estrategia E-commerce Pet Shop: Exclusivo pero Accesible

**Proyecto:** Pet Shop Mockup Chile  
**Client Segment:** Premium-Accesible  
**Fecha:** 2026-06-10  
**Stack:** Next.js + NestJS + React + TypeScript + PostgreSQL + MongoDB  
**Destinatario:** Claude/OpenCode para generación automática de ecommerce  

---

## 📋 Descripción General

Esta bóveda de Obsidian documenta la estrategia completa de un e-commerce de pet shop que posiciona **exclusividad mediante refinamiento estético + accesibilidad de precio**. No es una tienda "premium cara" ni un supermercado básico, sino una plataforma que comunica calidad, confianza y conveniencia.

### El Diferenciador Clave
- **Autoship/Suscripción = 83% de las ventas** en la industria (Chewy Q2 FY2025)
- **Fricción logística = el verdadero moat en LATAM** (entrega rápida, pago efectivo/tarjeta, sin robo en puerta)
- **Pet Humanization = el driver psicológico** (mascota como hijo, no utensilio)

---

## 🗺️ Estructura de Notas y Flujo de Trabajo

### **Fase 1: Investigación de Mercado**
[[01-Diagnostico-Mercado-Mascotas-Chile]]  
- Penetración: 70% hogares con mascota  
- Mercado: US$1.152,6M+ (Chile), ~US$95B (ecommerce global)  
- Sourcing: Ludipek, Marben, Adelco, Central Mayorista  
- Precios de referencia para catálogo de simulación  

### **Fase 2: Comportamiento del Consumidor**
[[02-Psicologia-Pet-Parent-Chileno]]  
- Mascota como hijo (60% de penetración)  
- Inelasticidad al cambio de marca (6/10 no sustituirían)  
- Distribución de gasto: 42,8% alimentación, 23,9% salud, 21,5% accesorios, 11,8% estética  
- Segmentación: ABC1 (perros premium), C2-D (gatos accesibles), nicho sustentable  
- Psicología de compra: emocional, no racional  

### **Fase 3: Inteligencia Competitiva**
[[03-Benchmarking-Competencia]]  
- **SuperZoo:** Omnicanal, envío express 3h por $3.590  
- **Laika:** Membresía $59.9k/año, descuento 15-40%, chat vet ilimitado, 5x growth YoY  
- **B-Pets:** 5% recurrente, garantía stock 3 meses, mismo día RM  
- **Club Wankün:** Escalonado 10-30%, seguros mascota, calculadora dosificación  
- **Matriz comparativa de 6 competidores y sus beneficios clave**

### **Fase 4: Identidad Visual y Diseño**
[[04-Identidad-Visual-Estetica]]  
- **Paleta oficial:**
  - Eclipse (#3C3731) — Primario, marrón natural
  - Terracota (#ED6435) — CTA, naranja energético
  - Bridesmaid (#FFE6D4) — Fondo, beige cálido
  - Turquesa (#45C1C7) — Confianza/salud
  - Blanco (#FFFFFF) — Lienzo limpio
- **Tipografía:**
  - Headers: Lora o Playfair Display (serif contemporáneo)
  - Body: Plus Jakarta Sans o Inter (sans-serif limpia)
- **Dirección de arte:** Minimalismo cálido, fotografía editorial, mascotas en interiores reales

### **Fase 5: Arquitectura UX/UI**
[[05-Arquitectura-UXUI-PDP]]  
- **Navegación:** 3 clics desde home a cualquier producto (mobile-first)  
- **Taxonomía:** Perros > Gatos > Nutrición Natural > AutoCompra  
- **PDP con 3 secciones críticas:**
  1. Hero + Doble opción (One-time vs AutoCompra con descuento 10%)
  2. Calculadora nutricional interactiva
  3. Transparencia científica (SAG, ingredientes, alérgenos)
- **Abandono de carrito:** Benchmark 70,22%; target <65%

### **Fase 6: Flujo de Suscripción y Checkout**
[[06-Suscripciones-Retención-Checkout]]  
- **Checkout:** 7-8 campos máximo, guest checkout obligatorio, transparencia de costos desde inicio  
- **Medios de pago:** Webpay Plus, Mercado Pago, 3-6 cuotas sin interés  
- **Panel de autogestión:** Modificar fecha, cambiar productos, pausar 1-clic  
- **Notificaciones:** WhatsApp (Interakt/AiSensy) en lugar de email  
- **KPI:** ≥30% de ventas vía suscripción a 12 meses  

### **Fase 7: Prototipado e Implementación**
[[07-Guia-Mockup-Interactivo]]  
- Estructura de Home Page (Hero, pilares de confianza, segmentación rápida, best-sellers)  
- **Asistente Nutricional (Quiz onboarding):**
  - Pantalla 1: Datos identidad mascota
  - Pantalla 2: Etapa de vida + condiciones especiales
  - Pantalla 3: Recomendación personalizada + suscripción
- Stack recomendado: Figma > React components > Next.js pages

### **Fase 8: Especificaciones Técnicas (Para Desarrolladores IA)**
[[08-Especificaciones-Tecnicas]]  
- Base de datos: PostgreSQL (catálogo, usuarios, suscripciones) + MongoDB (logs, sesiones)  
- API: NestJS con autenticación JWT, webhooks Webpay/Mercado Pago  
- Frontend: Next.js App Router, Tailwind CSS con variables CSS para paleta de colores  
- Integraciones: Google Maps API (direcciones), Interakt/AiSensy (WhatsApp), Webpay Plus, Mercado Pago  
- Métricas: Add-to-cart rate >8%, abandono carrito <65%, NSPAC proyectado US$250-350 (20% de Chewy)  

---

## 🎯 Hitos y Go-to-Market

| Fase | Duración | Entregables | KPI Mínimo |
|------|----------|-------------|-----------|
| **Validación & Sourcing** | 0-3 meses | Catálogo 75+ SKUs, prueba logística | 75 SKUs + entrega <48h |
| **MVP (Home + PDP + Checkout)** | 3-6 meses | Landing + catálogo + carrito | CVR >2,5% |
| **Suscripción** | 6-12 meses | Autoship, calculadora nutricional | 30% sales via suscripción |
| **Escala & Diferenciación** | 12+ meses | Telemedicina vet, contenido SEO, influencer | NSPAC US$250+ |

---

## 🔗 Links de Referencia

- **Benchmark Global:** Chewy (US$11,86B, 83% Autoship), Petco (US$6,1B, turnaround), Amazon (50% share online)
- **LATAM:** Laika ($48M Series B, SoftBank), Petz-Cobasi (fusión enero 2026), Petlove (Brasil, Repet suscripción)
- **Investigación:** APPA 2025 State of Industry (US$158B pet care), Grand View Research (US$94,89B ecommerce global, CAGR 7,8%)
- **Abandono carrito:** Baymard Institute (70,22% promedio), "7-8 campos" regla de oro

---

## 💡 Instrucciones para OpenCode/Claude

Este vault está diseñado para ser **procesado por un modelo de IA de forma directa**. Cada archivo contiene:

1. **Datos cuantificables** (colores hex, precios, métricas)
2. **Especificaciones de flujo** (número de pasos, campos requeridos, integraciones)
3. **Paleta de restricciones** (qué NO hacer: infantil, saturado, "supermercado")
4. **Jerarquía de prioridades** (Autoship > anything, UX móvil > desktop, psicología emocional > funciones)

### Uso Recomendado
```
1. Lee 00-INDEX (este archivo)
2. Lee 01-Diagnostico + 02-Psicologia (contexto mercado)
3. Lee 04-Identidad (paleta, tipografía, dirección arte)
4. Lee 05-Arquitectura + 06-Suscripciones (flujos técnicos)
5. Lee 08-Especificaciones (stack, integraciones, métricas)
6. Comienza con Home + PDP + Checkout
7. Luego Asistente Nutricional + Panel de Suscripción
```

**Nota:** Si algo es ambiguo o falta, el archivo 08-Especificaciones técnicas tiene los detalles de API, base de datos y decisiones arquitectónicas.

---

## 📊 Tabla de Contenidos Rápida

| Archivo | Propósito | Audiencia |
|---------|-----------|-----------|
| 00-INDEX | Mapa maestro | Todos |
| 01-Diagnostico | Mercado + sourcing | Producto, Estrategia |
| 02-Psicologia | Comportamiento consumidor | Diseño, Marketing, Producto |
| 03-Benchmarking | Análisis competencia | Estrategia, Producto |
| 04-Identidad | Colores, tipografía, dirección arte | Diseño, Frontend |
| 05-Arquitectura | Flujos UX, taxonomía, PDP | Frontend, Producto |
| 06-Suscripciones | Checkout, Autoship, retención | Backend, Frontend, Producto |
| 07-Mockup | Estructura Figma, onboarding | Diseño, Frontend |
| 08-Especificaciones | Tech stack, APIs, métricas | Backend, DevOps |

---

**Última actualización:** 2026-06-10  
**Status:** 🟢 Ready for OpenCode/Claude generation
