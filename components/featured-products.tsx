import ProductCard from "./product-card"
import { getProductsInCollection } from "@/lib/shopify"

export default async function FeaturedProducts({ collectionHandle }: { collectionHandle: string }) {
  const products = await getProductsInCollection(collectionHandle)

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Stories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each piece in our collection tells a powerful story of courage, innovation, and triumph. Discover the{" "}
            <strong>how</strong>, <strong>when</strong>, and <strong>why</strong> behind these remarkable figures.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product.node.id} product={product.node} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Explore All Stories
          </button>
        </div>
      </div>
    </section>
  )
}
