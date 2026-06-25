'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { AdminDeliveryOrder } from '@/lib/admin';
import { getDeliveryOrder, updateDeliveryOrder } from '@/lib/admin';
import { formatCurrency, formatDate, formatDateTime } from '@/lib/admin/format';
import { DELIVERY_STATUS_LABELS, DELIVERY_STATUS_COLORS } from '@/lib/admin';
import StatusBadge from '@/components/admin/StatusBadge';
import OrdenDespachoForm from '../OrdenDespachoForm';

export default function DespachoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [delivery, setDelivery] = useState<AdminDeliveryOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getDeliveryOrder(id).then((d) => {
      setDelivery(d);
      setLoading(false);
    });
  }, [id]);

  async function handleStatusChange(
    newStatus: AdminDeliveryOrder['status']
  ) {
    if (!delivery) return;
    const updated = await updateDeliveryOrder(delivery.id, { status: newStatus });
    if (updated) setDelivery(updated);
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-light rounded" />
          <div className="h-64 bg-gray-light rounded-lg" />
        </div>
      </div>
    );
  }

  if (!delivery) {
    return (
      <div className="p-6">
        <p className="text-gray-dark">Despacho no encontrado</p>
      </div>
    );
  }

  if (editing) {
    return <OrdenDespachoForm order={delivery} />;
  }

  const canAssign = delivery.status === 'pending_assignment';
  const canDeliver = delivery.status === 'assigned' || delivery.status === 'in_transit';

  return (
    <div className="p-6 max-w-3xl">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.push('/admin/despachos')}
          className="p-2 rounded-lg hover:bg-gray-200 text-gray-dark transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-h2 text-primary">Despacho #{delivery.id}</h1>
            <StatusBadge
              label={DELIVERY_STATUS_LABELS[delivery.status]}
              className={DELIVERY_STATUS_COLORS[delivery.status]}
            />
          </div>
          <p className="text-sm text-gray-dark mt-1">
            Creado {formatDateTime(delivery.created_at)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-light p-5 space-y-3">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">
            Pedido
          </h2>
          <div>
            <p className="text-xs text-gray-dark">ID Pedido</p>
            <p className="text-sm font-mono font-medium text-primary">{delivery.order_id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-dark">Total</p>
            <p className="text-lg font-bold text-primary">
              {formatCurrency(delivery.order_total)}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-light p-5 space-y-3">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">
            Cliente
          </h2>
          <div>
            <p className="text-xs text-gray-dark">Nombre</p>
            <p className="text-sm font-medium text-primary">{delivery.customer_name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-dark">Dirección</p>
            <p className="text-sm text-primary">{delivery.delivery_address}</p>
          </div>
          <div>
            <p className="text-xs text-gray-dark">Comuna</p>
            <p className="text-sm text-primary">{delivery.commune}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-light p-5 space-y-3">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">
            Repartidor
          </h2>
          {delivery.delivery_person ? (
            <div>
              <p className="text-xs text-gray-dark">Asignado a</p>
              <p className="text-sm font-medium text-primary">{delivery.delivery_person}</p>
            </div>
          ) : (
            <p className="text-sm text-gray-dark">Sin asignar</p>
          )}
          {delivery.scheduled_date && (
            <div>
              <p className="text-xs text-gray-dark">Programado</p>
              <p className="text-sm font-medium text-primary">
                {formatDate(delivery.scheduled_date)}
              </p>
            </div>
          )}
          {delivery.delivered_at && (
            <div>
              <p className="text-xs text-gray-dark">Entregado</p>
              <p className="text-sm font-medium text-green-600">
                {formatDateTime(delivery.delivered_at)}
              </p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg border border-gray-light p-5 space-y-3">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">
            Notas
          </h2>
          {delivery.notes ? (
            <p className="text-sm text-primary">{delivery.notes}</p>
          ) : (
            <p className="text-sm text-gray-dark">Sin notas</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 flex-wrap">
        <button
          onClick={() => setEditing(true)}
          className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          Editar despacho
        </button>

        {canAssign && (
          <button
            onClick={() => handleStatusChange('assigned')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            Marcar como asignado
          </button>
        )}

        {delivery.status === 'assigned' && (
          <button
            onClick={() => handleStatusChange('in_transit')}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors"
          >
            Marcar en tránsito
          </button>
        )}

        {canDeliver && (
          <button
            onClick={() => handleStatusChange('delivered')}
            className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
          >
            Marcar como entregado
          </button>
        )}

        {delivery.status !== 'cancelled' && delivery.status !== 'delivered' && (
          <button
            onClick={() => handleStatusChange('cancelled')}
            className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
          >
            Cancelar despacho
          </button>
        )}
      </div>
    </div>
  );
}
