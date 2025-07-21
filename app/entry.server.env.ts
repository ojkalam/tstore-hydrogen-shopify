// Load environment variables before anything else
import dotenv from 'dotenv';
dotenv.config();

console.log('Environment variables loaded in entry.server.env.ts');
console.log('PUBLIC_STORE_DOMAIN:', process.env.PUBLIC_STORE_DOMAIN);
console.log('Has PUBLIC_STOREFRONT_API_TOKEN:', !!process.env.PUBLIC_STOREFRONT_API_TOKEN);