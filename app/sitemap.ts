import type { MetadataRoute } from "next";
import { getPostSlugs, getTagSlugs } from "@/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    (process.env.NEXT_PUBLIC_SITE_URL || "https://slowtaxi.vercel.app").replace(/\/$/, "");

  const posts = await getPostSlugs();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug.current}`,
    changeFrequency: "weekly",
  }));

  const tags = await getTagSlugs();

  const tagEntries: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${baseUrl}/topic/${tag.slug.current}`,
    changeFrequency: "weekly",
  }));

  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...postEntries,
    ...tagEntries,
  ];
}
