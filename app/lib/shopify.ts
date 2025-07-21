import type { LoaderFunctionArgs } from '@shopify/remix-oxygen';

export function getStorefront(context: LoaderFunctionArgs['context']) {
  return context.storefront;
}

export type Storefront = ReturnType<typeof getStorefront>;