// This file provides environment variables for server-side use

export const env = {
  SESSION_SECRET: process.env.SESSION_SECRET || '',
  PUBLIC_STOREFRONT_API_TOKEN: process.env.PUBLIC_STOREFRONT_API_TOKEN || '',
  PRIVATE_STOREFRONT_API_TOKEN: process.env.PRIVATE_STOREFRONT_API_TOKEN || '',
  PUBLIC_STORE_DOMAIN: process.env.PUBLIC_STORE_DOMAIN || '',
  PUBLIC_STOREFRONT_ID: process.env.PUBLIC_STOREFRONT_ID || '',
} as const;

// Validate required environment variables
const requiredVars = [
  'PUBLIC_STOREFRONT_API_TOKEN',
  'PUBLIC_STORE_DOMAIN',
] as const;

for (const varName of requiredVars) {
  if (!env[varName]) {
    console.error(`Missing required environment variable: ${varName}`);
  }
}

console.log('Environment loaded:', {
  domain: env.PUBLIC_STORE_DOMAIN,
  hasPublicToken: !!env.PUBLIC_STOREFRONT_API_TOKEN,
  hasPrivateToken: !!env.PRIVATE_STOREFRONT_API_TOKEN,
});