import { defineField, defineType } from "sanity";

export const debate = defineType({
  name: "debate",
  title: "Debate",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Cinwaanka (Somali)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleEn",
      title: "Title (English)",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Siyaasad",
          "Dhaqaale",
          "Bulshada",
          "Caafimaad",
          "Waxbarasho",
          "Amniga",
          "Sharciga",
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "debaterA",
      title: "Debater A",
      type: "object",
      fields: [
        defineField({ name: "name", title: "Name", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "bio", title: "Bio", type: "text" }),
      ],
    }),
    defineField({
      name: "debaterB",
      title: "Debater B",
      type: "object",
      fields: [
        defineField({ name: "name", title: "Name", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "bio", title: "Bio", type: "text" }),
      ],
    }),
    defineField({
      name: "scheduledAt",
      title: "Scheduled At",
      type: "datetime",
    }),
    defineField({
      name: "isLive",
      title: "Is Live",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isPublished",
      title: "Is Published",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
    },
  },
});
