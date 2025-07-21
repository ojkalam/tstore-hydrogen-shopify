import { Layout } from '~/components/Layout';
import { Link } from '@remix-run/react';

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Page not found</p>
          <Link
            to="/"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Go back home
          </Link>
        </div>
      </div>
    </Layout>
  );
}