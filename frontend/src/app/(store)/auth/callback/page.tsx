'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/auth';

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    const userId = searchParams.get('user_id');
    const email = searchParams.get('email');

    if (token && userId && email) {
      setAuth({ id: userId, email }, token);
      router.push('/');
    } else {
      setError('Error al iniciar sesión con Google');
      setTimeout(() => router.push('/login'), 2000);
    }
  }, [searchParams, setAuth, router]);

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      {error ? (
        <p className="font-sans text-red-500">{error}</p>
      ) : (
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-sans text-gray-dark">Iniciando sesión...</p>
        </div>
      )}
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CallbackContent />
    </Suspense>
  );
}
