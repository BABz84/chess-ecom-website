import ProductCard from "./product-card"
import { Button } from "@/components/ui/button"
import { Palette } from "lucide-react"
import { fetchCollection } from "@/lib/shopify"
import { Product } from "@/lib/types"

export default async function GelatoShowcase({ collectionHandle }: { collectionHandle: string }) {
  const collection = await fetchCollection(collectionHandle)
  if (!collection) return null
  const products = collection.products.nodes

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Palette className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl lg:text-4xl font-bold">Print on Demand Collection</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Museum-quality art prints celebrating the forgotten heroes of Black history. Each piece tells a story of
            courage, innovation, and triumph.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12 space-y-4">
          <p className="text-slate-600">Transform your space with artwork that educates and inspires</p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Browse Print on Demand Collection
          </Button>
        </div>
      </div>
    </section>
  )
}
