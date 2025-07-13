import { getProduct } from "@/lib/shopify"
import ProductDetail from "@/components/product-detail"
import { notFound } from "next/navigation"
import type { Metadata } from 'next'

export const runtime = 'edge';

type Props = {
  params: { handle: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = params;
  const product = await getProduct(handle);

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

export default async function ProductPage({ params, searchParams }: Props) {
  const { handle } = params;
  const product = await getProduct(handle);

  if (!product) {
    notFound();
  }

  const initialImage = searchParams?.image_url as string | undefined;

  return <ProductDetail product={product} initialImage={initialImage} />;
}
