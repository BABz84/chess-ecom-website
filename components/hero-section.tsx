import Image from "next/image"
import HeroCarousel from "./hero-carousel"
import { Button } from "@/components/ui/button"
import { ArrowRight, Crown, Palette, Shirt } from "lucide-react"

export default function HeroSection({ heroProducts }: { heroProducts: any[] }) {
  return (
    <section className="relative red-pattern-bg overflow-hidden h-screen flex items-center">
      {/* Red pattern overlay */}
      <div className="absolute inset-0 diamond-pattern opacity-10"></div>

      <div className="container mx-auto px-4 py-3 relative w-full">
        <div className="grid lg:grid-cols-2 gap-6 items-center h-[calc(100vh-120px)]">
          <div className="space-y-4 text-white flex flex-col justify-center">
            {/* Logo - Increased size for better text readability */}
            <div className="mb-2">
              <Image
                src="/images/mansa-gallery-logo-bordered.png"
                alt="Mansa Gallery Logo"
                width={256}
                height={256}
                className="h-32 w-auto"
                priority
              />
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                <span className="text-white">Where Legacy</span>
                <br />
                <span className="text-yellow-300">Lives in Art</span>
              </h1>

              <p className="text-lg text-red-100 max-w-lg leading-relaxed">
                Discover premium chess sets featuring forgotten heroes of Black history, plus exclusive art prints and
                heritage collections that bring untold stories to life.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-3">
              <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
                <Crown className="h-6 w-6 text-yellow-300 mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Legacy Chess Sets</h3>
                <p className="text-sm text-red-200">Handcrafted historical pieces</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
                <Palette className="h-6 w-6 text-yellow-300 mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Art Prints</h3>
                <p className="text-sm text-red-200">Premium heritage artwork</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
                <Shirt className="h-6 w-6 text-yellow-300 mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Pan African Collectibles</h3>
                <p className="text-sm text-red-200">Wearable history</p>
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <a href="/collections/all">
                <Button size="lg" className="btn-red px-8 py-4 text-lg font-semibold">
                  Browse All Collections
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>

          <HeroCarousel heroProducts={heroProducts.slice(0, 3)} />
        </div>
      </div>
    </section>
  )
}
