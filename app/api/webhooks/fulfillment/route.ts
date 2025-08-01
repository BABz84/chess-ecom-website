import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { updateFulfillmentStatus } from "@/lib/shopify";

export const runtime = 'edge';

// It's crucial to store these secrets in environment variables
const PRINTIFY_WEBHOOK_SECRET = process.env.PRINTIFY_WEBHOOK_SECRET;
const GELATO_WEBHOOK_SECRET = process.env.GELATO_WEBHOOK_SECRET;

async function verifyPrintifySignature(secret: string, body: string, signature: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const mac = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
  const calculatedSignature = Array.from(new Uint8Array(mac)).map(b => b.toString(16).padStart(2, '0')).join('');
  return calculatedSignature === signature.replace('sha256=', '');
}

export async function POST(request: Request) {
  const requestBodyText = await request.text();
  const body = JSON.parse(requestBodyText);
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

    const isValid = await verifyPrintifySignature(PRINTIFY_WEBHOOK_SECRET, requestBodyText, printifySignature);
    if (!isValid) {
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
    console.error("Attempted to use the insecure Gelato webhook. The endpoint is disabled for security reasons.");
    return NextResponse.json({ error: "Endpoint disabled due to security vulnerability." }, { status: 503 });

  } else {
    console.warn("Received a webhook from an unknown source.");
    return NextResponse.json({ error: "Unrecognized webhook source" }, { status: 400 });
  }

  return NextResponse.json({ status: "success" }, { status: 200 });
}
