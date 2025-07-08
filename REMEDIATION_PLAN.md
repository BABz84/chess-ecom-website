# Security Remediation Plan

**Objective:** Address all vulnerabilities identified in the `SECURITY_AUDIT.md` report in order of severity.

---

## Phase 1: Critical Vulnerabilities

### 1.1. Insecure Gelato Webhook (CRITICAL)
-   **File:** `app/api/webhooks/fulfillment/route.ts`
-   **Status:** **Complete**
-   **Action:**
    1.  [x] Immediately disable the current insecure bearer token verification logic.
    2.  [x] Add a code comment explaining that the endpoint is disabled and requires a secure HMAC-SHA256 implementation as per Gelato's documentation.
    3.  [x] Mark as complete once the immediate risk is mitigated.
-   **Post-Fix Note:** Also added the missing `updateFulfillmentStatus` function to `lib/shopify.ts` to resolve a pre-existing TypeScript error.

---

## Phase 2: High Vulnerabilities

### 2.1. GraphQL Injection (HIGH)
-   **File:** `lib/shopify.ts`
-   **Status:** **Complete**
-   **Action:**
    1.  [x] Refactor `searchProducts` to use parameterized GraphQL variables.
    2.  [x] Refactor `getProduct` to use parameterized GraphQL variables.
    3.  [x] Refactor `getCollection` to use parameterized GraphQL variables.
    4.  [x] Verify that all data-fetching functions no longer use string interpolation for variables.

### 2.2. Lack of Input Validation on Shipping API (HIGH)
-   **File:** `app/api/shipping/route.ts`
-   **Status:** **Complete**
-   **Action:**
    1.  [x] Define a `zod` schema for the `shipmentDetails` object.
    2.  [x] Implement validation logic in the API route to parse and validate the incoming request body against the schema.
    3.  [x] Ensure that non-conforming requests are rejected with a `400 Bad Request` error.

---

## Phase 3: Medium Vulnerabilities

### 3.1. Stored Cross-Site Scripting (XSS) (MEDIUM)
-   **File:** `components/product-detail.tsx`
-   **Status:** **Complete**
-   **Action:**
    1.  [x] Add `dompurify` and `@types/dompurify` as project dependencies.
    2.  [x] Import `dompurify` in the component.
    3.  [x] Sanitize the `product.descriptionHtml` string using `dompurify.sanitize()` before passing it to `dangerouslySetInnerHTML`.
    4.  [x] Verify that legitimate HTML is still rendered correctly while malicious scripts are stripped.

---

## Completion Checklist

-   [x] All tasks in Phase 1 completed.
-   [x] All tasks in Phase 2 completed.
-   [x] All tasks in Phase 3 completed.
-   [x] Final review of all changes.
-   [x] Project is ready for re-audit or deployment.
