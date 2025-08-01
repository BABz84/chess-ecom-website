/**
 * This file serves as the central hub for all interactions with the Shopify Storefront API.
 * It establishes a client connection and exports a suite of functions for fetching products,
 * managing collections, handling the shopping cart, and searching.
 *
 * Each function is designed to query the Shopify GraphQL API and return structured data
 * for use throughout the Next.js application.
 */
import { ShopifyData } from './shopify-client';

/**
 * Fetches a specific collection by its handle, including all its products.
 * This is used to display a collection page with all associated items.
 *
 * @param {string} handle - The handle of the collection to fetch.
 * @returns {Promise<any>} A promise that resolves with the collection data, including a list of products.
 */
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
            tags
            featuredImage {
              url
              altText
            }
            images(first: 250) {
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

/**
 * Fetches basic details for a single collection by its handle.
 * This function is lighter than fetchCollection as it does not retrieve products.
 *
 * @param {string} handle - The handle of the collection to fetch.
 * @returns {Promise<any>} A promise that resolves with the collection's ID, title, and description.
 */
export async function getCollection(handle: string) {
  const query = `
    query getCollection($handle: String!) {
      collection(handle: $handle) {
        id
        title
        description
      }
    }
  `
  const variables = { handle };
  const response = await ShopifyData(query, variables)
  return response.collection
}

/**
 * Retrieves all active products from the Shopify store.
 * It handles pagination by making multiple requests if necessary, ensuring all products are fetched.
 *
 * @returns {Promise<any[]>} A promise that resolves with an array of all products.
 */
export async function getAllProducts() {
  const query = `
    query getAllProducts($cursor: String) {
      products(first: 250, after: $cursor, query: "status:active") {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            title
            handle
            description
            featuredImage {
              url
              altText
            }
          }
        }
      }
    }
  `;

  let allProducts: any[] = [];
  let hasNextPage = true;
  let cursor = null;

  while (hasNextPage) {
    const response = await ShopifyData(query, { cursor });
    const products = response.products ? response.products.edges : [];
    allProducts = [...allProducts, ...products];
    hasNextPage = response.products.pageInfo.hasNextPage;
    cursor = response.products.pageInfo.endCursor;
  }

  return allProducts;
}

/**
 * Fetches a single product by its handle.
 * This is used for product detail pages.
 *
 * @param {string} handle - The handle of the product to fetch.
 * @returns {Promise<any>} A promise that resolves with the product data, or null if not found.
 */
export async function getProduct(handle: string) {
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
        tags
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
  const variables = { handle };
  const response = await ShopifyData(query, variables)
  const product = response.product ? response.product : null
  return product
}

/**
 * Fetches a cart by its ID, returning its current state from Shopify.
 * This is crucial for synchronizing the local cart state with the source of truth.
 *
 * @param {string} cartId - The ID of the cart to fetch.
 * @returns {Promise<any>} A promise that resolves with the cart data.
 */
export async function getCart(cartId: string) {
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
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
                product {
                  id
                  title
                }
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
    }
  `
  const variables = { cartId }
  const response = await ShopifyData(query, variables)
  return response.cart
}

/**
 * Creates a new shopping cart with an initial set of line items.
 *
 * @param {{ merchandiseId: string; quantity: number }[]} lineItems - An array of items to add to the new cart.
 * @returns {Promise<any>} A promise that resolves with the newly created cart object.
 * @throws {Error} If the cart creation fails or returns user errors.
 */
export async function createCart(lineItems: { merchandiseId: string; quantity: number }[]) {
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          lines(first: 100) {
            nodes {
              id
              merchandise {
                ... on ProductVariant {
                  id
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

/**
 * Adds one or more line items to an existing shopping cart.
 *
 * @param {string} cartId - The ID of the cart to modify.
 * @param {{ merchandiseId: string; quantity: number }[]} lines - An array of items to add.
 * @returns {Promise<any>} A promise that resolves with the updated cart object.
 * @throws {Error} If adding lines fails or returns user errors.
 */
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

/**
 * Removes one or more line items from an existing shopping cart.
 *
 * @param {string} cartId - The ID of the cart to modify.
 * @param {string[]} lineIds - An array of line item IDs to remove.
 * @returns {Promise<any>} A promise that resolves with the updated cart object.
 * @throws {Error} If removing lines fails or returns user errors.
 */
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

/**
 * Updates the quantity of one or more line items in an existing shopping cart.
 *
 * @param {string} cartId - The ID of the cart to modify.
 * @param {{ id: string; quantity: number }[]} lines - An array of line items to update, including their new quantities.
 * @returns {Promise<any>} A promise that resolves with the updated cart object.
 * @throws {Error} If updating lines fails or returns user errors.
 */
export async function updateCartLines(cartId: string, lines: { id:string; quantity: number }[]) {
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

/**
 * Searches for products based on a given search term.
 * The search covers product titles, types, vendors, and tags.
 *
 * @param {string} searchTerm - The term to search for.
 * @returns {Promise<any[]>} A promise that resolves with an array of matching products.
 */
export async function searchProducts(searchTerm: string) {
  const query = `
    query searchProducts($searchTerm: String!) {
      products(first: 10, query: $searchTerm) {
        edges {
          node {
            id
            title
            handle
            featuredImage {
              url
              altText
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
  `;
  const variables = { searchTerm: `title:${searchTerm}* OR product_type:${searchTerm}* OR vendor:${searchTerm}* OR tag:${searchTerm}*` };
  const response = await ShopifyData(query, variables);
  const products = response.products ? response.products.edges : [];
  return products;
}

/**
 * A placeholder function to simulate updating an order's fulfillment status.
 * In a real-world application, this would interact with the Shopify Admin API,
 * which requires secure authentication and is handled separately from the Storefront API.
 *
 * @param {string} orderId - The ID of the order to update.
 * @param {string} status - The new fulfillment status.
 * @param {{ tracking_number: string; tracking_url: string; carrier: string; }} trackingInfo - An object containing tracking details.
 * @returns {Promise<{success: boolean}>} A promise that resolves with a success status.
 */
export async function updateFulfillmentStatus(orderId: string, status: string, trackingInfo: { tracking_number: string; tracking_url: string; carrier: string; }) {
  // This is a placeholder function. In a real-world scenario, you would use the Shopify Admin API
  // to update the fulfillment status of an order. This would require a separate client and authentication.
  console.log(`Updating fulfillment for order ${orderId} to ${status} with tracking:`, trackingInfo);
  return { success: true };
}
