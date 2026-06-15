'use client';

import { ShoppingCart, Trash2, Minus, Plus } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import Link from 'next/link';

function formatPrice(price: number) {
  return `$${price.toLocaleString('es-CL')} CLP`;
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <ShoppingCart size={48} className="mx-auto text-gray-light mb-4" />
        <h1 className="text-h2 mb-2">Tu carrito esta vacio</h1>
        <p className="font-sans text-gray-dark mb-8">Agrega productos para empezar tu compra</p>
        <Link
          href="/products"
          className="bg-accent text-white font-sans font-semibold text-base px-8 py-4 rounded-md inline-block hover:opacity-90 transition-opacity"
        >
          Explorar Catalogo
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-h2 mb-8">Carrito de compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="border border-gray-light rounded-lg p-4 flex gap-4">
              <div className="w-20 h-20 bg-gray-light rounded-md flex items-center justify-center shrink-0">
                <span className="text-2xl">🐾</span>
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/products/${item.slug}`} className="font-sans text-base font-semibold text-primary hover:text-accent transition-colors">
                  {item.name}
                </Link>
                <p className="font-sans text-xs text-gray-dark mt-1">
                  {item.isAutoship ? `Suscripcion - Cada ${item.frequencyDays || 30} dias` : 'Compra unica'}
                </p>
                <p className="font-sans text-sm font-semibold text-accent mt-1">
                  {formatPrice(item.price)}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-dark hover:text-red-500 transition-colors"
                  aria-label="Eliminar"
                >
                  <Trash2 size={16} />
                </button>
                <div className="flex items-center gap-2 border border-gray-light rounded-md">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1.5 hover:text-accent transition-colors"
                    aria-label="Menos"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-sans text-sm font-medium w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1.5 hover:text-accent transition-colors"
                    aria-label="Mas"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={clearCart}
            className="font-sans text-sm text-gray-dark hover:text-red-500 transition-colors"
          >
            Vaciar carrito
          </button>
        </div>

        <div className="border border-gray-light rounded-lg p-6 h-fit sticky top-24">
          <h2 className="font-sans text-lg font-semibold text-primary mb-4">Resumen</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between font-sans text-sm text-primary">
              <span>Subtotal</span>
              <span className="font-semibold">{formatPrice(subtotal())}</span>
            </div>
          </div>
          <Link
            href="/checkout"
            className="block w-full bg-accent text-white font-sans font-semibold text-base py-4 rounded-md text-center hover:opacity-90 transition-opacity min-h-[56px]"
          >
            Ir a pagar
          </Link>
          <Link
            href="/products"
            className="block w-full text-center font-sans text-sm text-primary mt-3 hover:text-secondary transition-colors"
          >
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
