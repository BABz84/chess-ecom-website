import { vi, describe, it, expect, beforeEach } from 'vitest';
import { POST } from '../../app/api/shipping/route';
import * as pirateShip from '../../lib/pirate-ship';

vi.mock('../../lib/pirate-ship');

const getShippingRatesMock = pirateShip.getShippingRates as jest.Mock;

describe('API Route: /api/shipping', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return a message indicating the route is disabled', async () => {
    const request = new Request('http://localhost/api/shipping', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ message: 'Shipping route is temporarily disabled.' });
  });

  it.skip('should return shipping rates for a valid shipment', () => {
    // TEST SKIPPED: This functionality is deprecated as Shopify handles shipping calculations.
    // The /api/shipping route is intentionally disabled.
    expect(true).toBe(true);
  });

  it.skip('should return a 500 error if fetching fails', () => {
    // TEST SKIPPED: This functionality is deprecated as Shopify handles shipping calculations.
    // The /api/shipping route is intentionally disabled.
    expect(true).toBe(true);
  });

  it.skip('should return a 400 error if the shipment data is missing', () => {
    // TEST SKIPPED: This functionality is deprecated as Shopify handles shipping calculations.
    // The /api/shipping route is intentionally disabled.
    expect(true).toBe(true);
  });
});
