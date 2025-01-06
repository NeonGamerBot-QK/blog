import { getCollection } from "astro:content";
import satori from "satori";
import fs from "fs/promises";
import sharp from "sharp";
import Og from "../components/OgHome";
const posts = await getCollection("blog");

export async function PNG(component: any) {
  return await sharp(Buffer.from(await SVG(component)))
    .png()
    .toBuffer();
}
export async function SVG(component: any) {
  return await satori(component as any, {
    width: 600,
    height: 330,
    fonts: [
      {
        name: "Outfit",
        data: await fs.readFile("./src/assets/fonts/Outfit-Regular.ttf"),
        weight: 400,
      },
      {
        name: "Outfit",
        data: await fs.readFile("./src/assets/fonts/Outfit-SemiBold.ttf"),
        weight: 600,
      },
    ],
  });
}

export async function GET({ params }) {
  // const element = OpenGraphImage(post);
  // const jsx = inlineTailwind(element);
  //@ts-ignore
  const jsx = Og({ posts });
  const png = await PNG(jsx);
  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
