# TStore - Hydrogen Shopify Storefront

## Project Overview
This is a Hydrogen-based Shopify storefront application for TNMeats store.
- **Framework**: Remix + Hydrogen
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Store**: tnmeats.myshopify.com

## Tech Stack
React • Vite • Hydrogen • Remix • GraphQL

## Project Structure
```
tstore/
├── app/
│   ├── components/       # Reusable UI components
│   ├── graphql/         # GraphQL queries and fragments
│   ├── lib/             # Utilities and helpers
│   ├── routes/          # Remix routes (pages)
│   ├── styles/          # CSS files
│   ├── types/           # TypeScript type definitions
│   ├── entry.client.tsx # Client entry point
│   ├── entry.server.tsx # Server entry point
│   └── root.tsx         # Root layout component
├── .env                 # Environment variables (configured)
├── package.json         # Dependencies
├── tailwind.config.cjs  # Tailwind configuration
├── postcss.config.cjs   # PostCSS configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## Key Features
- Product listing and detail pages
- Shopping cart functionality
- Responsive design
- Real-time Shopify data via GraphQL
- TypeScript for type safety

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run typecheck` - Run TypeScript checks
- `npm run lint` - Run ESLint

## Environment Setup
The project is configured to connect to the Shopify store. Environment variables are set in `.env`:
- Store domain: tnmeats.myshopify.com
- Storefront API tokens are configured
- Session secret is set

## Current Status
- ✅ Project structure set up
- ✅ Shopify connection established
- ✅ Routes and components created
- ✅ Styling with Tailwind CSS configured
- ⚠️ Store has 0 products (needs products added in Shopify admin)

## Known Issues
1. The Shopify store currently has no published products
2. Cart functionality needs session management implementation

## Next Steps
1. Add products to the Shopify store via admin panel
2. Implement cart session management
3. Add search functionality
4. Implement checkout flow
5. Add customer authentication

## API Integration
The app uses Shopify's Storefront API with GraphQL queries. Main queries:
- Products listing
- Product details
- Collections
- Cart operations

## Testing
When testing, ensure:
1. Products are published in Shopify admin
2. Products are available in "Online Store" sales channel
3. Environment variables are properly set

## Deployment Considerations
- Can be deployed to Shopify Oxygen, Vercel, Netlify, or any Node.js host
- Ensure environment variables are set in production
- Build command: `npm run build`
- Start command: `npm run start`