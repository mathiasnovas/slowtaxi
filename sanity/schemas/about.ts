import { defineType, defineField } from "sanity";

export const about = defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "About",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
        },
        { type: "code" },
      ],
    }),
    defineField({
      name: "github",
      title: "GitHub URL",
      type: "url",
    }),
  ],
  preview: {
    prepare() {
      return { title: "About" };
    },
  },
});
