# Mansa Gallery

## Project Overview

Mansa Gallery is a headless e-commerce website designed to celebrate and sell historically black items, such as mugs, chess sets, and art prints. The project's mission is to honor forgotten heroes and bridge knowledge gaps through premium, curated collections.

## Tech Stack

This project is built with a modern, headless architecture:

-   **Frontend:** [Next.js](https://nextjs.org/) (v15) with the App Router
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **E-commerce Backend:** [Shopify](https://www.shopify.com/) (Headless)
-   **Print on Demand:** [Printify](https://printify.com/) and [Gelato](https://www.gelato.com/) (integrated with Shopify)
-   **Deployment:** [Cloudflare Pages](https://pages.cloudflare.com/)

## Getting Started

Follow these steps to get the project running locally.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v22.x or later)
-   [pnpm](https://pnpm.io/) (v10.x or later)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/BABz84/chess-ecom-website.git
    cd chess-ecom-website
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

### Environment Variables

Create a `.env.local` file in the root of the project and add the following environment variables. These are required for the application to connect to the necessary third-party services.

```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN="your-shopify-store-domain.myshopify.com"
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN="your-storefront-access-token"
GELATO_API_KEY="your-gelato-api-key"
PRINTIFY_API_TOKEN="your-printify-api-token"
PRINTIFY_WEBHOOK_SECRET="your-printify-webhook-secret"
GELATO_WEBHOOK_SECRET="your-gelato-webhook-secret"
```

**Note:** These values are secret and must be obtained from the respective service dashboards.

### Local Development

To run the development server:

```bash
pnpm run dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

-   **/app:** Contains all the routes, pages, and API endpoints for the application, following the Next.js App Router convention.
-   **/components:** Contains all the reusable React components used throughout the application.
-   **/lib:** Contains helper functions and utility code, including the Shopify API client (`lib/shopify.ts`).
-   **/public:** Contains all static assets, such as images and fonts.

## Key Features & Logic

### Shopify Integration

The project connects to the Shopify Storefront API to fetch product and collection data. The client is configured in `lib/shopify.ts`. All interactions with Shopify are handled through the functions exported from this file.

### API Routes

The `/app/api` directory contains several serverless functions:

-   `/api/products/[collection]`: Fetches products within a specific collection.
-   `/api/products/search`: Provides a search endpoint for products.
-   `/api/shipping`: (Currently disabled) Intended to fetch shipping rates.
-   `/api/webhooks/fulfillment`: Handles fulfillment updates from Printify and Gelato.

### Webhook Handling

The fulfillment webhook at `/api/webhooks/fulfillment` is configured to securely receive updates from Printify. It uses the `crypto` module (via the Web Crypto API) to verify HMAC-SHA256 signatures, ensuring that the requests are authentic. The Gelato webhook is currently disabled due to security considerations and requires a similar signature verification implementation before being enabled.

## Deployment

This project is configured for continuous deployment on Cloudflare Pages. Every push to the `main` branch will trigger a new build and deployment.

-   **Configuration:** The `wrangler.toml` file is configured with `pages_build_output_dir = ".vercel/output"` to ensure Cloudflare can locate the build artifacts.
-   **Package Manager:** The `package.json` file specifies `"packageManager": "pnpm@10.11.1"` to ensure the Cloudflare build environment uses the correct tool.
-   **Runtime:** Most dynamic routes are configured to run on the Edge for performance (`export const runtime = 'edge';`). The fulfillment webhook is configured to run on the Node.js runtime to ensure compatibility with its dependencies.
