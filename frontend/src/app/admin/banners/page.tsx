'use client';

import { useEffect, useState } from 'react';
import { Plus, GripVertical, Eye, EyeOff, Trash2 } from 'lucide-react';
import type { AdminBanner } from '@/lib/admin';
import { getBanners, createBanner, updateBanner, deleteBanner } from '@/lib/admin';
import ImageUploader from '@/components/admin/ImageUploader';
import ConfirmModal from '@/components/admin/ConfirmModal';
import StatusBadge from '@/components/admin/StatusBadge';

export default function BannersPage() {
  const [banners, setBanners] = useState<AdminBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);

  const [editForm, setEditForm] = useState({
    title: '',
    subtitle: '',
    cta_text: '',
    cta_link: '',
    image_url: '',
  });

  useEffect(() => {
    getBanners().then((data) => {
      setBanners(data);
      setLoading(false);
    });
  }, []);

  function startEdit(banner: AdminBanner) {
    setEditingId(banner.id);
    setEditForm({
      title: banner.title,
      subtitle: banner.subtitle ?? '',
      cta_text: banner.cta_text,
      cta_link: banner.cta_link,
      image_url: banner.image_url,
    });
  }

  async function handleSave(id: string) {
    await updateBanner(id, {
      ...editForm,
      subtitle: editForm.subtitle || null,
    });
    setBanners((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              ...editForm,
              subtitle: editForm.subtitle || null,
            }
          : b
      )
    );
    setEditingId(null);
  }

  async function handleToggleActive(banner: AdminBanner) {
    const updated = await updateBanner(banner.id, { is_active: !banner.is_active });
    if (updated) {
      setBanners((prev) => prev.map((b) => (b.id === banner.id ? updated : b)));
    }
  }

  async function handleCreate() {
    const newBanner = await createBanner({
      title: 'Nuevo banner',
      cta_text: 'Ver más',
      cta_link: '/products',
      image_url: '',
    });
    setBanners((prev) => [...prev, newBanner]);
    setShowNew(false);
    startEdit(newBanner);
  }

  async function handleDelete() {
    if (!deleteId) return;
    await deleteBanner(deleteId);
    setBanners((prev) => prev.filter((b) => b.id !== deleteId));
    setDeleteId(null);
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

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-h2 text-primary">Banners</h1>
          <p className="text-sm text-gray-dark mt-1">
            {banners.length} banners — Gestiona las imágenes del hero
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuevo banner
        </button>
      </div>

      <div className="space-y-4">
        {banners
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((banner) => (
            <div
              key={banner.id}
              className="bg-white rounded-lg border border-gray-light overflow-hidden"
            >
              {editingId === banner.id ? (
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-primary">Editando banner</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSave(banner.id)}
                        className="px-3 py-1.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent/90"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1.5 border border-gray-light rounded-lg text-sm text-gray-dark hover:bg-gray-50"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-primary mb-1">
                          Título
                        </label>
                        <input
                          type="text"
                          value={editForm.title}
                          onChange={(e) =>
                            setEditForm((f) => ({ ...f, title: e.target.value }))
                          }
                          className="w-full px-3 py-2 border border-gray-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-primary mb-1">
                          Subtítulo
                        </label>
                        <input
                          type="text"
                          value={editForm.subtitle}
                          onChange={(e) =>
                            setEditForm((f) => ({ ...f, subtitle: e.target.value }))
                          }
                          className="w-full px-3 py-2 border border-gray-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-primary mb-1">
                            Texto CTA
                          </label>
                          <input
                            type="text"
                            value={editForm.cta_text}
                            onChange={(e) =>
                              setEditForm((f) => ({ ...f, cta_text: e.target.value }))
                            }
                            className="w-full px-3 py-2 border border-gray-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-primary mb-1">
                            Link CTA
                          </label>
                          <input
                            type="text"
                            value={editForm.cta_link}
                            onChange={(e) =>
                              setEditForm((f) => ({ ...f, cta_link: e.target.value }))
                            }
                            className="w-full px-3 py-2 border border-gray-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <ImageUploader
                        currentImage={editForm.image_url}
                        onImageChange={(url) =>
                          setEditForm((f) => ({ ...f, image_url: url }))
                        }
                        label="Imagen del banner"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 p-4">
                  <GripVertical className="w-4 h-4 text-gray-light shrink-0" />
                  <div className="w-24 h-16 rounded-lg bg-gray-light overflow-hidden shrink-0">
                    {banner.image_url ? (
                      <img
                        src={banner.image_url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-dark text-xs">
                        Sin imagen
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-primary truncate">
                      {banner.title || 'Sin título'}
                    </p>
                    {banner.subtitle && (
                      <p className="text-xs text-gray-dark truncate">{banner.subtitle}</p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <StatusBadge
                        label={banner.is_active ? 'Activo' : 'Inactivo'}
                        className={
                          banner.is_active
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-dark'
                        }
                      />
                      <span className="text-xs text-gray-dark">
                        Orden: {banner.sort_order}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleToggleActive(banner)}
                      className="p-1.5 rounded hover:bg-gray-100 text-gray-dark hover:text-accent transition-colors"
                      title={banner.is_active ? 'Desactivar' : 'Activar'}
                    >
                      {banner.is_active ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => startEdit(banner)}
                      className="px-3 py-1.5 text-sm font-medium text-accent hover:bg-accent/5 rounded-lg transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => setDeleteId(banner.id)}
                      className="p-1.5 rounded hover:bg-red-50 text-gray-dark hover:text-red-500 transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>

      <ConfirmModal
        open={!!deleteId}
        title="Eliminar banner"
        message="¿Estás seguro de eliminar este banner?"
        confirmLabel="Eliminar"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
