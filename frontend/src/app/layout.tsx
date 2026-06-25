import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import QueryProvider from '@/providers/QueryProvider';
import '@/styles/globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TuMarca | Nutricion honesta para tu mascota',
  description:
    'Alimento premium, entrega sin friccion y servicio que te quita preocupaciones.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${plusJakarta.variable} font-sans flex flex-col min-h-screen`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
