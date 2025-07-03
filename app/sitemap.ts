import { MetadataRoute } from 'next'
import { getAllProducts } from '@/lib/shopify'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts()
  const productUrls = products.map((product: any) => {
    return {
      url: `${process.env.NEXT_PUBLIC_URL}/products/${product.node.handle}`,
      lastModified: new Date(),
    }
  })

  return [
    {
      url: `${process.env.NEXT_PUBLIC_URL}`,
      lastModified: new Date(),
    },
    ...productUrls,
  ]
}
