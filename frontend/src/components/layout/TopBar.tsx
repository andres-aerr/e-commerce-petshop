export default function TopBar() {
  return (
    <div className="bg-primary text-white text-xs font-sans">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-8">
        <p>🐾 Envio gratis sobre $35.000 CLP</p>
        <div className="hidden sm:flex items-center gap-4">
          <a href="/contacto" className="hover:text-secondary transition-colors">
            Contacto
          </a>
          <a href="/faq" className="hover:text-secondary transition-colors">
            FAQ
          </a>
        </div>
      </div>
    </div>
  );
}
