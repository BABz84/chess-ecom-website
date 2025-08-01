import { vi, describe, it, expect, beforeEach } from 'vitest';
import { getShippingRates } from '../lib/pirate-ship';

// Mock the global fetch function
global.fetch = vi.fn();

// This entire test suite is skipped because the Pirate Ship integration has been deprecated.
// Shopify's native functionality is used for shipping calculations instead.
describe.skip('Pirate Ship Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return shipping rates when successful', async () => {
    const mockShipment = {
      address: {
        street1: '123 Test St',
        city: 'Testville',
        state: 'TS',
        zip: '12345',
        country: 'US',
      },
    };

    const mockResponse = { rates: [{ service: 'usps_priority', rate: 10.0 }] };
    (fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const rates = await getShippingRates(mockShipment);

    expect(fetch).toHaveBeenCalledWith(
      'https://api.pirateship.com/v1/shipments',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ shipment: mockShipment }),
      })
    );
    expect(rates).toEqual(mockResponse);
  });

  it('should throw an error if the API call fails', async () => {
    (fetch as any).mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ errors: [{ detail: 'Invalid address' }] }),
    });

    await expect(getShippingRates({})).rejects.toThrow('Could not fetch from Pirate Ship API.');
  });
});
