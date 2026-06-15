'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const slides = [
  {
    image: '/images/banners/banner-perro.jpg',
    title: 'Comida natural que ama tu perro',
    subtitle: 'Ingredientes reales, sin granos ni rellenos. La nutrición que merece tu mejor amigo.',
    cta: 'Explorar Catálogo',
    href: '/products',
  },
  {
    image: '/images/banners/banner-gato.jpg',
    title: 'Envío gratis en tu primera compra',
    subtitle: 'Aprovecha esta oferta por tiempo limitado. Lleva lo mejor para tu mascota sin costo de envío.',
    cta: 'Aprovechar oferta',
    href: '/products',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, paused]);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-accent/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 pt-6 pb-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-[2]">
          <div className="relative h-[280px] md:h-[300px] rounded-2xl overflow-hidden">
            <div
              className="flex h-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {slides.map((slide, i) => (
                <div key={i} className="relative min-w-full h-full flex-shrink-0">
                  <Image
                    src={slide.image}
                    alt=""
                    fill
                    className="object-cover"
                    priority={i === 0}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="relative z-10 w-full h-full flex items-center px-8">
                    <div className="max-w-lg">
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-sans font-semibold text-white mb-2 leading-tight">
                        {slide.title}
                      </h2>
                      <p className="font-sans text-sm md:text-base text-white/80 mb-4 leading-relaxed max-w-md">
                        {slide.subtitle}
                      </p>
                      <a
                        href={slide.href}
                        className="inline-block bg-accent hover:bg-accent/90 font-sans font-semibold text-sm px-6 py-3 rounded-lg text-white transition-colors"
                      >
                        {slide.cta}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mt-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === current
                    ? 'bg-accent w-6'
                    : 'bg-gray-light hover:bg-gray-dark'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
            <button
              onClick={() => setPaused(!paused)}
              className={`ml-2 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                paused
                  ? 'bg-accent text-white'
                  : 'bg-gray-light hover:bg-gray-dark'
              }`}
              aria-label={paused ? 'Reanudar' : 'Pausar'}
            >
              {paused ? (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              ) : (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              )}
            </button>
          </div>

          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-sm transition-all opacity-0 md:opacity-100 z-10"
            aria-label="Siguiente"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="flex-1 relative">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
          <div className="glass-card relative h-[280px] md:h-[300px] p-6 flex flex-col">
            <div className="absolute bottom-0 right-0 w-44 h-44 md:w-48 md:h-48 pointer-events-none">
              <Image
                src="/images/banners/perro-gato-card-hero.png"
                alt=""
                fill
                className="object-contain object-right-bottom"
              />
            </div>
            <div className="relative z-10 flex flex-col h-full pt-10 md:pt-14">
              <p className="font-sans text-sm font-bold text-primary/60 uppercase tracking-wider">
                Oferta especial
              </p>
              <h3 className="text-3xl md:text-4xl font-sans font-extrabold text-accent leading-tight mt-1 drop-shadow-[0_2px_12px_rgba(237,100,53,0.4)]">
                Ahorra 10%
              </h3>
              <p className="font-sans text-base font-bold text-primary/70 mt-1">
                en tu primer pedido
              </p>
              <a
                href="/products"
                className="self-start bg-accent hover:bg-accent/90 font-sans font-semibold text-sm px-4 py-2.5 mt-auto rounded-lg text-white transition-colors"
              >
                Comprar ahora
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>
      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.5),
            inset 0 -1px 0 rgba(255, 255, 255, 0.1),
            inset 0 0 12px 6px rgba(255, 255, 255, 0.6);
          position: relative;
          overflow: hidden;
        }

        .glass-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.8),
            transparent
          );
        }

        .glass-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 1px;
          height: 100%;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.8),
            transparent,
            rgba(255, 255, 255, 0.3)
          );
        }

      `}</style>
    </section>
  );
}
