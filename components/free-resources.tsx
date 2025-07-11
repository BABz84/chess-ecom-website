"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const resources = [
  {
    id: 1,
    title: "BlackPast.org",
    image: "/images/resources/resource-1.jpg",
    url: "https://www.blackpast.org/",
    description: "The largest online encyclopedia of Black history, dedicated to providing reliable information on the history of Black people across the globe.",
  },
  {
    id: 2,
    title: "Blackfacts.com",
    image: "/images/resources/resource-2.gif",
    url: "https://blackfacts.com/",
    description: "A resource for Black history facts, featuring articles, videos, and daily information on significant events and figures.",
  },
  {
    id: 3,
    title: "Five Inspiring Black Trailblazers",
    image: "/images/resources/resource-3.png",
    url: "https://www.open.edu/openlearn/history-the-arts/history/five-inspiring-black-trailblazers-across-europe",
    description: "In recognition of Black History Month, a list and short biography of five black trailblazers from across Europe.",
  },
  {
    id: 4,
    title: "Best African American History Apps",
    image: "/images/resources/resource-4.jpg",
    url: "https://www.commonsense.org/education/lists/best-african-american-history-apps-and-websites",
    description: "A curated list of apps, games, and websites that tell the story of African American history.",
  },
  {
    id: 5,
    title: "Africans in European History",
    image: "/images/resources/resource-5.jpg",
    url: "https://www.simon-hartman.com/post/the-presence-of-africans-in-european-history",
    description: "Highlighting the rich, inspiring—but often little known—history of Black people in European history.",
  },
  {
    id: 6,
    title: "30 Unique African Religions",
    image: "/images/resources/resource-6.jpg",
    url: "https://www.discoverwalks.com/blog/africa/30-unique-african-traditional-religions-that-will-blow-your-mind/",
    description: "A journey through ancient African belief systems, from mystical rituals to ancestor reverence.",
  },
  {
    id: 7,
    title: "African Religions | Britannica",
    image: "/images/resources/resource-7.jpg",
    url: "https://www.britannica.com/topic/African-religions",
    description: "An overview of the religious beliefs and practices of the peoples of Africa.",
  },
  {
    id: 8,
    title: "Black People in Chess History",
    image: "/images/resources/resource-8.jpg",
    url: "https://www.pushblack.us/news/black-people-have-been-tied-history-chess-centuries",
    description: "An article exploring the historical connection between Black people and the game of chess.",
  },
  {
    id: 9,
    title: "Chess.com Learn",
    image: "/images/resources/chess-com.png",
    url: "https://www.chess.com/learn",
    description: "Learn to play chess with lessons, puzzles, and drills from the world's most popular chess platform.",
  },
  {
    id: 10,
    title: "ChessBase Learn",
    image: "/images/resources/chessbase.png",
    url: "https://learn.chessbase.com/en",
    description: "Interactive lessons and training from one of the leading names in chess software.",
  },
  {
    id: 11,
    title: "US Chess Federation",
    image: "/images/resources/uschess.png",
    url: "https://new.uschess.org/",
    description: "The official site of the US Chess Federation, with information on tournaments, ratings, and news.",
  },
  {
    id: 12,
    title: "FIDE - International Chess Federation",
    image: "/images/resources/fide.png",
    url: "https://www.fide.com/",
    description: "The official website of the International Chess Federation, the governing body of international chess competition.",
  },
]

export default function FreeResources() {
  return (
    <section className="py-16 lg:py-24 red-pattern-bg relative">
      <div className="absolute inset-0 diamond-pattern opacity-10"></div>
      <div className="red-accent-border absolute top-0 left-0 right-0"></div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12 text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Free Learning Resources</h2>
          <p className="text-lg text-red-100 max-w-3xl mx-auto">
            Master the game of chess and explore Black history with these carefully curated free resources. From beginner basics to advanced strategies, start your journey today.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {resources.map((resource) => (
            <Card
              key={resource.id}
              className="bg-white/95 backdrop-blur hover:bg-white transition-all duration-300 hover:shadow-lg border-2 hover:border-red-300 h-full"
            >
              <CardContent className="p-6 text-center flex flex-col h-full">
                <div className="flex-grow">
                  <div className="w-full h-40 relative">
                    <Image
                      alt={resource.title}
                      className="rounded-t-lg object-cover"
                      layout="fill"
                      src={resource.image}
                    />
                  </div>
                  <h3 className="font-semibold text-lg text-slate-800 mt-4">{resource.title}</h3>
                  <p className="text-sm text-slate-600 mt-2 flex-grow">{resource.description}</p>
                </div>
                <Link href={resource.url} target="_blank" rel="noopener noreferrer" className="mt-4">
                  <Button className="btn-red w-full">Learn More</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
