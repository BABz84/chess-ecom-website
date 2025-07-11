# Plan to Resolve Build Failures

This document outlines the necessary steps to fix the build failures identified in the Cloudflare Pages deployment logs.

## 1. Correct `wrangler.toml` Configuration

The current `wrangler.toml` file is missing the `pages_build_output_dir` property, which is required by Cloudflare Pages to identify the build output directory.

**Action:**
- Add the `pages_build_output_dir` property to the `[pages]` section of `wrangler.toml`.

**File to be modified:** `wrangler.toml`

**Change:**
```diff
--- a/wrangler.toml
+++ b/wrangler.toml
@@ -4,4 +4,5 @@
 
 [pages]
 compatibility_flags = ["nodejs_compat"]
+pages_build_output_dir = ".next"
```

## 2. Fix API Route Build Errors

The build is failing due to two issues in the `app/api/products/[collection]/route.ts` file:
1.  An attempt to import a non-existent function `getProductsInCollection`.
2.  An incorrect TypeScript type for the `GET` request handler.

**Action:**
- Replace the incorrect `getProductsInCollection` function call with the correct `fetchCollection` function.
- Correct the type definition for the `GET` request handler's parameters.

**File to be modified:** `app/api/products/[collection]/route.ts`

**Change:**
```diff
--- a/app/api/products/[collection]/route.ts
+++ b/app/api/products/[collection]/route.ts
@@ -1,11 +1,11 @@
 import { NextResponse } from 'next/server'
-import { getProductsInCollection } from 'lib/shopify'
+import { fetchCollection } from '@/lib/shopify'
 
-export async function GET(request: Request, { params }: { params: { collection: string } }) {
+export async function GET(request: Request, { params }: { params: { handle: string } }) {
   try {
-    const products = await getProductsInCollection(params.collection)
+    const products = await fetchCollection(params.handle)
     return NextResponse.json(products)
   } catch (error) {
     return NextResponse.json({ error: 'Failed to fetch collection' }, { status: 500 })
   }
 }
```

## 3. Commit and Push Changes

Once the fixes are implemented, I will commit the changes to the repository and push them to the `main` branch to trigger a new deployment on Cloudflare Pages.
