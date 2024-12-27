import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
export const collections = {
  blog: defineCollection({
    // type: "content",
    // loader: ""
    // loader: "f"
    //@ts-ignore
    loader: glob({ pattern: "./blog/**/*.md" }),
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
