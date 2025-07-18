import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, Globe, Award, Crown } from "lucide-react"
import { fetchCollection } from "@/lib/shopify"
import { Product } from "@/lib/types"
import ProductCard from "./product-card"

export default async function WhoWeAreSection() {
  const collection = await fetchCollection("chess-pieces")
  if (!collection) return null
  const products = collection.products.nodes

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-red-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-800">
              The Legacy Chess Set
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each piece represents a forgotten hero whose story deserves to be told. Premium handcrafted chess pieces
              that bring history to life on your board.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="prose prose-lg text-slate-700">
                <p>
                  In an era where history is increasingly censored and rewritten, I was stunned by the lack of knowledge
                  about minority figures, especially those whose contributions shaped the world but never made it into
                  mainstream narratives.
                </p>

                <p>
                  I spoke with individuals across different educational backgrounds around the country and found a
                  common thread: outside of the well-known names in Black history, very little was known about
                  international figures and countless unsung heroes of the United States. These were the scientists,
                  artists, revolutionaries, thinkers, and trailblazers whose legacies have been overlooked, despite
                  their profound impact.
                </p>

                <p>
                  This realization moved me. It wasn't just about history, it was about justice, recognition, and
                  education for all.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 py-6">
                <div className="text-center">
                  <BookOpen className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <div className="font-semibold text-sm">Education</div>
                  <div className="text-xs text-slate-600">For all backgrounds</div>
                </div>
                <div className="text-center">
                  <Globe className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <div className="font-semibold text-sm">Global Impact</div>
                  <div className="text-xs text-slate-600">International heroes</div>
                </div>
                <div className="text-center">
                  <Award className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <div className="font-semibold text-sm">Recognition</div>
                  <div className="text-xs text-slate-600">Long overdue</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="prose prose-lg text-slate-700">
                <p>
                  I wanted to create something that would "bridge the knowledge gap", something that would appeal to
                  learners, collectors, chess enthusiasts, and art lovers alike. And so, <em>The Legacy Chess Set</em>{" "}
                  was born, an immersive way to engage with the untold stories of history through artistry, strategy,
                  and storytelling.
                </p>

                <p>
                  This is not just a game. It is a movement to honor the forgotten heroes who deserve recognition and to
                  ensure that their contributions are never erased from history.
                </p>

                <p>
                  By bringing their legacy to the chessboard, we invite people of all backgrounds to discover,
                  celebrate, and learn one move at a time.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {products.slice(0, 2).map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <Link href="/collections/chess-pieces" className="btn-red w-full sm:w-auto mt-6 inline-block text-center">Discover The Legacy Chess Set</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
