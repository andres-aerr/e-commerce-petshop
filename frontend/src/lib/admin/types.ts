export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category_id: string;
  category_name: string;
  pet_type: 'dog' | 'cat' | 'both';
  image_url: string | null;
  images_json: string | null;
  weight_kg: number | null;
  is_published: boolean;
  is_bestseller: boolean;
  badge: string | null;
  price_one_time: number;
  price_autoship: number;
  autoship_discount_percentage: number;
  stock_quantity: number;
  cost_price: number | null;
  sku: string;
  supplier_sku: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminOrder {
  id: string;
  user: { id: string; email: string; first_name: string | null; last_name: string | null };
  subtotal: number;
  shipping_cost: number;
  tax: number;
  total: number;
  status: OrderStatus;
  payment_method: string | null;
  tracking_number: string | null;
  estimated_delivery_date: string | null;
  shipping_address: AdminAddress;
  items: AdminOrderItem[];
  created_at: string;
  delivered_at: string | null;
}

export interface AdminOrderItem {
  id: string;
  product_name: string;
  product_image: string | null;
  quantity: number;
  price_at_purchase: number;
  is_autoship: boolean;
}

export interface AdminAddress {
  full_name: string;
  street: string;
  number: string | null;
  apartment: string | null;
  commune: string;
  city: string;
  region: string;
}

export interface AdminBanner {
  id: string;
  title: string;
  subtitle: string | null;
  cta_text: string;
  cta_link: string;
  image_url: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface AdminContent {
  id: string;
  key: string;
  label: string;
  value: string;
  section: string;
  updated_at: string;
}

export interface AdminDeliveryOrder {
  id: string;
  order_id: string;
  order_total: number;
  customer_name: string;
  delivery_address: string;
  commune: string;
  status: DeliveryStatus;
  delivery_person: string | null;
  notes: string | null;
  scheduled_date: string | null;
  delivered_at: string | null;
  created_at: string;
}

export interface DashboardMetrics {
  total_orders_today: number;
  total_revenue_today: number;
  total_orders_week: number;
  total_revenue_week: number;
  total_orders_month: number;
  total_revenue_month: number;
  orders_by_status: Record<OrderStatus, number>;
  top_products: { id: string; name: string; total_sold: number; revenue: number }[];
  revenue_last_7_days: { date: string; revenue: number; orders: number }[];
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'in_transit'
  | 'delivered'
  | 'cancelled';

export type DeliveryStatus =
  | 'pending_assignment'
  | 'assigned'
  | 'in_transit'
  | 'delivered'
  | 'cancelled';
