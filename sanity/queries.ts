import { client } from "./client";

export type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: {
    asset: {
      _ref: string;
    };
  };
  date: string;
  tags?: { title: string; slug: { current: string } }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
};

export async function getPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post"] | order(date desc) {
      _id,
      title,
      slug,
      excerpt,
      coverImage,
      date,
      tags[]->{ title, slug }
    }`
  );
}

export async function getPost(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      coverImage,
      date,
      tags[]->{ title, slug },
      body
    }`,
    { slug }
  );
}

export async function getPostSlugs(): Promise<{ slug: { current: string } }[]> {
  return client.fetch(`*[_type == "post"]{ slug }`);
}

export type About = {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
  github?: string;
};

export type Tag = {
  title: string;
  slug: { current: string };
};

export async function getTagSlugs(): Promise<Tag[]> {
  return client.fetch(`*[_type == "tag"]{ title, slug }`);
}

export async function getTag(slug: string): Promise<Tag | null> {
  return client.fetch(
    `*[_type == "tag" && slug.current == $slug][0]{ title, slug }`,
    { slug }
  );
}

export async function getPostsByTag(tagSlug: string): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post" && references(*[_type == "tag" && slug.current == $tagSlug]._id)] | order(date desc) {
      _id,
      title,
      slug,
      excerpt,
      date,
      tags[]->{ title, slug }
    }`,
    { tagSlug }
  );
}

export async function getAbout(): Promise<About | null> {
  return client.fetch(
    `*[_type == "about"][0] {
      title,
      body,
      github
    }`
  );
}
