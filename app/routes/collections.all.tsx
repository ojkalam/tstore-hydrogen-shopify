import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { Layout } from "~/components/Layout";
import { ProductCard } from "~/components/ProductCard";
import { PRODUCT_CARD_FRAGMENT } from "~/graphql/fragments";

const ALL_PRODUCTS_QUERY = `#graphql
  ${PRODUCT_CARD_FRAGMENT}
  query AllProducts($first: Int!, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: $first, sortKey: $sortKey, reverse: $reverse) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
      }
    }
  }
`;

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const { createStorefront } = await import("~/lib/storefront.server");
    const { storefront } = createStorefront(request);

    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const sort = searchParams.get("sort") || "newest";

    // Map sort values to GraphQL parameters
    const sortOptions: Record<string, { sortKey: string; reverse: boolean }> = {
      newest: { sortKey: "CREATED_AT", reverse: true },
      oldest: { sortKey: "CREATED_AT", reverse: false },
      "price-low": { sortKey: "PRICE", reverse: false },
      "price-high": { sortKey: "PRICE", reverse: true },
      "best-selling": { sortKey: "BEST_SELLING", reverse: false },
      "title-az": { sortKey: "TITLE", reverse: false },
      "title-za": { sortKey: "TITLE", reverse: true },
    };

    const { sortKey, reverse } = sortOptions[sort] || sortOptions.newest;

    const { products } = await storefront.query(ALL_PRODUCTS_QUERY, {
      variables: {
        first: 100, // Fetch up to 100 products
        sortKey,
        reverse,
      },
    });

    // Ensure we're returning a proper array
    const productNodes = products.nodes || [];

    return json({
      products: productNodes,
      pageInfo: products.pageInfo || null,
      currentSort: sort,
    });
  } catch (error) {
    return json({
      products: [],
      pageInfo: null,
      currentSort: sort,
    });
  }
}

export default function AllProductsPage() {
  const { products, currentSort } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = event.target.value;
    navigate(`/collections/all?sort=${newSort}`);
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">All Products</h1>
          <p className="text-center text-gray-600">
            Browse our complete collection
          </p>
        </div>
      </div>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No products found.</p>
              <p className="text-sm text-gray-500">
                Make sure products are published in your Shopify admin and
                available in the Online Store sales channel.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-gray-600">
                  {products.length}{" "}
                  {products.length === 1 ? "product" : "products"}
                </p>
                <select
                  value={currentSort}
                  onChange={handleSortChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="best-selling">Best Selling</option>
                  <option value="title-az">Name: A to Z</option>
                  <option value="title-za">Name: Z to A</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
