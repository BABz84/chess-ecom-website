import ProductCard from "./product-card"
import { Button } from "@/components/ui/button"
import { Shirt } from "lucide-react"
import { getProductsInCollection } from "@/lib/shopify"

export default async function PrintifyShowcase({ collectionHandle }: { collectionHandle: string }) {
  const products = await getProductsInCollection(collectionHandle)

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shirt className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl lg:text-4xl font-bold">Print on Demand Apparel</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Print-on-demand apparel and accessories that celebrate the forgotten heroes who shaped our world.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product.node.id} product={product.node} />
          ))}
        </div>

        <div className="text-center mt-12 space-y-4">
          <p className="text-slate-600">Carry their stories with you wherever you go</p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Shop Print on Demand Apparel
          </Button>
        </div>
      </div>
    </section>
  )
}
