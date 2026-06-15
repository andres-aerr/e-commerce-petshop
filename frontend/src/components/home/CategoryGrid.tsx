'use client';

import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    slug: 'perro',
    label: 'Perro',
    color: '#DCF5DC',
    darkerColor: '#8FD48F',
    image: '/images/categorias/perro-categoria.png',
    href: '/products?pet_type=dog',
  },
  {
    slug: 'gato',
    label: 'Gato',
    color: '#E8DCF5',
    darkerColor: '#B8A8D8',
    image: '/images/categorias/gato-categoria.png',
    href: '/products?pet_type=cat',
  },
  {
    slug: 'mascotas-pequenas',
    label: 'Mascotas Pequeñas',
    color: '#FDE4D4',
    darkerColor: '#F5C8A8',
    image: '/images/categorias/mascotas-pequenas-categoria.png',
    href: '/products?pet_type=small_pet',
  },
  {
    slug: 'peces',
    label: 'Peces',
    color: '#DCE8F8',
    darkerColor: '#A8C8E8',
    image: '/images/categorias/peces-categoria.png',
    href: '/products?pet_type=fish',
  },
  {
    slug: 'aves',
    label: 'Aves',
    color: '#F8F0D8',
    darkerColor: '#E8D8A0',
    image: '/images/categorias/aves-categoria.png',
    href: '/products?pet_type=bird',
  },
];

export default function CategoryGrid() {
  return (
    <section className="bg-white py-12 px-6 md:py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-h2 font-extrabold text-center mb-2">Compra por mascota</h2>
        <p className="font-sans text-gray-dark/70 text-center mb-12 max-w-md mx-auto leading-relaxed">
          Encuentra todo lo que necesitas para tu companero
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 justify-items-center">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.href}
              className="group w-full max-w-[200px]"
            >
              <div
                className="rounded-2xl pt-10 px-5 pb-0 transition-transform duration-300 group-hover:-translate-y-1 w-full"
                style={{ backgroundColor: cat.color }}
              >
                <div className="relative h-28 -mt-14 w-full">
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    className="object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div
                  className="text-center py-2.5 px-4 -mx-5 rounded-b-2xl mt-4"
                  style={{ backgroundColor: cat.darkerColor }}
                >
                  <span className="font-sans text-base font-semibold text-primary">
                    {cat.label}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
