export const revalidate = 3600;

import Link from "next/link";
import { getPosts } from "@/sanity/queries";
import { SectionTitle } from "./components/section-title";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div>
      <section className="mb-12">
        <h1
          className="text-2xl mb-2 text-taxi-dark font-bold max-w-[75%] sm:max-w-[50%]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          taking the long route through cyberspace
        </h1>
      </section>

      <SectionTitle>Blog</SectionTitle>

      {posts.length === 0 ? (
        <div className="border border-taxi-dark/10 p-8 text-center">
          <p
            className="text-sm mb-2 text-taxi-dark/70"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            No posts yet
          </p>
          <p className="text-sm text-taxi-dark/40">
            The meter is running, but the taxi hasn&apos;t left the station.
            Head to{" "}
            <Link href="/studio" className="underline">
              /studio
            </Link>{" "}
            to write your first post.
          </p>
        </div>
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
                      {post.tags.map((tag) => (
                        <span key={tag.slug.current}>#{tag.title}</span>
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
