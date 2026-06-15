'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductImagesProps {
  images?: string[];
  imageUrl?: string | null;
  name: string;
}

export default function ProductImages({ images, imageUrl, name }: ProductImagesProps) {
  const [selected, setSelected] = useState(0);
  const allImages = images && images.length > 0
    ? images
    : imageUrl
    ? [imageUrl]
    : [null, null, null, null, null];

  return (
    <div>
      <div className="aspect-square bg-white border border-accent rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
        {allImages[selected] ? (
          <Image src={allImages[selected]!} alt={name} fill className="object-contain p-4" />
        ) : (
          <span className="text-6xl">🐾</span>
        )}
      </div>
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`shrink-0 w-16 h-16 rounded-md border-2 transition-colors flex items-center justify-center bg-gray-light overflow-hidden ${
                i === selected ? 'border-accent' : 'border-transparent'
              }`}
            >
              {img ? (
                <Image src={img} alt="" width={64} height={64} className="object-contain w-full h-full p-1" />
              ) : (
                <span className="text-xl">🐾</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
