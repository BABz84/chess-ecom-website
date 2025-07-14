import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

import { getAllProducts } from '../lib/shopify';

async function main() {
  console.log('Fetching all products from Shopify...');
  try {
    const products = await getAllProducts();
    console.log(`Found ${products.length} products.`);
    products.forEach((product: any, index: number) => {
      console.log(`${index + 1}. ${product.node.title} (Handle: ${product.node.handle})`);
    });
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

main();
