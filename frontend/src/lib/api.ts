import {
  getMockProducts,
  getMockBestSellers,
  getMockProduct,
  getMockProductReviews,
  getMockCategories,
} from './mock-data';

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

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  pet_type: string | null;
  parent_id: string | null;
  children?: Category[];
}

const mockUser = {
  id: 'mock-user-1',
  email: 'demo@savia.cl',
  first_name: 'Usuario',
  last_name: 'Demo',
  phone: '+56912345678',
};

const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));

export async function register(data: { email: string; password: string; first_name?: string; last_name?: string; phone?: string }): Promise<{ access_token: string; user: { id: string; email: string } }> {
  await delay();
  return {
    access_token: 'mock-token-' + Date.now(),
    user: { id: mockUser.id, email: data.email },
  };
}

export async function login(data: { email: string; password: string }): Promise<{ access_token: string; user: { id: string; email: string } }> {
  await delay();
  if (!data.email || !data.password) throw new Error('Credenciales invalidas');
  return {
    access_token: 'mock-token-' + Date.now(),
    user: { id: mockUser.id, email: data.email },
  };
}

export async function getProfile(token: string | null): Promise<any> {
  await delay();
  if (!token) throw new Error('No autorizado');
  return mockUser;
}

export async function updateProfile(token: string | null, data: { first_name?: string; last_name?: string; phone?: string }): Promise<any> {
  await delay();
  if (!token) throw new Error('No autorizado');
  return { ...mockUser, ...data };
}

export async function getBestSellers(): Promise<ProductsResponse['products']> {
  await delay();
  return getMockBestSellers();
}

export async function getProducts(params?: {
  category?: string;
  pet_type?: string;
  sort?: string;
  page?: number;
  limit?: number;
}): Promise<ProductsResponse> {
  await delay();
  return getMockProducts(params);
}

export async function getProduct(slug: string): Promise<Product> {
  await delay();
  const product = getMockProduct(slug);
  if (!product) throw new Error('Producto no encontrado');
  return product;
}

export async function getProductReviews(slug: string): Promise<any[]> {
  await delay();
  return getMockProductReviews(slug);
}

export async function getCategories(): Promise<Category[]> {
  await delay();
  return getMockCategories();
}
