import { Link } from '@remix-run/react';
import { Money } from '@shopify/hydrogen';
import type { MoneyV2, Image } from '@shopify/hydrogen/storefront-api-types';

interface ProductCardProps {
  product: {
    id: string;
    handle: string;
    title: string;
    featuredImage?: Image | null;
    priceRange: {
      minVariantPrice: MoneyV2;
      maxVariantPrice: MoneyV2;
    };
    compareAtPriceRange?: {
      maxVariantPrice: MoneyV2;
    } | null;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const isOnSale = product.compareAtPriceRange?.maxVariantPrice && 
    Number(product.compareAtPriceRange.maxVariantPrice.amount) > Number(product.priceRange.maxVariantPrice.amount);

  return (
    <Link 
      to={`/products/${product.handle}`}
      className="group block"
    >
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        {product.featuredImage && (
          <img
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        )}
        {isOnSale && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">
            SALE
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
          {product.title}
        </h3>
        <div className="mt-1 flex items-center space-x-2">
          <span className="text-sm font-semibold text-gray-900">
            <Money data={product.priceRange.minVariantPrice} />
          </span>
          {isOnSale && product.compareAtPriceRange && (
            <span className="text-sm text-gray-500 line-through">
              <Money data={product.compareAtPriceRange.maxVariantPrice} />
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}