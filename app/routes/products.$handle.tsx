import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useFetcher } from '@remix-run/react';
import { Money } from '@shopify/hydrogen';
import { ShopifyProvider, CartProvider } from '@shopify/hydrogen-react';
import { Layout } from '~/components/Layout';
import { PRODUCT_VARIANT_FRAGMENT } from '~/graphql/fragments';
import { useState } from 'react';

const PRODUCT_QUERY = `#graphql
  ${PRODUCT_VARIANT_FRAGMENT}
  query Product($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      featuredImage {
        url
        altText
        width
        height
      }
      images(first: 10) {
        nodes {
          url
          altText
          width
          height
        }
      }
      options {
        name
        values
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: []) {
        ...ProductVariant
      }
      variants(first: 100) {
        nodes {
          ...ProductVariant
        }
      }
    }
  }
`;

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { handle } = params;
  const { createStorefront } = await import('~/lib/storefront.server');
  const { storefront } = createStorefront(request);

  if (!handle) {
    throw new Response('Product not found', { status: 404 });
  }

  const { product } = await storefront.query(PRODUCT_QUERY, {
    variables: { handle },
  });

  if (!product) {
    throw new Response('Product not found', { status: 404 });
  }

  // Get env from request context
  const env = {
    PUBLIC_STORE_DOMAIN: process.env.PUBLIC_STORE_DOMAIN || 'example.myshopify.com',
    PUBLIC_STOREFRONT_API_TOKEN: process.env.PUBLIC_STOREFRONT_API_TOKEN || '',
  };
  
  return json({ product, env });
}

export default function ProductPage() {
  const { product, env } = useLoaderData<typeof loader>();
  const [selectedVariant, setSelectedVariant] = useState(product.selectedVariant || product.variants.nodes[0]);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [selectedImage, setSelectedImage] = useState(0);
  const fetcher = useFetcher();

  const handleOptionChange = (optionName: string, value: string) => {
    const newOptions = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(newOptions);

    const newVariant = product.variants.nodes.find(variant =>
      variant.selectedOptions.every(option =>
        newOptions[option.name] === option.value
      )
    );

    if (newVariant) {
      setSelectedVariant(newVariant);
    }
  };

  const images = product.images.nodes.length > 0 ? product.images.nodes : [product.featuredImage];

  return (
    <ShopifyProvider
      storeDomain={env.PUBLIC_STORE_DOMAIN}
      storefrontToken={env.PUBLIC_STOREFRONT_API_TOKEN}
      storefrontApiVersion="2024-01"
      countryIsoCode="US"
      languageIsoCode="EN"
    >
      <CartProvider>
        <Layout>
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
                    {images[selectedImage] && (
                      <img
                        src={images[selectedImage].url}
                        alt={images[selectedImage].altText || product.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  {images.length > 1 && (
                    <div className="grid grid-cols-4 gap-4">
                      {images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`aspect-square overflow-hidden rounded-lg bg-gray-100 ${
                            selectedImage === index ? 'ring-2 ring-primary-500' : ''
                          }`}
                        >
                          <img
                            src={image.url}
                            alt={image.altText || ''}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                  
                  <div className="mb-6">
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl font-semibold">
                        <Money data={selectedVariant.price} />
                      </span>
                      {selectedVariant.compareAtPrice && (
                        <span className="text-xl text-gray-500 line-through">
                          <Money data={selectedVariant.compareAtPrice} />
                        </span>
                      )}
                    </div>
                  </div>

                  {product.options.map((option) => (
                    <div key={option.name} className="mb-6">
                      <h3 className="text-sm font-medium mb-2">{option.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {option.values.map((value) => (
                          <button
                            key={value}
                            onClick={() => handleOptionChange(option.name, value)}
                            className={`px-4 py-2 border rounded-lg transition-colors ${
                              selectedOptions[option.name] === value
                                ? 'border-primary-500 bg-primary-50 text-primary-700'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="mb-8">
                    <button
                      disabled={!selectedVariant.availableForSale}
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                        selectedVariant.availableForSale
                          ? 'bg-primary-600 text-white hover:bg-primary-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {selectedVariant.availableForSale ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>

                  {product.description && (
                    <div className="prose prose-sm max-w-none">
                      <h2 className="text-lg font-semibold mb-2">Description</h2>
                      <p className="text-gray-600">{product.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </Layout>
      </CartProvider>
    </ShopifyProvider>
  );
}