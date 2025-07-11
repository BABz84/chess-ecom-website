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
      title: "Placeholder Product Title",
      handle: "placeholder-product-1",
      price: 99.99,
      compareAtPrice: 129.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.9,
      reviewCount: 127,
      badge: "Placeholder",
    },
    {
      id: "2",
      title: "Placeholder Product Title",
      handle: "placeholder-product-2",
      price: 99.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.8,
      reviewCount: 89,
      badge: "Placeholder",
    },
    {
      id: "3",
      title: "Placeholder Product Title",
      handle: "placeholder-product-3",
      price: 99.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.7,
      reviewCount: 156,
      badge: "Placeholder",
    },
    {
      id: "4",
      title: "Placeholder Product Title",
      handle: "placeholder-product-4",
      price: 99.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 5.0,
      reviewCount: 43,
      badge: "Placeholder",
    },
    {
      id: "5",
      title: "Placeholder Product Title",
      handle: "placeholder-product-5",
      price: 99.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.6,
      reviewCount: 203,
      badge: "Placeholder",
    },
    {
      id: "6",
      title: "Placeholder Product Title",
      handle: "placeholder-product-6",
      price: 99.99,
      image: "/placeholder.svg?height=400&width=400",
      rating: 4.8,
      reviewCount: 76,
      badge: "Placeholder",
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
