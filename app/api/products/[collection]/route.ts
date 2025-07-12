import { NextResponse } from 'next/server'
import { fetchCollection } from "@/lib/shopify"

export async function GET(request: Request, props: { params: Promise<{ collection: string }> }) {
  const params = await props.params;
  try {
    const products = await fetchCollection(params.collection)
    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products for collection:", params.collection, error)
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}
