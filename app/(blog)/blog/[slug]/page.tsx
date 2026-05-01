export const revalidate = 3600;

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { getPost, getPostSlugs } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { CodeBlock } from "../../../(blog)/components/code-block";
import { SectionTitle } from "../../../(blog)/components/section-title";
import type { Metadata } from "next";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((s) => ({ slug: s.slug.current }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };

  const ogImage = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).url()
    : undefined;

  return {
    title: post.title,
    description: post.excerpt || "",
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      type: "article",
      publishedTime: post.date,
      authors: ["Mathias Novas"],
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || "",
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

const portableTextComponents = {
  types: {
    image: ({
      value,
    }: {
      value: { asset: { _ref: string }; alt?: string };
    }) => (
      <figure className="my-8">
        <Image
          src={urlFor(value).width(800).url()}
          alt={value.alt || ""}
          width={800}
          height={600}
          className="w-full h-auto"
        />
      </figure>
    ),
    code: ({
      value,
    }: {
      value: { code: string; language?: string; filename?: string };
    }) => (
      <CodeBlock
        code={value.code}
        language={value.language}
        filename={value.filename}
      />
    ),
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <SectionTitle>{children}</SectionTitle>
    ),
  },
};

export default async function BlogPostPage(
  props: PageProps<"/blog/[slug]">
) {
  const { slug } = await props.params;
  const post = await getPost(slug);

  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || "",
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Mathias Novas",
    },
    ...(post.coverImage && {
      image: urlFor(post.coverImage).width(1200).height(630).url(),
    }),
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-xs text-taxi-dark/40 hover:text-taxi-dark transition-colors mb-8"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        &larr; Back
      </Link>

      <header className="mb-10">
        <div
          className="flex items-center gap-2 text-xs text-taxi-dark/40 mb-2 flex-wrap"
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
        <h1
          className="text-2xl leading-snug mb-3 font-bold max-w-[75%] sm:max-w-[50%]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {post.title}
        </h1>
      </header>

      {post.coverImage && (
        <div className="relative aspect-square w-full overflow-hidden mb-10">
          <Image
            src={urlFor(post.coverImage).width(800).height(800).url()}
            alt={post.title}
            fill
            className="object-contain"
          />
        </div>
      )}

      {post.body && (
        <div className="post-body text-base leading-relaxed">
          <PortableText
            value={post.body}
            components={portableTextComponents}
          />
        </div>
      )}

    </article>
  );
}
