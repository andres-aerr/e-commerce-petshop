# 💳 Suscripciones, Checkout Sin Fricción y Retención Automatizada

**Tags:** #checkout #suscripciones #autoship #retención #pago  
**Project:** Pet Shop Mockup  
**Type:** Payment + Retention Architecture  
**Última actualización:** 2026-06-10  

---

## 🎯 El Insight Crítico: Autoship = 83% de Ventas

**Chewy Q2 FY2025 Fact:** Autoship representa el 83% de net sales, con +15% YoY growth.

**Para este proyecto:** El target mínimo es **25-30% en Año 1**, escalar a **50%+ en Año 3**.

Sin Autoship/suscripción, la economía del negocio no funciona. CAC es demasiado alto, LTV demasiado bajo.

---

## 💳 Flujo de Checkout Optimizado para Fricción Cero

### Principios de Diseño del Checkout

1. **Máximo 7-8 campos** (cada campo adicional baja conversión 4-6%)
2. **Guest checkout obligatorio** (25% abandona por crear cuenta)
3. **Transparencia de costos desde el inicio** (47% abandona por sorpresas)
4. **Barra de progreso visual** (reduce abandono 5-10%)
5. **Pago expresado disponible** (digital wallets = 49-56% del valor 2025)
6. **Mobile-first de columna única** (>60% tráfico es móvil)

### Estructura Checkout (3 Pasos)

```
┌────────────────────────────────────────────────────┐
│ [LOGO]              [Paso 1/3: Envío]              │
│                     ▓▓▓▓░░░░░░ 33%                  │
├────────────────────────────────────────────────────┤
│                                                    │
│ DIRECCIÓN DE ENVÍO                                │
│                                                    │
│ Nombre Completo: [__________________]             │
│ Dirección:       [__________________] ← Google Maps│
│ Número/Apto:     [__________________]             │
│ Comuna:          [▼ Seleccionar]                  │
│ Código Postal:   [__________________]             │
│                                                    │
│ [☑] Usar misma dirección para facturación        │
│                                                    │
│ COSTO DE ENVÍO                                    │
│ Envío Estándar (3-5 días): $2.990 CLP            │
│ Envío Express (24h): $4.990 CLP                  │
│                                                    │
│ Selecciona uno: ⊙ Estándar  ⊙ Express            │
│                                                    │
│ [CONTINUAR A PAGO] (Terracota button)             │
│                                                    │
├────────────────────────────────────────────────────┤
│ RESUMEN CARRITO (Sidebar Desktop, Collapse Móvil)│
│                                                    │
│ Nomade Adulto 20kg x1      $40.490                │
│ Descuento (-10% Suscripción) -$4.049             │
│ ─────────────────────────────────────────         │
│ Subtotal:                  $36.441                │
│ Envío (Estándar):          $2.990                │
│ ─────────────────────────────────────────         │
│ TOTAL:                     $39.431 CLP            │
│                                                    │
└────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────┐
│ [LOGO]              [Paso 2/3: Pago]               │
│                     ▓▓▓▓▓▓░░░░░ 67%                │
├────────────────────────────────────────────────────┤
│                                                    │
│ MÉTODO DE PAGO                                    │
│                                                    │
│ ⊙ Tarjeta Débito/Crédito (Webpay Plus)           │
│   [VISA] [MASTERCARD] [AMEX]                     │
│   Número: [____] [____] [____] [____]             │
│   Vencimiento: [__/__]  CVV: [___]                │
│                                                    │
│ ⊙ Mercado Pago (Billetera Digital)                │
│   [Continuar con Mercado Pago]                   │
│                                                    │
│ ⊙ Contra Entrega (Pago al Recibir)                │
│   (Solo RM, Sin Descuento AutoCompra)             │
│                                                    │
│ CUOTAS SIN INTERÉS                                │
│ Si el total >$100.000:                            │
│ ⊙ 1 cuota: $39.431  ⊙ 3 cuotas: $13.144          │
│ ⊙ 6 cuotas: $6.572  (Solo Webpay/Mercado)        │
│                                                    │
│ [CONTINUAR A CONFIRMACIÓN]                        │
│                                                    │
└────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────┐
│ [LOGO]              [Paso 3/3: Confirmación]       │
│                     ▓▓▓▓▓▓▓▓▓▓ 100%                │
├────────────────────────────────────────────────────┤
│                                                    │
│ RESUMEN FINAL                                    │
│                                                    │
│ Dirección:     Av. Libertad 1020, Ñuñoa          │
│ Envío:         Estándar (3-5 días) - $2.990      │
│ Pago:          Tarjeta Crédito Visa ****3456    │
│ Frecuencia:    Cada 30 días                      │
│ Próximo Envío: 2026-07-10                        │
│                                                    │
│ ═══════════════════════════════════════════════  │
│ TOTAL A PAGAR HOY:        $39.431 CLP            │
│ Próximas entregas:        $36.441 CLP            │
│ ═══════════════════════════════════════════════  │
│                                                    │
│ [☑] Acepto términos y condiciones de suscripción│
│                                                    │
│ [CONFIRMAR COMPRA] ← Botón prominente Terracota   │
│                                                    │
│ ¿Dudas? [Chat de Soporte] [Llamar al 800-PETTY]  │
│                                                    │
└────────────────────────────────────────────────────┘
```

### Decisiones Críticas de Checkout

#### 1. **Autocompletado de Direcciones**
- **API:** Google Maps Places (Autocomplete)
- **Beneficio:** Reduce errores, acelera entrada, mejor UX
- **Implementación:** Biblioteca @react-google-maps/api
- **Costo:** Gratis hasta 25.000 req/mes (suficiente Año 1)

#### 2. **Transparencia de Costos**
- ❌ NO: Mostrar total final en Paso 3
- ✅ SÍ: Mostrar desglose completo desde Paso 1
  - Subtotal
  - Descuento aplicado
  - Costo envío
  - Impuestos/IVA (si aplica)
  - TOTAL

#### 3. **Guest Checkout Obligatorio**
- ❌ NO: "Crear cuenta para continuar"
- ✅ SÍ: "Continuar como invitado" + opción "Crear cuenta después"
- **Condicional:** Si selecciona suscripción, crear cuenta automáticamente con email + contraseña random

#### 4. **Métodos de Pago Soportados (Prioridad)**
1. **Webpay Plus** (dominante en Chile, +70% de tarjetas)
   - Débito, crédito, prepago
   - Integración: API Webpay, formulario tokenizado
   - Comisión: ~2.5-3% (negociable con volumen)

2. **Mercado Pago** (flexible, pago diferido, billetera)
   - Tarjeta, débito, wallet
   - Cuotas sin interés (Mercado crédito)
   - Contra entrega (crucial para confianza)
   - Integración: SDK Mercado Pago, webhook
   - Comisión: ~4-5%

3. **Contra Entrega** (fricción, pero Trust)
   - Solo RM (Por ahora)
   - SIN descuento AutoCompra (menos atractivo)
   - Efectivo físico al recibir
   - Costo adicional empresa: +$500-1000 CLP por pedido
   - Decidir si absorber o trasladar al cliente

#### 5. **Cuotas Sin Interés (Trigger >$100k)**
- Webpay: Integrado (Webpay Oneclick + cuotas)
- Mercado Pago: Nativo (Mercado Crédito)
- **Mensajería:** "3 cuotas sin interés" en PDP si total >$100k

---

## 🔄 Panel de Autogestión de Suscripción

El **miedo al cobro automático involuntario** es la barrera principal de suscripciones. Resolver con autogestión total.

### Ubicación: Dashboard Cuenta > Mis Suscripciones

```
┌─────────────────────────────────────────────────┐
│ MIS SUSCRIPCIONES                              │
├─────────────────────────────────────────────────┤
│                                                 │
│ ┌─────────────────────────────────────────┐   │
│ │ 🟢 ACTIVO - Nomade Adulto 20KG          │   │
│ │                                          │   │
│ │ Frecuencia:         Cada 30 días        │   │
│ │ Próximo envío:      2026-07-10          │   │
│ │ Precio:             $36.441 CLP         │   │
│ │ Ahorro:             $4.049 CLP (-10%)   │   │
│ │ Inicio suscripción: 2026-06-10          │   │
│ │                                          │   │
│ │ [Modificar]  [Pausar]  [Cancelar]       │   │
│ └─────────────────────────────────────────┘   │
│                                                 │
│ ┌─────────────────────────────────────────┐   │
│ │ 🔴 PAUSADA - Arena Gato Natural         │   │
│ │                                          │   │
│ │ Pausada desde: 2026-06-05               │   │
│ │ Razón: Vacaciones                       │   │
│ │                                          │   │
│ │ [Reanudar]  [Cancelar]  [Editar]        │   │
│ └─────────────────────────────────────────┘   │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Funcionalidades de Autogestión (CRÍTICO)

#### 1. **Modificar Fecha [Un-Clic]**
- Calendario pop-up
- Opciones rápidas: "Adelantar 7 días", "Postergar 14 días"
- Confirmación inmediata
- Notificación email/WhatsApp confirmación

#### 2. **Modificar Catálogo [Sin Cancelar]**
- Cambiar producto principal: "¿Quieres otro alimento?" (con buscador)
- Agregar productos: "Agregar snack, juguete, etc." (sin re-suscribirse)
- Eliminar productos
- Actualizar cantidad
- Precio recalculado automáticamente
- **Mensajería clave:** "Cambia tu suscripción cuando quieras sin cancelar"

#### 3. **Pausa [Un-Clic]**
- "Pausar temporalmente"
- Seleccionar duración: "Hasta [fecha]" o "Próximos [X] envíos"
- Opcional: Razón (Vacaciones, Cambié de marca, Otra)
- Automáticamente se reanuda sin email
- **Psicología:** Pausa parece temporal; cancela parece permanente

#### 4. **Cancelación [Con Retención]**
- Botón "Cancelar Suscripción"
- Modal de retención:
  - "¿Te gustaría pausar en lugar de cancelar?" (sí/no)
  - "¿Cuál es el problema?" (dropdown de razones)
  - "Oferta especial para ti: 15% adicional si continúas"
  - Si rechaza: confirmación final, enviar email con "Vuelve cuando quieras"
- **No:** Hacer cancelación difícil. Debe ser fácil pero memorable.

---

## 💬 Notificaciones Automatizadas vía WhatsApp

El email tiene ~15-20% open rate; WhatsApp tiene ~80-90% read rate. Reemplazar email por WhatsApp para notificaciones críticas.

### Herramientas Recomendadas
- **Interakt** (YC-backed, WhatsApp API, templating, Webhooks)
- **AiSensy** (Startup LATAM, alternativa local, WhatsApp)
- **MessageBird** (Global, enterprise)

### Flujo de Mensajes (Automatizados)

#### Mensaje 1: Confirmación de Suscripción (T+0)
```
Hola {nombre}! 🎉

Tu suscripción a {alimento} para {mascota_nombre} 
ya está activa.

📦 Próximo envío: {fecha_proximo}
💰 Precio: $36.441 CLP
💚 Ahorras: $4.049 con AutoCompra

Necesitas cambiar algo?
👉 Entra aquí: [link_panel]
```

#### Mensaje 2: Recordatorio Previo al Cobro (T-3 días)
```
Hola {nombre}! 👋

En 3 días procesaremos tu pago de AutoCompra.

📦 {alimento} para {mascota_nombre}
💰 Total: $36.441 CLP

Si quieres:
✏️ Cambiar fecha: [botón interactivo]
⏸️ Pausar: [botón interactivo]
❓ Dudas: [link chat soporte]

Sin hacer nada, procesaremos el pago el {fecha}.
```

#### Mensaje 3: Confirmación de Pago (T-1 día)
```
¡Tu pedido está en camino! 📦

{alimento} para {mascota_nombre}
Estimado de entrega: {fecha_entrega}
Número de seguimiento: {tracking}

👉 Rastrear aquí: [link tracking]
```

#### Mensaje 4: Nota de Reactivación (Suscripción Pausada)
```
Hola {nombre}! 👋

Tu suscripción de {alimento} se reanudará en 
{fecha_reanudacion}.

¿Quieres cambiar de opinión?
⏸️ Pausar más tiempo: [botón]
❌ Cancelar: [botón]
```

#### Mensaje 5: Recuperación Churn (90 días sin compra)
```
{nombre}, ¡Te echamos de menos! 💛

Hace 3 meses cancelaste tu suscripción de {alimento}.

¿Pasó algo? Tu {mascota_nombre} merece lo mejor.

✨ Oferta especial: 15% descuento si reactivas hoy
👉 Reactivar: [botón]

¿Preguntas? [link chat]
```

### Configuración Técnica

- **Trigger:** API webhooks en eventos
  - Subscription created → Mensaje 1
  - Próximo cobro en 3 días → Mensaje 2
  - Pago procesado → Mensaje 3
  - Pausa se vence → Mensaje 4
  - Cancelación 90 días atrás → Mensaje 5
- **Opt-In:** Solicitar consentimiento al checkout
- **Rate Limiting:** Máximo 1 mensaje por día por usuario
- **Template Approval:** Mensajes pre-aprobados en WhatsApp Business API

---

## 📊 KPIs de Suscripción y Retención

| KPI | Benchmark | Target Año 1 | Target Año 3 |
|-----|-----------|-------------|------------|
| **% Ventas via Autoship** | 83% (Chewy) | 25-30% | 50%+ |
| **Churn Mensual** | 3% (Chewy) | <5% | <3% |
| **LTV Suscriptor** | $2000-3000 USD | $200k+ CLP | $500k+ CLP |
| **Retention 12m** | 85-90% | 75-80% | 85%+ |
| **Repeat Purchase Rate** | 70%+ | 60%+ | 75%+ |
| **NSPAC** | $591 USD | $250-350 CLP | $400+ CLP |

---

## 🎯 Recomendaciones de Producto

### MVP Checkout (Semanas 1-4)
- [ ] 2 métodos pago: Webpay + Mercado Pago
- [ ] 3-paso checkout
- [ ] Guest checkout obligatorio
- [ ] Suscripción básica (modificar fecha, pausar, cancelar)
- [ ] Email de confirmación automático

### Post-MVP (Mes 2-3)
- [ ] Panel de autogestión (Modificar catalogo, cambios)
- [ ] Notificaciones WhatsApp (Interakt integración)
- [ ] Cuotas sin interés (Webpay + Mercado)
- [ ] Recuperación carrito abandonado (email)

### Año 2+
- [ ] Contra entrega regional
- [ ] Apple Pay / Google Pay
- [ ] Subscripción con descuento escalonado (cuantos más meses, mayor descuento)
- [ ] Refer-a-friend (si suscripción, gana crédito)

---

**Última revisión:** 2026-06-10  
**Status:** ✅ Ready para backend + frontend implementation
