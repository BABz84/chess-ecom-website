"use client"

import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription, SheetClose } from "@/components/ui/sheet"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"

export default function Cart() {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart, checkoutUrl } = useCart()
  const router = useRouter()

  function handleCheckout() {
    if (checkoutUrl) {
      router.push(checkoutUrl)
    } else {
      console.error("Checkout URL not available")
      // You might want to show an error message to the user here
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Open cart">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col h-full">
          <SheetHeader>
            <SheetTitle>Shopping Cart ({totalItems})</SheetTitle>
            <SheetDescription>
              Review your items and proceed to checkout.
            </SheetDescription>
          </SheetHeader>
          {items.length === 0 ? (
            <div className="flex-grow flex items-center justify-center">
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <>
              <div className="flex-grow overflow-y-auto pr-4 -mr-4">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start justify-between" data-testid={`cart-item-${item.id}`}>
                      <div className="flex items-start space-x-3">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={48}
                          height={48}
                          className="rounded-md"
                        />
                        <div className="flex-grow">
                          <h3 className="font-semibold text-sm leading-tight">{item.title}</h3>
                          <p className="text-xs text-muted-foreground">${item.price.toFixed(2)}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Button variant="outline" size="sm" className="h-6 w-6 p-0" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                              -
                            </Button>
                            <span className="text-sm">{item.quantity}</span>
                            <Button variant="outline" size="sm" className="h-6 w-6 p-0" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                              +
                            </Button>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => removeItem(item.id)}>
                        &times;
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t flex-shrink-0">
                <div className="flex justify-between font-semibold">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex flex-col space-y-2 mt-4">
                  <SheetClose asChild>
                    <Button size="lg" variant="outline">
                      Continue Shopping
                    </Button>
                  </SheetClose>
                  <Button size="lg" className="bg-red-600 hover:bg-red-700" onClick={handleCheckout}>
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
