# Mansa Gallery Testing Guide

This document provides a guide to running and writing tests for the Mansa Gallery website. A robust testing culture is essential for maintaining a high-quality, triple-A product.

## Guiding Principles

1.  **Thoroughness Over Speed**: Every new feature or bug fix must be accompanied by comprehensive tests.
2.  **Documentation First**: Before fixing a failing test or writing a new one, consult the official documentation for the technologies involved. Use the Context7 MCP server as the primary source for this.
3.  **No Assumptions**: If the reason for a test's failure or a piece of code's behavior is unclear, investigate. Do not make assumptions.

## Running Tests

The project uses `vitest` as its unit testing framework.

To run all unit tests once:
```bash
pnpm test
```

To run the tests in watch mode, which will automatically re-run tests when files change:
```bash
pnpm test --watch
```

## Writing New Tests

### Standard Operating Procedure (SOP)

For every new test or fix, the following procedure must be followed:

1.  **Isolate & Document**: Clearly identify the component or function to be tested and the specific behaviors to be asserted.
2.  **Consult Documentation (Context7)**: Use the `github.com/upstash/context7-mcp` server to retrieve the latest documentation and best practices for the relevant technologies (e.g., `vitest`, `@testing-library/react`, `Next.js`).
3.  **Implement Based on Documentation**: Write the test strictly following the patterns and examples found in the official documentation.
4.  **Verify**: Run the test to ensure it passes and correctly validates the intended behavior.

### File Structure

All test files are located in the `__tests__` directory. The structure of the `__tests__` directory mirrors the main project structure. For example, the test for `components/about-section.tsx` is located at `__tests__/components/about-section.test.tsx`.

### Mocking

-   **API Calls**: All external services and API calls must be mocked. The Shopify library is mocked in `__tests__/mocks/shopify-client.ts` and globally via `vitest.config.ts`. Global `fetch` calls can be mocked using `vi.fn()`.
-   **Components**: Child components can be mocked to isolate the component under test. See `__tests__/components/hero-section-loader.test.tsx` for an example of mocking a child component to inspect its props.
-   **`next/image`**: The Next.js Image component is mocked globally in `jest.setup.tsx` to prevent issues in the `jsdom` environment.

### Async Server Components

`vitest` does not support testing `async` React Server Components directly. The established pattern in this project is to:
1.  Mock the data-fetching function (e.g., `fetchCollection`).
2.  Render the component and `await` the result.
3.  Test that the component renders the correct static UI and that it passes the correct data to its child components.

See `__tests__/components/featured-products.test.tsx` for an example.
