"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Menu, Facebook, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCart } from "@/components/cart-provider"
import Cart from "./cart"
import ProductSearch from "./product-search"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { totalItems } = useCart()

  return (
    <>
      {/* Social Media Bar */}
      <div className="bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-end items-center py-2">
            <div className="flex items-center space-x-1">
              <span className="text-xs text-gray-600 mr-3">Follow us:</span>
              <Link href="https://www.facebook.com/profile.php?id=61578028686626" className="text-gray-500 hover:text-red-600 transition-colors p-1">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="https://www.instagram.com/grandpuba2020/" className="text-gray-500 hover:text-red-600 transition-colors p-1">
                <Instagram className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-3">
                <img src="/images/mansa-gallery-logo-bordered.png" alt="Mansa Gallery Logo" className="h-12 w-auto" />
              </Link>
            </div>

            {/* Desktop Navigation and Search */}
            <div className="hidden md:flex flex-grow items-center justify-center space-x-8">
              <Link
                href="/collections/chess-pieces"
                className="text-base font-medium text-slate-700 hover:text-red-600 transition-colors"
              >
                Chess Pieces
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger className="text-base font-medium text-slate-700 hover:text-red-600 transition-colors">
                  Print on Demand
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href="/collections/pod-prints">Pan Afro Prints</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/collections/pod-items">Pan Afro Collectables</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/#about-us" className="text-base font-medium text-slate-700 hover:text-red-600 transition-colors">
                About
              </Link>

              <Link
                href="mailto:info@mansagallery.com"
                className="text-base font-medium text-slate-700 hover:text-red-600 transition-colors"
              >
                Contact
              </Link>
              <div className="flex items-center space-x-2 max-w-sm">
                <ProductSearch />
              </div>
            </div>

            {/* Right Actions Container */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              {/* Mobile Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-slate-700 hover:text-red-600"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Cart */}
              <Cart />

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden text-slate-700" aria-label="Open menu">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col space-y-4 mt-8">
                    <Link href="/collections/chess-pieces" className="text-xl font-medium hover:text-red-600 transition-colors">
                      Chess Pieces
                    </Link>
                    <Link
                      href="/collections/pod-prints"
                      className="text-xl font-medium hover:text-red-600 transition-colors"
                    >
                      Pan Afro Prints
                    </Link>
                    <Link
                      href="/collections/pod-items"
                      className="text-xl font-medium hover:text-red-600 transition-colors"
                    >
                      Pan Afro Collectables
                    </Link>
                    <Link href="/#about-us" className="text-xl font-medium hover:text-red-600 transition-colors">
                      About
                    </Link>
                    <Link href="mailto:info@mansagallery.com" className="text-xl font-medium hover:text-red-600 transition-colors">
                      Contact
                    </Link>
                    <hr className="my-4" />
                    <Link href="/account" className="text-base hover:text-red-600 transition-colors">
                      My Account
                    </Link>
                    <Link href="/orders" className="text-base hover:text-red-600 transition-colors">
                      Order History
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="lg:hidden py-4 border-t" data-testid="mobile-search">
              <ProductSearch />
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
