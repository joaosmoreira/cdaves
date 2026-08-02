import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { handleMongoApiRequest } from "./src/lib/mongo-api-handler";

function mongoDbApiPlugin() {
  return {
    name: "mongodb-api-middleware",
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: () => void) => {
        if (req.url?.startsWith("/api/db")) {
          return handleMongoApiRequest(req, res);
        }
        next();
      });
    },
  };
}

export default defineConfig({
  css: {
    transformer: "lightningcss",
  },
  resolve: {
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  plugins: [
    mongoDbApiPlugin(),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  build: {
    outDir: "dist/client",
    emptyOutDir: true,
  },
});
