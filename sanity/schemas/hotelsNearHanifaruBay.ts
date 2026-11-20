import { defineType, defineField } from "sanity";

export const hotelsNearHanifaruBay = defineType({
  name: "hotelsNearHanifaruBay",
  title: "hotels Near Hanifaru Bay (page)",
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
      name: "textAboveTitle",
      title: "Text Above Title",
      type: "string",
    }),
    defineField({
      name: "textBelowTitle",
      title: "Text Below Title",
      type: "string",
    }),
    defineField({
      name: "hotelsTitle",
      title: "Hotels List Title",
      type: "text",
      rows: 2,
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
      name: "footerText",
      title: "Footer Text",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
