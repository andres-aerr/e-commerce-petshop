'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProduct } from '@/lib/admin';
import type { AdminProduct } from '@/lib/admin';
import ProductForm from '../ProductForm';

export default function EditarProductoPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<AdminProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct(id).then((p) => {
      setProduct(p);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-light rounded" />
          <div className="h-96 bg-gray-light rounded-lg" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6">
        <p className="text-gray-dark">Producto no encontrado</p>
      </div>
    );
  }

  return <ProductForm product={product} />;
}
