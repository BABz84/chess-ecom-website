import { NextResponse } from "next/server";
import { getShippingRates } from "@/lib/pirate-ship";
import { z } from "zod";

export const runtime = 'edge';

const addressSchema = z.object({
  street1: z.string(),
  street2: z.string().optional(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  country: z.string(),
});

const parcelSchema = z.object({
  weight: z.number(),
  length: z.number(),
  width: z.number(),
  height: z.number(),
});

const shipmentDetailsSchema = z.object({
  fromAddress: addressSchema,
  toAddress: addressSchema,
  parcels: z.array(parcelSchema),
});

export async function POST(request: Request) {
  // try {
  //   const body = await request.json();
  //   const validation = shipmentDetailsSchema.safeParse(body);

  //   if (!validation.success) {
  //     return NextResponse.json({ error: "Invalid input", details: validation.error.flatten() }, { status: 400 });
  //   }

  //   const rates = await getShippingRates(validation.data);
  //   return NextResponse.json(rates);
  // } catch (error) {
  //   console.error("Error fetching shipping rates:", error);
  //   return NextResponse.json(
  //     { error: "Failed to fetch shipping rates" },
  //     { status: 500 }
  //   );
  // }
  return NextResponse.json({ message: "Shipping route is temporarily disabled." });
}
