import { defineType, defineField } from "sanity";
import GalleryBlockInput from "../components/GalleryBlockInput";

const aspectRatioOptions = [
  { title: "Auto / oryginalne", value: "auto" },
  { title: "Kwadrat 1:1", value: "1 / 1" },
  { title: "Poziome 4:3", value: "4 / 3" },
  { title: "Pionowe 3:4", value: "3 / 4" },
  { title: "Szerokie 16:9", value: "16 / 9" },
  { title: "Pionowe 9:16", value: "9 / 16" },
  { title: "Portret 4:5", value: "4 / 5" },
  { title: "Poziome 5:4", value: "5 / 4" },
  { title: "Poziome 3:2", value: "3 / 2" },
  { title: "Pionowe 2:3", value: "2 / 3" },
  { title: "Wlasne", value: "custom" },
];

const customAspectRatioField = defineField({
  name: "customAspectRatio",
  title: "Wlasny aspect ratio",
  type: "string",
  description: "Wpisz np. 7 / 5, 21 / 9, 1080 / 1350.",
  fieldset: "advanced",
  hidden: ({ parent }) => (parent as { aspectRatio?: string })?.aspectRatio !== "custom",
  validation: (Rule) =>
    Rule.custom((value, context) => {
      if ((context.parent as { aspectRatio?: string })?.aspectRatio !== "custom") {
        return true;
      }
      return value?.trim() ? true : "Podaj wlasne proporcje, np. 7 / 5.";
    }),
});

export const galleryBlockType = defineType({
  name: "galleryBlock",
  title: "Blok Galerii",
  type: "object",
  components: {
    input: GalleryBlockInput,
  },
  fieldsets: [
    {
      name: "advanced",
      title: "Zaawansowane kadrowanie",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: "layout",
      title: "Uklad (Layout)",
      type: "string",
      options: {
        list: [
          { title: "Pelna szerokosc (1 zdjecie)", value: "full" },
          { title: "Dwie rowne kolumny (2 zdjecia)", value: "two-col" },
          { title: "Jedno duze lewe, dwa male prawe (3 zdjecia)", value: "one-two" },
          { title: "Dwa male lewe, jedno duze prawe (3 zdjecia)", value: "two-one" },
          { title: "Trzy rowne kolumny (3 zdjecia)", value: "three-col" },
          { title: "Duze gora + dwa male dol (Hero, 3 zdjecia)", value: "hero-two" },
          { title: "Portret + dwa mniejsze (3 zdjecia)", value: "portrait-stack" },
          { title: "Siatka (do 6 zdjec)", value: "grid" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "aspectRatio",
      title: "Aspect ratio mediow w bloku",
      type: "string",
      description:
        "Stosowane do wszystkich zdjec w tym bloku. Pojedynczy element z wlasnym aspect ratio nadpisuje te wartosc.",
      initialValue: "4 / 3",
      fieldset: "advanced",
      options: {
        list: aspectRatioOptions,
        layout: "dropdown",
      },
    }),
    defineField({
      ...customAspectRatioField,
      description: "Uzywane, gdy wyzej wybrano 'Wlasne'.",
    }),
    defineField({
      name: "images",
      title: "Zdjecia",
      type: "array",
      description: "Wrzuc zdjecia do bloku. Kolejnosc elementow jest kolejnoscia na stronie.",
      of: [
        {
          type: "object",
          name: "galleryImage",
          title: "Zdjecie",
          fieldsets: [
            {
              name: "advanced",
              title: "Zaawansowane ustawienia zdjecia",
              options: { collapsible: true, collapsed: true },
            },
          ],
          fields: [
            defineField({
              name: "image",
              title: "Zdjecie",
              type: "image",
              description: "Wybierz z biblioteki Media albo wgraj pojedynczy plik.",
              options: { hotspot: true },
            }),
            defineField({
              name: "aspectRatio",
              title: "Aspect ratio",
              type: "string",
              initialValue: "auto",
              fieldset: "advanced",
              options: {
                list: aspectRatioOptions,
                layout: "dropdown",
              },
            }),
            customAspectRatioField,
            defineField({
              name: "objectPositionX",
              title: "Kadr poziomo (%)",
              type: "number",
              initialValue: 50,
              fieldset: "advanced",
              hidden: true,
              validation: (Rule) => Rule.min(0).max(100),
            }),
            defineField({
              name: "objectPositionY",
              title: "Kadr pionowo (%)",
              type: "number",
              initialValue: 50,
              fieldset: "advanced",
              hidden: true,
              validation: (Rule) => Rule.min(0).max(100),
            }),
          ],
          preview: {
            select: {
              media: "image",
              aspectRatio: "aspectRatio",
              customAspectRatio: "customAspectRatio",
            },
            prepare({ media, aspectRatio, customAspectRatio }) {
              const ratio = aspectRatio === "custom" ? customAspectRatio : aspectRatio;
              return {
                title: media ? (ratio && ratio !== "auto" ? `Zdjecie ${ratio}` : "Zdjecie auto") : "Pusty slot",
                media,
              };
            },
          },
        },
        {
          type: "image",
          title: "Zdjecie legacy bez aspect ratio",
          options: { hotspot: true },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      layout: "layout",
      aspectRatio: "aspectRatio",
      customAspectRatio: "customAspectRatio",
      images: "images",
    },
    prepare({ layout, aspectRatio, customAspectRatio, images }) {
      const ratio = aspectRatio === "custom" ? customAspectRatio : aspectRatio;
      return {
        title: `Uklad: ${layout}`,
        subtitle: `${images ? images.length : 0} elementow${ratio ? ` • ${ratio}` : ""}`,
        media: images && images.length > 0 ? images[0] : null,
      };
    },
  },
});
