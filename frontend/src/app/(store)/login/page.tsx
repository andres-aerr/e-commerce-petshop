'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '@/lib/api';
import { useAuthStore } from '@/store/auth';

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login(form);
      setAuth(res.user, res.access_token);
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <h1 className="text-h2 font-extrabold text-center mb-2">Iniciar Sesión</h1>
        <p className="font-sans text-gray-dark text-center mb-8">Accede a tu cuenta</p>
        {error && (
          <p className="font-sans text-sm text-red-500 bg-red-50 border border-red-200 rounded-md px-4 py-2 mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-sans text-sm font-medium text-primary mb-1">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full font-sans text-sm border border-gray-light rounded-md px-4 py-2.5 focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label className="block font-sans text-sm font-medium text-primary mb-1">Contraseña</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full font-sans text-sm border border-gray-light rounded-md px-4 py-2.5 focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-white font-sans font-semibold text-sm py-3 rounded-md hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
        <p className="font-sans text-xs text-gray-dark text-center mt-4">
          Demo - ingresa con cualquier email y contraseña
        </p>
        <p className="font-sans text-sm text-gray-dark text-center mt-6">
          ¿No tienes cuenta?{' '}
          <Link href="/register" className="text-accent font-medium hover:underline">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}
