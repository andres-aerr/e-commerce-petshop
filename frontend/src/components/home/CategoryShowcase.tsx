'use client';

import { useRef, useCallback, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { getProducts } from '@/lib/api';
import ProductCard from '@/components/products/ProductCard';

export const showcases = [
  {
    petType: 'dog',
    title: 'Todo para Perros',
    icon: '🐕',
    color: '#DCF5DC',
    bannerImage: '/images/banners/banner-perro-categorias.png',
    categories: [
      { slug: 'alimentos-secos-perro', label: 'Alimentos', icon: 'food', image: '/images/iconos-card/comida-gato.png' },
      { slug: 'snacks', label: 'Snacks', icon: 'treat', image: '/images/iconos-card/snack-perro.png', petOnly: 'dog' },
      { slug: 'juguetes', label: 'Juguetes', icon: 'toy', image: '/images/iconos-card/juguete-gato.png' },
      { slug: 'accesorios', label: 'Accesorios', icon: 'collar', image: '/images/iconos-card/accesorio-perro.png' },
    ],
  },
  {
    petType: 'cat',
    title: 'Todo para Gatos',
    icon: '🐈',
    color: '#F5F0FA',
    bannerImage: '/images/banners/banner-gato-categorias.png',
    categories: [
      { slug: 'alimentos-secos-gato', label: 'Alimentos', icon: 'food', image: '/images/iconos-card/comida-gato.png' },
      { slug: 'arenas-sanitarias', label: 'Arenas', icon: 'litter', image: '/images/iconos-card/arenero-gato.png' },
      { slug: 'juguetes', label: 'Juguetes', icon: 'toy', image: '/images/iconos-card/juguete-gato.png' },
      { slug: 'accesorios', label: 'Accesorios', icon: 'collar', image: '/images/iconos-card/accesorio-gato.png' },
    ],
  },
];

const iconSvgs: Record<string, React.ReactNode> = {
  food: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12a8 8 0 0 1 16 0" />
      <path d="M4 12v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
      <path d="M8 12V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6" />
    </svg>
  ),
  treat: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C7 2 5 6 5 10c0 3 2 6 4 8s3 4 3 4 1-2 3-4 4-5 4-8c0-4-2-8-7-8z" />
      <circle cx="12" cy="9" r="2" />
    </svg>
  ),
  toy: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="7" r="5" />
      <circle cx="17" cy="17" r="5" />
      <line x1="10.5" y1="10.5" x2="13.5" y2="13.5" />
    </svg>
  ),
  collar: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3" />
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <circle cx="12" cy="14" r="2" />
    </svg>
  ),
  litter: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <circle cx="12" cy="14" r="1.5" fill="currentColor" />
    </svg>
  ),
};

export default function CategoryShowcase() {
  return (
    <section className="py-12 px-6 md:py-16">
      <div className="max-w-6xl mx-auto space-y-12">
        {showcases.map((showcase) => (
          <ShowcaseBlock key={showcase.petType} {...showcase} />
        ))}
      </div>
    </section>
  );
}

export function ShowcaseBlock({ petType, title, icon, color, bannerImage, categories, noCarousel, activeCategory }: typeof showcases[0] & { noCarousel?: boolean; activeCategory?: string }) {
  const { data } = useQuery({
    queryKey: ['showcase', petType],
    queryFn: () => getProducts({ pet_type: petType, limit: 7, sort: 'rating' }),
  });

  const products = data?.products?.slice(0, 7) || [];
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

  const Skeleton = () => (
    <div className="border border-accent/30 rounded-lg p-3 animate-pulse flex flex-col flex-1">
      <div className="aspect-[4/3] bg-accent/10 rounded-md mb-2 shrink-0" />
      <div className="h-3 bg-accent/10 rounded w-3/4 mb-1.5 shrink-0" />
      <div className="h-3 bg-accent/10 rounded w-1/2 mb-2 shrink-0" />
      <div className="h-10 bg-accent/10 rounded-md mt-auto shrink-0" />
    </div>
  );

  return (
    <div>
      <div
        className="rounded-2xl p-5 md:p-6 flex items-center gap-3 mb-6 relative"
        style={{ backgroundColor: color, minHeight: bannerImage ? (petType === 'dog' ? '180px' : '130px') : undefined }}
      >
        {!bannerImage && <span className="text-2xl shrink-0">{icon}</span>}
        <div className="shrink-0">
          <p className="text-sm leading-tight text-primary/70">{title.split(' ').slice(0, -1).join(' ')}</p>
          <h2 className="text-6xl md:text-8xl font-extrabold leading-tight" style={petType === 'cat' ? { color: '#6B4F8A' } : petType === 'dog' ? { color: '#2E7D32' } : undefined}>{title.split(' ').at(-1)}</h2>
        </div>
        <div className={`flex gap-3 flex-wrap items-center flex-1 justify-center ${bannerImage ? 'pr-36 md:pr-48' : ''}`}>
          {categories.map((cat) => {
            const c = cat as any;
            if (c.image) {
              return (
                <a
                  key={cat.slug}
                  href={`/products?pet_type=${petType}&category=${cat.slug}`}
                  className={`glass-category-card flex flex-col items-center justify-center gap-0.5 font-sans text-xs font-semibold w-24 h-28 ${cat.slug === activeCategory ? 'glass-category-card--active' : 'text-primary'}`}
                >
                  <div className="relative w-12 h-12">
                    <Image src={c.image} alt="" fill className="object-contain" />
                  </div>
                  <span className="text-center leading-tight">{cat.label}</span>
                </a>
              );
            }
            return (
              <a
                key={cat.slug}
                href={`/products?pet_type=${petType}&category=${cat.slug}`}
                className={`glass-category-card flex flex-col items-center justify-center gap-1 font-sans text-xs font-semibold w-24 h-28 ${cat.slug === activeCategory ? 'glass-category-card--active' : 'text-primary'}`}
              >
                <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  {iconSvgs[c.icon as keyof typeof iconSvgs]}
                </div>
                <span className="text-center leading-tight">{cat.label}</span>
              </a>
            );
          })}
        </div>
        {bannerImage && (
          <div className="absolute right-2 md:right-4 bottom-0 pointer-events-none h-[280px] w-36 md:w-52">
            <Image src={bannerImage} alt="" fill className="object-contain object-bottom" />
          </div>
        )}
      </div>

      {!noCarousel && (
        <>
          <h3 className="text-h3 font-bold pt-6 md:pt-8 pb-8 md:pb-10 text-center">Los más vendidos para {title.split(' ').at(-1)}</h3>
          {products.length > 0 ? (
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
                {products.length > 0
                  ? products.map((product) => (
                      <div key={product.id} className="snap-start shrink-0 w-[175px] sm:w-[200px] flex flex-col">
                        <ProductCard product={product} />
                      </div>
                    ))
                  : [1, 2, 3, 4, 5, 6, 7].map((i) => (
                      <div key={i} className="snap-start shrink-0 w-[175px] sm:w-[200px] flex flex-col">
                        <Skeleton />
                      </div>
                    ))}
              </div>
            </div>
          ) : (
            <div className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide pb-2 items-stretch" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="shrink-0 w-[175px] sm:w-[200px] flex flex-col">
                  <Skeleton />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
