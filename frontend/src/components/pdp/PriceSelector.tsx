'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cart';
import { useRouter } from 'next/navigation';
import NutritionalCalculator from './NutritionalCalculator';

interface PriceSelectorProps {
  productId: string;
  productName: string;
  productSlug: string;
  priceOneTime: number;
  priceAutoship: number;
  badge: string | null;
  weightKg: number | null;
}

function formatPrice(price: number) {
  return `$${price.toLocaleString('es-CL')} CLP`;
}

export default function PriceSelector({
  productId,
  productName,
  productSlug,
  priceOneTime,
  priceAutoship,
  badge,
  weightKg,
}: PriceSelectorProps) {
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [showCalc, setShowCalc] = useState(false);

  const discountBadges = ['Mas vendido', 'Premium', 'Ultra Premium'];
  const hasDiscount = !!badge && discountBadges.includes(badge);
  const savings = priceOneTime - priceAutoship;
  const displayPrice = hasDiscount ? priceAutoship : priceOneTime;

  const handleAddToCart = () => {
    addItem(
      {
        id: productId,
        name: productName,
        slug: productSlug,
        price: displayPrice,
        priceOneTime,
        isAutoship: false,
      },
      quantity
    );
  };

  const handleBuyNow = () => {
    addItem(
      {
        id: productId,
        name: productName,
        slug: productSlug,
        price: displayPrice,
        priceOneTime,
        isAutoship: false,
      },
      quantity
    );
    router.push('/checkout');
  };

  return (
    <>
      <div className="space-y-4">
        <div className={`border-2 rounded-lg p-4 ${hasDiscount ? 'border-accent bg-accent/5' : 'border-gray-dark bg-white'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-sans text-sm font-medium text-primary">Precio</p>
              {hasDiscount && savings > 0 && (
                <p className="font-sans text-xs text-gray-dark line-through mt-0.5">
                  {formatPrice(priceOneTime)}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className={`font-sans text-lg font-semibold ${hasDiscount ? 'text-accent' : 'text-primary'}`}>
                {formatPrice(displayPrice)}
              </p>
              {hasDiscount && savings > 0 && (
                <span className="inline-block bg-accent text-white text-xs font-bold px-1.5 py-0.5 rounded-full mt-1">
                  -{Math.round((savings / priceOneTime) * 100)}%
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-sans text-sm font-medium text-primary">Cantidad:</span>
          <div className="flex items-center border border-gray-light rounded-md">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-2 text-primary hover:bg-gray-light/50 transition-colors font-sans text-lg leading-none"
            >
              −
            </button>
            <span className="px-4 py-2 font-sans text-sm font-semibold text-primary border-x border-gray-light min-w-[3rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-2 text-primary hover:bg-gray-light/50 transition-colors font-sans text-lg leading-none"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-accent/10 text-accent hover:bg-accent hover:text-white font-sans font-semibold text-sm py-3 rounded-md transition-colors min-h-[48px]"
          >
            Agregar al Carrito
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-accent text-white font-sans font-semibold text-sm py-3 rounded-md hover:bg-accent/90 transition-colors min-h-[48px]"
          >
            Comprar Ahora
          </button>
        </div>

        {weightKg && (
          <button
            onClick={() => setShowCalc(true)}
            className="w-full flex items-center justify-center gap-2 font-sans text-sm text-accent hover:text-accent/80 transition-colors pt-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            ¿Cuanto debe comer tu mascota?
          </button>
        )}
      </div>

      {weightKg && (
        <NutritionalCalculator
          weightKg={weightKg}
          isOpen={showCalc}
          onClose={() => setShowCalc(false)}
        />
      )}
    </>
  );
}
