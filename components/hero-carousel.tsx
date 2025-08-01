"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Crown, Palette } from "lucide-react"

export default function HeroCarousel({ heroProducts }: { heroProducts: any[] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (heroProducts.length <= 1) return
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === heroProducts.length - 1 ? 0 : prevIndex + 1))
    }, 4000) // Change image every 4 seconds
    return () => clearInterval(interval)
  }, [heroProducts])

  if (!heroProducts || heroProducts.length === 0) {
    return (
      <div className="relative flex items-center justify-center">
        <div className="aspect-square bg-gradient-to-br from-red-100 to-red-200 rounded-2xl p-4 shadow-2xl card-red relative max-w-sm w-full">
          <div className="w-full h-full bg-slate-200 animate-pulse rounded-lg" />
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex items-center justify-center">
      <div className="aspect-square bg-gradient-to-br from-red-100 to-red-200 rounded-2xl p-4 shadow-2xl card-red relative max-w-sm w-full">
        {heroProducts.map((product, index) => (
          <Image
            key={product.id}
            src={product.images.nodes[0]?.url || "/placeholder.svg"}
            alt={product.images.nodes[0]?.altText || product.title}
            fill
            priority={index === 0}
            sizes="(max-width: 1024px) 90vw, 420px"
            className={`object-cover rounded-lg transition-opacity duration-300 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {heroProducts.length > 0 && (
          <Link
            href={`/products/${heroProducts[currentImageIndex].handle}`}
            aria-label={`View product: ${heroProducts[currentImageIndex].title}`}
            className="absolute inset-0 z-10"
          />
        )}
      </div>

      {/* Category indicator */}
      {heroProducts.length > 0 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-white/90 backdrop-blur rounded-full px-3 py-2 shadow-lg">
            <span className="text-sm font-medium text-slate-800">{heroProducts[currentImageIndex].title}</span>
          </div>
        </div>
      )}

      {/* Dots indicator - Larger for accessibility */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
