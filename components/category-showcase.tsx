import Link from "next/link"
import Image from "next/image"
import { Crown, Palette, Shirt } from "lucide-react"

const categories = [
  {
    id: "chess-pieces",
    title: "Historical Chess Pieces",
    description:
      "Handcrafted pieces featuring historically significant Black figures. Each piece tells the story of how these leaders shaped history.",
    image: "/placeholder.svg?height=300&width=400",
    href: "/chess-pieces",
    badge: "Premium Collection",
    icon: Crown,
    storyFocus: "Learn about kings, queens, and leaders who changed the world",
  },
  {
    id: "gelato-collection",
    title: "Gelato Art Collection",
    description:
      "High-quality art prints celebrating African heritage and Black history. Discover when these moments happened and why they matter.",
    image: "/placeholder.svg?height=300&width=400",
    href: "/gelato-products",
    badge: "Art Prints",
    icon: Palette,
    storyFocus: "Artistic interpretations of pivotal moments in history",
  },
  {
    id: "printify-collection",
    title: "Printify Heritage Collection",
    description:
      "Wearable history that tells the stories of resilience and triumph. Understand how these figures overcame challenges.",
    image: "/placeholder.svg?height=300&width=400",
    href: "/printify-products",
    badge: "Apparel & More",
    icon: Shirt,
    storyFocus: "Wear the stories of courage and determination",
  },
]

export default function CategoryShowcase() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Story Collections</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Three unique ways to experience and celebrate Black history. Each collection focuses on the stories behind
            the figures - <strong>how</strong> they made their impact, <strong>when</strong> they lived, and{" "}
            <strong>why</strong> their legacy endures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

              {/* Icon and Badge */}
              <div className="absolute top-4 left-4 flex items-center space-x-2">
                <div className="bg-red-600 p-2 rounded-full">
                  <category.icon className="h-4 w-4 text-white" />
                </div>
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {category.badge}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                <p className="text-sm opacity-90 mb-3">{category.description}</p>
                <p className="text-xs text-yellow-300 font-medium">{category.storyFocus}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
