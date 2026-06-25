'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft, Package, MapPin, CreditCard, Truck } from 'lucide-react';
import type { AdminOrder, OrderStatus } from '@/lib/admin';
import { getOrder, updateOrderStatus } from '@/lib/admin';
import { formatCurrency, formatDate } from '@/lib/admin/format';
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/lib/admin';
import StatusBadge from '@/components/admin/StatusBadge';

const STATUS_TRANSITIONS: Array<{ from: OrderStatus[]; to: OrderStatus; label: string }> = [
  { from: ['pending'], to: 'confirmed', label: 'Confirmar pedido' },
  { from: ['confirmed'], to: 'preparing', label: 'Marcar en preparación' },
  { from: ['preparing'], to: 'in_transit', label: 'Marcar en tránsito' },
  { from: ['in_transit'], to: 'delivered', label: 'Marcar entregado' },
  { from: ['pending', 'confirmed'], to: 'cancelled', label: 'Cancelar pedido' },
];

export default function PedidoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [order, setOrder] = useState<AdminOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrder(id).then((o) => {
      setOrder(o);
      setLoading(false);
    });
  }, [id]);

  async function handleStatusChange(newStatus: OrderStatus) {
    if (!order) return;
    const updated = await updateOrderStatus(order.id, newStatus);
    if (updated) setOrder(updated);
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-light rounded" />
          <div className="h-96 bg-gray-light rounded-lg" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6">
        <p className="text-gray-dark">Pedido no encontrado</p>
      </div>
    );
  }

  const availableTransitions = STATUS_TRANSITIONS.filter((t) =>
    t.from.includes(order.status)
  );

  return (
    <div className="p-6 max-w-5xl">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.push('/admin/pedidos')}
          className="p-2 rounded-lg hover:bg-gray-200 text-gray-dark transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-h2 text-primary">Pedido #{order.id}</h1>
            <StatusBadge
              label={ORDER_STATUS_LABELS[order.status]}
              className={ORDER_STATUS_COLORS[order.status]}
            />
          </div>
          <p className="text-sm text-gray-dark mt-1">
            Creado el {formatDate(order.created_at)} —{' '}
            {order.delivered_at ? `Entregado ${formatDate(order.delivered_at)}` : ''}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="bg-white rounded-lg border border-gray-light p-5">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
              <Package className="w-4 h-4" />
              Productos
            </h2>
            <div className="divide-y divide-gray-light">
              {order.items.map((item) => (
                <div key={item.id} className="py-3 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gray-light overflow-hidden shrink-0">
                    {item.product_image ? (
                      <img
                        src={item.product_image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-dark text-xs">
                        -
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-primary truncate">
                      {item.product_name}
                    </p>
                    <p className="text-xs text-gray-dark">
                      {item.quantity} x {formatCurrency(item.price_at_purchase)}
                      {item.is_autoship && (
                        <span className="ml-1 text-green-600 font-medium">(Auto)</span>
                      )}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-primary">
                    {formatCurrency(item.quantity * item.price_at_purchase)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="bg-white rounded-lg border border-gray-light p-5">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
              Totales
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-1">
                <span className="text-gray-dark">Subtotal</span>
                <span className="font-medium text-primary">{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-dark">Envío</span>
                <span className="font-medium text-primary">
                  {formatCurrency(order.shipping_cost)}
                </span>
              </div>
              {order.tax > 0 && (
                <div className="flex justify-between py-1">
                  <span className="text-gray-dark">Impuestos</span>
                  <span className="font-medium text-primary">{formatCurrency(order.tax)}</span>
                </div>
              )}
              <div className="border-t border-gray-light pt-2 flex justify-between font-semibold text-primary">
                <span>Total</span>
                <span className="text-lg">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Status transitions */}
          {availableTransitions.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-light p-5">
              <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                <Truck className="w-4 h-4" />
                Cambiar estado
              </h2>
              <div className="flex flex-wrap gap-2">
                {availableTransitions.map((t) => (
                  <button
                    key={t.to}
                    onClick={() => handleStatusChange(t.to)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      t.to === 'cancelled'
                        ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                        : t.to === 'delivered'
                        ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                        : 'bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* Customer info */}
          <div className="bg-white rounded-lg border border-gray-light p-5">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Cliente
            </h2>
            <p className="text-sm font-medium text-primary">
              {order.user.first_name} {order.user.last_name}
            </p>
            <p className="text-sm text-gray-dark">{order.user.email}</p>
          </div>

          {/* Shipping */}
          <div className="bg-white rounded-lg border border-gray-light p-5">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Dirección de envío
            </h2>
            <div className="text-sm space-y-1">
              <p className="font-medium text-primary">
                {order.shipping_address.full_name}
              </p>
              <p className="text-gray-dark">
                {order.shipping_address.street} {order.shipping_address.number}
                {order.shipping_address.apartment ? `, ${order.shipping_address.apartment}` : ''}
              </p>
              <p className="text-gray-dark">
                {order.shipping_address.commune}, {order.shipping_address.city}
              </p>
            </div>
            {order.estimated_delivery_date && (
              <div className="mt-3 pt-3 border-t border-gray-light">
                <p className="text-xs text-gray-dark">Entrega estimada</p>
                <p className="text-sm font-medium text-primary">
                  {formatDate(order.estimated_delivery_date)}
                </p>
              </div>
            )}
          </div>

          {/* Payment */}
          <div className="bg-white rounded-lg border border-gray-light p-5">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Pago
            </h2>
            <p className="text-sm font-medium text-primary capitalize">
              {order.payment_method?.replace('_', ' ') ?? 'Pendiente'}
            </p>
            {order.tracking_number && (
              <div className="mt-3 pt-3 border-t border-gray-light">
                <p className="text-xs text-gray-dark">N° seguimiento</p>
                <p className="text-sm font-mono text-primary">{order.tracking_number}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
