import Link from "next/link"
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="red-pattern-bg text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Image
              src="/images/mansa-gallery-logo-bordered.png"
              alt="Mansa Gallery Logo"
              width={120}
              height={40}
              
            />
            <p className="text-red-100 text-sm">
              Mansa Gallery celebrates Black history and African heritage through curated collections that tell the
              stories of how, when, and why these remarkable figures shaped our world.
            </p>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/profile.php?id=61578028686626" className="text-red-100 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://www.instagram.com/grandpuba2020/" className="text-red-100 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
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
                <Link href="/collections/pod-prints" className="text-red-100 hover:text-white transition-colors">
                  Print on Demand Art Collection
                </Link>
              </li>
              <li>
                <Link href="/collections/pod-items" className="text-red-100 hover:text-white transition-colors">
                  Print on Demand Items Collection
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
                <Link href="/#about-us" className="text-red-100 hover:text-white transition-colors">
                  About Mansa Gallery
                </Link>
              </li>
              <li>
                <a href="mailto:info@mansagallery.com" className="text-red-100 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Get in Touch</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-red-300" />
                <a href="mailto:info@mansagallery.com" className="text-red-100 hover:text-white transition-colors">info@mansagallery.com</a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-red-300 mt-0.5" />
                <span className="text-red-100">
                  312 Crosstown Rd. Suite 167
                  <br />
                  Peachtree City, GA 30269
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
            
          </div>
        </div>
      </div>
    </footer>
  )
}
