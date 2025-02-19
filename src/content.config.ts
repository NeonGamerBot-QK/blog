import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
export const collections = {
  blog: defineCollection({
    //@ts-ignore
    loader: glob({
      base: process.cwd(),
      pattern: "./src/content/blog/**/*.md",
    }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      date: z.date(),
      tags: z.array(z.string()),
      cover: z.string(),
    }),
  }),
};
// console.log(`collections`, collections);
