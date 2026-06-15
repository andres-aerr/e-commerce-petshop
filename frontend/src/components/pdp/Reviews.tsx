'use client';

interface Review {
  id: string;
  rating: number;
  title: string | null;
  content: string | null;
  pet_name: string | null;
  pet_breed: string | null;
  pet_image_url: string | null;
  created_at: string;
}

interface ReviewsProps {
  reviews: Review[];
  avgRating: number;
  reviewCount: number;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Hoy';
  if (days === 1) return 'Ayer';
  if (days < 7) return `Hace ${days} dias`;
  if (days < 30) return `Hace ${Math.floor(days / 7)} semanas`;
  return `Hace ${Math.floor(days / 30)} meses`;
}

export default function Reviews({ reviews, avgRating, reviewCount }: ReviewsProps) {
  if (reviews.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl font-bold text-primary">{avgRating}</span>
        <span className="text-lg text-orange-400">
          {'★'.repeat(Math.round(avgRating))}
          {'☆'.repeat(5 - Math.round(avgRating))}
        </span>
        <span className="font-sans text-sm text-gray-dark">
          basado en {reviewCount} reseña{reviewCount !== 1 ? 's' : ''} verificadas
        </span>
      </div>

      <div className="space-y-4 mt-6">
        {reviews.slice(0, 3).map((review) => (
          <div
            key={review.id}
            className="bg-white border border-gray-light rounded-lg p-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-light flex items-center justify-center shrink-0">
                <span className="text-sm">🐾</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-sans text-sm font-medium text-primary">
                    {review.pet_name || 'Cliente'}
                  </span>
                  <span className="text-xs text-orange-400">
                    {'★'.repeat(review.rating)}
                    {'☆'.repeat(5 - review.rating)}
                  </span>
                  <span className="font-sans text-xs text-gray-dark ml-auto">
                    {formatDate(review.created_at)}
                  </span>
                </div>
                {review.pet_breed && (
                  <p className="font-sans text-xs text-gray-dark mb-2">
                    {review.pet_breed}
                  </p>
                )}
                {review.content && (
                  <p className="font-sans text-sm text-primary leading-relaxed">
                    {review.content}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
