"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { createCart, addCartLines, removeCartLines, updateCartLines } from "@/lib/shopify"

interface CartItem {
  id: string
  title: string
  price: number
  quantity: number
  image: string
  merchandiseId: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  checkoutUrl: string | null
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [cartId, setCartId] = useState<string | null>(null)
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null)

  useEffect(() => {
    const localCart = window.localStorage.getItem("cart")
    if (localCart) {
      const { items, cartId, checkoutUrl } = JSON.parse(localCart)
      setItems(items)
      setCartId(cartId)
      setCheckoutUrl(checkoutUrl)
    }
  }, [])

  useEffect(() => {
    if (items.length > 0) {
      window.localStorage.setItem("cart", JSON.stringify({ items, cartId, checkoutUrl }))
    } else {
      window.localStorage.removeItem("cart")
    }
  }, [items, cartId, checkoutUrl])

  const addItem = async (newItem: Omit<CartItem, "quantity">) => {
    let newCartId = cartId
    if (!newCartId) {
      const cart = await createCart([{ merchandiseId: newItem.merchandiseId, quantity: 1 }])
      newCartId = cart.id
      setCartId(cart.id)
      setCheckoutUrl(cart.checkoutUrl)
    } else {
      await addCartLines(newCartId, [{ merchandiseId: newItem.merchandiseId, quantity: 1 }])
    }

    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === newItem.id)
      if (existingItem) {
        return prev.map((item) => (item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...newItem, quantity: 1 }]
    })
  }

  const removeItem = async (id: string) => {
    if (cartId) {
      await removeCartLines(cartId, [id])
      setItems((prev) => prev.filter((item) => item.id !== id))
    }
  }

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }

    if (cartId) {
      await updateCartLines(cartId, [{ id, quantity }])
      setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        checkoutUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
