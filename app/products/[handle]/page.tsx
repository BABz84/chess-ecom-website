import { getProduct } from "@/lib/shopify"
import ProductDetail from "@/components/product-detail"
import { notFound } from "next/navigation"
import { use } from "react";
import type { Metadata } from 'next'

export const runtime = 'edge';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle)

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
  searchParams,
}: {
  params: Promise<{ handle: string }>;
  searchParams?: Promise<
    Record<string, string | string[] | undefined>
  >;
}) {
  // two equivalent ways to resolve the promise -----------------
  // 1. classic:
  const { handle } = await params;

  // 2. React 19 helper (remove the line above if you keep this):
  // const { handle } = use(params);
  // -------------------------------------------------------------

  const product = await getProduct(handle);
  if (!product) notFound();

  const { image_url } = (await searchParams) ?? {};
  return <ProductDetail product={product} initialImage={image_url as string | undefined} />;
}
