import { defineField, defineType } from "sanity";

export const promotions = defineType({
  name: "promotions",
  title: "Promotions",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "coverPhoto",
      title: "Cover Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "promotionList",
      title: "Promotion List",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "itemName",
              title: "Item Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
  ],
});
