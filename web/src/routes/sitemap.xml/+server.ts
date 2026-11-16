import { getAllSlugs } from "#lib/server/posts.ts";

export const prerender = true;

const websiteUrl = "https://invra.net";

export function GET() {
  const lastmod = new Date().toISOString();
  const pages = [
    { path: "/", priority: "1.0" },
    { path: "/about", priority: "0.8" },
    { path: "/projects", priority: "0.8" },
    { path: "/blog", priority: "0.8" },
    ...getAllSlugs().map((slug) => ({ path: `/blog/${slug}`, priority: "0.6" })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) =>
      `  <url><loc>${websiteUrl}${p.path}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>${p.priority}</priority></url>`,
  )
  .join("\n")}
</urlset>
`;

  return new Response(body, { headers: { "Content-Type": "application/xml" } });
}
