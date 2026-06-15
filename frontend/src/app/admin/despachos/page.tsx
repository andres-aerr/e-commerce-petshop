'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Filter } from 'lucide-react';
import type { AdminDeliveryOrder, DeliveryStatus } from '@/lib/admin';
import { getDeliveryOrders } from '@/lib/admin';
import { formatCurrency, formatDate } from '@/lib/admin/format';
import { DELIVERY_STATUS_LABELS, DELIVERY_STATUS_COLORS } from '@/lib/admin';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';

const STATUS_FILTERS: Array<{ value: DeliveryStatus | ''; label: string }> = [
  { value: '', label: 'Todos' },
  { value: 'pending_assignment', label: 'Sin asignar' },
  { value: 'assigned', label: 'Asignados' },
  { value: 'in_transit', label: 'En tránsito' },
  { value: 'delivered', label: 'Entregados' },
];

export default function DespachosPage() {
  const router = useRouter();
  const [deliveries, setDeliveries] = useState<AdminDeliveryOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<DeliveryStatus | ''>('');

  useEffect(() => {
    setLoading(true);
    getDeliveryOrders({ status: statusFilter || undefined }).then((data) => {
      setDeliveries(data);
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
          <h1 className="text-h2 text-primary">Despachos</h1>
          <p className="text-sm text-gray-dark mt-1">
            {deliveries.length} órdenes de despacho
          </p>
        </div>
        <button
          onClick={() => router.push('/admin/despachos/nuevo')}
          className="flex items-center gap-2 px-4 py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nueva orden de despacho
        </button>
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
            label: 'Despacho',
            render: (d: AdminDeliveryOrder) => (
              <span className="font-mono text-sm font-medium text-primary">#{d.id}</span>
            ),
          },
          {
            key: 'customer_name',
            label: 'Cliente',
            sortable: true,
            render: (d: AdminDeliveryOrder) => (
              <span className="text-sm font-medium text-primary">{d.customer_name}</span>
            ),
          },
          {
            key: 'commune',
            label: 'Comuna',
            render: (d: AdminDeliveryOrder) => (
              <span className="text-sm text-gray-dark">{d.commune}</span>
            ),
          },
          {
            key: 'order_total',
            label: 'Total',
            sortable: true,
            render: (d: AdminDeliveryOrder) => (
              <span className="font-semibold text-primary">{formatCurrency(d.order_total)}</span>
            ),
          },
          {
            key: 'delivery_person',
            label: 'Repartidor',
            render: (d: AdminDeliveryOrder) =>
              d.delivery_person ? (
                <span className="text-sm text-primary">{d.delivery_person}</span>
              ) : (
                <span className="text-xs text-gray-dark">Sin asignar</span>
              ),
          },
          {
            key: 'status',
            label: 'Estado',
            render: (d: AdminDeliveryOrder) => (
              <StatusBadge
                label={DELIVERY_STATUS_LABELS[d.status]}
                className={DELIVERY_STATUS_COLORS[d.status]}
              />
            ),
          },
          {
            key: 'scheduled_date',
            label: 'Fecha',
            render: (d: AdminDeliveryOrder) => (
              <span className="text-sm text-gray-dark">{formatDate(d.scheduled_date)}</span>
            ),
          },
        ]}
        data={deliveries}
        keyExtractor={(d) => d.id}
        searchable
        searchKeys={['customer_name', 'commune', 'delivery_person']}
        onRowClick={(d) => router.push(`/admin/despachos/${d.id}`)}
        pageSize={20}
      />
    </div>
  );
}
