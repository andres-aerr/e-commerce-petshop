'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import type { AdminDeliveryOrder } from '@/lib/admin';
import { createDeliveryOrder, updateDeliveryOrder, getOrders } from '@/lib/admin';
import { formatCurrency } from '@/lib/admin/format';
import { COMMUNE_OPTIONS } from '@/lib/admin';
import { DELIVERY_STATUS_LABELS, DELIVERY_STATUS_COLORS } from '@/lib/admin';
import StatusBadge from '@/components/admin/StatusBadge';

interface DeliveryFormProps {
  order?: AdminDeliveryOrder;
}

export default function OrdenDespachoForm({ order }: DeliveryFormProps) {
  const router = useRouter();
  const isEditing = !!order;
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    order_id: order?.order_id ?? '',
    customer_name: order?.customer_name ?? '',
    delivery_address: order?.delivery_address ?? '',
    commune: order?.commune ?? '',
    delivery_person: order?.delivery_person ?? '',
    notes: order?.notes ?? '',
    scheduled_date: order?.scheduled_date ?? '',
    status: order?.status ?? 'pending_assignment',
    order_total: order?.order_total ?? 0,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const data = {
      order_id: form.order_id,
      customer_name: form.customer_name,
      delivery_address: form.delivery_address,
      commune: form.commune,
      order_total: Number(form.order_total),
      delivery_person: form.delivery_person || null,
      notes: form.notes || null,
      scheduled_date: form.scheduled_date || null,
    };

    try {
      if (isEditing && order) {
        await updateDeliveryOrder(order.id, {
          ...data,
          status: form.status as AdminDeliveryOrder['status'],
        });
      } else {
        await createDeliveryOrder(data);
      }
      router.push('/admin/despachos');
    } catch {
      // Silently handle error in mock
    } finally {
      setSaving(false);
    }
  }

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
          <h1 className="text-h2 text-primary">
            {isEditing ? 'Editar orden de despacho' : 'Nueva orden de despacho'}
          </h1>
          <p className="text-sm text-gray-dark mt-1">
            {isEditing
              ? `#${order?.id}`
              : 'Crea una orden para que el repartidor externo realice la entrega'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-light p-6 space-y-5">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">
            Información del pedido
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">
                ID del pedido
              </label>
              <input
                type="text"
                name="order_id"
                value={form.order_id}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                placeholder="Ej: ord-001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">
                Total del pedido
              </label>
              <input
                type="number"
                name="order_total"
                value={form.order_total}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
              {Number(form.order_total) > 0 && (
                <p className="text-xs text-gray-dark mt-1">
                  {formatCurrency(Number(form.order_total))}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">
                Nombre del cliente
              </label>
              <input
                type="text"
                name="customer_name"
                value={form.customer_name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Comuna</label>
              <select
                name="commune"
                value={form.commune}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent bg-white"
              >
                <option value="">Seleccionar comuna</option>
                {COMMUNE_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-primary mb-1.5">
                Dirección de entrega
              </label>
              <input
                type="text"
                name="delivery_address"
                value={form.delivery_address}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                placeholder="Ej: Av. Grecia 3456, A-202"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-light p-6 space-y-5">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">
            Asignación
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">
                Repartidor externo
              </label>
              <input
                type="text"
                name="delivery_person"
                value={form.delivery_person}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                placeholder="Nombre del repartidor"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">
                Fecha programada
              </label>
              <input
                type="date"
                name="scheduled_date"
                value={form.scheduled_date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
            </div>

            {isEditing && (
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Estado</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent bg-white"
                >
                  {Object.entries(DELIVERY_STATUS_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-primary mb-1.5">Notas</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none"
                placeholder="Instrucciones para el repartidor..."
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving
              ? 'Guardando...'
              : isEditing
              ? 'Guardar cambios'
              : 'Crear orden de despacho'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/despachos')}
            className="px-5 py-2.5 text-sm font-medium text-gray-dark border border-gray-light rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
