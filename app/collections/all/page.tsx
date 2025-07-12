import { getAllProducts } from '@/lib/shopify';
import { notFound } from 'next/navigation';
import { Product } from '@/lib/types';
import ProductCard from '@/components/product-card';

export const runtime = 'edge';

export default async function Page() {
  const products = await getAllProducts();
  if (!products) return notFound();

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">All Products</h1>
      {products.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {products.map((product: { node: Product }) => (
            <ProductCard key={product.node.id} product={product.node} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">There are no products to display.</p>
      )}
    </div>
  );
}
