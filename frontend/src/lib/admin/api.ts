// TODO: Replace ALL functions in this file with real API calls.
// This module provides mock data for the admin panel prototype.
// Each function returns a Promise simulating an API response.

import type {
  AdminProduct,
  AdminOrder,
  AdminBanner,
  AdminContent,
  AdminDeliveryOrder,
  DashboardMetrics,
  OrderStatus,
  DeliveryStatus,
} from './types';
import { CATEGORY_OPTIONS } from './constants';

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

// ──────────────────────────────────────────
// Utilidad para generar IDs únicos locales
// ──────────────────────────────────────────
let idCounter = 100;
function uid() {
  return `mock-${++idCounter}`;
}

// ──────────────────────────────────────────
// DATOS MOCK INICIALES
// ──────────────────────────────────────────

let mockProducts: AdminProduct[] = [
  {
    id: 'p1',
    name: 'Royal Canin Maxi Adulto',
    slug: 'royal-canin-maxi-adulto',
    description: 'Alimento completo para perros adultos de razas grandes (26-44kg).',
    category_id: 'cat-1',
    category_name: 'Comida para Perros',
    pet_type: 'dog',
    image_url: '/images/products/royal-canin-maxi-adulto.png',
    images_json: null,
    weight_kg: 12.0,
    is_published: true,
    is_bestseller: true,
    badge: 'Mas vendido',
    price_one_time: 42990,
    price_autoship: 38691,
    autoship_discount_percentage: 10,
    stock_quantity: 45,
    cost_price: 28000,
    sku: 'RC-MAXI-AD-12',
    supplier_sku: null,
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-10T00:00:00Z',
  },
  {
    id: 'p2',
    name: 'Purina Pro Plan Adulto',
    slug: 'purina-pro-plan-adulto',
    description: 'Alimento premium para perros adultos de todas las razas.',
    category_id: 'cat-1',
    category_name: 'Comida para Perros',
    pet_type: 'dog',
    image_url: '/images/products/purina-pro-plan-adulto.png',
    images_json: null,
    weight_kg: 15.0,
    is_published: true,
    is_bestseller: true,
    badge: 'Premium',
    price_one_time: 35990,
    price_autoship: 32391,
    autoship_discount_percentage: 10,
    stock_quantity: 32,
    cost_price: 23000,
    sku: 'PP-PRO-AD-15',
    supplier_sku: null,
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-10T00:00:00Z',
  },
  {
    id: 'p3',
    name: 'Eukanuba Adulto Raza Mediana',
    slug: 'eukanuba-adulto-raza-mediana',
    description: 'Nutricion completa para perros de raza mediana.',
    category_id: 'cat-1',
    category_name: 'Comida para Perros',
    pet_type: 'dog',
    image_url: '/images/products/eukanuba-adulto-raza-mediana.png',
    images_json: null,
    weight_kg: 10.0,
    is_published: true,
    is_bestseller: false,
    badge: null,
    price_one_time: 38990,
    price_autoship: 35091,
    autoship_discount_percentage: 10,
    stock_quantity: 18,
    cost_price: 25000,
    sku: 'EUK-AD-MED-10',
    supplier_sku: null,
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-10T00:00:00Z',
  },
  {
    id: 'p4',
    name: 'Royal Canin Sterilised Gato',
    slug: 'royal-canin-sterilised-gato',
    description: 'Alimento para gatos esterilizados de todas las razas.',
    category_id: 'cat-2',
    category_name: 'Comida para Gatos',
    pet_type: 'cat',
    image_url: '/images/products/royal-canin-sterilised-gato.png',
    images_json: null,
    weight_kg: 2.0,
    is_published: true,
    is_bestseller: true,
    badge: 'Mas vendido',
    price_one_time: 24990,
    price_autoship: 22491,
    autoship_discount_percentage: 10,
    stock_quantity: 28,
    cost_price: 16000,
    sku: 'RC-STER-CAT-2',
    supplier_sku: null,
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-10T00:00:00Z',
  },
  {
    id: 'p5',
    name: 'Pedigree Adulto Carne',
    slug: 'pedigree-adulto-carne',
    description: 'Alimento balanceado para perros adultos sabor carne.',
    category_id: 'cat-1',
    category_name: 'Comida para Perros',
    pet_type: 'dog',
    image_url: '/images/products/pedigree-adulto-carne.png',
    images_json: null,
    weight_kg: 8.0,
    is_published: true,
    is_bestseller: false,
    badge: null,
    price_one_time: 18990,
    price_autoship: 17091,
    autoship_discount_percentage: 10,
    stock_quantity: 55,
    cost_price: 12000,
    sku: 'PED-AD-CAR-8',
    supplier_sku: null,
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-10T00:00:00Z',
  },
  {
    id: 'p6',
    name: 'Whiskas Adulto Pescado',
    slug: 'whiskas-adulto-pescado',
    description: 'Alimento para gatos adultos sabor pescado.',
    category_id: 'cat-2',
    category_name: 'Comida para Gatos',
    pet_type: 'cat',
    image_url: '/images/products/whiskas-adulto-pescado.png',
    images_json: null,
    weight_kg: 1.5,
    is_published: true,
    is_bestseller: false,
    badge: null,
    price_one_time: 12990,
    price_autoship: 11691,
    autoship_discount_percentage: 10,
    stock_quantity: 40,
    cost_price: 8000,
    sku: 'WHI-AD-PES-1.5',
    supplier_sku: null,
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-10T00:00:00Z',
  },
  {
    id: 'p7',
    name: 'Snack Dental Care Perro',
    slug: 'snack-dental-care-perro',
    description: 'Snacks dentales para la limpieza de dientes de tu perro.',
    category_id: 'cat-3',
    category_name: 'Snacks y Premios',
    pet_type: 'dog',
    image_url: '/images/products/snack-dental-care-perro.png',
    images_json: null,
    weight_kg: 0.3,
    is_published: true,
    is_bestseller: false,
    badge: 'Nuevo',
    price_one_time: 6990,
    price_autoship: 6291,
    autoship_discount_percentage: 10,
    stock_quantity: 100,
    cost_price: 4000,
    sku: 'SNK-DENTAL-03',
    supplier_sku: null,
    created_at: '2025-06-05T00:00:00Z',
    updated_at: '2025-06-10T00:00:00Z',
  },
  {
    id: 'p8',
    name: 'Shampoo Suave Perros',
    slug: 'shampoo-suave-perros',
    description: 'Shampoo hipoalergenico para perros con piel sensible.',
    category_id: 'cat-4',
    category_name: 'Higiene y Cuidado',
    pet_type: 'dog',
    image_url: '/images/products/shampoo-suave-perros.png',
    images_json: null,
    weight_kg: 0.5,
    is_published: true,
    is_bestseller: false,
    badge: null,
    price_one_time: 8990,
    price_autoship: 8091,
    autoship_discount_percentage: 10,
    stock_quantity: 65,
    cost_price: 5000,
    sku: 'SHMP-SUAVE-05',
    supplier_sku: null,
    created_at: '2025-06-01T00:00:00Z',
    updated_at: '2025-06-10T00:00:00Z',
  },
];

let mockOrders: AdminOrder[] = [
  {
    id: 'ord-001',
    user: { id: 'u1', email: 'maria@example.com', first_name: 'María', last_name: 'González' },
    subtotal: 77980,
    shipping_cost: 2990,
    tax: 0,
    total: 80970,
    status: 'pending',
    payment_method: 'webpay',
    tracking_number: null,
    estimated_delivery_date: '2025-06-18',
    shipping_address: {
      full_name: 'María González',
      street: 'Av. Providencia',
      number: '1234',
      apartment: '501',
      commune: 'Providencia',
      city: 'Santiago',
      region: 'Metropolitana',
    },
    items: [
      {
        id: 'oi-1',
        product_name: 'Royal Canin Maxi Adulto',
        product_image: '/images/products/royal-canin-maxi-adulto.png',
        quantity: 1,
        price_at_purchase: 42990,
        is_autoship: false,
      },
      {
        id: 'oi-2',
        product_name: 'Snack Dental Care Perro',
        product_image: '/images/products/snack-dental-care-perro.png',
        quantity: 5,
        price_at_purchase: 6990,
        is_autoship: false,
      },
    ],
    created_at: '2025-06-14T10:30:00Z',
    delivered_at: null,
  },
  {
    id: 'ord-002',
    user: { id: 'u2', email: 'carlos@example.com', first_name: 'Carlos', last_name: 'Muñoz' },
    subtotal: 35990,
    shipping_cost: 0,
    tax: 0,
    total: 35990,
    status: 'confirmed',
    payment_method: 'mercado_pago',
    tracking_number: null,
    estimated_delivery_date: '2025-06-17',
    shipping_address: {
      full_name: 'Carlos Muñoz',
      street: 'Av. Las Condes',
      number: '5678',
      apartment: null,
      commune: 'Las Condes',
      city: 'Santiago',
      region: 'Metropolitana',
    },
    items: [
      {
        id: 'oi-3',
        product_name: 'Purina Pro Plan Adulto',
        product_image: '/images/products/purina-pro-plan-adulto.png',
        quantity: 1,
        price_at_purchase: 35990,
        is_autoship: true,
      },
    ],
    created_at: '2025-06-13T15:45:00Z',
    delivered_at: null,
  },
  {
    id: 'ord-003',
    user: { id: 'u3', email: 'javier@example.com', first_name: 'Javier', last_name: 'Rojas' },
    subtotal: 24990,
    shipping_cost: 4990,
    tax: 0,
    total: 29980,
    status: 'preparing',
    payment_method: 'contra_entrega',
    tracking_number: null,
    estimated_delivery_date: '2025-06-16',
    shipping_address: {
      full_name: 'Javier Rojas',
      street: 'Av. Matta',
      number: '890',
      apartment: '12',
      commune: 'Santiago',
      city: 'Santiago',
      region: 'Metropolitana',
    },
    items: [
      {
        id: 'oi-4',
        product_name: 'Royal Canin Sterilised Gato',
        product_image: '/images/products/royal-canin-sterilised-gato.png',
        quantity: 1,
        price_at_purchase: 24990,
        is_autoship: false,
      },
    ],
    created_at: '2025-06-12T09:15:00Z',
    delivered_at: null,
  },
  {
    id: 'ord-004',
    user: { id: 'u4', email: 'camila@example.com', first_name: 'Camila', last_name: 'Torres' },
    subtotal: 51980,
    shipping_cost: 2990,
    tax: 0,
    total: 54970,
    status: 'in_transit',
    payment_method: 'webpay',
    tracking_number: 'SVP-2025-004',
    estimated_delivery_date: '2025-06-15',
    shipping_address: {
      full_name: 'Camila Torres',
      street: 'Av. Grecia',
      number: '3456',
      apartment: 'A-202',
      commune: 'Ñuñoa',
      city: 'Santiago',
      region: 'Metropolitana',
    },
    items: [
      {
        id: 'oi-5',
        product_name: 'Eukanuba Adulto Raza Mediana',
        product_image: '/images/products/eukanuba-adulto-raza-mediana.png',
        quantity: 1,
        price_at_purchase: 38990,
        is_autoship: false,
      },
      {
        id: 'oi-6',
        product_name: 'Shampoo Suave Perros',
        product_image: '/images/products/shampoo-suave-perros.png',
        quantity: 1,
        price_at_purchase: 8990,
        is_autoship: false,
      },
    ],
    created_at: '2025-06-11T14:00:00Z',
    delivered_at: null,
  },
  {
    id: 'ord-005',
    user: { id: 'u5', email: 'andres@example.com', first_name: 'Andrés', last_name: 'Soto' },
    subtotal: 18990,
    shipping_cost: 2990,
    tax: 0,
    total: 21980,
    status: 'delivered',
    payment_method: 'webpay',
    tracking_number: 'SVP-2025-003',
    estimated_delivery_date: '2025-06-13',
    shipping_address: {
      full_name: 'Andrés Soto',
      street: 'Av. Pajaritos',
      number: '2345',
      apartment: null,
      commune: 'Maipú',
      city: 'Santiago',
      region: 'Metropolitana',
    },
    items: [
      {
        id: 'oi-7',
        product_name: 'Pedigree Adulto Carne',
        product_image: '/images/products/pedigree-adulto-carne.png',
        quantity: 1,
        price_at_purchase: 18990,
        is_autoship: false,
      },
    ],
    created_at: '2025-06-10T11:00:00Z',
    delivered_at: '2025-06-13T16:30:00Z',
  },
  {
    id: 'ord-006',
    user: { id: 'u6', email: 'valentina@example.com', first_name: 'Valentina', last_name: 'López' },
    subtotal: 12990,
    shipping_cost: 0,
    tax: 0,
    total: 12990,
    status: 'cancelled',
    payment_method: 'mercado_pago',
    tracking_number: null,
    estimated_delivery_date: null,
    shipping_address: {
      full_name: 'Valentina López',
      street: 'Av. Vicuña Mackenna',
      number: '4567',
      apartment: '3',
      commune: 'La Florida',
      city: 'Santiago',
      region: 'Metropolitana',
    },
    items: [
      {
        id: 'oi-8',
        product_name: 'Whiskas Adulto Pescado',
        product_image: '/images/products/whiskas-adulto-pescado.png',
        quantity: 1,
        price_at_purchase: 12990,
        is_autoship: false,
      },
    ],
    created_at: '2025-06-09T08:20:00Z',
    delivered_at: null,
  },
];

let mockBanners: AdminBanner[] = [
  {
    id: 'b1',
    title: 'Nutrición que transforma',
    subtitle: 'Descubre nuestra línea premium para perros y gatos',
    cta_text: 'Ver productos',
    cta_link: '/products',
    image_url: '/images/banners/banner-perro-1.jpg',
    is_active: true,
    sort_order: 1,
    created_at: '2025-06-01T00:00:00Z',
  },
  {
    id: 'b2',
    title: 'Suscríbete y ahorra',
    subtitle: '10% de descuento en tu primera auto-compra',
    cta_text: 'Saber más',
    cta_link: '/products',
    image_url: '/images/banners/banner-gato-1.jpg',
    is_active: true,
    sort_order: 2,
    created_at: '2025-06-01T00:00:00Z',
  },
];

let mockContents: AdminContent[] = [
  {
    id: 'c1',
    key: 'topbar_message',
    label: 'Mensaje barra superior',
    value: 'Envíos gratis a todo Santiago por compras sobre $30.000',
    section: 'TopBar',
    updated_at: '2025-06-01T00:00:00Z',
  },
  {
    id: 'c2',
    key: 'trust_pillar_1_title',
    label: 'Pilar de confianza #1 - Título',
    value: 'Envío rápido',
    section: 'TrustPillars',
    updated_at: '2025-06-01T00:00:00Z',
  },
  {
    id: 'c3',
    key: 'trust_pillar_1_desc',
    label: 'Pilar de confianza #1 - Descripción',
    value: 'Recibes tu pedido en 24-48 hrs hábiles en Santiago.',
    section: 'TrustPillars',
    updated_at: '2025-06-01T00:00:00Z',
  },
  {
    id: 'c4',
    key: 'trust_pillar_2_title',
    label: 'Pilar de confianza #2 - Título',
    value: 'Stock garantizado',
    section: 'TrustPillars',
    updated_at: '2025-06-01T00:00:00Z',
  },
  {
    id: 'c5',
    key: 'trust_pillar_2_desc',
    label: 'Pilar de confianza #2 - Descripción',
    value: 'Siempre tenemos disponible tu marca favorita.',
    section: 'TrustPillars',
    updated_at: '2025-06-01T00:00:00Z',
  },
  {
    id: 'c6',
    key: 'trust_pillar_3_title',
    label: 'Pilar de confianza #3 - Título',
    value: 'Suscripción flexible',
    section: 'TrustPillars',
    updated_at: '2025-06-01T00:00:00Z',
  },
  {
    id: 'c7',
    key: 'trust_pillar_3_desc',
    label: 'Pilar de confianza #3 - Descripción',
    value: 'Agenda la comida de tu mascota y olvídate de ir a comprar.',
    section: 'TrustPillars',
    updated_at: '2025-06-01T00:00:00Z',
  },
  {
    id: 'c8',
    key: 'footer_about',
    label: 'Footer - Texto sobre Savia',
    value: 'Savia es una marca chilena de nutrición honesta para mascotas.',
    section: 'Footer',
    updated_at: '2025-06-01T00:00:00Z',
  },
];

let mockDeliveryOrders: AdminDeliveryOrder[] = [
  {
    id: 'd-001',
    order_id: 'ord-004',
    order_total: 54970,
    customer_name: 'Camila Torres',
    delivery_address: 'Av. Grecia 3456, A-202',
    commune: 'Ñuñoa',
    status: 'assigned',
    delivery_person: 'Pedro Ramírez',
    notes: 'Dejar con conserje',
    scheduled_date: '2025-06-15',
    delivered_at: null,
    created_at: '2025-06-14T09:00:00Z',
  },
  {
    id: 'd-002',
    order_id: 'ord-003',
    order_total: 29980,
    customer_name: 'Javier Rojas',
    delivery_address: 'Av. Matta 890, Depto 12',
    commune: 'Santiago',
    status: 'pending_assignment',
    delivery_person: null,
    notes: null,
    scheduled_date: '2025-06-16',
    delivered_at: null,
    created_at: '2025-06-14T09:30:00Z',
  },
  {
    id: 'd-003',
    order_id: 'ord-005',
    order_total: 21980,
    customer_name: 'Andrés Soto',
    delivery_address: 'Av. Pajaritos 2345',
    commune: 'Maipú',
    status: 'delivered',
    delivery_person: 'Pedro Ramírez',
    notes: null,
    scheduled_date: '2025-06-13',
    delivered_at: '2025-06-13T17:00:00Z',
    created_at: '2025-06-12T10:00:00Z',
  },
];

// ──────────────────────────────────────────
// DASHBOARD
// ──────────────────────────────────────────

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  await delay();
  return {
    total_orders_today: 12,
    total_revenue_today: 523800,
    total_orders_week: 78,
    total_revenue_week: 3215400,
    total_orders_month: 245,
    total_revenue_month: 10234000,
    orders_by_status: {
      pending: 15,
      confirmed: 22,
      preparing: 18,
      in_transit: 12,
      delivered: 168,
      cancelled: 10,
    },
    top_products: [
      { id: 'p1', name: 'Royal Canin Maxi Adulto', total_sold: 142, revenue: 6104580 },
      { id: 'p2', name: 'Purina Pro Plan Adulto', total_sold: 98, revenue: 3527020 },
      { id: 'p4', name: 'Royal Canin Sterilised Gato', total_sold: 87, revenue: 2174130 },
      { id: 'p5', name: 'Pedigree Adulto Carne', total_sold: 65, revenue: 1234350 },
      { id: 'p3', name: 'Eukanuba Adulto Raza Mediana', total_sold: 54, revenue: 2105460 },
    ],
    revenue_last_7_days: [
      { date: '2025-06-08', revenue: 654000, orders: 14 },
      { date: '2025-06-09', revenue: 432000, orders: 9 },
      { date: '2025-06-10', revenue: 789000, orders: 17 },
      { date: '2025-06-11', revenue: 543000, orders: 11 },
      { date: '2025-06-12', revenue: 876000, orders: 18 },
      { date: '2025-06-13', revenue: 321000, orders: 7 },
      { date: '2025-06-14', revenue: 523800, orders: 12 },
    ],
  };
}

// ──────────────────────────────────────────
// PRODUCTOS
// ──────────────────────────────────────────

export async function getProducts(): Promise<AdminProduct[]> {
  await delay();
  return [...mockProducts];
}

export async function getProduct(id: string): Promise<AdminProduct | null> {
  await delay();
  return mockProducts.find((p) => p.id === id) ?? null;
}

export async function createProduct(data: Partial<AdminProduct>): Promise<AdminProduct> {
  await delay(500);
  const product: AdminProduct = {
    id: uid(),
    name: data.name ?? 'Nuevo producto',
    slug: data.slug ?? `nuevo-producto-${uid()}`,
    description: data.description ?? null,
    category_id: data.category_id ?? 'cat-1',
    category_name: CATEGORY_OPTIONS.find((c) => c.id === data.category_id)?.name ?? '',
    pet_type: data.pet_type ?? 'dog',
    image_url: data.image_url ?? null,
    images_json: data.images_json ?? null,
    weight_kg: data.weight_kg ?? null,
    is_published: data.is_published ?? false,
    is_bestseller: data.is_bestseller ?? false,
    badge: data.badge ?? null,
    price_one_time: data.price_one_time ?? 0,
    price_autoship: data.price_autoship ?? 0,
    autoship_discount_percentage: data.autoship_discount_percentage ?? 10,
    stock_quantity: data.stock_quantity ?? 0,
    cost_price: data.cost_price ?? null,
    sku: data.sku ?? `SKU-${uid()}`,
    supplier_sku: data.supplier_sku ?? null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  mockProducts.push(product);
  return product;
}

export async function updateProduct(
  id: string,
  data: Partial<AdminProduct>
): Promise<AdminProduct | null> {
  await delay(500);
  const idx = mockProducts.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  mockProducts[idx] = { ...mockProducts[idx], ...data, updated_at: new Date().toISOString() };
  return mockProducts[idx];
}

export async function deleteProduct(id: string): Promise<boolean> {
  await delay(300);
  const idx = mockProducts.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  mockProducts.splice(idx, 1);
  return true;
}

// ──────────────────────────────────────────
// PEDIDOS
// ──────────────────────────────────────────

export async function getOrders(filters?: {
  status?: OrderStatus;
  page?: number;
  limit?: number;
}): Promise<{ orders: AdminOrder[]; total: number }> {
  await delay();
  let filtered = [...mockOrders];
  if (filters?.status) {
    filtered = filtered.filter((o) => o.status === filters.status);
  }
  const page = filters?.page ?? 1;
  const limit = filters?.limit ?? 50;
  const start = (page - 1) * limit;
  return {
    orders: filtered.slice(start, start + limit),
    total: filtered.length,
  };
}

export async function getOrder(id: string): Promise<AdminOrder | null> {
  await delay();
  return mockOrders.find((o) => o.id === id) ?? null;
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus
): Promise<AdminOrder | null> {
  await delay(400);
  const order = mockOrders.find((o) => o.id === id);
  if (!order) return null;
  order.status = status;
  if (status === 'delivered') order.delivered_at = new Date().toISOString();
  return order;
}

// ──────────────────────────────────────────
// BANNERS
// ──────────────────────────────────────────

export async function getBanners(): Promise<AdminBanner[]> {
  await delay();
  return [...mockBanners];
}

export async function updateBanner(
  id: string,
  data: Partial<AdminBanner>
): Promise<AdminBanner | null> {
  await delay(400);
  const idx = mockBanners.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  mockBanners[idx] = { ...mockBanners[idx], ...data };
  return mockBanners[idx];
}

export async function createBanner(data: Partial<AdminBanner>): Promise<AdminBanner> {
  await delay(500);
  const banner: AdminBanner = {
    id: uid(),
    title: data.title ?? 'Nuevo banner',
    subtitle: data.subtitle ?? null,
    cta_text: data.cta_text ?? 'Ver más',
    cta_link: data.cta_link ?? '/products',
    image_url: data.image_url ?? '/images/banners/banner-perro-1.jpg',
    is_active: data.is_active ?? true,
    sort_order: data.sort_order ?? mockBanners.length + 1,
    created_at: new Date().toISOString(),
  };
  mockBanners.push(banner);
  return banner;
}

export async function deleteBanner(id: string): Promise<boolean> {
  await delay(300);
  const idx = mockBanners.findIndex((b) => b.id === id);
  if (idx === -1) return false;
  mockBanners.splice(idx, 1);
  return true;
}

// ──────────────────────────────────────────
// CONTENIDO
// ──────────────────────────────────────────

export async function getContents(): Promise<AdminContent[]> {
  await delay();
  return [...mockContents];
}

export async function updateContent(
  id: string,
  value: string
): Promise<AdminContent | null> {
  await delay(300);
  const idx = mockContents.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  mockContents[idx] = { ...mockContents[idx], value, updated_at: new Date().toISOString() };
  return mockContents[idx];
}

// ──────────────────────────────────────────
// DESPACHOS
// ──────────────────────────────────────────

export async function getDeliveryOrders(filters?: {
  status?: DeliveryStatus;
}): Promise<AdminDeliveryOrder[]> {
  await delay();
  let result = [...mockDeliveryOrders];
  if (filters?.status) {
    result = result.filter((d) => d.status === filters.status);
  }
  return result;
}

export async function getDeliveryOrder(id: string): Promise<AdminDeliveryOrder | null> {
  await delay();
  return mockDeliveryOrders.find((d) => d.id === id) ?? null;
}

export async function createDeliveryOrder(
  data: Partial<AdminDeliveryOrder>
): Promise<AdminDeliveryOrder> {
  await delay(500);
  const order: AdminDeliveryOrder = {
    id: uid(),
    order_id: data.order_id ?? '',
    order_total: data.order_total ?? 0,
    customer_name: data.customer_name ?? '',
    delivery_address: data.delivery_address ?? '',
    commune: data.commune ?? '',
    status: 'pending_assignment',
    delivery_person: null,
    notes: data.notes ?? null,
    scheduled_date: data.scheduled_date ?? null,
    delivered_at: null,
    created_at: new Date().toISOString(),
  };
  mockDeliveryOrders.push(order);
  return order;
}

export async function updateDeliveryOrder(
  id: string,
  data: Partial<AdminDeliveryOrder>
): Promise<AdminDeliveryOrder | null> {
  await delay(400);
  const idx = mockDeliveryOrders.findIndex((d) => d.id === id);
  if (idx === -1) return null;
  if (data.status === 'delivered') {
    data.delivered_at = new Date().toISOString();
  }
  mockDeliveryOrders[idx] = { ...mockDeliveryOrders[idx], ...data };
  return mockDeliveryOrders[idx];
}

export async function deleteDeliveryOrder(id: string): Promise<boolean> {
  await delay(300);
  const idx = mockDeliveryOrders.findIndex((d) => d.id === id);
  if (idx === -1) return false;
  mockDeliveryOrders.splice(idx, 1);
  return true;
}


