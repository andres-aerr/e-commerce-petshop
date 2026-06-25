'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X, ChevronDown, User } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useAuthStore } from '@/store/auth';

interface SubCategory {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  subcategories: SubCategory[];
}

const navItems: NavItem[] = [
  {
    label: 'Perros',
    href: '/products?category=alimento-perro',
    subcategories: [
      { label: 'Alimentos', href: '/products?category=alimento-perro' },
      { label: 'Snacks', href: '/products?category=snack-perro' },
      { label: 'Juguetes', href: '/products?category=juguetes-perro' },
      { label: 'Accesorios', href: '/products?category=accesorios-perro' },
    ],
  },
  {
    label: 'Gatos',
    href: '/products?category=alimento-gato',
    subcategories: [
      { label: 'Alimentos', href: '/products?category=alimento-gato' },
      { label: 'Snacks', href: '/products?category=snack-gato' },
      { label: 'Areneros', href: '/products?category=areneros-gato' },
      { label: 'Juguetes', href: '/products?category=juguetes-gato' },
      { label: 'Accesorios', href: '/products?category=accesorios-gato' },
    ],
  },
  {
    label: 'Mascotas Pequeñas',
    href: '/products?category=alimento-mascotas-pequenas',
    subcategories: [
      { label: 'Alimentos', href: '/products?category=alimento-mascotas-pequenas' },
      { label: 'Snacks', href: '/products?category=snack-mascotas-pequenas' },
      { label: 'Juguetes', href: '/products?category=juguetes-mascotas-pequenas' },
      { label: 'Accesorios', href: '/products?category=accesorios-mascotas-pequenas' },
    ],
  },
  {
    label: 'Aves',
    href: '/products?category=alimento-aves',
    subcategories: [
      { label: 'Alimentos', href: '/products?category=alimento-aves' },
      { label: 'Snacks', href: '/products?category=snack-aves' },
      { label: 'Juguetes', href: '/products?category=juguetes-aves' },
      { label: 'Accesorios', href: '/products?category=accesorios-aves' },
    ],
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileSub, setOpenMobileSub] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const totalItems = useCartStore((s) => s.totalItems());
  const { user, logout } = useAuthStore();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => { setHydrated(true); }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-accent border-b border-accent/50 text-white" suppressHydrationWarning>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <button
            className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center -ml-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <a href="/" className="hidden md:flex items-center gap-2 text-white hover:bg-white/20 rounded-md px-2 py-1.5 -ml-2 transition-colors">
            <span className="text-xl">🐾</span>
            <span className="font-sans text-xl font-semibold tracking-tight">
              TuMarca
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1" ref={dropdownRef}>
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.subcategories.length > 0 && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a
                  href={item.href}
                  className={`flex items-center gap-1 font-sans text-sm font-medium text-white px-3 py-2 rounded-md transition-colors ${
                    openDropdown === item.label ? 'bg-white/20' : 'hover:bg-white/20'
                  }`}
                >
                  {item.label}
                  {item.subcategories.length > 0 && <ChevronDown size={14} className="mt-0.5" />}
                </a>
                {item.subcategories.length > 0 && openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg py-2 min-w-[180px] z-50">
                    {item.subcategories.map((sub) => (
                      <a
                        key={sub.href}
                        href={sub.href}
                        className="block font-sans text-sm text-primary px-4 py-2 hover:bg-accent/10 hover:text-accent transition-colors"
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-white hover:bg-white/20 rounded-md transition-colors"
              aria-label="Buscar"
            >
              <Search size={20} />
            </button>
            {hydrated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-white hover:bg-white/20 rounded-md transition-colors"
                  aria-label="Usuario"
                >
                  <User size={20} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg py-2 min-w-[160px] z-50">
                    <a href="/profile" className="block font-sans text-sm text-primary px-4 py-2 hover:bg-accent/10 transition-colors" onClick={() => setUserMenuOpen(false)}>Mi Perfil</a>
                    <hr className="my-1 border-gray-light" />
                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      className="w-full text-left font-sans text-sm text-primary px-4 py-2 hover:bg-accent/10 transition-colors"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="/login"
                className="font-sans text-sm font-semibold text-accent bg-white px-4 py-2 rounded-full hover:bg-white/90 transition-colors"
              >
                Ingresar
              </a>
            )}
            <a
              href="/cart"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-white hover:bg-white/20 rounded-md transition-colors relative"
              aria-label="Carrito"
            >
              <ShoppingCart size={20} />
              {hydrated && totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-white text-accent text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </a>
          </div>
        </div>

        {searchOpen && (
          <div className="pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full font-sans text-sm text-primary border border-gray-light rounded-md py-2.5 px-4 pl-10 focus:outline-none focus:border-secondary transition-colors"
                autoFocus
              />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-dark" />
            </div>
          </div>
        )}
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-white/20 bg-accent">
          <div className="px-6 py-4 space-y-1">
            <a href="/" className="flex items-center gap-2 text-white py-3 px-3 -mx-3 rounded-md hover:bg-white/20 transition-colors" onClick={() => setMenuOpen(false)}>
              <span className="text-xl">🐾</span>
              <span className="font-sans text-xl font-semibold tracking-tight">TuMarca</span>
            </a>
            <hr className="my-2 border-white/20" />
            {navItems.map((item) => (
              <div key={item.href}>
                <div className="flex items-center justify-between">
                  <a
                    href={item.href}
                    className="block font-sans text-sm font-medium py-3 text-white hover:bg-white/20 rounded-md px-3 -mx-3 transition-colors flex-1"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                  {item.subcategories.length > 0 && (
                    <button
                      onClick={() => setOpenMobileSub(openMobileSub === item.label ? null : item.label)}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center text-white hover:bg-white/20 rounded-md transition-colors"
                      aria-label="Subcategorías"
                    >
                      <ChevronDown size={16} className={`transition-transform ${openMobileSub === item.label ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>
                {item.subcategories.length > 0 && openMobileSub === item.label && (
                  <div className="ml-4 space-y-1 pb-2">
                    {item.subcategories.map((sub) => (
                      <a
                        key={sub.href}
                        href={sub.href}
                        className="block font-sans text-sm text-white/80 py-2 px-3 rounded-md hover:bg-white/20 transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <hr className="my-2 border-white/20" />
            {user ? (
              <>
                <a href="/profile" className="block font-sans text-sm font-medium py-3 text-white hover:bg-white/20 rounded-md px-3 -mx-3 transition-colors" onClick={() => setMenuOpen(false)}>Mi Perfil</a>
                <button onClick={() => { logout(); setMenuOpen(false); }} className="block w-full text-left font-sans text-sm font-medium py-3 text-white hover:bg-white/20 rounded-md px-3 -mx-3 transition-colors">Cerrar Sesión</button>
              </>
            ) : (
              <a href="/login" className="block font-sans text-sm font-medium py-3 text-white hover:bg-white/20 rounded-md px-3 -mx-3 transition-colors" onClick={() => setMenuOpen(false)}>Ingresar</a>
            )}
            <a href="/register" className="block font-sans text-sm font-medium py-3 text-white hover:bg-white/20 rounded-md px-3 -mx-3 transition-colors" onClick={() => setMenuOpen(false)}>Crear Cuenta</a>
            <hr className="my-2 border-white/20" />
            <a
              href="/contacto"
              className="block font-sans text-sm font-medium py-3 text-white hover:bg-white/20 rounded-md px-3 -mx-3 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Contacto
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
