import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  priceOneTime: number;
  quantity: number;
  image?: string;
  isAutoship: boolean;
  frequencyDays?: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, qty?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleAutoship: (id: string) => void;
  setFrequency: (id: string, days: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
  total: (shippingCost?: number) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item, qty) => {
        set((state) => {
          const quantity = qty ?? 1;
          const existing = state.items.find((i) => i.id === item.id && i.isAutoship === item.isAutoship);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id && i.isAutoship === item.isAutoship
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity }] };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) return;
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        }));
      },

      toggleAutoship: (id) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, isAutoship: !i.isAutoship, price: !i.isAutoship ? i.priceOneTime * 0.9 : i.priceOneTime } : i
          ),
        }));
      },

      setFrequency: (id, days) => {
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, frequencyDays: days } : i)),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((acc, i) => acc + i.quantity, 0),

      subtotal: () => get().items.reduce((acc, i) => acc + i.price * i.quantity, 0),

      total: (shippingCost = 0) => get().subtotal() + shippingCost,
    }),
    { name: 'petty-cart' }
  )
);
