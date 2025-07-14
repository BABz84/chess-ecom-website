import { Suspense } from "react"

export const dynamic = 'force-dynamic'

import HeroSectionLoader from "@/components/hero-section-loader"
import FeaturedProducts from "@/components/featured-products"
import AboutSection from "@/components/about-section"
import WhoWeAreSection from "@/components/who-we-are-section"
import GelatoShowcase from "@/components/gelato-showcase"
import PrintifyShowcase from "@/components/printify-showcase"
import FreeResources from "@/components/free-resources"
import { ProductCardSkeleton } from "@/components/product-card"

export default function HomePage() {
  return (
    <main>
      {/* Hero - explains what you can buy */}
      <Suspense fallback={<div className="h-[600px] w-full bg-gray-200 animate-pulse" />}>
        <HeroSectionLoader />
      </Suspense>

      {/* Product Section 1 - Featured Products */}
      <Suspense fallback={<ProductCardSkeleton />}>
        <FeaturedProducts collectionHandle="featured" />
      </Suspense>

      {/* Story Section 1 - About Mansa Gallery */}
      <AboutSection />

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
