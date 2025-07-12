import { Crown, Users, Heart } from "lucide-react"
import Image from "next/image"

export default function AboutSection() {
  return (
    <section id="about-us" className="py-16 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-slate-800 text-center">About Mansa Gallery</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-1 gap-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Crown className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Legacy Preservation</h3>
                  <p className="text-slate-600 text-sm">Honoring forgotten heroes through premium artistry</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Educational Impact</h3>
                  <p className="text-slate-600 text-sm">Bridging knowledge gaps through engaging storytelling</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Cultural Celebration</h3>
                  <p className="text-slate-600 text-sm">Celebrating contributions that shaped our world</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="relative inline-block">
                <Image
                  src="/images/Mr. Duane Stewart.png"
                  alt="Mr. Duane Stewart"
                  width={500}
                  height={500}
                  className="rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold mb-4 text-slate-800">A Message from Our Founder</h3>
                <p className="text-slate-600 italic mb-4">
                  "We are more than just a gallery. We are the custodians of stories that deserve to be told. Each piece
                  we create is a testament to the enduring power of legacy."
                </p>
                <p className="text-slate-800 font-semibold">- Duane Stewart</p>
              </div>
            </div>
          </div>
          <p className="text-lg text-slate-700 leading-relaxed mt-12 text-center max-w-4xl mx-auto">
            Mansa Gallery exists to restore the legacy of forgotten heroes whose contributions shaped the world but
            never made it into mainstream narratives. Through premium chess sets, art prints, and heritage
            collections, we bridge the knowledge gap and ensure these remarkable stories are never erased from
            history.
          </p>
        </div>
      </div>
    </section>
  )
}
