import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_lazyRouteDiscovery: true,
        v3_singleFetch: true,
      },
      serverModuleFormat: "esm",
    }),
    tsconfigPaths()
  ],
  ssr: {
    noExternal: ["@shopify/hydrogen", "@shopify/hydrogen-react", "@shopify/remix-oxygen"],
    optimizeDeps: {
      include: ["react-dom/server", "react-dom/client"],
    },
  },
  optimizeDeps: {
    include: [
      "@shopify/hydrogen",
      "@shopify/hydrogen-react",
      "react",
      "react-dom",
      "react-router-dom",
      "@remix-run/react"
    ],
  },
  resolve: {
    alias: {
      "~": "/app",
    },
  },
  define: {
    'process.env.SESSION_SECRET': JSON.stringify(env.SESSION_SECRET),
    'process.env.PUBLIC_STOREFRONT_API_TOKEN': JSON.stringify(env.PUBLIC_STOREFRONT_API_TOKEN),
    'process.env.PRIVATE_STOREFRONT_API_TOKEN': JSON.stringify(env.PRIVATE_STOREFRONT_API_TOKEN),
    'process.env.PUBLIC_STORE_DOMAIN': JSON.stringify(env.PUBLIC_STORE_DOMAIN),
    'process.env.PUBLIC_STOREFRONT_ID': JSON.stringify(env.PUBLIC_STOREFRONT_ID),
  },
  };
});