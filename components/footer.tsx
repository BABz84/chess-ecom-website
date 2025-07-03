import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="red-pattern-bg text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Image
              src="/images/mansa-gallery-logo-new.png"
              alt="Mansa Gallery Logo"
              width={120}
              height={40}
              className="brightness-0 invert"
            />
            <p className="text-red-100 text-sm">
              Mansa Gallery celebrates Black history and African heritage through curated collections that tell the
              stories of how, when, and why these remarkable figures shaped our world.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-red-100 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-red-100 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-red-100 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-red-100 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Collections */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Story Collections</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products/chess-pieces" className="text-red-100 hover:text-white transition-colors">
                  Historical Chess Pieces
                </Link>
              </li>
              <li>
                <Link href="/products/gelato" className="text-red-100 hover:text-white transition-colors">
                  Gelato Art Collection
                </Link>
              </li>
              <li>
                <Link href="/products/printify" className="text-red-100 hover:text-white transition-colors">
                  Printify Heritage Collection
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-red-100 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Learn More */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Learn More</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-red-100 hover:text-white transition-colors">
                  About Mansa Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-red-100 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Get in Touch</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-red-300" />
                <a href="mailto:stories@mansagallery.com" className="text-red-100 hover:text-white transition-colors">stories@mansagallery.com</a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-red-300" />
                <a href="tel:+15550000000" className="text-red-100 hover:text-white transition-colors">+1 (555) 000-0000</a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-red-300 mt-0.5" />
                <span className="text-red-100">
                  123 Legacy Lane
                  <br />
                  Historyville, USA 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-red-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-red-100">© 2025 Mansa Gallery. All rights reserved.</div>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-red-100 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-red-100 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/shipping" className="text-red-100 hover:text-white transition-colors">
              Shipping Info
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
