import { createStorefrontClient } from '@shopify/hydrogen';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { env } from './env.server';

export function createStorefront(request: Request) {
  // Log to debug
  console.log('Creating storefront with domain:', env.PUBLIC_STORE_DOMAIN);
  console.log('Has public token:', !!env.PUBLIC_STOREFRONT_API_TOKEN);

  const { storefront } = createStorefrontClient({
    cache: undefined,
    waitUntil: () => {},
    i18n: { language: 'EN', country: 'US' },
    publicStorefrontToken: env.PUBLIC_STOREFRONT_API_TOKEN,
    privateStorefrontToken: env.PRIVATE_STOREFRONT_API_TOKEN,
    storeDomain: env.PUBLIC_STORE_DOMAIN,
    storefrontId: env.PUBLIC_STOREFRONT_ID,
    storefrontHeaders: {
      requestGroupId: request.headers.get('request-id'),
      buyerIp: request.headers.get('oxygen-buyer-ip'),
      cookie: request.headers.get('cookie'),
    },
  });

  return { storefront, env };
}

export type AppLoadContext = {
  env: ReturnType<typeof createStorefront>['env'];
  storefront: ReturnType<typeof createStorefront>['storefront'];
};