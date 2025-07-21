import type { Storefront } from '@shopify/hydrogen';

export interface AppLoadContext {
  env: {
    SESSION_SECRET: string;
    PUBLIC_STOREFRONT_API_TOKEN: string;
    PRIVATE_STOREFRONT_API_TOKEN: string;
    PUBLIC_STORE_DOMAIN: string;
    PUBLIC_STOREFRONT_ID: string;
  };
  storefront: Storefront;
  session: {
    get: (key: string) => string | null;
    set: (key: string, value: string) => void;
  };
}