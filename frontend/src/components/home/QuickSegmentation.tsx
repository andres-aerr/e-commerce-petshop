const segments = [
  {
    pet: 'Perros',
    emoji: '🐕',
    description: 'Alimentos, accesorios y cuidado para tu perro',
    href: '/products?pet_type=dog',
  },
  {
    pet: 'Gatos',
    emoji: '🐈',
    description: 'Todo lo que tu gato necesita para estar feliz',
    href: '/products?pet_type=cat',
  },
];

export default function QuickSegmentation() {
  return (
    <section className="bg-white py-12 px-6 md:py-16 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-h2 text-center mb-10">
          ¿Que mascota tienes?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {segments.map((segment) => (
            <a
              key={segment.pet}
              href={segment.href}
              className="group flex flex-col items-center p-8 border border-gray-light rounded-lg hover:border-accent transition-colors"
            >
              <span className="text-6xl mb-4">{segment.emoji}</span>
              <h3 className="font-sans text-2xl font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
                {segment.pet}
              </h3>
              <p className="font-sans text-gray-dark text-sm text-center">
                {segment.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
