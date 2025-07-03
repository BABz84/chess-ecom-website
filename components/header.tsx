"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Menu, User, Facebook, Instagram, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
              <Link href="#" className="text-gray-500 hover:text-red-600 transition-colors p-1">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-red-600 transition-colors p-1">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-red-600 transition-colors p-1">
                <Twitter className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-start space-x-12">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <img src="/images/mansa-gallery-logo-bordered.png" alt="Mansa Gallery Logo" className="h-12 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
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
                    <Link href="/collections/pod-prints">POD Prints</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/collections/pod-items">POD Items</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/about" className="text-base font-medium text-slate-700 hover:text-red-600 transition-colors">
                About
              </Link>

              <Link
                href="/contact"
                className="text-base font-medium text-slate-700 hover:text-red-600 transition-colors"
              >
                Contact
              </Link>
            </div>

            {/* Search and Right Actions Container */}
            <div className="ml-auto flex items-center space-x-4">
              {/* Search Bar - Desktop */}
              <div className="flex items-center space-x-2 max-w-sm">
                <ProductSearch />
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center space-x-4">
                {/* Mobile Search Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-slate-700 hover:text-red-600"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  <Search className="h-5 w-5" />
                </Button>

                {/* Account */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-slate-700 hover:text-red-600">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href="/account">My Account</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/orders">Order History</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/wishlist">Wishlist</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Cart */}
                <Cart />

                {/* Mobile Menu */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden text-slate-700">
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
                        POD Prints
                      </Link>
                      <Link
                        href="/collections/pod-items"
                        className="text-xl font-medium hover:text-red-600 transition-colors"
                      >
                        POD Items
                      </Link>
                      <Link href="/about" className="text-xl font-medium hover:text-red-600 transition-colors">
                        About
                      </Link>
                      <Link href="/contact" className="text-xl font-medium hover:text-red-600 transition-colors">
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
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="lg:hidden py-4 border-t">
              <ProductSearch />
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
