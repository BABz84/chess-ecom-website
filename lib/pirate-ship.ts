const PIRATE_SHIP_API_KEY = process.env.PIRATE_SHIP_API_KEY;
const PIRATE_SHIP_API_URL = "https://api.pirateship.com/v1";

if (!PIRATE_SHIP_API_KEY) {
  throw new Error("Missing Pirate Ship API key. Please set PIRATE_SHIP_API_KEY environment variable.");
}

async function PirateShipAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${PIRATE_SHIP_API_URL}/${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${PIRATE_SHIP_API_KEY}`,
    ...options.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.detail ?? "Failed to fetch Pirate Ship data");
    }

    return data;
  } catch (error) {
    console.error("Pirate Ship API Error:", error);
    throw new Error("Could not fetch from Pirate Ship API.");
  }
}

export async function getShippingRates(shipment: any) {
  const response = await PirateShipAPI("shipments", {
    method: "POST",
    body: JSON.stringify({
      shipment: shipment,
    }),
  });

  return response;
}
