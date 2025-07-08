import { NextResponse } from "next/server";
import { headers } from "next/headers";
import crypto from "crypto";
import { updateFulfillmentStatus } from "@/lib/shopify";

// It's crucial to store these secrets in environment variables
const PRINTIFY_WEBHOOK_SECRET = process.env.PRINTIFY_WEBHOOK_SECRET;
const GELATO_WEBHOOK_SECRET = process.env.GELATO_WEBHOOK_SECRET;

export async function POST(request: Request) {
  const body = await request.json();
  const headersList = await headers();

  // Differentiate between Printify and Gelato webhooks
  const printifySignature = headersList.get("x-pfy-signature");
  const gelatoSignature = headersList.get("x-gelato-signature");

  if (printifySignature) {
    // --- Printify Webhook Handling ---
    if (!PRINTIFY_WEBHOOK_SECRET) {
      console.error("Printify webhook secret is not configured.");
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

    // Verify the webhook signature
    const calculatedSignature = crypto
      .createHmac("sha256", PRINTIFY_WEBHOOK_SECRET)
      .update(JSON.stringify(body))
      .digest("hex");

    if (calculatedSignature !== printifySignature.replace('sha256=', '')) {
      console.warn("Invalid Printify webhook signature.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Received valid Printify webhook:", JSON.stringify(body, null, 2));

    if (body.type === 'order:shipment:created') {
        const { resource } = body;
        const { id: orderId, data } = resource;
        const { carrier, tracking_number, tracking_url } = data;
        await updateFulfillmentStatus(orderId, "fulfilled", { tracking_number, tracking_url, carrier: carrier.code });
    }


  } else if (gelatoSignature) {
    // --- Gelato Webhook Handling (SECURITY PATCH) ---
    // The original implementation was insecure and has been disabled.
    // DO NOT enable this endpoint without implementing proper cryptographic signature verification (e.g., HMAC-SHA256)
    // as per the official Gelato developer documentation.
    console.error("Attempted to use the insecure Gelato webhook. The endpoint is disabled for security reasons.");
    return NextResponse.json({ error: "Endpoint disabled due to security vulnerability." }, { status: 503 });
    
    /*
    // --- Original Insecure Code (Placeholder) ---
    if (!GELATO_WEBHOOK_SECRET) {
      console.error("Gelato webhook secret is not configured.");
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

    // Verification logic needs to be updated based on Gelato's documentation
    if (gelatoSignature !== `Bearer ${GELATO_WEBHOOK_SECRET}`) {
        console.warn("Invalid Gelato webhook signature.");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Received valid Gelato webhook:", JSON.stringify(body, null, 2));
    
    // Data extraction and Shopify update logic needs to be implemented
    // const { orderId, newStatus, tracking } = body;
    // await updateFulfillmentStatus(orderId, newStatus, tracking);
    */

  } else {
    console.warn("Received a webhook from an unknown source.");
    return NextResponse.json({ error: "Unrecognized webhook source" }, { status: 400 });
  }

  return NextResponse.json({ status: "success" }, { status: 200 });
}
