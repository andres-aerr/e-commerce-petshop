'use client';

import { useRef, useCallback, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBestSellers } from '@/lib/api';
import ProductCard from '@/components/products/ProductCard';

const Skeleton = () => (
  <div className="border border-accent/30 rounded-lg p-3 animate-pulse flex flex-col flex-1">
    <div className="aspect-[4/3] bg-accent/10 rounded-md mb-2 shrink-0" />
    <div className="h-3 bg-accent/10 rounded w-3/4 mb-1.5 shrink-0" />
    <div className="h-3 bg-accent/10 rounded w-1/2 mb-2 shrink-0" />
    <div className="h-10 bg-accent/10 rounded-md mt-auto shrink-0" />
  </div>
);

export default function BestSellersCarousel() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['bestsellers'],
    queryFn: getBestSellers,
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll, products]);

  const scroll = useCallback((dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  }, []);

  return (
    <section className="bg-white pt-4 pb-12 px-6 md:pt-6 md:pb-16 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-h2 font-extrabold mb-2 text-center">Los mas elegidos</h2>
        <p className="font-sans text-gray-dark mb-8 text-center">
          Productos que los pet parents chilenos prefieren
        </p>

        {!isLoading && (!products || products.length === 0) ? null : (
          <div className="relative group">
            {canScrollLeft && (
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
                aria-label="Anterior"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 19l-7-7 7-7"/></svg>
              </button>
            )}
            {canScrollRight && (
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
                aria-label="Siguiente"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7"/></svg>
              </button>
            )}
            <div
              ref={scrollRef}
              className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-2 items-stretch"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {isLoading
                ? [1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <div key={i} className="snap-start shrink-0 w-[175px] sm:w-[200px] flex flex-col">
                      <Skeleton />
                    </div>
                  ))
                : products?.map((product) => (
                    <div key={product.id} className="snap-start shrink-0 w-[175px] sm:w-[200px] flex flex-col">
                      <ProductCard product={product} />
                    </div>
                  ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
