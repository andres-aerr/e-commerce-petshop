'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import type { AdminProduct } from '@/lib/admin';
import { createProduct, updateProduct, CATEGORY_OPTIONS } from '@/lib/admin';
import { formatCurrency, slugify } from '@/lib/admin/format';
import ImageUploader from '@/components/admin/ImageUploader';

interface ProductFormProps {
  product?: AdminProduct;
}

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const isEditing = !!product;
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: product?.name ?? '',
    slug: product?.slug ?? '',
    description: product?.description ?? '',
    category_id: product?.category_id ?? 'cat-1',
    pet_type: product?.pet_type ?? 'dog',
    price_one_time: product?.price_one_time ?? 0,
    price_autoship: product?.price_autoship ?? 0,
    autoship_discount_percentage: product?.autoship_discount_percentage ?? 10,
    stock_quantity: product?.stock_quantity ?? 0,
    cost_price: product?.cost_price ?? 0,
    sku: product?.sku ?? '',
    badge: product?.badge ?? '',
    weight_kg: product?.weight_kg ?? 0,
    is_published: product?.is_published ?? false,
    is_bestseller: product?.is_bestseller ?? false,
    image_url: product?.image_url ?? '',
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function handleNameChange(name: string) {
    if (!isEditing) {
      setForm((prev) => ({
        ...prev,
        name,
        slug: slugify(name),
      }));
    } else {
      setForm((prev) => ({ ...prev, name }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const data = {
      ...form,
      description: form.description || null,
      cost_price: form.cost_price || null,
      badge: form.badge || null,
      weight_kg: form.weight_kg || null,
      image_url: form.image_url || null,
      price_one_time: Number(form.price_one_time),
      price_autoship: Number(form.price_autoship),
      stock_quantity: Number(form.stock_quantity),
      autoship_discount_percentage: Number(form.autoship_discount_percentage),
    };

    try {
      if (isEditing && product) {
        await updateProduct(product.id, data);
      } else {
        await createProduct(data);
      }
      router.push('/admin/productos');
    } catch {
      // Silently handle error in mock
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.push('/admin/productos')}
          className="p-2 rounded-lg hover:bg-gray-200 text-gray-dark transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-h2 text-primary">
            {isEditing ? 'Editar producto' : 'Nuevo producto'}
          </h1>
          {isEditing && product && (
            <p className="text-sm text-gray-dark mt-1">SKU: {product.sku}</p>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-light p-6 space-y-5">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">
            Información básica
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-primary mb-1.5">
                Nombre del producto
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                placeholder="Ej: Royal Canin Maxi Adulto"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Slug</label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">SKU</label>
              <input
                type="text"
                name="sku"
                value={form.sku}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-primary mb-1.5">Descripción</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Categoría</label>
              <select
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent bg-white"
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Tipo de mascota</label>
              <select
                name="pet_type"
                value={form.pet_type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent bg-white"
              >
                <option value="dog">Perro</option>
                <option value="cat">Gato</option>
                <option value="both">Ambos</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Badge</label>
              <input
                type="text"
                name="badge"
                value={form.badge}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                placeholder="Ej: Mas vendido, Nuevo, Premium"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">
                Peso (kg)
              </label>
              <input
                type="number"
                name="weight_kg"
                value={form.weight_kg}
                onChange={handleChange}
                step="0.1"
                min="0"
                className="w-full px-3 py-2 border border-gray-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-light p-6 space-y-5">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">
            Precios y stock
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">
                Precio one-time
              </label>
              <input
                type="number"
                name="price_one_time"
                value={form.price_one_time}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
              {form.price_one_time > 0 && (
                <p className="text-xs text-gray-dark mt-1">
                  {formatCurrency(Number(form.price_one_time))}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">
                Precio autoship
              </label>
              <input
                type="number"
                name="price_autoship"
                value={form.price_autoship}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">
                Descuento auto (%)
              </label>
              <input
                type="number"
                name="autoship_discount_percentage"
                value={form.autoship_discount_percentage}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full px-3 py-2 border border-gray-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">Stock</label>
              <input
                type="number"
                name="stock_quantity"
                value={form.stock_quantity}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1.5">
                Costo (opcional)
              </label>
              <input
                type="number"
                name="cost_price"
                value={form.cost_price}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
              {form.cost_price > 0 && form.price_one_time > 0 && (
                <p className="text-xs text-green-600 mt-1">
                  Margen: {formatCurrency(Number(form.price_one_time) - Number(form.cost_price))}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-light p-6 space-y-5">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">
            Imagen
          </h2>

          <ImageUploader
            currentImage={form.image_url}
            onImageChange={(url) => setForm((prev) => ({ ...prev, image_url: url }))}
            label="Imagen principal del producto"
          />
        </div>

        <div className="bg-white rounded-lg border border-gray-light p-6 space-y-4">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">
            Estado
          </h2>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="is_published"
                checked={form.is_published}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-light text-accent focus:ring-accent/20"
              />
              <span className="text-sm text-primary">Publicado</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="is_bestseller"
                checked={form.is_bestseller}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-light text-accent focus:ring-accent/20"
              />
              <span className="text-sm text-primary">Bestseller</span>
            </label>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Guardando...' : isEditing ? 'Guardar cambios' : 'Crear producto'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/productos')}
            className="px-5 py-2.5 text-sm font-medium text-gray-dark border border-gray-light rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
