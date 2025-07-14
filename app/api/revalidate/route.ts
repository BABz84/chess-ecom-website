import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATION_SECRET) {
    return new NextResponse(JSON.stringify({ message: 'Invalid secret' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const body = await request.json()
  const { handle } = body

  if (!handle) {
    return new NextResponse(JSON.stringify({ message: 'Missing product handle' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    revalidatePath(`/products/${handle}`)
    revalidatePath('/products')
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
