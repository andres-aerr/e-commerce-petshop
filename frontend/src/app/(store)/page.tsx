import Hero from '@/components/home/Hero';
import TrustPillars from '@/components/home/TrustPillars';
import CategoryGrid from '@/components/home/CategoryGrid';
import BrandsCarousel from '@/components/home/BrandsCarousel';
import BestSellersCarousel from '@/components/home/BestSellersCarousel';
import CategoryShowcase from '@/components/home/CategoryShowcase';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustPillars />
      <CategoryGrid />
      <BrandsCarousel />
      <CategoryShowcase />
      <BestSellersCarousel />
    </main>
  );
}
