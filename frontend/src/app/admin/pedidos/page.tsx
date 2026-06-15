'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Filter } from 'lucide-react';
import type { AdminOrder, OrderStatus } from '@/lib/admin';
import { getOrders } from '@/lib/admin';
import { formatCurrency, formatDateTime } from '@/lib/admin/format';
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/lib/admin';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';

const STATUS_FILTERS: Array<{ value: OrderStatus | ''; label: string }> = [
  { value: '', label: 'Todos' },
  { value: 'pending', label: 'Pendientes' },
  { value: 'confirmed', label: 'Confirmados' },
  { value: 'preparing', label: 'Preparando' },
  { value: 'in_transit', label: 'En tránsito' },
  { value: 'delivered', label: 'Entregados' },
  { value: 'cancelled', label: 'Cancelados' },
];

export default function PedidosPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | ''>('');

  useEffect(() => {
    setLoading(true);
    getOrders({ status: statusFilter || undefined }).then((res) => {
      setOrders(res.orders);
      setTotal(res.total);
      setLoading(false);
    });
  }, [statusFilter]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-light rounded" />
          <div className="h-80 bg-gray-light rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-h2 text-primary">Pedidos</h1>
          <p className="text-sm text-gray-dark mt-1">{total} pedidos</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
        <Filter className="w-4 h-4 text-gray-dark shrink-0" />
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setStatusFilter(f.value)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              statusFilter === f.value
                ? 'bg-accent text-white'
                : 'bg-white border border-gray-light text-gray-dark hover:bg-gray-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <DataTable
        columns={[
          {
            key: 'id',
            label: 'Pedido',
            sortable: true,
            render: (o: AdminOrder) => (
              <span className="font-mono text-sm font-medium text-primary">#{o.id}</span>
            ),
          },
          {
            key: 'user',
            label: 'Cliente',
            sortable: true,
            render: (o: AdminOrder) => (
              <div>
                <p className="text-sm font-medium text-primary">
                  {o.user.first_name ?? ''} {o.user.last_name ?? ''}
                </p>
                <p className="text-xs text-gray-dark">{o.user.email}</p>
              </div>
            ),
          },
          {
            key: 'total',
            label: 'Total',
            sortable: true,
            render: (o: AdminOrder) => (
              <span className="font-semibold text-primary">{formatCurrency(o.total)}</span>
            ),
          },
          {
            key: 'status',
            label: 'Estado',
            render: (o: AdminOrder) => (
              <StatusBadge
                label={ORDER_STATUS_LABELS[o.status]}
                className={ORDER_STATUS_COLORS[o.status]}
              />
            ),
          },
          {
            key: 'payment_method',
            label: 'Pago',
            render: (o: AdminOrder) =>
              o.payment_method ? (
                <span className="text-sm text-gray-dark capitalize">
                  {o.payment_method.replace('_', ' ')}
                </span>
              ) : (
                <span className="text-xs text-gray-dark">-</span>
              ),
          },
          {
            key: 'created_at',
            label: 'Fecha',
            sortable: true,
            render: (o: AdminOrder) => (
              <span className="text-sm text-gray-dark">{formatDateTime(o.created_at)}</span>
            ),
          },
        ]}
        data={orders}
        keyExtractor={(o) => o.id}
        searchable
        searchKeys={['id', 'user.email', 'user.first_name', 'user.last_name']}
        onRowClick={(o) => router.push(`/admin/pedidos/${o.id}`)}
        pageSize={20}
      />
    </div>
  );
}
