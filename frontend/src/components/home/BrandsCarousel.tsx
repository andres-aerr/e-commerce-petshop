'use client';

import Image from 'next/image';

const brands = [
  { name: 'Royal Canin', src: '/images/brands/royal-canin.svg' },
  { name: 'Purina', src: '/images/brands/purina.svg' },
  { name: 'Eukanuba', src: '/images/brands/eukanuba.svg' },
  { name: 'IAMS', src: '/images/brands/iams.svg' },
  { name: 'Pedigree', src: '/images/brands/pedigree.svg' },
];

export default function BrandsCarousel() {
  return (
    <section className="bg-white py-4 md:py-8 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-10 -mt-2 md:-mt-4">
        <h2 className="text-h2 font-extrabold text-center">Marcas que trabajamos</h2>
      </div>
      <div className="relative overflow-hidden">
        <div className="flex gap-16 md:gap-20 items-center animate-scroll" style={{ width: 'fit-content' }}>
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="flex-shrink-0 relative"
              style={{ width: '140px', height: '48px' }}
            >
              <Image
                src={brand.src}
                alt={brand.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
