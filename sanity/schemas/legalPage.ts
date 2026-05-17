import { defineField, defineType } from "sanity";

export default defineType({
  name: "legalPage",
  title: "Strony Prawne (Legal Pages)",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Tytuł strony", type: "localizedString" }),
    defineField({ name: "slug", title: "Slug", type: "localizedSlug" }),
    defineField({ name: "content", title: "Treść", type: "localizedBlocks" }),
    defineField({ name: "seo", title: "SEO", type: "seoFields" }),
  ],
  preview: {
    select: { title: "title.pl", subtitle: "slug.pl.current" },
  },
});
