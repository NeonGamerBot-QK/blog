import rss from '@astrojs/rss';

export function GET(context) {
  return rss({
    // `<title>` field in output xml
    title: 'Saahils Blog',
    // `<description>` field in output xml
    description: 'My Blogs',
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    // site: context.site,
    site: context.site || new URL("https://blog.saahild.com"),
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: [
        
    ],
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}