import adapter from "@sveltejs/adapter-static";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit({
      // Fully static build; `/api/*` is served by the Rust worker in `../proxy`,
      // and wrangler serves `build/` as the worker's static assets.
      adapter: adapter({ fallback: "404.html" }),
      // Share the repo-root `.env` with the proxy (only vars marked public in
      // `src/env.ts` reach the client).
      env: { dir: ".." },
      // Nothing links to the sitemap, so it has to be listed explicitly.
      prerender: { entries: ["*", "/sitemap.xml"] },
    }),
  ],
  server: {
    // `wrangler dev` (the Rust proxy) listens on 8787 by default.
    proxy: { "/api": "http://localhost:8787" },
  },
});
