import { Link } from '@remix-run/react';
import { CartIcon } from './icons/CartIcon';
import { SearchIcon } from './icons/SearchIcon';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-gray-900">
            TStore
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/collections/all" className="text-gray-700 hover:text-gray-900 transition-colors">
              Shop All
            </Link>
            <Link to="/collections/new-arrivals" className="text-gray-700 hover:text-gray-900 transition-colors">
              New Arrivals
            </Link>
            <Link to="/collections/sale" className="text-gray-700 hover:text-gray-900 transition-colors">
              Sale
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-gray-900 transition-colors">
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <SearchIcon className="w-5 h-5" />
            </button>
            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <CartIcon className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}