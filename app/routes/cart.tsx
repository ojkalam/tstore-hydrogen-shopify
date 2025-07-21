import type { LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useFetcher, Link } from '@remix-run/react';
import { Money } from '@shopify/hydrogen';
import { Layout } from '~/components/Layout';

const CART_QUERY = `#graphql
  query Cart($cartId: ID!) {
    cart(id: $cartId) {
      id
      lines(first: 100) {
        nodes {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                amount
                currencyCode
              }
              product {
                title
                handle
                featuredImage {
                  url
                  altText
                }
              }
            }
          }
        }
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
      }
    }
  }
`;

export async function loader({ request }: LoaderFunctionArgs) {
  // Use real storefront API
  const { createStorefront } = await import('~/lib/storefront.server');
  const { storefront } = createStorefront(request);

  // In a real app, you'd get cartId from session/cookies
  // For now, return null cart
  return json({ cart: null });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const action = formData.get('action');

  if (action === 'updateQuantity') {
    // Handle quantity updates
  } else if (action === 'removeItem') {
    // Handle item removal
  }

  return json({ success: true });
}

export default function CartPage() {
  const { cart } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  if (!cart || cart.lines.nodes.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>
          <div className="text-center">
            <p className="text-gray-600 mb-8">Your cart is empty</p>
            <Link
              to="/collections/all"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.lines.nodes.map((line) => (
                <div key={line.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                      {line.merchandise.product.featuredImage && (
                        <img
                          src={line.merchandise.product.featuredImage.url}
                          alt={line.merchandise.product.featuredImage.altText || ''}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <Link 
                        to={`/products/${line.merchandise.product.handle}`}
                        className="font-semibold hover:text-primary-600"
                      >
                        {line.merchandise.product.title}
                      </Link>
                      {line.merchandise.title !== 'Default Title' && (
                        <p className="text-sm text-gray-600">{line.merchandise.title}</p>
                      )}
                      <div className="mt-2">
                        <Money data={line.merchandise.price} />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100">
                        -
                      </button>
                      <span className="w-12 text-center">{line.quantity}</span>
                      <button className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100">
                        +
                      </button>
                    </div>
                    
                    <button className="text-gray-400 hover:text-red-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <Money data={cart.cost.subtotalAmount} />
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <Money data={cart.cost.totalAmount} />
                </div>
              </div>
              
              <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                Proceed to Checkout
              </button>
              
              <Link
                to="/collections/all"
                className="block text-center mt-4 text-primary-600 hover:text-primary-700"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}