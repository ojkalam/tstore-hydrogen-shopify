import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
  const { createStorefront } = await import("~/lib/storefront.server");
  const { storefront } = createStorefront(request);

  const TEST_QUERY = `#graphql
    query TestProducts {
      products(first: 5) {
        nodes {
          id
          title
          handle
        }
      }
    }
  `;

  try {
    const result = await storefront.query(TEST_QUERY);
    console.log("Test route - Products found:", result.products.nodes.length);
    
    return json({
      success: true,
      count: result.products.nodes.length,
      products: result.products.nodes,
    });
  } catch (error) {
    console.error("Test route error:", error);
    return json({
      success: false,
      error: error.message,
      products: [],
    });
  }
}

export default function TestProducts() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Products Route</h1>
      <div className="bg-gray-100 p-4 rounded">
        <p>Success: {data.success ? "Yes" : "No"}</p>
        <p>Product count: {data.count || 0}</p>
        {data.error && <p className="text-red-600">Error: {data.error}</p>}
        <div className="mt-4">
          <h2 className="font-bold">Products:</h2>
          <pre>{JSON.stringify(data.products, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}