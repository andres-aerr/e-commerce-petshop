const footerLinks = [
  {
    title: 'Productos',
    links: [
      { label: 'Alimentos para Perros', href: '/products?pet_type=dog' },
      { label: 'Alimentos para Gatos', href: '/products?pet_type=cat' },
      { label: 'Arenas Sanitarias', href: '/products?category=arenas-sanitarias' },
      { label: 'Accesorios', href: '/products?category=accesorios' },
      { label: 'Nutricion Natural', href: '/products?category=nutricion-natural' },
    ],
  },
  {
    title: 'Ayuda',
    links: [
      { label: 'Contacto', href: '/contacto' },
      { label: 'Preguntas Frecuentes', href: '/faq' },
      { label: 'Politica de Devoluciones', href: '/devoluciones' },
      { label: 'Terminos y Condiciones', href: '/terminos' },
      { label: 'Despacho y Entregas', href: '/despacho' },
    ],
  },
  {
    title: 'Savia',
    links: [
      { label: 'Sobre Nosotros', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Trabaja con Nosotros', href: '/trabaja' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-accent/10 text-accent">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-sans text-sm font-semibold mb-4 uppercase tracking-wider text-accent">
                {group.title}
              </h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-sans text-sm text-accent/70 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-accent/20 mt-8 pt-8 text-center">
          <p className="font-sans text-sm text-accent/50">
            &copy; {new Date().getFullYear()} Savia. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
