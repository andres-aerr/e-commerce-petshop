const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category_id: string;
  sku: string;
  pet_type: string;
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
  avg_rating: number;
  review_count: number;
  category: { name: string; slug: string };
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_URL}/api${endpoint}`);
  if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
  return res.json();
}

async function fetchAPIAuth<T>(endpoint: string, token: string | null): Promise<T> {
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_URL}/api${endpoint}`, { headers });
  if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
  return res.json();
}

async function postAPI<T>(endpoint: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}/api${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(err.message || `API error: ${res.status}`);
  }
  return res.json();
}

async function patchAPI<T>(endpoint: string, body: unknown, token: string | null): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_URL}/api${endpoint}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(err.message || `API error: ${res.status}`);
  }
  return res.json();
}

export function register(data: { email: string; password: string; first_name?: string; last_name?: string; phone?: string }): Promise<{ access_token: string; user: { id: string; email: string } }> {
  return postAPI('/auth/register', data);
}

export function login(data: { email: string; password: string }): Promise<{ access_token: string; user: { id: string; email: string } }> {
  return postAPI('/auth/login', data);
}

export function getProfile(token: string | null): Promise<any> {
  return fetchAPIAuth('/users/me', token);
}

export function updateProfile(token: string | null, data: { first_name?: string; last_name?: string; phone?: string }): Promise<any> {
  return patchAPI('/users/me', data, token);
}

export function getBestSellers(): Promise<ProductsResponse['products']> {
  return fetchAPI('/products/bestsellers');
}

export function getProducts(params?: {
  category?: string;
  pet_type?: string;
  sort?: string;
  page?: number;
  limit?: number;
}): Promise<ProductsResponse> {
  const search = new URLSearchParams();
  if (params?.category) search.set('category', params.category);
  if (params?.pet_type) search.set('pet_type', params.pet_type);
  if (params?.sort) search.set('sort', params.sort);
  if (params?.page) search.set('page', String(params.page));
  if (params?.limit) search.set('limit', String(params.limit));
  const qs = search.toString();
  return fetchAPI(`/products${qs ? `?${qs}` : ''}`);
}

export function getProduct(slug: string): Promise<Product> {
  return fetchAPI(`/products/${slug}`);
}

export function getProductReviews(slug: string): Promise<any[]> {
  return fetchAPI(`/products/${slug}/reviews`);
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  pet_type: string | null;
  parent_id: string | null;
  children?: Category[];
}

export function getCategories(): Promise<Category[]> {
  return fetchAPI('/categories');
}
