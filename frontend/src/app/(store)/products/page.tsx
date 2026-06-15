'use client';

import { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
import { getProducts } from '@/lib/api';
import ProductCard from '@/components/products/ProductCard';
import { ShowcaseBlock, showcases } from '@/components/home/CategoryShowcase';

const extendedShowcases = [
  ...showcases,
  {
    petType: 'small_pet',
    title: 'Todo para Mascotas Pequeñas',
    icon: '🐹',
    color: '#FDE4D4',
    bannerImage: '/images/categorias/mascotas-pequenas-categoria.png',
    categories: [
      { slug: 'snacks', label: 'Alimentos', icon: 'food', image: '/images/iconos-card/comida-gato.png' },
      { slug: 'juguetes', label: 'Juguetes', icon: 'toy', image: '/images/iconos-card/juguete-gato.png' },
      { slug: 'accesorios', label: 'Accesorios', icon: 'collar', image: '/images/iconos-card/accesorio-perro.png' },
    ],
  },
  {
    petType: 'fish',
    title: 'Todo para Peces',
    icon: '🐟',
    color: '#DCE8F8',
    bannerImage: '/images/categorias/peces-categoria.png',
    categories: [
      { slug: 'snacks', label: 'Alimentos', icon: 'food', image: '/images/iconos-card/comida-gato.png' },
      { slug: 'accesorios', label: 'Accesorios', icon: 'collar', image: '/images/iconos-card/accesorio-perro.png' },
    ],
  },
  {
    petType: 'bird',
    title: 'Todo para Aves',
    icon: '🐦',
    color: '#F8F0D8',
    bannerImage: '/images/categorias/aves-categoria.png',
    categories: [
      { slug: 'snacks', label: 'Alimentos', icon: 'food', image: '/images/iconos-card/comida-gato.png' },
      { slug: 'juguetes', label: 'Juguetes', icon: 'toy', image: '/images/iconos-card/juguete-gato.png' },
      { slug: 'accesorios', label: 'Accesorios', icon: 'collar', image: '/images/iconos-card/accesorio-perro.png' },
    ],
  },
];

const sortOptions = [
  { label: 'Relevancia', value: '' },
  { label: 'Menor precio', value: 'price_asc' },
  { label: 'Mayor precio', value: 'price_desc' },
  { label: 'Mejor evaluados', value: 'rating' },
];

const petTypes = [
  { label: 'Todos', value: '' },
  { label: 'Perros', value: 'dog' },
  { label: 'Gatos', value: 'cat' },
];

const categories = [
  { label: 'Todas las categorias', value: '' },
  { label: 'Alimentos Perro', value: 'alimentos-secos-perro' },
  { label: 'Alimentos Gato', value: 'alimentos-secos-gato' },
  { label: 'Arenas Sanitarias', value: 'arenas-sanitarias' },
  { label: 'Snacks y Premios', value: 'snacks' },
  { label: 'Accesorios', value: 'accesorios' },
  { label: 'Prescripcion Clinica', value: 'prescripcion-clinica' },
  { label: 'Nutricion Natural', value: 'nutricion-natural' },
];

const petName: Record<string, string> = {
  dog: 'Perros',
  cat: 'Gatos',
};

const categoryBannerMap: Record<string, string> = {
  'dog-alimentos-secos-perro': '/images/banners/banner-perro-categorias-alimentos.png',
  'dog-snacks': '/images/banners/banner-perro-categorias-snack.png',
  'dog-juguetes': '/images/banners/banner-perro-categorias-juguetes.png',
  'dog-accesorios': '/images/banners/banner-perro-categorias-accesorios.png',
};

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const petType = searchParams.get('pet_type') || '';
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || '';
  const page = Number(searchParams.get('page')) || 1;

  const showcase = extendedShowcases.find((s) => s.petType === petType);
  const showCategoryOverview = !!petType && !category && !!showcase;
  const showCategoryDetail = !!petType && !!category && !!showcase;

  const { data, isLoading } = useQuery({
    queryKey: ['products', { pet_type: petType, category, sort, page }],
    queryFn: () => getProducts({ pet_type: petType, category, sort, page, limit: 12 }),
    enabled: !showCategoryOverview,
  });

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    if (key !== 'page') params.delete('page');
    router.push(`/products?${params.toString()}`);
  }

  if (showCategoryOverview && showcase) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <ShowcaseBlock {...showcase} noCarousel={showcase.categories.length === 0} />
      </div>
    );
  }

  if (showCategoryDetail && showcase) {
    const categoryLabel = categories.find((c) => c.value === category)?.label || category;
    const baseName = categoryLabel.replace(/\b(Perro|Gato)\s*/g, '').trim();
    const title = `${baseName} para ${petName[petType] || petType}`;

    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <ShowcaseBlock {...showcase} title={title} noCarousel activeCategory={category} bannerImage={categoryBannerMap[`${petType}-${category}`] || showcase.bannerImage} />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-8 mb-8">
          <div>
            {data && (
              <p className="font-sans text-sm text-gray-dark">
                {data.total} producto{data.total !== 1 ? 's' : ''} encontrado{data.total !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              value={category}
              onChange={(e) => updateParam('category', e.target.value)}
              className="font-sans text-sm border border-gray-light rounded-md px-3 py-2 focus:outline-none focus:border-secondary bg-white"
            >
              {categories.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <select
              value={petType}
              onChange={(e) => updateParam('pet_type', e.target.value)}
              className="font-sans text-sm border border-gray-light rounded-md px-3 py-2 focus:outline-none focus:border-secondary bg-white"
            >
              {petTypes.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => updateParam('sort', e.target.value)}
              className="font-sans text-sm border border-gray-light rounded-md px-3 py-2 focus:outline-none focus:border-secondary bg-white"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="border border-accent/30 rounded-lg p-4 animate-pulse">
                <div className="aspect-square bg-accent/10 rounded-md mb-4" />
                <div className="h-4 bg-accent/10 rounded w-20 mb-3" />
                <div className="h-5 bg-accent/10 rounded w-40 mb-2" />
                <div className="h-3 bg-accent/10 rounded w-24 mb-3" />
                <div className="h-4 bg-accent/10 rounded w-32 mb-3" />
                <div className="h-12 bg-accent/10 rounded-md" />
              </div>
            ))}
          </div>
        ) : data && data.products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {data.total_pages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                {Array.from({ length: data.total_pages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => updateParam('page', String(p))}
                    className={`px-4 py-2 font-sans text-sm rounded-md border transition-colors ${
                      p === page
                        ? 'bg-accent text-white border-accent'
                        : 'border-gray-light text-primary hover:border-accent'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="font-sans text-gray-dark">No se encontraron productos.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-h2 mb-1">Catalogo</h1>
          {data && (
            <p className="font-sans text-sm text-gray-dark">
              {data.total} producto{data.total !== 1 ? 's' : ''} encontrado{data.total !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          <select
            value={category}
            onChange={(e) => updateParam('category', e.target.value)}
            className="font-sans text-sm border border-gray-light rounded-md px-3 py-2 focus:outline-none focus:border-secondary bg-white"
          >
            {categories.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <select
            value={petType}
            onChange={(e) => updateParam('pet_type', e.target.value)}
            className="font-sans text-sm border border-gray-light rounded-md px-3 py-2 focus:outline-none focus:border-secondary bg-white"
          >
            {petTypes.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => updateParam('sort', e.target.value)}
            className="font-sans text-sm border border-gray-light rounded-md px-3 py-2 focus:outline-none focus:border-secondary bg-white"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="border border-accent/30 rounded-lg p-4 animate-pulse">
              <div className="aspect-square bg-accent/10 rounded-md mb-4" />
              <div className="h-4 bg-accent/10 rounded w-20 mb-3" />
              <div className="h-5 bg-accent/10 rounded w-40 mb-2" />
              <div className="h-3 bg-accent/10 rounded w-24 mb-3" />
              <div className="h-4 bg-accent/10 rounded w-32 mb-3" />
              <div className="h-12 bg-accent/10 rounded-md" />
            </div>
          ))}
        </div>
      ) : data && data.products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {data.total_pages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              {Array.from({ length: data.total_pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => updateParam('page', String(p))}
                  className={`px-4 py-2 font-sans text-sm rounded-md border transition-colors ${
                    p === page
                      ? 'bg-accent text-white border-accent'
                      : 'border-gray-light text-primary hover:border-accent'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <p className="font-sans text-gray-dark">No se encontraron productos.</p>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="border border-accent/30 rounded-lg p-4 animate-pulse">
              <div className="aspect-square bg-accent/10 rounded-md mb-4" />
              <div className="h-4 bg-accent/10 rounded w-20 mb-3" />
              <div className="h-5 bg-accent/10 rounded w-40 mb-2" />
              <div className="h-3 bg-accent/10 rounded w-24 mb-3" />
              <div className="h-4 bg-accent/10 rounded w-32 mb-3" />
              <div className="h-12 bg-accent/10 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
