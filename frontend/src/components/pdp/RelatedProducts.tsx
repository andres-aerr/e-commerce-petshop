'use client';

import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/lib/api';
import ProductCard from '@/components/products/ProductCard';

interface RelatedProductsProps {
  currentSlug: string;
  petType: string;
}

export default function RelatedProducts({ currentSlug, petType }: RelatedProductsProps) {
  const { data } = useQuery({
    queryKey: ['products', { pet_type: petType, limit: 4 }],
    queryFn: () => getProducts({ pet_type: petType, limit: 5 }),
  });

  const related = data?.products
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 4);

  if (!related || related.length === 0) return null;

  return (
    <div>
      <h2 className="text-h3 mb-6">Clientes que compraron esto tambien compraron</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
