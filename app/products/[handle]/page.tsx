import { getProduct } from "@/lib/shopify"
import ProductDetail from "@/components/product-detail"
import { notFound } from "next/navigation"
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { handle: string } }): Promise<Metadata> {
  const product = await getProduct(params.handle)

  if (!product) {
    return {
      title: "Product not found",
    }
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.images.nodes[0]?.url || '',
          width: product.images.nodes[0]?.width || 800,
          height: product.images.nodes[0]?.height || 800,
          alt: product.images.nodes[0]?.altText || product.title,
        },
      ],
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: { handle: string }
}) {
  const product = await getProduct(params.handle)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} />
}
