import ProductCard from "./product-card"
import { Button } from "@/components/ui/button"
import { Crown } from "lucide-react"
import { getProductsInCollection } from "@/lib/shopify"

export default async function ChessPiecesShowcase({ collectionHandle }: { collectionHandle: string }) {
  const products = await getProductsInCollection(collectionHandle)

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Crown className="h-8 w-8 text-red-600" />
            <h2 className="text-3xl lg:text-4xl font-bold">The Legacy Chess Set</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each piece represents a forgotten hero whose story deserves to be told. Premium handcrafted chess pieces
            that bring history to life on your board.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product.node.id} product={product.node} />
          ))}
        </div>

        <div className="text-center mt-12 space-y-4">
          <p className="text-slate-600">Complete your collection with all 32 historically significant pieces</p>
          <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Shop Complete Chess Set
          </Button>
        </div>
      </div>
    </section>
  )
}
