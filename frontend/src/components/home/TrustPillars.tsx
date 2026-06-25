const pillars = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: 'Envio rapido',
    description: 'Entrega en 24-48h en Santiago. Gratis sobre $35.000 CLP.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    title: 'Stock garantizado',
    description: 'Stock permanente de los mejores productos para tu mascota.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    ),
    title: 'Suscripcion flexible',
    description: 'Pausa, modifica o cancela cuando quieras. Sin compromisos.',
  },
];

export default function TrustPillars() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-6 md:pb-6">
      <div className="rounded-2xl border border-gray-light/60 bg-white p-5 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent">
                {pillar.icon}
              </div>
              <div>
                <h3 className="font-sans text-base font-semibold text-primary mb-0.5">
                  {pillar.title}
                </h3>
                <p className="font-sans text-sm text-gray-dark leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
