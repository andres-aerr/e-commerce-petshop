import { getProduct, getProductReviews } from '@/lib/api';
import ProductImages from '@/components/pdp/ProductImages';
import PriceSelector from '@/components/pdp/PriceSelector';
import Reviews from '@/components/pdp/Reviews';
import RelatedProducts from '@/components/pdp/RelatedProducts';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

function formatPrice(price: number) {
  return `$${price.toLocaleString('es-CL')} CLP`;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  let product;
  try {
    product = await getProduct(slug);
  } catch {
    notFound();
  }

  const reviews = await getProductReviews(slug);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <ProductImages name={product.name} imageUrl={product.image_url} images={product.images_json ? JSON.parse(product.images_json) : undefined} />

        <div>
          <p className="font-sans text-xs text-gray-dark mb-2">
            {product.category.name}
          </p>
          <h1 className="text-h1 mb-2">{product.name}</h1>
          {product.weight_kg && (
            <p className="font-sans text-base text-gray-dark mb-1">({product.weight_kg} kg)</p>
          )}
          <div className="flex items-center gap-1 mb-6">
            <span className="text-sm text-orange-400">
              {'★'.repeat(Math.round(product.avg_rating))}
              {'☆'.repeat(5 - Math.round(product.avg_rating))}
            </span>
            <span className="font-sans text-sm text-gray-dark">
              {product.avg_rating} ({product.review_count} reseñas)
            </span>
          </div>

          <hr className="border-gray-light mb-6" />

          <PriceSelector
            productId={product.id}
            productName={product.name}
            productSlug={product.slug}
            priceOneTime={product.price_one_time}
            priceAutoship={product.price_autoship}
            badge={product.badge}
            weightKg={product.weight_kg}
          />
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-h2 mb-4">Descripcion</h2>
        <p className="font-sans text-base text-primary leading-relaxed max-w-3xl">
          {product.description || 'Producto premium para tu mascota.'}
        </p>
        <ul className="mt-4 space-y-2">
          {['Sin granos, sin maiz ni soja', 'Rico en Omega-3 y Omega-6', 'Probioticos para digestion', 'DHA para desarrollo cerebral', 'Ingredientes naturales seleccionados', 'Aprobado por nutricionistas veterinarios'].map((benefit) => (
            <li key={benefit} className="flex items-center gap-2 font-sans text-sm text-primary">
              <span className="text-secondary">&#10003;</span>
              {benefit}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12 bg-bg-warm/50 rounded-lg p-6 md:p-8">
        <h2 className="text-h2 mb-4">Informacion Nutricional</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-sans text-sm font-semibold text-primary mb-3 uppercase tracking-wider">
              Ingredientes
            </h3>
            <ul className="space-y-2">
              {[{ name: 'Pollo fresco', pct: '40%' }, { name: 'Arroz integral', pct: '25%' }, { name: 'Vegetales mixtos', pct: '15%' }, { name: 'Aceites naturales', pct: '8%' }, { name: 'Suplementos vitaminicos', pct: '12%' }].map((ing) => (
                <li key={ing.name} className="flex items-center justify-between font-sans text-sm text-primary">
                  <span>{ing.name}</span>
                  <span className="text-gray-dark">{ing.pct}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-sans text-sm font-semibold text-primary mb-3 uppercase tracking-wider">
              Analisis garantizado
            </h3>
            <ul className="space-y-2">
              {[{ name: 'Proteina', value: '28%' }, { name: 'Grasa', value: '16%' }, { name: 'Fibra', value: '4%' }, { name: 'Ceniza', value: '8%' }, { name: 'Humedad', value: '10%' }, { name: 'Calcio', value: '1.2%' }].map((n) => (
                <li key={n.name} className="flex items-center justify-between font-sans text-sm text-primary">
                  <span>{n.name}</span>
                  <span className="text-gray-dark">{n.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 p-4 bg-white rounded-lg border border-gray-light">
          <p className="font-sans text-sm font-medium text-primary">
            ⚠️ Alergenos: Contiene pollo. Puede contener trazas de cereales con gluten.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-h2 mb-4">Reseñas de clientes</h2>
        <Reviews reviews={reviews} avgRating={product.avg_rating} reviewCount={product.review_count} />
      </section>

      <section className="mb-12">
        <RelatedProducts currentSlug={slug} petType={product.pet_type} />
      </section>
    </div>
  );
}
