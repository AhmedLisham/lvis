import { defineField, defineType } from "sanity";

export const ourHotelPageBanner = defineType({
  name: "ourHotelPageBanner",
  title: "Our Hotel Page (slides)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "id",
      title: "Id",
      type: "number",
    }),
  ],
});
