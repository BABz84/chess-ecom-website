import { Suspense } from "react"
import ProductCard, { ProductCardSkeleton } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Search } from "lucide-react"

// This would fetch from your Shopify API
async function getProducts() {
  // Mock data - replace with actual Shopify API call
  return [
    {
      id: "1",
      title: "Legacy Historical Black Chess Set",
      handle: "legacy-historical-black-chess-set",
      price: 200.00,
      compareAtPrice: 250.00,
      image: "https://cdn.shopify.com/s/files/1/0940/5661/2147/files/20241128_132237.jpg?v=1751924963",
      rating: 4.9,
      reviewCount: 127,
      badge: "Featured",
    },
    {
      id: "2",
      title: "Framed Canvas Portrait of Young Black Child Learning Chess – Inspiring Art for Your Space",
      handle: "framed-canvas-portrait-of-young-black-child-learning-chess-inspiring-art-for-your-space",
      price: 75.00,
      image: "https://cdn.shopify.com/s/files/1/0940/5661/2147/files/aaa9e1eb-2ced-47f2-8bb4-409f449d4422.jpg?v=1747002139",
      rating: 4.8,
      reviewCount: 89,
      badge: "New",
    },
    {
      id: "3",
      title: "Fine Art Print: Black Cowgirl & Horse Field Artwork – Vivid Giclée Poster",
      handle: "fine-art-print-black-cowgirl-horse-field-artwork-vivid-giclee-poster",
      price: 45.00,
      image: "https://cdn.shopify.com/s/files/1/0940/5661/2147/files/791fd875-6b93-4191-bb5a-9c0836d5f5a8.webp?v=1747002405",
      rating: 4.7,
      reviewCount: 156,
      badge: "Bestseller",
    },
  ]
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">All Products</h1>
        <p className="text-lg text-muted-foreground">
          Discover our complete collection of premium chess sets, pieces, and boards
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input type="search" placeholder="Search products..." className="pl-10" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="chess-sets">Chess Sets</SelectItem>
              <SelectItem value="pieces">Chess Pieces</SelectItem>
              <SelectItem value="boards">Chess Boards</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="0-100">Under $100</SelectItem>
              <SelectItem value="100-300">$100 - $300</SelectItem>
              <SelectItem value="300-500">$300 - $500</SelectItem>
              <SelectItem value="500+">$500+</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <Suspense fallback={<ProductCardSkeleton />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Suspense>

      {/* Load More */}
      <div className="text-center mt-12">
        <Button variant="outline" size="lg">
          Load More Products
        </Button>
      </div>
    </div>
  )
}
