import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, Lightbulb } from "lucide-react"

const historicalPieces = [
  {
    name: "Placeholder Historical Figure",
    role: "Placeholder Role",
    period: "Placeholder Period",
    description: "Placeholder description text for historical figure.",
    howStory: "How they changed history through their actions and innovations",
    whenStory: "When they lived and made their greatest contributions",
    whyStory: "Why their legacy continues to inspire and educate today",
    image: "/placeholder.svg?height=300&width=250",
    roleColor: "bg-yellow-100 text-yellow-800 border-yellow-300",
  },
  {
    name: "Placeholder Historical Figure",
    role: "Placeholder Role",
    period: "Placeholder Period",
    description: "Placeholder description text for historical figure.",
    howStory: "How they overcame challenges and broke barriers",
    whenStory: "When they made their mark on history",
    whyStory: "Why their story matters for future generations",
    image: "/placeholder.svg?height=300&width=250",
    roleColor: "bg-orange-100 text-orange-800 border-orange-300",
  },
  {
    name: "Placeholder Historical Figure",
    role: "Placeholder Role",
    period: "Placeholder Period",
    description: "Placeholder description text for historical figure.",
    howStory: "How they led movements and inspired change",
    whenStory: "When they stood up for justice and equality",
    whyStory: "Why their courage continues to guide us",
    image: "/placeholder.svg?height=300&width=250",
    roleColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
]

export default function HistoricalPiecesShowcase() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-yellow-50 to-orange-50 relative">
      {/* Decorative border */}
      <div className="red-accent-border absolute top-0 left-0 right-0"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-800">Stories That Shape History</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            At Mansa Gallery, every piece tells a story. Discover the <strong>how</strong>, <strong>when</strong>, and{" "}
            <strong>why</strong>
            behind historically significant Black figures who changed the world through their courage, innovation, and
            leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {historicalPieces.map((piece, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow card-red">
              <div className="aspect-[4/5] overflow-hidden">
                <Image
                  src={piece.image || "/placeholder.svg"}
                  alt={`${piece.name} - ${piece.role}`}
                  width={250}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>

              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`${piece.roleColor} border`}>{piece.role}</Badge>
                  <Badge variant="outline" className="text-xs border-slate-300">
                    {piece.period}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-slate-800">{piece.name}</CardTitle>
                <CardDescription className="text-sm text-slate-600">{piece.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* How, When, Why Stories */}
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Lightbulb className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-sm text-red-600">How</h4>
                        <p className="text-xs text-slate-700">{piece.howStory}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Calendar className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-sm text-amber-600">When</h4>
                        <p className="text-xs text-slate-700">{piece.whenStory}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <BookOpen className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-sm text-emerald-600">Why</h4>
                        <p className="text-xs text-slate-700">{piece.whyStory}</p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full btn-red text-sm">Learn Full Story</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-600 mb-6">
            Each piece in our collection is carefully curated to educate, inspire, and honor the legacy of these
            remarkable figures.
          </p>
          <button className="btn-red px-8 py-3 rounded-lg font-medium transition-all hover:shadow-lg">
            Explore All Historical Figures
          </button>
        </div>
      </div>
    </section>
  )
}
