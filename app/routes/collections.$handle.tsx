import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Layout } from '~/components/Layout';
import { ProductCard } from '~/components/ProductCard';
import { PRODUCT_CARD_FRAGMENT } from '~/graphql/fragments';

const COLLECTION_QUERY = `#graphql
  ${PRODUCT_CARD_FRAGMENT}
  query Collection($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      title
      description
      products(first: $first) {
        nodes {
          ...ProductCard
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
    throw new Response('Collection not found', { status: 404 });
  }

  const { collection } = await storefront.query(COLLECTION_QUERY, {
    variables: { handle, first: 24 },
  });

  if (!collection) {
    throw new Response('Collection not found', { status: 404 });
  }

  return json({ collection });
}

export default function CollectionPage() {
  const { collection } = useLoaderData<typeof loader>();

  return (
    <Layout>
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">{collection.title}</h1>
          {collection.description && (
            <p className="text-center text-gray-600 max-w-2xl mx-auto">{collection.description}</p>
          )}
        </div>
      </div>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {collection.products.nodes.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}