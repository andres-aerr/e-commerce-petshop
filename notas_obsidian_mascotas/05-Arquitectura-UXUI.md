# 📐 Arquitectura UX/UI: Taxonomía, PDP y Flujos de Conversión

**Tags:** #ux-ui #arquitectura #navegacion #pdp #conversion  
**Project:** Pet Shop Mockup  
**Type:** Product Architecture  
**Última actualización:** 2026-06-10  

---

## 🗂️ Estructura de Navegación (Information Architecture)

### Principio de Diseño
**"3 Clics a Cualquier Producto"** — Un usuario en móvil debe localizar cualquier artículo en máximo 3 clics desde home.

### Menú Principal (Mobile-First)

```
HOME
├── PERROS
│   ├── Alimentos
│   │   ├── Secos
│   │   ├── Húmedos
│   │   ├── Prescripción Clínica
│   │   └── Snacks & Treats
│   ├── Paseo & Descanso
│   │   ├── Arneses & Collares
│   │   ├── Correas
│   │   └── Camas & Colchones
│   └── Higiene & Cuidado
│       ├── Champú & Acondicionador
│       ├── Cepillos & Peines
│       └── Limpiadores Dentales
│
├── GATOS
│   ├── Alimentos
│   │   ├── Secos
│   │   ├── Húmedos & Pâté
│   │   ├── Prescripción Clínica
│   │   └── Snacks Gourmet
│   ├── Higiene & Arenero
│   │   ├── Arenas Sanitarias
│   │   ├── Bandejas & Accesorios
│   │   └── Desodorizantes
│   └── Rascadores & Juguetes
│       ├── Rascadores (Scandinavian Design)
│       ├── Juguetes Interactivos
│       └── Casitas & Reposas
│
├── NUTRICIÓN NATURAL
│   ├── Alimentos Crudos Deshidratados
│   ├── Caldos & Superfood
│   ├── Snacks Naturales
│   └── Dietas Libres de Granos
│
├── AUTOCOMPRA
│   ├── Cómo Funciona
│   ├── Mis Suscripciones
│   └── Beneficios
│
├── SERVICIOS (Año 2+)
│   ├── Telemedicina Veterinaria
│   ├── Asesoría Nutricional
│   └── Seguros Mascota
│
├── EDUCACIÓN
│   ├── Blog Nutrición
│   ├── Videos Cuidados
│   └── Quiz Asistente Nutricional
│
└── CUENTA / AYUDA

```

### Estructura Desktop (Header)
```
[LOGO] | HOME | PERROS | GATOS | NUTRICIÓN NATURAL | AUTOCOMPRA | BLOG | [Busca] | [Carrito] | [Cuenta]
```

### Breadcrumb (Ejemplo)
```
Home > Perros > Alimentos > Secos > (Producto Actual)
```

---

## 📄 Diseño de Ficha de Producto (PDP)

El PDP es el **core de conversión.** Estructura: Educación → Confianza → Acción.

### Layout PDP (Desktop: 2 Columnas | Móvil: 1 Columna Stack)

```
┌─────────────────────────────────────────────────────────┐
│                    HEADER DE SITIO                     │
├─────────────────────────────────────────────────────────┤
│ Home > Perros > Alimentos > Secos                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────┐        ┌──────────────────────┐  │
│  │                  │        │  NOMADE ADULTO       │  │
│  │  HERO IMAGE      │        │  RAZA MEDIANA (20kg) │  │
│  │  (2000x2000)     │        │                      │  │
│  │                  │        │  4.8★ (1.247 reseñas)│  │
│  │  [CAROUSEL]      │        │                      │  │
│  │  [THUMBNAILS]    │        │  ════════════════════│  │
│  │                  │        │                      │  │
│  │                  │        │  PRECIO              │  │
│  │                  │        │  $40.490 CLP         │  │
│  │                  │        │                      │  │
│  │                  │        │  ☑ Una sola compra   │  │
│  │                  │        │  ☑ AutoCompra (-10%)│  │
│  │                  │        │                      │  │
│  │                  │        │  Cada: ⊙ 15 días    │  │
│  │                  │        │        ⊙ 30 días    │  │
│  │                  │        │        ⊙ 45 días    │  │
│  │                  │        │                      │  │
│  │                  │        │  [BOTÓN] Suscribir  │  │
│  │                  │        │                      │  │
│  └──────────────────┘        └──────────────────────┘  │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ SECCIÓN 2: CALCULADORA NUTRICIONAL                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ "¿Cuánto debe comer tu perro?"                          │
│                                                         │
│ Peso de tu perro:     [____] kg                         │
│ Nivel de actividad:   ⊙ Bajo  ⊙ Medio  ⊙ Alto         │
│                                                         │
│ ▸ Dosis diaria recomendada: 220g                       │
│ ▸ Duración de saco: 60 días                            │
│ ▸ Frecuencia ideal AutoCompra: Cada 30 días           │
│                                                         │
│ [EXPANDIR DETALLE]                                     │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ SECCIÓN 3: DESCRIPCIÓN Y BENEFICIOS                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Alimento Premium con Pollo Fresco                      │
│                                                         │
│ Un alimento completo y balanceado especialmente         │
│ formulado para perros adultos de tamaño mediano a       │
│ grande. Con pollo fresco como primera proteína.         │
│                                                         │
│ ✓ Sin granos, sin maíz ni soja                         │
│ ✓ Ricos en Omega-3 y Omega-6                           │
│ ✓ Probióticos para digestión                           │
│ ✓ DHA para desarrollo cerebral                         │
│                                                         │
│ [EXPANDIR MÁS BENEFICIOS]                             │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ SECCIÓN 4: TRANSPARENCIA CIENTÍFICA (SAG)              │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ INGREDIENTES POR PORCENTAJE:                           │
│ • Pollo (40%)                                          │
│ • Arroz Integral (25%)                                 │
│ • Vegetales Mixtos (15%)                               │
│ • Aceites Naturales (8%)                               │
│ • Suplementos (12%)                                    │
│                                                         │
│ ANÁLISIS NUTRICIONAL GARANTIZADO:                      │
│ • Proteína: 28%  • Grasa: 16%  • Fibra: 4%           │
│ • Ceniza: 8%  • Humedad: 10%  • Calcio: 1.2%          │
│                                                         │
│ ⚠️  ALÉRGENOS: Contiene Pollo                          │
│                                                         │
│ [DESCARGAR CERTIFICADO SAG]  [INFORME LAB]            │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ SECCIÓN 5: RESEÑAS DE CLIENTES                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 4.8★ basado en 1.247 reseñas verificadas              │
│                                                         │
│ ▐████████████░░▌ Muy Satisfecho: 92%                  │
│ ▐██████░░░░░░░░▌ Satisfecho: 6%                       │
│ ▐██░░░░░░░░░░░░▌ Neutral: 2%                          │
│                                                         │
│ ┌─────────────────────────────────────────┐            │
│ │ María S. — 5★ — 1 semana atrás        │            │
│ │ \"Mi Golden pasó de tener piel seca a │            │
│ │ un pelaje brillante en 3 semanas.      │            │
│ │ Recomiendo 100%\"                       │            │
│ │                                          │            │
│ │ [FOTO MASCOTA] — Max, Golden Retriever │            │
│ └─────────────────────────────────────────┘            │
│                                                         │
│ [VER MÁS RESEÑAS]                                     │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ SECCIÓN 6: PRODUCTOS RELACIONADOS (Recomendaciones)   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Clientes que compraron esto también compraron:         │
│                                                         │
│ [CARD 1] [CARD 2] [CARD 3] [CARD 4]                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Detalles Críticos de PDP

#### 1. **Sección Hero (Imágenes)**
- **Número mínimo de fotos:** 5-7 (empaque, en uso, ingredientes close-up, etc.)
- **Resolución:** 2000x2000px mínimo (zoom)
- **Formato:** WebP + PNG fallback (compresión agresiva)
- **Características:**
  - Carousel de imágenes con thumbnails debajo
  - Zoom on hover/tap (Pinch to zoom móvil)
  - 1-2 videos de demostración (opcional, Año 2)

#### 2. **Doble Opción de Compra (Tarjeta Interactiva)**
- **Layout:** Radio buttons con tarjetas
- **Opción A:** "Una sola compra"
  - Precio normal (ej. $40.490)
  - Subtexto: "Paga una sola vez"
- **Opción B:** "AutoCompra" (DESTACADA)
  - Precio con descuento 10% (ej. $36.441)
  - Badge turquesa "AHORRAS $4.049"
  - Subtexto: "Recibe cómodamente cada 30 días. Pausa o cancela cuando quieras, sin compromisos."
- **Comportamiento:** Al seleccionar AutoCompra, se revela selector de frecuencia
- **CTA Primaria:** Botón Terracota "Suscribir Ahora" o "Agregar al Carrito"

#### 3. **Calculadora Nutricional Interactiva**
- **Input 1:** Peso del perro (slider 5-100kg)
- **Input 2:** Nivel actividad (3 opciones: Bajo/Sedentario, Medio/Normal, Alto/Muy activo)
- **Outputs en tiempo real:**
  - "Dosis diaria recomendada: XXXg"
  - "Este saco alimentará a tu perro durante XX días"
  - "Frecuencia ideal AutoCompra: Cada XX días"
  - "Precio mensual estimado: $XXX CLP con AutoCompra"
- **Contexto:** Hacer la suscripción predictible = reduce fricción

#### 4. **Sección Descripción**
- **Párrafo 1:** Beneficio emocional
  - "Nutrición que tu perro merece"
- **Párrafo 2:** Qué lo hace especial
  - "Pollo fresco, sin rellenos..."
- **Puntos de viñeta:** 4-6 beneficios concretos
  - Evitar: "Rico en vitaminas" (vago)
  - Hacer: "Omega-3 para pelaje brillante, DHA para memoria"
- **CTA Secundaria:** "[EXPANDIR] Más sobre este alimento"

#### 5. **Transparencia Científica (SAG)**
- **Título:** "Información Nutricional Completa y Certificada"
- **Elementos:**
  - Tabla de ingredientes por porcentaje
  - Análisis nutricional garantizado (proteína, grasa, fibra, ceniza, humedad, calcio)
  - Advertencia de alérgenos (si aplica)
  - Botones de descarga: Certificado SAG, Informe laboratorio
- **Psicología:** Mostrar, no ocultar = confianza científica
- **Diseño:** Fondo Bridesmaid claro (#FFE6D4 al 50% opacity)

#### 6. **Reseñas de Clientes (Social Proof)**
- **Métrica Visible:** "4.8★ de 1.247 reseñas verificadas"
- **Gráfico de distribución:** Barras por rating (5★, 4★, 3★, etc.)
- **Reseña Destacada:** 1-2 reviews visibles de primera mano con:
  - Nombre + avatar (user-generated)
  - Rating + fecha relativa ("hace 1 semana")
  - Texto corto (máx. 2 líneas)
  - FOTO REAL DE MASCOTA (crítico)
  - Nombre mascota + raza (ej. "Max, Golden Retriever")
- **CTA:** "[VER TODAS LAS RESEÑAS]"
- **Nota:** Solo reviews con foto mascota se muestran

#### 7. **Productos Relacionados (Recomendaciones)**
- **Algoritmo:** "Clientes que compraron esto también compraron"
- **Número:** 4 productos en carousel (desktop), 2 (móvil)
- **Criterio:** 
  - Complementarios (alimento → snack, treats)
  - Categoría similar (otro alimento premium)
  - No es upsell forzado, es "ampliar compra"

---

## 🛒 Componentes UI Reutilizables

### Card de Producto (Usado en catálogo, relacionados, búsqueda)
```
┌────────────────────┐
│  [IMAGEN]          │ ← 400x400px, aspecto 1:1
│                    │
│ Nomade Adulto      │ ← Título (Lora 18px)
│ (20 KG)            │
│                    │
│ 4.8★ (1247)        │ ← Rating + número
│                    │
│ $40.490            │ ← Precio normal (tachado)
│ $36.441 -10%       │ ← Precio AutoCompra (Terracota)
│                    │
│ [Agregar Carrito]  │ ← CTA secundaria
│ [Suscribir]        │ ← CTA primaria (Terracota)
│                    │
│ ✓ Sin granos       │ ← Badges beneficio (opcional)
│ ✓ Pollo Fresco     │
└────────────────────┘
```

### Badge (Tipos)
- **Vet-Approved:** Turquesa bg, vet icon
- **Alimento Clínico:** Turquesa bg, Rx icon
- **AutoCompra:** Terracota bg, "AHORRAS $XXX"
- **New:** Terracota bg, "NUEVO"
- **Bestseller:** Turquesa bg, "MÁS POPULAR"

---

## 📱 Responsive Design Rules

### Mobile (≤600px)
- [ ] Single column stack
- [ ] Imágenes full-width
- [ ] Botones full-width (56px altura mínima)
- [ ] Texto ampliado (16px body mínimo)
- [ ] Touch targets ≥48px

### Tablet (601-1024px)
- [ ] 2 columnas (imagen izq, info der)
- [ ] Cards producto 2x2 grid

### Desktop (>1024px)
- [ ] 3 columnas (imagen, info, related)
- [ ] Cards producto 4x o más

---

## 🎯 Métricas de Éxito de PDP

| Métrica | Benchmark | Target |
|---------|-----------|--------|
| **Add-to-Cart Rate** | 8-12% | >8% |
| **Conversión PDP** | 2-3% | >2.5% |
| **Time on Page** | 60-120s | >90s |
| **Bounce Rate** | 25-35% | <30% |
| **Scroll Depth** | 60-70% | >70% (ver reseñas) |

---

## 🔍 Mejoras de Conversión (Low-Hanging Fruit)

1. **Foto con mascota en reseña:** +35% CVR
2. **Número de reseñas visible:** +18% add-to-cart
3. **Calculadora nutricional:** +25% confianza
4. **Descuento AutoCompra visible lado a lado:** +40% suscripción
5. **Video 20s de producto:** +22% CVR

---

**Última revisión:** 2026-06-10  
**Status:** ✅ Ready para Figma design + frontend implementation
