import { fetchCollection } from '@/lib/shopify';
import { notFound } from 'next/navigation';
import { Product } from '@/lib/types';
import ProductCard from '@/components/product-card';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const collection = await fetchCollection(handle);
  if (!collection) return notFound();

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">{collection.title}</h1>
      {collection.products.nodes.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {collection.products.nodes.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">This collection has no products yet.</p>
      )}
    </div>
  );
}
