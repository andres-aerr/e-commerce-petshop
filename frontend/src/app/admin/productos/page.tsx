'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import type { AdminProduct } from '@/lib/admin';
import { getProducts, deleteProduct } from '@/lib/admin';
import { getCategories, type Category } from '@/lib/api';
import { formatCurrency } from '@/lib/admin/format';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import ConfirmModal from '@/components/admin/ConfirmModal';

export default function ProductosPage() {
  const router = useRouter();
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [subcategoryFilter, setSubcategoryFilter] = useState('');

  const selectedCategoryChildren = useMemo(
    () => categories.find((c) => c.name === categoryFilter)?.children ?? [],
    [categories, categoryFilter]
  );

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (categoryFilter && p.category_name !== categoryFilter) return false;
      if (subcategoryFilter && p.subcategory_name !== subcategoryFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.sku.toLowerCase().includes(q)
        ) return false;
      }
      return true;
    });
  }, [products, categoryFilter, subcategoryFilter, search]);

  useEffect(() => {
    Promise.all([
      getProducts(),
      getCategories().catch(() => []),
    ]).then(([productData, categoryData]) => {
      setProducts(productData);
      setCategories(categoryData);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setSubcategoryFilter('');
  }, [categoryFilter]);

  async function handleDelete() {
    if (!deleteId) return;
    await deleteProduct(deleteId);
    setProducts((prev) => prev.filter((p) => p.id !== deleteId));
    setDeleteId(null);
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-light rounded" />
          <div className="h-10 w-32 bg-gray-light rounded-lg" />
          <div className="h-80 bg-gray-light rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-h2 text-primary">Productos</h1>
          <p className="text-sm text-gray-dark mt-1">{filteredProducts.length} productos</p>
        </div>
        <button
          onClick={() => router.push('/admin/productos/nuevo')}
          className="flex items-center gap-2 px-4 py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuevo producto
        </button>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-dark" />
          <input
            type="text"
            placeholder="Buscar por nombre o SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 border border-gray-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent bg-white"
        >
          <option value="">Todas las categorías</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </select>

        <select
          value={subcategoryFilter}
          onChange={(e) => setSubcategoryFilter(e.target.value)}
          className="px-3 py-2 border border-gray-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent bg-white disabled:opacity-50"
          disabled={!categoryFilter}
        >
          <option value="">Todas las subcategorías</option>
          {selectedCategoryChildren.map((s) => (
            <option key={s.id} value={s.name}>{s.name}</option>
          ))}
        </select>
      </div>

      <DataTable
        columns={[
          {
            key: 'image_url',
            label: '',
            render: (p: AdminProduct) => (
              <div className="w-10 h-10 rounded-lg bg-gray-light overflow-hidden">
                {p.image_url ? (
                  <img src={p.image_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-dark text-xs">
                    -
                  </div>
                )}
              </div>
            ),
          },
          {
            key: 'name',
            label: 'Nombre',
            sortable: true,
            render: (p: AdminProduct) => (
              <div>
                <p className="font-medium text-primary">{p.name}</p>
                <p className="text-xs text-gray-dark">SKU: {p.sku}</p>
              </div>
            ),
          },
          {
            key: 'category_name',
            label: 'Categoría',
            sortable: true,
            render: (p: AdminProduct) => (
              <div>
                <p className="text-sm text-primary">{p.category_name}</p>
                {p.subcategory_name && (
                  <p className="text-xs text-gray-dark">{p.subcategory_name}</p>
                )}
              </div>
            ),
          },
          {
            key: 'price_one_time',
            label: 'Precio',
            sortable: true,
            render: (p: AdminProduct) => (
              <div>
                <p className="font-semibold text-primary">{formatCurrency(p.price_one_time)}</p>
                {p.price_autoship > 0 && (
                  <p className="text-xs text-green-600">Auto: {formatCurrency(p.price_autoship)}</p>
                )}
              </div>
            ),
          },
          {
            key: 'stock_quantity',
            label: 'Stock',
            sortable: true,
            className: 'text-center',
            render: (p: AdminProduct) => (
              <span
                className={`font-medium ${
                  p.stock_quantity <= 5 ? 'text-red-500' : 'text-primary'
                }`}
              >
                {p.stock_quantity}
              </span>
            ),
          },
          {
            key: 'is_published',
            label: 'Estado',
            render: (p: AdminProduct) =>
              p.is_published ? (
                <StatusBadge label="Publicado" className="bg-green-100 text-green-700" />
              ) : (
                <StatusBadge
                  label="Borrador"
                  className="bg-gray-100 text-gray-dark"
                  dot={false}
                />
              ),
          },
          {
            key: 'badge',
            label: 'Badge',
            render: (p: AdminProduct) =>
              p.badge ? (
                <StatusBadge label={p.badge} className="bg-accent/10 text-accent" />
              ) : (
                <span className="text-gray-dark text-xs">-</span>
              ),
          },
          {
            key: 'acciones',
            label: '',
            render: (p: AdminProduct) => (
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/admin/productos/${p.id}`);
                  }}
                  className="p-1.5 rounded hover:bg-gray-100 text-gray-dark hover:text-accent transition-colors"
                  title="Editar"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteId(p.id);
                  }}
                  className="p-1.5 rounded hover:bg-red-50 text-gray-dark hover:text-red-500 transition-colors"
                  title="Eliminar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ),
          },
        ]}
        data={filteredProducts}
        keyExtractor={(p) => p.id}
        onRowClick={(p) => router.push(`/admin/productos/${p.id}`)}
        pageSize={15}
      />

      <ConfirmModal
        open={!!deleteId}
        title="Eliminar producto"
        message="¿Estás seguro? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
