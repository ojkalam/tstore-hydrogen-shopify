import { createRequestHandler } from '@shopify/remix-oxygen';
import { createStorefrontClient } from '@shopify/hydrogen';
import * as build from './build/server/index.js';

const requestHandler = createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext: (request) => {
    const env = {
      SESSION_SECRET: process.env.SESSION_SECRET!,
      PUBLIC_STOREFRONT_API_TOKEN: process.env.PUBLIC_STOREFRONT_API_TOKEN!,
      PRIVATE_STOREFRONT_API_TOKEN: process.env.PRIVATE_STOREFRONT_API_TOKEN!,
      PUBLIC_STORE_DOMAIN: process.env.PUBLIC_STORE_DOMAIN!,
      PUBLIC_STOREFRONT_ID: process.env.PUBLIC_STOREFRONT_ID!,
    };

    const { storefront } = createStorefrontClient({
      cache: {},
      waitUntil: () => {},
      i18n: { language: 'EN', country: 'US' },
      publicStorefrontToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      privateStorefrontToken: env.PRIVATE_STOREFRONT_API_TOKEN,
      storeDomain: env.PUBLIC_STORE_DOMAIN,
      storefrontId: env.PUBLIC_STOREFRONT_ID,
      storefrontHeaders: {
        requestGroupId: null,
        buyerIp: null,
        cookie: request.headers.get('cookie'),
      },
    });

    return {
      env,
      storefront,
    };
  },
});

export default {
  async fetch(request: Request, env: any, ctx: any) {
    try {
      return await requestHandler(request, env, ctx);
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
};