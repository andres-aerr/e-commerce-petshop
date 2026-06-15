'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cart';

function formatPrice(price: number) {
  return `$${price.toLocaleString('es-CL')} CLP`;
}

function calcPricePerKg(price: number, kg: number): string {
  return `$${Math.round(price / kg).toLocaleString('es-CL')} /kg`;
}

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price_one_time: number;
    price_autoship: number;
    autoship_discount_percentage: number;
    avg_rating: number;
    review_count: number;
    weight_kg: number | null;
    badge: string | null;
    pet_type: string;
    image_url: string | null;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const discountBadges = ['Mas vendido', 'Premium', 'Ultra Premium'];
  const hasDiscount = !!product.badge && discountBadges.includes(product.badge);
  const savings = product.price_one_time - product.price_autoship;
  const savingsPct = hasDiscount ? Math.round((savings / product.price_one_time) * 100) : 0;
  const displayPrice = hasDiscount ? product.price_autoship : product.price_one_time;
  const emoji = product.pet_type === 'cat' ? '🐈' : '🐕';

  return (
    <div className="border border-accent/30 rounded-lg p-3 hover:border-accent hover:shadow-sm transition-all flex flex-col w-full flex-1">
      <Link href={`/products/${product.slug}`}>
        <div className="aspect-[4/3] bg-white rounded-md mb-2 flex items-center justify-center relative overflow-hidden">
          {product.image_url ? (
            <Image src={product.image_url} alt={product.name} fill className="object-contain p-2" />
          ) : (
            <span className="text-3xl">{emoji}</span>
          )}
          {hasDiscount && savings > 0 && (
            <span className="absolute top-1 left-1 bg-accent text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              -{savingsPct}%
            </span>
          )}
        </div>
        {product.badge && product.badge !== 'AutoCompra' && (
          <span className="inline-block bg-secondary/10 text-secondary text-xs font-semibold px-1.5 py-0.5 rounded-full mb-1">
            {product.badge}
          </span>
        )}
        <h3 className="font-sans text-sm font-semibold text-primary mb-0.5 hover:text-accent transition-colors line-clamp-2">
          {product.name}
        </h3>
        {product.weight_kg && (
          <p className="font-sans text-xs text-gray-dark mb-1">{product.weight_kg} kg</p>
        )}
        <div className="flex items-center gap-1 mb-1.5">
          <span className="text-xs text-orange-400">
            {'★'.repeat(Math.round(product.avg_rating))}
            {'☆'.repeat(5 - Math.round(product.avg_rating))}
          </span>
          <span className="font-sans text-xs text-gray-dark">
            {product.avg_rating} ({product.review_count})
          </span>
        </div>
        <div className="mb-2">
          <div className="flex items-baseline gap-1.5">
            <p className={`font-sans text-base font-semibold ${hasDiscount ? 'text-accent' : 'text-primary'}`}>
              {formatPrice(displayPrice)}
            </p>
            {hasDiscount && (
              <p className="font-sans text-xs text-gray-dark line-through">
                {formatPrice(product.price_one_time)}
              </p>
            )}
          </div>
          {product.weight_kg && (
            <p className="font-sans text-xs text-gray-dark">
              {calcPricePerKg(displayPrice, product.weight_kg)}
            </p>
          )}
        </div>
      </Link>

      <div className="mt-auto flex flex-col gap-1.5">
        <button
          onClick={() =>
            addItem({
              id: product.id,
              name: product.name,
              slug: product.slug,
              price: displayPrice,
              priceOneTime: product.price_one_time,
              isAutoship: false,
            })
          }
          className="w-full bg-accent/10 text-accent font-sans font-semibold text-[11px] py-2 rounded-md hover:bg-accent hover:text-white transition-colors"
        >
          <ShoppingCart className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />
          Agregar al carrito
        </button>
        <button
          onClick={() => {
            addItem({
              id: product.id,
              name: product.name,
              slug: product.slug,
              price: displayPrice,
              priceOneTime: product.price_one_time,
              isAutoship: false,
            });
            router.push('/checkout');
          }}
          className="w-full bg-accent/10 text-accent hover:bg-accent hover:text-white font-sans font-semibold text-[11px] py-2 rounded-md transition-colors"
        >
          <ArrowRight className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />
          Comprar ahora
        </button>
      </div>
    </div>
  );
}
