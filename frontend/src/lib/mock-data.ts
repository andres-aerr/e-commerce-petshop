import type { Product, ProductsResponse, Category } from './api';

interface Review {
  id: string;
  product_slug: string;
  rating: number;
  title: string;
  content: string;
  pet_name: string;
  pet_breed: string;
  is_verified: boolean;
  created_at: string;
}

// ── Categories ──
const categories: Category[] = [
  {
    id: 'cat-perros',
    name: 'Perros', slug: 'perros', pet_type: 'dog', description: null, parent_id: null,
    children: [
      { id: 'cat-alimento-perro', name: 'Alimento', slug: 'alimento-perro', pet_type: 'dog', description: null, parent_id: 'cat-perros' },
      { id: 'cat-snack-perro', name: 'Snack', slug: 'snack-perro', pet_type: 'dog', description: null, parent_id: 'cat-perros' },
      { id: 'cat-juguetes-perro', name: 'Juguetes', slug: 'juguetes-perro', pet_type: 'dog', description: null, parent_id: 'cat-perros' },
      { id: 'cat-accesorios-perro', name: 'Accesorios', slug: 'accesorios-perro', pet_type: 'dog', description: null, parent_id: 'cat-perros' },
    ],
  },
  {
    id: 'cat-gatos',
    name: 'Gatos', slug: 'gatos', pet_type: 'cat', description: null, parent_id: null,
    children: [
      { id: 'cat-alimento-gato', name: 'Alimento', slug: 'alimento-gato', pet_type: 'cat', description: null, parent_id: 'cat-gatos' },
      { id: 'cat-snack-gato', name: 'Snack', slug: 'snack-gato', pet_type: 'cat', description: null, parent_id: 'cat-gatos' },
      { id: 'cat-juguetes-gato', name: 'Juguetes', slug: 'juguetes-gato', pet_type: 'cat', description: null, parent_id: 'cat-gatos' },
      { id: 'cat-accesorios-gato', name: 'Accesorios', slug: 'accesorios-gato', pet_type: 'cat', description: null, parent_id: 'cat-gatos' },
      { id: 'cat-areneros-gato', name: 'Areneros', slug: 'areneros-gato', pet_type: 'cat', description: null, parent_id: 'cat-gatos' },
    ],
  },
  {
    id: 'cat-mascotas-pequenas',
    name: 'Mascotas pequeñas', slug: 'mascotas-pequenas', pet_type: 'small_pet', description: null, parent_id: null,
    children: [
      { id: 'cat-alimento-mascotas-pequenas', name: 'Alimento', slug: 'alimento-mascotas-pequenas', pet_type: 'small_pet', description: null, parent_id: 'cat-mascotas-pequenas' },
      { id: 'cat-snack-mascotas-pequenas', name: 'Snack', slug: 'snack-mascotas-pequenas', pet_type: 'small_pet', description: null, parent_id: 'cat-mascotas-pequenas' },
      { id: 'cat-juguetes-mascotas-pequenas', name: 'Juguetes', slug: 'juguetes-mascotas-pequenas', pet_type: 'small_pet', description: null, parent_id: 'cat-mascotas-pequenas' },
      { id: 'cat-accesorios-mascotas-pequenas', name: 'Accesorios', slug: 'accesorios-mascotas-pequenas', pet_type: 'small_pet', description: null, parent_id: 'cat-mascotas-pequenas' },
    ],
  },
  {
    id: 'cat-aves',
    name: 'Aves', slug: 'aves', pet_type: 'bird', description: null, parent_id: null,
    children: [
      { id: 'cat-alimento-aves', name: 'Alimento', slug: 'alimento-aves', pet_type: 'bird', description: null, parent_id: 'cat-aves' },
      { id: 'cat-snack-aves', name: 'Snack', slug: 'snack-aves', pet_type: 'bird', description: null, parent_id: 'cat-aves' },
      { id: 'cat-juguetes-aves', name: 'Juguetes', slug: 'juguetes-aves', pet_type: 'bird', description: null, parent_id: 'cat-aves' },
      { id: 'cat-accesorios-aves', name: 'Accesorios', slug: 'accesorios-aves', pet_type: 'bird', description: null, parent_id: 'cat-aves' },
    ],
  },
];

const categoryBySlug: Record<string, Category> = {};
for (const parent of categories) {
  categoryBySlug[parent.slug] = parent;
  if (parent.children) {
    for (const child of parent.children) {
      categoryBySlug[child.slug] = child;
    }
  }
}

// ── Products ──

interface ProductInput {
  name: string;
  slug: string;
  image_url: string;
  description: string;
  category_slug: string;
  sku: string;
  pet_type: string;
  weight_kg: number | null;
  is_published: boolean;
  is_bestseller?: boolean;
  badge: string | null;
  price_one_time: number;
  price_autoship: number;
  stock_quantity: number;
}

const productsInput: ProductInput[] = [
  { name: 'Nomade Adulto Raza Mediana y Grande', slug: 'nomade-adulto-raza-mediana-20kg', image_url: '/images/products/nomade-adulto-raza-mediana-20kg.png', description: 'Alimento premium con pollo fresco para perros adultos de raza mediana y grande. Sin granos, sin maiz ni soja. Rico en Omega-3 y Omega-6 para pelaje brillante.', category_slug: 'alimento-perro', sku: 'NOM-ADU-20', pet_type: 'dog', weight_kg: 20, is_published: true, is_bestseller: true, badge: 'Mas vendido', price_one_time: 40490, price_autoship: 36441, stock_quantity: 150 },
  { name: 'Hills Science Diet Puppy Pollo', slug: 'hills-science-diet-puppy-pollo-1-1kg', image_url: '/images/products/hills-science-diet-puppy-pollo-1-1kg.png', description: 'Formulacion clinica para cachorros con pollo como primera proteina. DHA para desarrollo cerebral y visual.', category_slug: 'alimento-perro', sku: 'HIL-PUP-1.1', pet_type: 'dog', weight_kg: 1.1, is_published: true, badge: 'Cachorros', price_one_time: 17990, price_autoship: 16191, stock_quantity: 80 },
  { name: 'Royal Canin Adult Raza Mediana', slug: 'royal-canin-adulto-raza-mediana-15kg', image_url: '/images/products/royal-canin-adulto-raza-mediana-15kg.png', description: 'Alimento premium para perros adultos de 1-10 anos y 11-25kg.', category_slug: 'alimento-perro', sku: 'RC-ADU-15', pet_type: 'dog', weight_kg: 15, is_published: true, badge: null, price_one_time: 54990, price_autoship: 49491, stock_quantity: 90 },
  { name: 'Acana Heritage Adult Pollo y Pavo', slug: 'acana-heritage-adulto-pollo-pavo-11-4kg', image_url: '/images/products/acana-heritage-adulto-pollo-pavo-11-4kg.png', description: 'Alimento ultra premium con pollo y pavo fresco.', category_slug: 'alimento-perro', sku: 'ACA-HER-11.4', pet_type: 'dog', weight_kg: 11.4, is_published: true, badge: 'Ultra Premium', price_one_time: 59990, price_autoship: 53991, stock_quantity: 45 },
  { name: 'Hills Prescription Diet i/d Digestive Care', slug: 'hills-prescription-diet-id-digestive-1-5kg', image_url: '/images/products/hills-prescription-diet-id-digestive-1-5kg.png', description: 'Alimento clinico para perros con problemas digestivos.', category_slug: 'alimento-perro', sku: 'HIL-ID-1.5', pet_type: 'dog', weight_kg: 1.5, is_published: true, badge: 'Clinico', price_one_time: 22990, price_autoship: 20691, stock_quantity: 30 },
  { name: 'Royal Canin Gastro Intestinal', slug: 'royal-canin-gastro-intestinal-2kg', image_url: '/images/products/royal-canin-gastro-intestinal-2kg.png', description: 'Formula clinica para trastornos gastrointestinales.', category_slug: 'alimento-perro', sku: 'RC-GAS-2', pet_type: 'dog', weight_kg: 2, is_published: true, badge: 'Veterinario', price_one_time: 25990, price_autoship: 23391, stock_quantity: 35 },
  { name: 'Dental Stix Pack Cuidado Dental', slug: 'dental-stix-pack-280g', image_url: '/images/products/dental-stix-pack-280g.png', description: 'Snack dental para perros de talla mediana.', category_slug: 'snack-perro', sku: 'DEN-STX-280', pet_type: 'dog', weight_kg: 0.28, is_published: true, badge: 'Salud Dental', price_one_time: 5990, price_autoship: 5391, stock_quantity: 300 },
  { name: 'Pedigree Dentastix 7 Unidades', slug: 'pedigree-dentastix-7-unidades', image_url: '/images/products/pedigree-dentastix-7-unidades.png', description: 'Snack dental en forma de estrella para perros.', category_slug: 'snack-perro', sku: 'PED-DEN-7', pet_type: 'dog', weight_kg: 0.1, is_published: true, badge: 'Dental', price_one_time: 4990, price_autoship: 4491, stock_quantity: 400 },
  { name: 'Comedero Acero Inoxidable + Base Bambu', slug: 'comedero-acero-bambu-set', image_url: '/images/products/comedero-acero-bambu-set.png', description: 'Set de comedero y bebedero de acero inoxidable con base de bambu.', category_slug: 'accesorios-perro', sku: 'ACC-COM-BAM', pet_type: 'both', weight_kg: 0.8, is_published: true, badge: 'Diseno', price_one_time: 18990, price_autoship: 17091, stock_quantity: 75 },
  { name: 'Cama Ortopedica Memory Foam Mediana', slug: 'cama-ortopedica-memory-foam-mediana', image_url: '/images/products/cama-ortopedica-memory-foam-mediana.png', description: 'Cama ortopedica con espuma viscoelastica.', category_slug: 'accesorios-perro', sku: 'ACC-CAM-MEM', pet_type: 'dog', weight_kg: 3.5, is_published: true, is_bestseller: true, badge: 'Ortopedica', price_one_time: 49990, price_autoship: 44991, stock_quantity: 40 },
  { name: 'Caldo de Colageno Natural para Perros', slug: 'caldo-colageno-natural-perros-1l', image_url: '/images/products/caldo-colageno-natural-perros-1l.png', description: 'Caldo de huesos 100% natural. Rico en colageno.', category_slug: 'alimento-perro', sku: 'NUT-CAL-1L', pet_type: 'dog', weight_kg: 1, is_published: true, badge: 'Superfood', price_one_time: 12990, price_autoship: 11691, stock_quantity: 80 },
  { name: 'Aceite de Salmon Omega-3 para Mascotas', slug: 'aceite-salmon-omega3-mascotas-500ml', image_url: '/images/products/aceite-salmon-omega3-mascotas-500ml.png', description: 'Aceite puro de salmon chileno.', category_slug: 'accesorios-perro', sku: 'NUT-ACE-500', pet_type: 'both', weight_kg: 0.5, is_published: true, badge: 'Suplemento', price_one_time: 15990, price_autoship: 14391, stock_quantity: 90 },
  { name: 'N&D Prime Gato Castrado Pollo', slug: 'nd-prime-gato-castrado-pollo-7-5kg', image_url: '/images/products/nd-prime-gato-castrado-pollo-7-5kg.png', description: 'Alimento ultra premium para gatos castrados.', category_slug: 'alimento-gato', sku: 'ND-CAST-7.5', pet_type: 'cat', weight_kg: 7.5, is_published: true, is_bestseller: true, badge: 'Premium', price_one_time: 62990, price_autoship: 56691, stock_quantity: 60 },
  { name: 'Nomade Gato Adulto', slug: 'nomade-gato-adulto-10kg', image_url: '/images/products/nomade-gato-adulto-10kg.png', description: 'Alimento premium para gatos adultos.', category_slug: 'alimento-gato', sku: 'NOM-GAT-10', pet_type: 'cat', weight_kg: 10, is_published: true, is_bestseller: true, badge: 'AutoCompra', price_one_time: 30990, price_autoship: 27891, stock_quantity: 120 },
  { name: 'Royal Canin Gato Esterilizado', slug: 'royal-canin-gato-esterilizado-3-5kg', image_url: '/images/products/royal-canin-gato-esterilizado-3-5kg.png', description: 'Formula especifica para gatos esterilizados.', category_slug: 'alimento-gato', sku: 'RC-GAT-EST-3.5', pet_type: 'cat', weight_kg: 3.5, is_published: true, badge: 'Esterilizados', price_one_time: 28990, price_autoship: 26091, stock_quantity: 70 },
  { name: 'Whiskas Gato Adulto Pollo', slug: 'whiskas-gato-adulto-pollo-4kg', image_url: '/images/products/whiskas-gato-adulto-pollo-4kg.png', description: 'Alimento balanceado para gatos adultos con pollo.', category_slug: 'alimento-gato', sku: 'WHI-GAT-4', pet_type: 'cat', weight_kg: 4, is_published: true, badge: 'Clasico', price_one_time: 15990, price_autoship: 14391, stock_quantity: 200 },
  { name: 'Greenies Snack Dental Gato', slug: 'greenies-snack-dental-gato-113g', image_url: '/images/products/greenies-snack-dental-gato-113g.png', description: 'Snack dental premium para gatos.', category_slug: 'snack-gato', sku: 'GRE-GAT-113', pet_type: 'cat', weight_kg: 0.113, is_published: true, badge: 'Premium', price_one_time: 6990, price_autoship: 6291, stock_quantity: 150 },
  { name: 'Pride Litter Natural Arena Sanitaria', slug: 'pride-litter-natural-arena-10kg', image_url: '/images/products/pride-litter-natural-arena-10kg.png', description: 'Arena sanitaria natural aglomerante.', category_slug: 'areneros-gato', sku: 'PRI-LIT-10', pet_type: 'cat', weight_kg: 10, is_published: true, badge: 'Eco', price_one_time: 12990, price_autoship: 11691, stock_quantity: 200 },
  { name: 'Sanicat Arena Aglomerante', slug: 'sanicat-arena-aglomerante-10kg', image_url: '/images/products/sanicat-arena-aglomerante-10kg.png', description: 'Arena aglomerante de alta calidad.', category_slug: 'areneros-gato', sku: 'SAN-AGR-10', pet_type: 'cat', weight_kg: 10, is_published: true, badge: 'Aglomerante', price_one_time: 9990, price_autoship: 8991, stock_quantity: 180 },
  { name: "Cat's Best Arena Natural", slug: 'cats-best-arena-natural-5kg', image_url: '/images/products/cats-best-arena-natural-5kg.png', description: 'Arena natural 100% vegetal.', category_slug: 'areneros-gato', sku: 'CAT-BEST-5', pet_type: 'cat', weight_kg: 5, is_published: true, badge: 'Eco Premium', price_one_time: 14990, price_autoship: 13491, stock_quantity: 100 },
  { name: 'Fuente de Agua Ceramica para Gato', slug: 'fuente-agua-ceramica-gato', image_url: '/images/products/fuente-agua-ceramica-gato.png', description: 'Fuente de agua ceramica con filtro de carbon.', category_slug: 'accesorios-gato', sku: 'ACC-FUE-CER', pet_type: 'cat', weight_kg: 1.2, is_published: true, badge: 'Hidratacion', price_one_time: 34990, price_autoship: 31491, stock_quantity: 55 },
  { name: 'Snacks Liofilizados Salmon 100% Natural', slug: 'snacks-liofilizados-salmon-100g', image_url: '/images/products/snacks-liofilizados-salmon-100g.png', description: 'Snacks de salmon liofilizado.', category_slug: 'snack-perro', sku: 'NUT-LIO-SAL', pet_type: 'both', weight_kg: 0.1, is_published: true, is_bestseller: true, badge: 'Natural', price_one_time: 9990, price_autoship: 8991, stock_quantity: 120 },
];

function buildProduct(input: ProductInput, index: number): Product {
  const cat = categoryBySlug[input.category_slug];
  const parentCat = categories.find(c => c.children?.some(ch => ch.slug === input.category_slug));
  return {
    id: `prod-${index + 1}`,
    name: input.name,
    slug: input.slug,
    description: input.description,
    category_id: cat?.id || '',
    sku: input.sku,
    pet_type: input.pet_type,
    image_url: input.image_url,
    images_json: null,
    weight_kg: input.weight_kg,
    is_published: input.is_published,
    is_bestseller: input.is_bestseller || false,
    badge: input.badge,
    price_one_time: input.price_one_time,
    price_autoship: input.price_autoship,
    autoship_discount_percentage: 10,
    stock_quantity: input.stock_quantity,
    avg_rating: 0,
    review_count: 0,
    category: {
      name: cat?.name || parentCat?.name || '',
      slug: cat?.slug || input.category_slug,
    },
  };
}

const products: Product[] = productsInput.map(buildProduct);

// Compute avg_rating and review_count from reviews
const reviews: Review[] = [
  { id: 'rev-1', product_slug: 'nomade-adulto-raza-mediana-20kg', rating: 5, title: 'Mi perro lo ama', content: 'Mi Golden Retriever paso de tener piel seca a un pelaje brillante en 3 semanas.', pet_name: 'Max', pet_breed: 'Golden Retriever', is_verified: true, created_at: '2025-01-15' },
  { id: 'rev-2', product_slug: 'nomade-adulto-raza-mediana-20kg', rating: 5, title: 'Excelente relacion calidad-precio', content: 'Llevo 6 meses con AutoCompra y nunca me he quedado sin alimento.', pet_name: 'Luna', pet_breed: 'Labrador', is_verified: true, created_at: '2025-02-10' },
  { id: 'rev-3', product_slug: 'nd-prime-gato-castrado-pollo-7-5kg', rating: 5, title: 'Mi gato castrado por fin come bien', content: 'Desde que cambie a N&D Prime mi gato no ha tenido problemas urinarios.', pet_name: 'Michi', pet_breed: 'Europeo Comun', is_verified: true, created_at: '2025-03-05' },
  { id: 'rev-4', product_slug: 'nomade-gato-adulto-10kg', rating: 4, title: 'Buen alimento, precio justo', content: 'Mis dos gatos comen Nomade hace un ano. Buen pelo, buena energia.', pet_name: 'Simba y Nala', pet_breed: 'Siames', is_verified: true, created_at: '2025-01-20' },
  { id: 'rev-5', product_slug: 'cama-ortopedica-memory-foam-mediana', rating: 5, title: 'Mi perro senior duerme como un angel', content: 'Compre esta cama para mi pastor aleman de 11 anos.', pet_name: 'Toby', pet_breed: 'Pastor Aleman', is_verified: true, created_at: '2025-04-01' },
  { id: 'rev-6', product_slug: 'snacks-liofilizados-salmon-100g', rating: 5, title: 'Los snacks mas naturales que he visto', content: 'Un solo ingrediente: salmon. Mis gatos vuelven locos por estos snacks.', pet_name: 'Milo y Lola', pet_breed: 'Maine Coon', is_verified: true, created_at: '2025-03-12' },
  { id: 'rev-7', product_slug: 'greenies-snack-dental-gato-113g', rating: 4, title: 'Mi gato lo acepto bien', content: 'No es facil encontrar snacks dentales que los gatos acepten.', pet_name: 'Pelusa', pet_breed: 'Persa', is_verified: true, created_at: '2025-02-28' },
];

// Update avg_rating and review_count on products
const reviewsBySlug: Record<string, Review[]> = {};
for (const r of reviews) {
  if (!reviewsBySlug[r.product_slug]) reviewsBySlug[r.product_slug] = [];
  reviewsBySlug[r.product_slug].push(r);
}
for (const p of products) {
  const prodReviews = reviewsBySlug[p.slug] || [];
  p.review_count = prodReviews.length;
  p.avg_rating = prodReviews.length
    ? prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length
    : 0;
}

// ── Exports ──

export function getMockProducts(params?: {
  category?: string;
  pet_type?: string;
  sort?: string;
  page?: number;
  limit?: number;
}): ProductsResponse {
  let filtered = [...products].filter(p => p.is_published);

  if (params?.pet_type) {
    filtered = filtered.filter(p => p.pet_type === params.pet_type || p.pet_type === 'both');
  }

  if (params?.category) {
    let catSlugs: string[] = [params.category];
    const parent = categories.find(c => c.slug === params.category);
    if (parent && parent.children) {
      catSlugs = parent.children.map(c => c.slug);
    }
    filtered = filtered.filter(p => catSlugs.includes(p.category.slug));
  }

  if (params?.sort) {
    switch (params.sort) {
      case 'price_asc': filtered.sort((a, b) => a.price_one_time - b.price_one_time); break;
      case 'price_desc': filtered.sort((a, b) => b.price_one_time - a.price_one_time); break;
      case 'rating': filtered.sort((a, b) => b.avg_rating - a.avg_rating); break;
    }
  }

  const page = params?.page || 1;
  const limit = params?.limit || 12;
  const total = filtered.length;
  const total_pages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paged = filtered.slice(start, start + limit);

  return { products: paged, total, page, limit, total_pages };
}

export function getMockBestSellers(): Product[] {
  return products.filter(p => p.is_bestseller && p.is_published).slice(0, 8);
}

export function getMockProduct(slug: string): Product | undefined {
  return products.find(p => p.slug === slug && p.is_published);
}

export function getMockProductReviews(slug: string): Review[] {
  return reviewsBySlug[slug] || [];
}

export function getMockCategories(): Category[] {
  return categories;
}

export const allProductSlugs = products.map(p => p.slug);
