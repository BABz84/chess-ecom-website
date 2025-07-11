import { NextResponse } from 'next/server'
import { fetchCollection } from "@/lib/shopify"

// ↓ NEW: params is a Promise
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params          // ← you must await it
  try {
    const products = await fetchCollection(collection)
    return NextResponse.json({ products })
  } catch (error) {
    console.error("Error fetching products for collection:", collection, error)
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}
