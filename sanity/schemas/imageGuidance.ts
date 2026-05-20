import type { ImageRule, ImageValue, Rule, RuleBuilder, SchemaValidationValue } from "sanity";

export type ImageGuide = {
  description: string;
  minWidth?: number;
  minHeight?: number;
  aspectRatio?: number;
  aspectLabel?: string;
  aspectTolerance?: number;
};

function parseAssetDimensions(value: unknown) {
  const ref = (value as ImageValue | undefined)?.asset?._ref;
  const match = ref?.match(/^image-[^-]+-(\d+)x(\d+)-[a-z0-9]+$/i);

  if (!match) return null;

  return {
    width: Number(match[1]),
    height: Number(match[2]),
  };
}

export function imageWarning(guide: ImageGuide) {
  return (Rule: ImageRule): ImageRule =>
    Rule.custom((value) => {
      const dimensions = parseAssetDimensions(value);

      if (!dimensions) return true;

      const warnings: string[] = [];

      if (
        guide.minWidth &&
        guide.minHeight &&
        (dimensions.width < guide.minWidth || dimensions.height < guide.minHeight)
      ) {
        warnings.push(
          `Rekomendowane minimum: ${guide.minWidth} x ${guide.minHeight}px. Aktualnie: ${dimensions.width} x ${dimensions.height}px.`
        );
      }

      if (guide.aspectRatio) {
        const ratio = dimensions.width / dimensions.height;
        const tolerance = guide.aspectTolerance ?? 0.08;
        const delta = Math.abs(ratio - guide.aspectRatio) / guide.aspectRatio;

        if (delta > tolerance) {
          warnings.push(
            `Rekomendowana proporcja: ${guide.aspectLabel || guide.aspectRatio.toFixed(2)}. Aktualnie: ${dimensions.width}:${dimensions.height}.`
          );
        }
      }

      return warnings.length ? warnings.join(" ") : true;
    }).warning();
}

export function requiredImageWithWarning(guide: ImageGuide) {
  return (Rule: ImageRule): RuleBuilder<ImageRule, ImageValue> => [
    Rule.required().assetRequired(),
    imageWarning(guide)(Rule),
  ];
}

export function schemaImageWarning(guide: ImageGuide) {
  return (Rule: Rule): SchemaValidationValue =>
    Rule.custom((value) => {
      const dimensions = parseAssetDimensions(value);

      if (!dimensions) return true;

      const warnings: string[] = [];

      if (
        guide.minWidth &&
        guide.minHeight &&
        (dimensions.width < guide.minWidth || dimensions.height < guide.minHeight)
      ) {
        warnings.push(
          `Rekomendowane minimum: ${guide.minWidth} x ${guide.minHeight}px. Aktualnie: ${dimensions.width} x ${dimensions.height}px.`
        );
      }

      if (guide.aspectRatio) {
        const ratio = dimensions.width / dimensions.height;
        const tolerance = guide.aspectTolerance ?? 0.08;
        const delta = Math.abs(ratio - guide.aspectRatio) / guide.aspectRatio;

        if (delta > tolerance) {
          warnings.push(
            `Rekomendowana proporcja: ${guide.aspectLabel || guide.aspectRatio.toFixed(2)}. Aktualnie: ${dimensions.width}:${dimensions.height}.`
          );
        }
      }

      return warnings.length ? warnings.join(" ") : true;
    }).warning();
}

export const imageGuides = {
  hero: {
    description:
      "Uzycie: hero na stronie glownej, object-cover, desktop ok. 60vw x pelna wysokosc ekranu, mobile 100vw. Rekomendacja: kadr poziomy 16:9 lub 3:2, minimum 1920 x 1080px, najlepiej 2400px+ szerokosci. Najwazniejszy obiekt trzymaj blisko centrum/prawej strony i ustaw hotspot.",
    minWidth: 1920,
    minHeight: 1080,
    aspectRatio: 16 / 9,
    aspectLabel: "16:9",
    aspectTolerance: 0.22,
  },
  service: {
    description:
      "Uzycie: sekcja uslugi, stale okno 4:3 na mobile i desktop, object-contain. Zdjecie nie jest docinane przez komponent; moze byc kwadratowe albo poziome. Rekomendacja: minimum 1600 x 1200px, najlepiej 2048px+ na dluzszym boku. Zostaw troche marginesu wokol produktu.",
    minWidth: 1600,
    minHeight: 1200,
  },
  beforeAfter: {
    description:
      "Uzycie: suwak Before/After w kontenerze 4:3, object-cover. Obraz przed i po powinny miec ten sam kadr, te sama perspektywe i podobne proporcje. Rekomendacja: 4:3, minimum 1600 x 1200px.",
    minWidth: 1600,
    minHeight: 1200,
    aspectRatio: 4 / 3,
    aspectLabel: "4:3",
  },
  projectCover: {
    description:
      "Uzycie: miniatury portfolio maja zmienne formaty (4:5, 1:1, 3:4, 16:10), a naglowek projektu uzywa szerokiego kadru 21:9. Rekomendacja: minimum 2400 x 1600px, najlepiej szeroki/flexowy kadr z bezpiecznym centrum. Ustaw hotspot na produkt lub glowny obiekt.",
    minWidth: 2400,
    minHeight: 1600,
  },
  projectGallery: {
    description:
      "Uzycie: galeria projektu. Pierwsze zdjecie w galerii jest wysokie 4:5, kolejne sa kwadratowe, a lightbox pokazuje caly obraz jako object-contain. Rekomendacja: minimum 1600 x 1600px lub wiecej; trzymaj wazne elementy w centrum i ustaw hotspot.",
    minWidth: 1600,
    minHeight: 1600,
  },
  profile: {
    description:
      "Uzycie: strona O mnie, pionowy portret 4:5, object-cover. Rekomendacja: 1600 x 2000px albo wiecej. Twarz/gorny plan trzymaj w bezpiecznym centrum i ustaw hotspot.",
    minWidth: 1600,
    minHeight: 2000,
    aspectRatio: 4 / 5,
    aspectLabel: "4:5",
  },
  openGraph: {
    description:
      "Uzycie: SEO/Open Graph dla social media. Rekomendacja: 1200 x 630px, proporcja 1.91:1. Tekst i wazne elementy trzymaj z dala od krawedzi.",
    minWidth: 1200,
    minHeight: 630,
    aspectRatio: 1200 / 630,
    aspectLabel: "1200:630 / 1.91:1",
  },
  avatar: {
    description:
      "Uzycie: avatar opinii, kadr kwadratowy. Rekomendacja: minimum 800 x 800px. Twarz lub logo trzymaj centralnie.",
    minWidth: 800,
    minHeight: 800,
    aspectRatio: 1,
    aspectLabel: "1:1",
  },
  logo: {
    description:
      "Uzycie: logo/znak marki. Rekomendacja: minimum 1024px na dluzszym boku, najlepiej PNG z przezroczystym tlem. Jesli znak jest szeroki, zostaw bezpieczny margines.",
    minWidth: 1024,
    minHeight: 256,
  },
  unusedContentImage: {
    description:
      "Zdjecie contentowe. Obecnie nie jest renderowane w glownym komponencie strony, ale jesli zostanie uzyte, najlepiej przygotowac elastyczny kadr 4:5 lub 3:4, minimum 1600px na dluzszym boku.",
    minWidth: 1200,
    minHeight: 1600,
  },
} satisfies Record<string, ImageGuide>;
