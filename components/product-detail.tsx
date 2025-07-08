"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { useState } from "react"
import { Product, ProductVariant } from "@/lib/types"
import DOMPurify from 'dompurify';

export default function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants.nodes[0])
  const [displayedImage, setDisplayedImage] = useState(selectedVariant?.image?.url || product.images.nodes[0]?.url || "/placeholder.jpg")

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    if (variant.image?.url) {
      setDisplayedImage(variant.image.url);
    }
  };

  const altText = selectedVariant?.image?.altText || product.title

  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: selectedVariant.price.currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parseFloat(selectedVariant.price.amount))

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <Image
            key={displayedImage}
            src={displayedImage}
            alt={altText}
            width={selectedVariant?.image?.width ?? 2048}
            height={selectedVariant?.image?.height ?? 2048}
            sizes="(min-width: 768px) 50vw, 100vw"
            priority
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-2xl text-gray-800 mb-6">
            {price}
          </p>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Select {product.options[0].name}</h3>
            <div className="flex flex-wrap gap-2">
              {product.variants.nodes.map((variant) => (
                <Button
                  key={variant.id}
                  variant={selectedVariant.id === variant.id ? "default" : "outline"}
                  onClick={() => handleVariantChange(variant)}
                >
                  {variant.title}
                </Button>
              ))}
            </div>
          </div>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.descriptionHtml || product.description) }}
          />
          <Button
            size="lg"
            className="w-full mt-8 bg-red-600 hover:bg-red-700"
            onClick={() => addItem({ id: selectedVariant.id, title: product.title, price: parseFloat(selectedVariant.price.amount), image: displayedImage, merchandiseId: selectedVariant.id })}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
