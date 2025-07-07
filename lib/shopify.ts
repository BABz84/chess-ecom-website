import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const client = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
  apiVersion: '2024-04',
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
});

async function ShopifyData(query: string, variables: object = {}) {
  try {
    const { data, errors } = await client.request(query, { variables });

    if (errors) {
      console.error("Shopify API Errors:", JSON.stringify(errors, null, 2));
      throw new Error("Failed to fetch Shopify data");
    }

    return data;
  } catch (error) {
    console.error("Shopify API Error:", error);
    throw new Error("Products not fetched");
  }
}

export async function fetchCollection(handle: string) {
  const query = `
    query CollectionWithProducts($handle: String!) {
      collectionByHandle(handle: $handle) {
        id
        title
        products(first: 250) {
          nodes {
            id
            title
            handle
            description
            descriptionHtml
            featuredImage {
              url
              altText
            }
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
      }
    }
  `
  const variables = { handle }
  const response = await ShopifyData(query, variables)

  return response.collectionByHandle
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
  return response.collection
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
  const products = response.products ? response.products.edges : []
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
  const product = response.product ? response.product : null
  return product
}

export async function createCart(lineItems: { merchandiseId: string; quantity: number }[]) {
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
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

  const variables = {
    input: {
      lines: lineItems.map(item => ({
        merchandiseId: item.merchandiseId,
        quantity: item.quantity,
      })),
    },
  }

  const response = await ShopifyData(query, variables)

  if (response.cartCreate.userErrors.length > 0) {
    throw new Error(response.cartCreate.userErrors[0].message)
  }

  return response.cartCreate.cart
}

export async function addCartLines(cartId: string, lines: { merchandiseId: string; quantity: number }[]) {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 100) {
            nodes {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
        userErrors {
          code
          field
          message
        }
      }
    }
  `

  const variables = { cartId, lines }
  const response = await ShopifyData(query, variables)

  if (response.cartLinesAdd.userErrors.length > 0) {
    throw new Error(response.cartLinesAdd.userErrors[0].message)
  }

  return response.cartLinesAdd.cart
}

export async function removeCartLines(cartId: string, lineIds: string[]) {
  const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
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

  const variables = { cartId, lineIds }
  const response = await ShopifyData(query, variables)

  if (response.cartLinesRemove.userErrors.length > 0) {
    throw new Error(response.cartLinesRemove.userErrors[0].message)
  }

  return response.cartLinesRemove.cart
}

export async function updateCartLines(cartId: string, lines: { id: string; quantity: number }[]) {
  const query = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
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

  const variables = { cartId, lines }
  const response = await ShopifyData(query, variables)

  if (response.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(response.cartLinesUpdate.userErrors[0].message)
  }

  return response.cartLinesUpdate.cart
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
  const products = response.products ? response.products.edges : [];
  return products;
}
