import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

import Header from "@/components/header"
import Footer from "@/components/footer"
import { CartProvider } from "@/components/cart-provider"
import { SearchProvider } from "@/components/search-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mansa Gallery - Celebrating Black History Through Art & Chess",
  description:
    "Discover the stories behind historically significant Black figures through premium chess pieces and curated print collections. Learn how, when, and why these heroes shaped history.",
  keywords:
    "Mansa Gallery, Black history, African heritage, historical chess pieces, educational art, print collections, storytelling",
  openGraph: {
    title: "Mansa Gallery - Celebrating Black History Through Art & Chess",
    description:
      "Premium chess pieces and art collections celebrating Black history and African heritage through storytelling.",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SearchProvider>
          <CartProvider>
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </SearchProvider>
      </body>
    </html>
  )
}
