import Image from "next/image"
import Link from "next/link"
import { Star, Heart, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductCardData } from "@/lib/types"

export default function ProductCard({ product }: { product: ProductCardData }) {
  const hasExpandImagesTag = product.tags?.includes('expand-images');
  const href = hasExpandImagesTag
    ? `/products/${product.handle || product.id}?image_url=${encodeURIComponent(product.featuredImage?.url || '')}`
    : `/products/${product.handle || product.id}`;

  return (
    <Link href={href} className="group block">
      <div className="overflow-hidden rounded-lg border shadow-sm transition-all duration-300 hover:shadow-lg">
        <div className="aspect-square overflow-hidden">
          <Image
            src={product.featuredImage?.url || "/placeholder.svg"}
            alt={product.featuredImage?.altText || product.title}
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
