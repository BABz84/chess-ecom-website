// Shopify integration utilities
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
const adminAccessToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN

async function ShopifyData(query: string, isAdmin = false) {
  const URL = `${domain}/api/2024-04/graphql.json`

  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": !isAdmin ? storefrontAccessToken! : "",
      "X-Shopify-Access-Token": isAdmin ? adminAccessToken! : "",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  }

  try {
    const response = await fetch(URL, options)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.message ?? "Failed to fetch Shopify data")
    }

    return data
  } catch (error) {
    console.error("Shopify API Error:", error)
    throw new Error("Products not fetched")
  }
}

export async function getProductsInCollection(handle: string) {
  const query = `
    {
      collection(handle: "${handle}") {
        products(first: 25) {
          edges {
            node {
              id
              title
              handle
              priceRange {
                minVariantPrice {
                  amount
                }
              }
              images(first: 1) {
                edges {
                  node {
                    originalSrc
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  const response = await ShopifyData(query)
  const allProducts = response.data.collection ? response.data.collection.products.edges : []
  return allProducts
}

export async function getCollection(handle: string) {
  const query = `
    {
      collection(handle: "${handle}") {
        id
        title
        description
      }
    }
  `
  const response = await ShopifyData(query)
  return response.data.collection
}

export async function getAllProducts() {
  const query = `
    {
      products(first: 250) {
        edges {
          node {
            id
            title
            handle
            description
            images(first: 1) {
              edges {
                node {
                  originalSrc
                  altText
                }
              }
            }
          }
        }
      }
    }
  `

  const response = await ShopifyData(query)
  const products = response.data.products ? response.data.products.edges : []
  return products
}

export async function getProduct(handle: string) {
  const query = `
    {
      product(handle: "${handle}") {
        id
        title
        handle
        description
        descriptionHtml
        images(first: 10) {
          nodes {
            url
            altText
          }
        }
        options {
          name
          values
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 250) {
          nodes {
            id
            title
            quantityAvailable
            availableForSale
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
              width
              height
            }
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `

  const response = await ShopifyData(query)
  const product = response.data.product ? response.data.product : null
  return product
}

export async function createCart(lineItems: { merchandiseId: string; quantity: number }[]) {
  const lineItemsObject = lineItems.map(item => {
    return `{
      merchandiseId: "${item.merchandiseId}",
      quantity: ${item.quantity}
    }`
  })

  const query = `
    mutation {
      cartCreate(input: {
        lines: [${lineItemsObject}]
      }) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          code
          field
          message
        }
      }
    }
  `

  const response = await ShopifyData(query)

  if (!response.data.cartCreate) {
    console.error("Shopify cartCreate response is null:", response)
    throw new Error("Failed to create cart.")
  }

  if (response.data.cartCreate.userErrors.length > 0) {
    throw new Error(response.data.cartCreate.userErrors[0].message)
  }

  return response.data.cartCreate.cart
}

export async function updateCart(cartId: string, lineItems: { id: string; quantity: number }[]) {
  const lineItemsObject = lineItems.map(item => {
    return `{
      id: "${item.id}",
      quantity: ${item.quantity}
    }`
  })

  const query = `
    mutation {
      cartLinesUpdate(cartId: "${cartId}", lines: [${lineItemsObject}]) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          code
          field
          message
        }
      }
    }
  `

  const response = await ShopifyData(query)

  if (!response.data.cartLinesUpdate) {
    console.error("Shopify cartLinesUpdate response is null:", response)
    throw new Error("Failed to update cart.")
  }

  if (response.data.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(response.data.cartLinesUpdate.userErrors[0].message)
  }

  return response.data.cartLinesUpdate.cart
}

export async function updateFulfillmentStatus(orderId: string, status: string, trackingInfo: any) {
  // This is a placeholder for the actual mutation
  // You will need to construct the correct GraphQL mutation based on the Shopify Admin API documentation
  const query = `
    mutation {
      // Example mutation, this will need to be replaced with the correct one
      fulfillmentCreateV2(
        fulfillment: {
          lineItemsByFulfillmentOrder: [
            {
              fulfillmentOrderId: "gid://shopify/FulfillmentOrder/${orderId}"
              fulfillmentOrderLineItems: []
            }
          ]
          trackingInfo: {
            number: "${trackingInfo.tracking_number}"
            url: "${trackingInfo.tracking_url}"
          }
          notifyCustomer: true
        }
      ) {
        fulfillment {
          id
          status
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const response = await ShopifyData(query, true); // Use admin API
  return response;
}

export async function searchProducts(query: string) {
  const searchQuery = `
    {
      products(first: 10, query: "title:${query}* OR product_type:${query}* OR vendor:${query}* OR tag:${query}*") {
        edges {
          node {
            id
            title
            handle
            images(first: 1) {
              edges {
                node {
                  originalSrc
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await ShopifyData(searchQuery);
  const products = response.data.products ? response.data.products.edges : [];
  return products;
}
