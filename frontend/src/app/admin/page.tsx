'use client';

import { useEffect, useState } from 'react';
import {
  ShoppingCart,
  DollarSign,
  Package,
  TrendingUp,
  Calendar,
} from 'lucide-react';
import type { DashboardMetrics } from '@/lib/admin';
import { getDashboardMetrics } from '@/lib/admin';
import StatCard from '@/components/admin/StatCard';
import StatusBadge from '@/components/admin/StatusBadge';
import {
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
} from '@/lib/admin';
import { formatCurrency } from '@/lib/admin/format';

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardMetrics().then((data) => {
      setMetrics(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-gray-light rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-28 bg-gray-light rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!metrics) return null;

  const maxRevenue = Math.max(...metrics.revenue_last_7_days.map((d) => d.revenue));

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-h2 text-primary">Dashboard</h1>
        <p className="text-sm text-gray-dark mt-1">Resumen de tu tienda</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Ventas hoy"
          value={formatCurrency(metrics.total_revenue_today)}
          subtitle={`${metrics.total_orders_today} pedidos`}
          icon={<DollarSign className="w-5 h-5" />}
        />
        <StatCard
          title="Ventas esta semana"
          value={formatCurrency(metrics.total_revenue_week)}
          subtitle={`${metrics.total_orders_week} pedidos`}
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <StatCard
          title="Ventas este mes"
          value={formatCurrency(metrics.total_revenue_month)}
          subtitle={`${metrics.total_orders_month} pedidos`}
          icon={<Calendar className="w-5 h-5" />}
        />
        <StatCard
          title="Total pedidos"
          value={metrics.total_orders_month}
          subtitle="este mes"
          icon={<Package className="w-5 h-5" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-light p-5">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            Ventas últimos 7 días
          </h2>
          <div className="flex items-end gap-2 h-40">
            {metrics.revenue_last_7_days.map((day) => {
              const pct = maxRevenue > 0 ? (day.revenue / maxRevenue) * 100 : 0;
              const d = new Date(day.date + 'T00:00:00');
              const label = d.toLocaleDateString('es-CL', { weekday: 'short' });
              return (
                <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs text-gray-dark font-medium">
                    {formatCurrency(day.revenue)}
                  </span>
                  <div
                    className="w-full rounded-md bg-accent/70 transition-all hover:bg-accent"
                    style={{ height: `${Math.max(pct, 4)}%` }}
                  />
                  <span className="text-xs text-gray-dark capitalize">{label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-light p-5">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            Pedidos por estado
          </h2>
          <div className="space-y-3">
            {(Object.entries(ORDER_STATUS_LABELS) as [string, string][]).map(
              ([status, label]) => {
                const count =
                  metrics.orders_by_status[status as keyof typeof metrics.orders_by_status] ?? 0;
                return (
                  <div key={status} className="flex items-center justify-between">
                    <StatusBadge
                      label={label}
                      className={ORDER_STATUS_COLORS[status as keyof typeof ORDER_STATUS_COLORS]}
                    />
                    <span className="text-sm font-semibold text-primary">{count}</span>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-light p-5">
        <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
          Productos más vendidos
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-light">
                <th className="text-left py-3 px-2 text-xs font-semibold text-gray-dark uppercase">
                  Producto
                </th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-gray-dark uppercase">
                  Unidades vendidas
                </th>
                <th className="text-right py-3 px-2 text-xs font-semibold text-gray-dark uppercase">
                  Ingresos
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-light">
              {metrics.top_products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="py-3 px-2 font-medium text-primary">{p.name}</td>
                  <td className="py-3 px-2 text-right text-gray-dark">{p.total_sold}</td>
                  <td className="py-3 px-2 text-right font-semibold text-primary">
                    {formatCurrency(p.revenue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
