# Unit Test Inventory & Plan

This document tracks the status of all unit tests for the Mansa Gallery website. The goal is to achieve 100% test coverage for all backend and frontend functionality, with all tests passing.

## Backend API Routes

| API Route | Test File | Status | Plan |
|---|---|---|---|
| `/api/products/[collection]` | `products-collection.test.ts` | ✅ Passing | Stabilized test by correctly formatting the `params` object. |
| `/api/products/search` | `products-search.test.ts` | ✅ Passing | Test file is already robust and covers success, failure, and missing query cases. No changes needed. |
| `/api/shipping` | `shipping.test.ts` | ✅ Intentionally Skipped | Feature is deprecated in favor of Shopify's native shipping. Tests are skipped to reflect this. |
| `/api/webhooks/fulfillment` | `webhooks-fulfillment.test.ts` | ✅ Passing | Implemented skipped test by adding a helper to generate a valid webhook signature. |

## Frontend Components

| Component | Test File | Status | Plan |
|---|---|---|---|
| `product-card.tsx` | `product-card.test.tsx` | ✅ Passing | No action needed. |
| `product-detail.tsx` | `product-detail.test.tsx` | ✅ Passing | Fixed `priority` prop warning by improving the `next/image` mock in `jest.setup.tsx`. |
| `cart.tsx` | `cart.test.tsx` | ✅ Passing | Fixed accessibility warning by adding a `SheetDescription` to the component. |
| `about-section.tsx` | `about-section.test.tsx` | ✅ Passing | Wrote tests for static content rendering. |
| `cart-provider.tsx` | `cart-provider.test.tsx` | ✅ Passing | Wrote tests for adding, removing, updating, and loading from localStorage. |
| `category-showcase.tsx` | `category-showcase.test.tsx` | ✅ Passing | Wrote tests for static content rendering. |
| `featured-products.tsx` | `featured-products.test.tsx` | ✅ Passing | Wrote tests for static content and mocked product rendering, acknowledging limitations with async Server Components. |
| `footer.tsx` | `footer.test.tsx` | ✅ Passing | Wrote tests for static content rendering. |
| `free-resources.tsx` | `free-resources.test.tsx` | ✅ Passing | Wrote tests for static content rendering. |
| `gelato-showcase.tsx` | `gelato-showcase.test.tsx` | ✅ Passing | Wrote tests for static content and mocked product rendering, acknowledging limitations with async Server Components. |
| `header.tsx` | `header.test.tsx` | ✅ Passing | Wrote tests for static rendering, mobile menu, and search toggle. |
| `hero-carousel.tsx` | `hero-carousel.test.tsx` | ✅ Passing | Wrote tests for initial render, empty state, auto-cycling, and dot navigation. |
| `hero-section-loader.tsx` | `hero-section-loader.test.tsx` | ✅ Passing | Wrote tests to verify data fetching is called and props are passed to the child component. |
| `hero-section.tsx` | `hero-section.test.tsx` | ✅ Passing | Wrote tests for static content rendering and verified correct props are passed to child components. |
| `historical-pieces-showcase.tsx` | `historical-pieces-showcase.test.tsx` | ✅ Passing | Wrote tests for static content rendering. |
| `newsletter-signup.tsx` | `newsletter-signup.test.tsx` | ✅ Passing | Wrote tests for initial render and successful form submission. |
| `printify-showcase.tsx` | `printify-showcase.test.tsx` | ✅ Passing | Wrote tests for static content and mocked product rendering, acknowledging limitations with async Server Components. |
| `product-search.tsx` | `product-search.test.tsx` | ✅ Passing | Wrote tests for initial render, debounced search, and displaying results. |
| `search-provider.tsx` | `search-provider.test.tsx` | ✅ Passing | Wrote tests for successful search and error handling. |
| `theme-provider.tsx` | - | ✅ No Test Needed | This component is a simple wrapper around a third-party provider (`next-themes`) with no custom logic. Its behavior is tested via E2E tests. |
| `who-we-are-section.tsx` | `who-we-are-section.test.tsx` | ✅ Passing | Wrote tests for static content and mocked product rendering, acknowledging limitations with async Server Components. |

## Lib & Services

| Service | Test File | Status | Plan |
|---|---|---|---|
| `lib/shopify.ts` | `shopify.test.ts` | ✅ Passing | No action needed. |
| `lib/pirate-ship.ts` | `pirate-ship.test.ts` | ✅ Intentionally Skipped | Feature is deprecated in favor of Shopify's native shipping. Test suite is skipped. |
