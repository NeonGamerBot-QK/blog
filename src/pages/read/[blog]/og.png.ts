import { getCollection } from "astro:content";
import satori from "satori";
import fs from "fs/promises";
import sharp from "sharp";
import Og from "../../../components/Og";
const posts = await getCollection("blog");
export async function getStaticPaths() {
  const files = await getCollection("blog");
  return files
    .filter((f) => f.data.date.getTime() < Date.now())
    .map((f) => {
      return { params: { blog: f.slug } };
    });
}
export async function PNG(component: any) {
  return await sharp(Buffer.from(await SVG(component)))
    .png()
    .toBuffer();
}
export async function SVG(component: any) {
  return await satori(component as any, {
    width: 1200,
    height: 630,
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

export async function GET({ params, request }) {
  const post = posts.find((post) => post.slug === params.blog); // Find the specific post by slug
  if (!post) {
    return new Response("Post not found", { status: 404 });
  }

  // const element = OpenGraphImage(post);
  // const jsx = inlineTailwind(element);
  const origin = new URL(request.url).origin;
  //@ts-ignore
  const jsx = Og({ blogData: post, origin });
  const png = await PNG(jsx);
  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
