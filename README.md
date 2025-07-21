# TStore - Hydrogen Storefront

A modern, performant Shopify storefront built with Hydrogen, Remix, and TypeScript.

## Features

- ⚡ Built with Shopify Hydrogen for optimal performance
- 🎨 Tailwind CSS for styling
- 📱 Fully responsive design
- 🛒 Cart functionality
- 🔍 Product search and filtering (coming soon)
- 💳 Secure checkout via Shopify
- 📦 TypeScript for type safety

## Prerequisites

- Node.js 18+
- A Shopify store with Storefront API access
- Storefront API credentials

## Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your Shopify credentials:
   ```
   SESSION_SECRET="your-session-secret"
   PUBLIC_STOREFRONT_API_TOKEN="your-public-token"
   PRIVATE_STOREFRONT_API_TOKEN="your-private-token"
   PUBLIC_STORE_DOMAIN="your-store.myshopify.com"
   PUBLIC_STOREFRONT_ID="your-storefront-id"
   ```

3. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run typecheck` - Run TypeScript type checking
- `npm run lint` - Run ESLint

## Project Structure

```
app/
├── components/       # Reusable UI components
├── graphql/         # GraphQL queries and fragments
├── lib/             # Utility functions and helpers
├── routes/          # Remix routes
├── styles/          # Global styles
├── entry.client.tsx # Client entry point
├── entry.server.tsx # Server entry point
└── root.tsx         # Root layout component
```

## Key Routes

- `/` - Home page with featured products
- `/collections/all` - All products
- `/collections/:handle` - Collection page
- `/products/:handle` - Product detail page
- `/cart` - Shopping cart

## Technologies

- [Shopify Hydrogen](https://hydrogen.shopify.dev/)
- [Remix](https://remix.run/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

## Deployment

This app can be deployed to various platforms:
- Oxygen (Shopify's hosting platform)
- Vercel
- Netlify
- Any Node.js hosting platform

## License

MIT