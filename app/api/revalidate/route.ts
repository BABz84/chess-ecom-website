import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export const runtime = 'edge'

async function verifyShopifySignature(secret: string, body: string, signature: string): Promise<boolean> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const mac = await crypto.subtle.sign('HMAC', key, encoder.encode(body))
  const calculatedSignature = btoa(String.fromCharCode(...new Uint8Array(mac)))
  return calculatedSignature === signature
}

export async function POST(request: NextRequest) {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET
  if (!secret) {
    return new NextResponse(JSON.stringify({ message: 'Webhook secret not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const hmac = request.headers.get('x-shopify-hmac-sha256')
  if (!hmac) {
    return new NextResponse(JSON.stringify({ message: 'Missing Shopify HMAC signature' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const body = await request.text()
  const isValid = await verifyShopifySignature(secret, body, hmac)

  if (!isValid) {
    return new NextResponse(JSON.stringify({ message: 'Invalid webhook signature' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const data = JSON.parse(body)
  const { handle, collection_handle } = data

  try {
    if (handle) {
      // Revalidate product pages
      revalidatePath(`/products/${handle}`)
      revalidatePath('/products')
    }

    if (collection_handle) {
      // Revalidate collection pages
      revalidatePath(`/collections/${collection_handle}`)
      revalidatePath('/collections/all')
    }

    // Always revalidate the homepage on any product or collection update
    revalidatePath('/')

    return new NextResponse(JSON.stringify({ revalidated: true, now: Date.now() }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new NextResponse(JSON.stringify({ message: 'Error revalidating' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATION_SECRET) {
    return new NextResponse(JSON.stringify({ message: 'Invalid secret' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    revalidatePath('/')
    revalidatePath('/products')
    revalidatePath('/collections/all')
    return new NextResponse(JSON.stringify({ revalidated: true, now: Date.now() }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new NextResponse(JSON.stringify({ message: 'Error revalidating' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
