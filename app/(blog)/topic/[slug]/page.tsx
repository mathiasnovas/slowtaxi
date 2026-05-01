export const revalidate = 3600;

import { notFound } from "next/navigation";
import Link from "next/link";
import { getTag, getTagSlugs, getPostsByTag } from "@/sanity/queries";
import { SectionTitle } from "../../components/section-title";
import type { Metadata } from "next";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export async function generateStaticParams() {
  const tags = await getTagSlugs();
  return tags.map((t) => ({ slug: t.slug.current }));
}

export async function generateMetadata(
  props: PageProps<"/topic/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const tag = await getTag(slug);
  if (!tag) return { title: "Topic not found" };
  return {
    title: tag.title,
    description: `Posts about ${tag.title} on slow taxi.`,
    alternates: { canonical: `/topic/${slug}` },
  };
}

export default async function TopicPage(props: PageProps<"/topic/[slug]">) {
  const { slug } = await props.params;
  const tag = await getTag(slug);

  if (!tag) notFound();

  const posts = await getPostsByTag(slug);

  return (
    <div>
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-xs text-taxi-dark/40 hover:text-taxi-dark transition-colors mb-8"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        &larr; Back
      </Link>

      <SectionTitle>#{tag.title}</SectionTitle>

      {posts.length === 0 ? (
        <p className="text-sm text-taxi-dark/40">No posts yet for this topic.</p>
      ) : (
        <div className="space-y-10">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="block group"
            >
              <article>
                <div
                  className="flex items-center gap-2 text-xs text-taxi-dark/40 mb-1 flex-wrap"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  <time>{formatDate(post.date)}</time>
                  {post.tags && post.tags.length > 0 && (
                    <>
                      <span>·</span>
                      {post.tags.map((t) => (
                        <span key={t.slug.current}>#{t.title}</span>
                      ))}
                    </>
                  )}
                </div>
                <h3
                  className="text-sm mb-1 font-bold group-hover:text-taxi-dark/60 transition-colors"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-sm text-taxi-dark/50 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
