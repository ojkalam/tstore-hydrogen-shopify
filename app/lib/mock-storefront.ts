// Mock storefront for development
export const mockStorefront = {
  query: async (query: string, variables?: any) => {
    // Mock products data
    const mockProducts = [
      {
        id: '1',
        title: 'Classic T-Shirt',
        handle: 'classic-t-shirt',
        featuredImage: {
          url: 'https://via.placeholder.com/400x400/3b82f6/ffffff?text=Classic+T-Shirt',
          altText: 'Classic T-Shirt',
          width: 400,
          height: 400
        },
        priceRange: {
          minVariantPrice: { amount: '29.99', currencyCode: 'USD' },
          maxVariantPrice: { amount: '29.99', currencyCode: 'USD' }
        },
        compareAtPriceRange: {
          maxVariantPrice: { amount: '39.99', currencyCode: 'USD' }
        }
      },
      {
        id: '2',
        title: 'Premium Hoodie',
        handle: 'premium-hoodie',
        featuredImage: {
          url: 'https://via.placeholder.com/400x400/10b981/ffffff?text=Premium+Hoodie',
          altText: 'Premium Hoodie',
          width: 400,
          height: 400
        },
        priceRange: {
          minVariantPrice: { amount: '59.99', currencyCode: 'USD' },
          maxVariantPrice: { amount: '59.99', currencyCode: 'USD' }
        }
      },
      {
        id: '3',
        title: 'Denim Jeans',
        handle: 'denim-jeans',
        featuredImage: {
          url: 'https://via.placeholder.com/400x400/6366f1/ffffff?text=Denim+Jeans',
          altText: 'Denim Jeans',
          width: 400,
          height: 400
        },
        priceRange: {
          minVariantPrice: { amount: '89.99', currencyCode: 'USD' },
          maxVariantPrice: { amount: '89.99', currencyCode: 'USD' }
        }
      },
      {
        id: '4',
        title: 'Sneakers',
        handle: 'sneakers',
        featuredImage: {
          url: 'https://via.placeholder.com/400x400/f59e0b/ffffff?text=Sneakers',
          altText: 'Sneakers',
          width: 400,
          height: 400
        },
        priceRange: {
          minVariantPrice: { amount: '119.99', currencyCode: 'USD' },
          maxVariantPrice: { amount: '119.99', currencyCode: 'USD' }
        },
        compareAtPriceRange: {
          maxVariantPrice: { amount: '149.99', currencyCode: 'USD' }
        }
      }
    ];

    // Mock product detail
    const mockProductDetail = {
      id: '1',
      title: 'Classic T-Shirt',
      description: 'A comfortable and stylish classic t-shirt made from 100% organic cotton. Perfect for everyday wear.',
      handle: 'classic-t-shirt',
      featuredImage: {
        url: 'https://via.placeholder.com/600x600/3b82f6/ffffff?text=Classic+T-Shirt',
        altText: 'Classic T-Shirt',
        width: 600,
        height: 600
      },
      images: {
        nodes: [
          {
            url: 'https://via.placeholder.com/600x600/3b82f6/ffffff?text=Front+View',
            altText: 'Front View',
            width: 600,
            height: 600
          },
          {
            url: 'https://via.placeholder.com/600x600/2563eb/ffffff?text=Back+View',
            altText: 'Back View',
            width: 600,
            height: 600
          },
          {
            url: 'https://via.placeholder.com/600x600/1d4ed8/ffffff?text=Side+View',
            altText: 'Side View',
            width: 600,
            height: 600
          }
        ]
      },
      options: [
        { name: 'Size', values: ['S', 'M', 'L', 'XL'] },
        { name: 'Color', values: ['Blue', 'Black', 'White', 'Gray'] }
      ],
      selectedVariant: {
        id: 'variant-1',
        title: 'M / Blue',
        availableForSale: true,
        price: { amount: '29.99', currencyCode: 'USD' },
        compareAtPrice: { amount: '39.99', currencyCode: 'USD' },
        selectedOptions: [
          { name: 'Size', value: 'M' },
          { name: 'Color', value: 'Blue' }
        ]
      },
      variants: {
        nodes: [
          {
            id: 'variant-1',
            title: 'M / Blue',
            availableForSale: true,
            price: { amount: '29.99', currencyCode: 'USD' },
            compareAtPrice: { amount: '39.99', currencyCode: 'USD' },
            selectedOptions: [
              { name: 'Size', value: 'M' },
              { name: 'Color', value: 'Blue' }
            ]
          },
          {
            id: 'variant-2',
            title: 'L / Black',
            availableForSale: true,
            price: { amount: '29.99', currencyCode: 'USD' },
            compareAtPrice: { amount: '39.99', currencyCode: 'USD' },
            selectedOptions: [
              { name: 'Size', value: 'L' },
              { name: 'Color', value: 'Black' }
            ]
          }
        ]
      }
    };

    // Handle different queries
    if (query.includes('FeaturedProducts')) {
      return { products: { nodes: mockProducts.slice(0, variables?.first || 8) } };
    }
    
    if (query.includes('AllProducts')) {
      return { products: { nodes: mockProducts } };
    }
    
    if (query.includes('Collection')) {
      return {
        collection: {
          id: 'collection-1',
          title: variables?.handle === 'new-arrivals' ? 'New Arrivals' : 
                 variables?.handle === 'sale' ? 'Sale' : 'All Products',
          description: 'Browse our collection of products',
          products: { nodes: mockProducts }
        }
      };
    }
    
    if (query.includes('Product') && variables?.handle) {
      return { product: mockProductDetail };
    }
    
    if (query.includes('Cart')) {
      return { cart: null };
    }

    return {};
  }
};