import { vi, describe, it, expect, beforeEach } from 'vitest';
import * as shopify from '../../lib/shopify';
import { headers } from 'next/headers';
import { webcrypto } from 'node:crypto';

vi.mock('../../lib/shopify');
vi.mock('next/headers', () => ({
  headers: vi.fn(),
}));

// Helper to generate a valid signature for testing
async function createPrintifySignature(secret: string, body: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await webcrypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const mac = await webcrypto.subtle.sign("HMAC", key, encoder.encode(body));
  return `sha256=${Array.from(new Uint8Array(mac)).map(b => b.toString(16).padStart(2, '0')).join('')}`;
}

const updateFulfillmentStatusMock = shopify.updateFulfillmentStatus as jest.Mock;

describe('API Route: /api/webhooks/fulfillment', () => {
  const webhookSecret = 'test-secret';

  beforeEach(() => {
    vi.resetModules();
    process.env.PRINTIFY_WEBHOOK_SECRET = webhookSecret;
  });

  it('should process a valid Printify webhook', async () => {
    const { POST } = await import('../../app/api/webhooks/fulfillment/route');
    const mockWebhookBody = {
      type: 'order:shipment:created',
      resource: {
        id: 'abc', // This is the order_id
        data: {
          tracking_number: '12345',
          tracking_url: 'http://tracking.com/12345',
          carrier: {
            code: 'USPS'
          },
        },
      },
    };
    const bodyString = JSON.stringify(mockWebhookBody);
    const signature = await createPrintifySignature(webhookSecret, bodyString);

    const request = new Request('http://localhost/api/webhooks/fulfillment', {
      method: 'POST',
      body: bodyString,
      headers: {
        'x-pfy-signature': signature,
      },
    });

    (headers as any).mockReturnValue(new Map([['x-pfy-signature', signature]]));
    updateFulfillmentStatusMock.mockResolvedValue({ success: true });

    const response = await POST(request);

    expect(shopify.updateFulfillmentStatus).toHaveBeenCalledWith('abc', 'fulfilled', {
      tracking_number: '12345',
      tracking_url: 'http://tracking.com/12345',
      carrier: 'USPS',
    });
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body).toEqual({ status: 'success' });
  });

  it('should return a 400 error for an invalid webhook', async () => {
    const { POST } = await import('../../app/api/webhooks/fulfillment/route');
    (headers as any).mockReturnValue(new Map());
    const request = new Request('http://localhost/api/webhooks/fulfillment', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body).toEqual({ error: 'Unrecognized webhook source' });
  });
});
