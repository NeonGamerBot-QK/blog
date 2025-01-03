import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import webmanifest from "astro-webmanifest";
// import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
const SITE_TITLE = "Saahils Blog";
// https://astro.build/config
export default defineConfig({
  site: "https://blog.saahild.com",
  // Enable React to support React JSX components.
  integrations: [
    react(),
    tailwind(),
    //  mdx(),
    webmanifest({
      name: SITE_TITLE,
      icon: "public/favicon.png", // source for favicon & icons
      short_name: SITE_TITLE,
      description: "My Blogs",
      start_url: "/",
      theme_color: "#cba6f7", // mocha mauve
      background_color: "#1e1e2e", // mocha base
      display: "standalone",
    }),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: "catppuccin-mocha",
        dark: "catppuccin-mocha",
      },
    },
  },
});
