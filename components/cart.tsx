"use client"

import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { createCart } from "@/lib/shopify"
import { useRouter } from "next/navigation"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"

export default function Cart() {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCart()
  const router = useRouter()

  async function handleCheckout() {
    const lineItems = items.map(item => ({
      merchandiseId: item.merchandiseId,
      quantity: item.quantity
    }))

    try {
      const cart = await createCart(lineItems)
      clearCart()
      router.push(cart.checkoutUrl)
    } catch (error) {
      console.error("Failed to create checkout:", error)
      // You might want to show an error message to the user here
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-8">
          {items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={64}
                      height={64}
                      className="rounded-md"
                    />
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      +
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                      &times;
                    </Button>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t">
                <div className="flex justify-between font-semibold">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <Button size="lg" className="w-full mt-4 bg-red-600 hover:bg-red-700" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
