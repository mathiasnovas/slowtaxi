export const revalidate = 3600;

import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { getAbout } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { CodeBlock } from "../components/code-block";
import { SectionTitle } from "../components/section-title";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About slow taxi and Mathias Novas.",
  alternates: {
    canonical: "/about",
  },
};

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

export default async function AboutPage() {
  const about = await getAbout();

  return (
    <div>
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-xs text-taxi-dark/40 hover:text-taxi-dark transition-colors mb-8"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        &larr; Back
      </Link>

      <h1
        className="text-2xl leading-snug mb-8 font-bold max-w-[75%] sm:max-w-[50%]"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        About
      </h1>

      {about?.body ? (
        <div className="post-body text-base leading-relaxed">
          <PortableText
            value={about.body}
            components={portableTextComponents}
          />
        </div>
      ) : (
        <p className="text-sm text-taxi-dark/40">
          Nothing here yet. Head to{" "}
          <Link href="/studio" className="underline">
            /studio
          </Link>{" "}
          to add some content.
        </p>
      )}

      {about?.github && (
        <div className="mt-10">
          <a
            href={about.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-taxi-dark/40 hover:text-taxi-dark transition-colors"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            GitHub &rarr;
          </a>
        </div>
      )}
    </div>
  );
}
