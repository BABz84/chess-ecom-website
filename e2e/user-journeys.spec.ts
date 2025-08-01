import { test, expect } from '@playwright/test';
import { mockShopifyAPI } from './mocks';

test.beforeEach(async ({ page }) => {
  await mockShopifyAPI(page);
});

test.describe('User Journeys', () => {
  test('Navigate to a collection and view a product', async ({ page }) => {
    await page.goto('/');
    // More robust selector to find the link to the 'all' collection
    await page.getByRole('link', { name: /shop all/i }).click();
    await expect(page).toHaveURL('/collections/all');

    // Click on the first product in the collection
    await page.locator('.product-card').first().click();
    await expect(page).toHaveURL(/\/products\/.+/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('Add a product to the cart', async ({ page }) => {
    // Navigate directly to a product page to isolate the "add to cart" functionality
    await page.goto('/products/the-chess-player'); 

    await expect(page.getByRole('heading', { name: 'The Chess Player' })).toBeVisible();

    // Click the "Add to Cart" button
    await page.getByRole('button', { name: /add to cart/i }).click();

    // Open the cart
    await page.getByRole('button', { name: /cart/i }).click();

    // Verify the item is in the cart
    await expect(page.getByText('The Chess Player')).toBeVisible();
    await expect(page.getByText('1')).toBeVisible(); // Check for quantity
  });

  test('Navigate to static pages from the footer', async ({ page }) => {
    await page.goto('/');

    // Test navigation to the Privacy Policy page
    await page.getByRole('link', { name: /privacy/i }).click();
    await expect(page).toHaveURL('/privacy');
    await expect(page.getByRole('heading', { name: /privacy policy/i })).toBeVisible();

    // Go back and test navigation to the Terms of Service page
    await page.goBack();
    await page.getByRole('link', { name: /terms/i }).click();
    await expect(page).toHaveURL('/terms');
    await expect(page.getByRole('heading', { name: /terms of service/i })).toBeVisible();
  });
});
