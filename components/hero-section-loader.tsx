import { fetchCollection } from "@/lib/shopify";
import HeroSection from "./hero-section";

export const dynamic = 'force-dynamic';

export default async function HeroSectionLoader() {
  const heroCarouselCollection = await fetchCollection("hero-carousel");
  const heroProducts = heroCarouselCollection ? heroCarouselCollection.products.nodes : [];
  return <HeroSection heroProducts={heroProducts} />;
}
