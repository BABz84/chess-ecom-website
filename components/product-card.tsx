import Image from "next/image"
import Link from "next/link"
import { Star, Heart, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: string
  title: string
  handle?: string
  priceRange?: {
    minVariantPrice: {
      amount: string
    }
  }
  images: {
    edges: {
      node: {
        originalSrc: string
        altText: string
      }
    }[]
  }
  rating?: number
  reviewCount?: number
  badge?: string
  description: string
  story?: string
  category: string
}

export default function ProductCard({ product }: { product: Product }) {
  console.log("Product in Card:", product);
  return (
    <Link href={`/products/${product.handle || product.id}`} className="group block">
      <div className="overflow-hidden rounded-lg border shadow-sm transition-all duration-300 hover:shadow-lg">
        <div className="aspect-square overflow-hidden">
          <Image
            src={product.images.edges[0]?.node.originalSrc || "/placeholder.svg"}
            alt={product.images.edges[0]?.node.altText || product.title}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg line-clamp-2">{product.title}</h3>
        </div>
      </div>
    </Link>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-sm border p-4 animate-pulse">
          <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
