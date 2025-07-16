"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { useState, useEffect } from "react"
import { Product, ProductVariant } from "@/lib/types"

export default function ProductDetail({ product, initialImage }: { product: Product, initialImage?: string }) {
  const { addItem } = useCart()
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants.nodes[0])
  const [displayedImage, setDisplayedImage] = useState(initialImage || selectedVariant?.image?.url || product.images.nodes[0]?.url || "/placeholder.jpg")

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
  }).format(parseFloat(selectedVariant.price.amount));

  const compareAtPrice = selectedVariant.compareAtPrice ? new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: selectedVariant.compareAtPrice.currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parseFloat(selectedVariant.compareAtPrice.amount)) : null;

  const isSoldOut = !selectedVariant.availableForSale;
  const isOnSale = selectedVariant.compareAtPrice && parseFloat(selectedVariant.compareAtPrice.amount) > parseFloat(selectedVariant.price.amount);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <div className="max-h-[500px] overflow-hidden rounded-lg">
            <Image
              key={displayedImage}
              src={displayedImage}
              alt={altText}
              width={selectedVariant?.image?.width ?? 2048}
              height={selectedVariant?.image?.height ?? 2048}
            sizes="(min-width: 768px) 50vw, 100vw"
            priority
            className="w-full h-full object-contain rounded-lg max-h-[500px]"
          />
        </div>
          {product.tags.includes('expand-images') && (
            <div className="grid grid-cols-5 gap-4 mt-4">
              {product.images.nodes.map((image, index) => (
                <div
                  key={index}
                  className={`cursor-pointer border-2 ${displayedImage === image.url ? 'border-red-500' : 'border-transparent'} rounded-lg overflow-hidden`}
                  onClick={() => setDisplayedImage(image.url)}
                >
                  <Image
                    src={image.url}
                    alt={image.altText || `Thumbnail ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <div className="flex items-center mb-6">
            <p className={`text-2xl text-gray-800 ${isOnSale ? 'text-red-600' : ''}`}>
              {price}
            </p>
            {isOnSale && compareAtPrice && (
              <p className="text-xl text-gray-500 line-through ml-4">
                {compareAtPrice}
              </p>
            )}
          </div>
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
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }}
          />
          <Button
            size="lg"
            className="w-full mt-8 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={() => addItem({ id: selectedVariant.id, title: product.title, price: parseFloat(selectedVariant.price.amount), image: displayedImage, merchandiseId: selectedVariant.id, lineId: '' })}
            disabled={isSoldOut}
          >
            {isSoldOut ? "Sold Out" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  )
}
