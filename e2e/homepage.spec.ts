import { test, expect } from '@playwright/test';
import { mockShopifyAPI } from './mocks';

test.beforeEach(async ({ page }) => {
  await mockShopifyAPI(page);
});

test('homepage has correct title and hero section', async ({ page }) => {
  await page.goto('/');

  // Check for the main heading in the hero section
  await expect(page.getByRole('heading', { name: 'Where Legacy' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Lives in Art' })).toBeVisible();
});

test('search for a product', async ({ page }) => {
  await page.goto('/');

  // Click the search input and type "THE"
  await page.getByPlaceholder('Search products...').click();
  await page.getByPlaceholder('Search products...').fill('THE');

  // Check that the search results are visible
  await expect(page.getByText('The Chess Player')).toBeVisible();
});
