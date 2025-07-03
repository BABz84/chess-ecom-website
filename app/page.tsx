import { Suspense } from "react"
import HeroSection from "@/components/hero-section"
import { getProductsInCollection } from "@/lib/shopify"
import FeaturedProducts from "@/components/featured-products"
import AboutSection from "@/components/about-section"
import ChessPiecesShowcase from "@/components/chess-pieces-showcase"
import WhoWeAreSection from "@/components/who-we-are-section"
import GelatoShowcase from "@/components/gelato-showcase"
import PrintifyShowcase from "@/components/printify-showcase"
import FreeResources from "@/components/free-resources"
import { ProductCardSkeleton } from "@/components/product-card"

export default function HomePage() {
  return (
    <main>
      {/* Hero - explains what you can buy */}
      <HeroSection />

      {/* Product Section 1 - Featured Products */}
      <Suspense fallback={<ProductCardSkeleton />}>
        <FeaturedProducts collectionHandle="featured" />
      </Suspense>

      {/* Story Section 1 - About Mansa Gallery */}
      <AboutSection />

      {/* Product Section 2 - Chess Pieces */}
      <Suspense fallback={<ProductCardSkeleton />}>
        <ChessPiecesShowcase collectionHandle="chess-pieces" />
      </Suspense>

      {/* Story Section 2 - Who We Are */}
      <WhoWeAreSection />

      {/* Product Section 3 - Gelato Collection */}
      <Suspense fallback={<ProductCardSkeleton />}>
        <GelatoShowcase collectionHandle="gelato" />
      </Suspense>

      {/* Product Section 4 - Printify Collection */}
      <Suspense fallback={<ProductCardSkeleton />}>
        <PrintifyShowcase collectionHandle="printify" />
      </Suspense>

      {/* Free Resources */}
      <FreeResources />
    </main>
  )
}
