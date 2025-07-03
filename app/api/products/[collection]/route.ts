import { NextResponse } from "next/server"
import { getProductsInCollection } from "@/lib/shopify"

export async function GET(
  request: Request,
  context: { params: { collection: string } }
) {
  const { collection } = context.params;
  try {
    const products = await getProductsInCollection(collection)
    return NextResponse.json({ products })
  } catch (error) {
    console.error("Error fetching products for collection:", collection, error)
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}
