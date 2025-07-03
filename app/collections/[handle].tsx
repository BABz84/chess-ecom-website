"use client"

import { useEffect, useState } from "react";
import { getCollection, getProductsInCollection } from "@/lib/shopify";
import ProductCard from "@/components/product-card";
import { notFound } from "next/navigation";

export default function CollectionPage({
  params,
}: {
  params: { handle: string };
}) {
  const [collection, setCollection] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollectionData = async () => {
      try {
        const [collectionData, productsData] = await Promise.all([
          getCollection(params.handle),
          getProductsInCollection(params.handle),
        ]);

        if (!collectionData) {
          notFound();
        }

        setCollection(collectionData);
        setProducts(productsData);
      } catch (error) {
        console.error("Failed to fetch collection data:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchCollectionData();
  }, [params.handle]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="h-10 bg-gray-200 rounded-md w-1/2 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 rounded-md w-2/3 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
              <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded-md w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{collection.title}</h1>
        {collection.description && (
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {collection.description}
          </p>
        )}
      </div>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product: any) => (
            <ProductCard key={product.node.id} product={product.node} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">
            There are no products in this collection yet.
          </p>
        </div>
      )}
    </div>
  );
}
