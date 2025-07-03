import { NextResponse } from "next/server";
import { getShippingRates } from "@/lib/pirate-ship";

export async function POST(request: Request) {
  try {
    const shipmentDetails = await request.json();
    const rates = await getShippingRates(shipmentDetails);
    return NextResponse.json(rates);
  } catch (error) {
    console.error("Error fetching shipping rates:", error);
    return NextResponse.json(
      { error: "Failed to fetch shipping rates" },
      { status: 500 }
    );
  }
}
