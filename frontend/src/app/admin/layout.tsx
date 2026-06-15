import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-50">
        <header className="h-16 bg-white border-b border-gray-light flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3 text-sm text-gray-dark">
            <span className="text-primary font-semibold">Admin</span>
            <span className="text-gray-light">/</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="text-sm text-gray-dark hover:text-accent transition-colors"
              target="_blank"
            >
              Ver tienda →
            </a>
            <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-semibold">
              A
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
