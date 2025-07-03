import { Crown, Users, Heart } from "lucide-react"

export default function AboutSection() {
  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-slate-800">About Mansa Gallery</h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Legacy Preservation</h3>
              <p className="text-slate-600 text-sm">Honoring forgotten heroes through premium artistry</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Educational Impact</h3>
              <p className="text-slate-600 text-sm">Bridging knowledge gaps through engaging storytelling</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Cultural Celebration</h3>
              <p className="text-slate-600 text-sm">Celebrating contributions that shaped our world</p>
            </div>
          </div>

          <p className="text-lg text-slate-700 leading-relaxed">
            Mansa Gallery exists to restore the legacy of forgotten heroes whose contributions shaped the world but
            never made it into mainstream narratives. Through premium chess sets, art prints, and heritage collections,
            we bridge the knowledge gap and ensure these remarkable stories are never erased from history.
          </p>
        </div>
      </div>
    </section>
  )
}
