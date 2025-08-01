# Launch Checklist: Stabilizing the Build

This document outlines the necessary steps to resolve the Cloudflare deployment failures, incorporating research and best practices.

### 1. Fix API Route Type Error

*   **Problem:** The `GET` function in `app/api/products/[collection]/route.ts` has an invalid TypeScript definition.
*   **Solution:**
    1.  **Research:** Use the Context7 MCP server to search the official Next.js documentation for the correct type signature for API Route Handlers in the App Router.
    2.  **Analyze:** Read the file `app/api/products/[collection]/route.ts` to understand its current implementation.
    3.  **Implement:** Based on the official documentation, correct the type signature of the `GET` function and ensure the `params` object is accessed correctly.

### 2. Correct `wrangler.toml` Configuration

*   **Problem:** The `wrangler.toml` file is missing the mandatory `pages_build_output_dir` property.
*   **Solution:**
    1.  **Research:** Use the Context7 MCP server to search the Cloudflare Pages documentation to confirm the exact syntax and placement for the `pages_build_output_dir` property in `wrangler.toml`.
    2.  **Implement:** Read the `wrangler.toml` file and add the `pages_build_output_dir = ".next"` line in the appropriate section as confirmed by the documentation.

### 3. Standardize Package Manager in Build Environment

*   **Problem:** The build environment defaults to `npm`, but the project uses `pnpm`.
*   **Solution:**
    1.  **Research:** A web search has confirmed that the best practice is to modify the build command in the Cloudflare Pages dashboard.
    2.  **Document:** The user should navigate to the project's **Settings > Build & deployments** section in the Cloudflare dashboard and set the **Build command** to: `npm i -g pnpm && pnpm i && pnpm build`
