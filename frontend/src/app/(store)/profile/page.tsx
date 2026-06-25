'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getProfile, updateProfile } from '@/lib/api';
import { useAuthStore } from '@/store/auth';

export default function ProfilePage() {
  const router = useRouter();
  const { user, token, updateUser, logout } = useAuthStore();
  const [form, setForm] = useState({ first_name: '', last_name: '', phone: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }
    getProfile(token)
      .then((data) => {
        setForm({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          phone: data.phone || '',
        });
        updateUser(data);
      })
      .catch(() => {
        logout();
        router.push('/login');
      })
      .finally(() => setLoading(false));
  }, [token, router, updateUser, logout]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');
    setSaving(true);
    try {
      const updated = await updateProfile(token, form);
      updateUser(updated);
      setMessage('Perfil actualizado correctamente');
    } catch (err: any) {
      setMessage(err.message || 'Error al actualizar');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <p className="font-sans text-gray-dark">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-h2 font-extrabold mb-2">Mi Perfil</h1>
      <p className="font-sans text-gray-dark mb-8">{user?.email}</p>
      {message && (
        <p className={`font-sans text-sm mb-4 px-4 py-2 rounded-md border ${
          message === 'Perfil actualizado correctamente'
            ? 'text-green-600 bg-green-50 border-green-200'
            : 'text-red-500 bg-red-50 border-red-200'
        }`}>
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-sans text-sm font-medium text-primary mb-1">Nombre</label>
            <input
              type="text"
              value={form.first_name}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
              className="w-full font-sans text-sm border border-gray-light rounded-md px-4 py-3.5 focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label className="block font-sans text-sm font-medium text-primary mb-1">Apellido</label>
            <input
              type="text"
              value={form.last_name}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
              className="w-full font-sans text-sm border border-gray-light rounded-md px-4 py-3.5 focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>
        <div>
          <label className="block font-sans text-sm font-medium text-primary mb-1">Teléfono</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full font-sans text-sm border border-gray-light rounded-md px-4 py-3.5 focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="bg-accent text-white font-sans font-semibold text-sm px-6 py-3.5 rounded-md hover:bg-accent/90 transition-colors disabled:opacity-50"
        >
          {saving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
        <div className="pt-4">
          <Link href="/" className="font-sans text-sm text-accent font-medium hover:underline">← Volver al inicio</Link>
        </div>
      </form>
    </div>
  );
}
