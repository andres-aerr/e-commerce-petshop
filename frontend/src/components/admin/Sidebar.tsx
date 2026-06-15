'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Image,
  FileText,
  Truck,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/productos', label: 'Productos', icon: Package },
  { href: '/admin/pedidos', label: 'Pedidos', icon: ShoppingCart },
  { href: '/admin/banners', label: 'Banners', icon: Image },
  { href: '/admin/contenido', label: 'Contenido', icon: FileText },
  { href: '/admin/despachos', label: 'Despachos', icon: Truck },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={clsx(
        'bg-accent/10 flex flex-col transition-all duration-300 shrink-0 h-screen sticky top-0',
        collapsed ? 'w-16' : 'w-60'
      )}
    >
      <div className="flex items-center h-16 px-4 border-b border-accent/20">
        <Link href="/admin" className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white font-bold text-sm shrink-0">
            S
          </div>
          {!collapsed && (
            <span className="text-accent font-semibold text-base truncate">Savia Admin</span>
          )}
        </Link>
      </div>

      <nav className="flex-1 py-4 space-y-1 px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href + '/'));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-accent text-white font-semibold'
                  : 'bg-accent/5 text-accent/70 hover:bg-accent/20'
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-accent/20">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-accent/50 hover:text-accent hover:bg-accent/10 transition-colors text-sm"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span>Colapsar</span>}
        </button>
      </div>
    </aside>
  );
}
