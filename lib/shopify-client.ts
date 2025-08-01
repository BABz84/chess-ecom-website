import { createStorefrontApiClient } from '@shopify/storefront-api-client';

/**
 * Shopify Storefront API client.
 *
 * This client is configured with the store's domain and a public access token.
 * It's used by the ShopifyData function to make authenticated requests to the API.
 */
const client = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
  apiVersion: '2025-07',
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
});

/**
 * A generic function to execute a GraphQL query or mutation against the Shopify Storefront API.
 * It handles the request, checks for errors, and returns the data.
 * This function is the core of all Shopify interactions in this file.
 *
 * @param {string} query - The GraphQL query or mutation string.
 * @param {object} [variables={}] - An object containing variables for the GraphQL query.
 * @returns {Promise<any>} A promise that resolves with the data from the Shopify API.
 * @throws {Error} If the Shopify API returns errors or if the request fails.
 */
export async function ShopifyData(query: string, variables: object = {}) {
  try {
    const { data, errors } = await client.request(query, {
      variables,
      cache: 'no-store',
    } as any);

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
