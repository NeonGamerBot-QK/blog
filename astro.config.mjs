import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import webmanifest from "astro-webmanifest";
import robotsTxt from "astro-robots-txt";
// import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import compressor from "astro-compressor";
import node from "@astrojs/node";
import astroMetaTags from "astro-meta-tags";
// import tunnel from "astro-tunnel";
const SITE_TITLE = "Saahils Blog";
// https://astro.build/config
console.log(process.env.NODE_ENV);
export default defineConfig({
  site:
    process.env.NODE_ENV == "production"
      ? "https://blog.saahild.com"
      : "http://localhost:4321",

  output: "server",
  outDir: "./build",

  // Enable React to support React JSX components.
  integrations: [
    react(),
    tailwind(), //  mdx(),
    webmanifest({
      name: SITE_TITLE,
      icon: "public/favicon.png", // source for favicon & icons
      short_name: SITE_TITLE,
      description: "My Blogs",
      start_url: "/",
      theme_color: "#cba6fwa7", // mocha mauve
      background_color: "#1e1e2e", // mocha base
      display: "standalone",
    }),
    robotsTxt({
      sitemap: "/sitemap-index.xml",
    }),
    sitemap(),
    compressor(),
    astroMetaTags(),
    // tunnel(),
  ],

  markdown: {
    shikiConfig: {
      themes: {
        light: "catppuccin-mocha",
        dark: "catppuccin-mocha",
      },
    },
  },

  adapter: node({
    mode: "middleware",
  }),
});
