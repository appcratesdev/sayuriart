import { defineField, defineType } from "sanity";

export default defineType({
  name: "header",
  title: "Header / Nawigacja",
  type: "document",
  fields: [
    defineField({ name: "servicesLabel", title: "Link: uslugi", type: "localizedString" }),
    defineField({ name: "portfolioLabel", title: "Link: portfolio", type: "localizedString" }),
    defineField({ name: "pricingLabel", title: "Link: cennik", type: "localizedString" }),
    defineField({ name: "processLabel", title: "Link: proces", type: "localizedString" }),
    defineField({ name: "aboutLabel", title: "Link: o mnie", type: "localizedString" }),
    defineField({ name: "ctaLabel", title: "Przycisk CTA", type: "localizedString" }),
    defineField({ name: "menuLabel", title: "Etykieta menu mobilnego", type: "localizedString" }),
    defineField({ name: "closeLabel", title: "Etykieta zamkniecia menu", type: "localizedString" }),
    defineField({ name: "polishLocaleLabel", title: "Przelacznik jezyka: PL", type: "string" }),
    defineField({ name: "englishLocaleLabel", title: "Przelacznik jezyka: EN", type: "string" }),
  ],
  preview: {
    prepare: () => ({ title: "Header / Nawigacja" }),
  },
});
