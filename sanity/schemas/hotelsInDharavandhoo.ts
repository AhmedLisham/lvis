import { defineType, defineField } from "sanity";

export const hotelsInDharavandhoo = defineType({
  name: "hotelsInDharavandhoo",
  title: "Hotels in Dharavandhoo (page)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "coverImage",
      title: "Cover Photo",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortdescription",
      title: "Short Description (before hotels)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
