import type { Metadata } from "next";
import { stegaClean } from "next-sanity";
import { defaultLocale, localeOpenGraph, locales, type Locale, pathForLocale } from "@/lib/i18n";

function normalizeSiteUrl(url: string) {
  const normalized = url.replace(/\/$/, "");
  return /^https?:\/\//i.test(normalized) ? normalized : `https://${normalized}`;
}

export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  "https://lifestyleimages.pl"
);

export const siteName = "Lifestyle Images";

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function localizedPath(locale: Locale, path = "/") {
  return pathForLocale(locale, path);
}

export function languageAlternates(path = "/") {
  const entries = Object.fromEntries(
    locales.map((locale) => [locale, absoluteUrl(localizedPath(locale, path))])
  );

  return {
    ...entries,
    "x-default": absoluteUrl(localizedPath(defaultLocale, path)),
  };
}

type SeoInput = {
  locale: Locale;
  path?: string;
  title: string;
  description?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

export function buildMetadata({
  locale,
  path = "/",
  title,
  description,
  image,
  type = "website",
  noIndex = false,
}: SeoInput): Metadata {
  const cleanTitle = stegaClean(title);
  const cleanDescription = description ? stegaClean(description) : undefined;
  const canonical = absoluteUrl(localizedPath(locale, path));
  const images = image ? [{ url: image, width: 1200, height: 630, alt: cleanTitle }] : undefined;

  return {
    metadataBase: new URL(siteUrl),
    title: cleanTitle,
    description: cleanDescription,
    alternates: {
      canonical,
      languages: languageAlternates(path),
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    openGraph: {
      title: cleanTitle,
      description: cleanDescription,
      url: canonical,
      siteName,
      locale: localeOpenGraph[locale],
      alternateLocale: locales
        .filter((candidate) => candidate !== locale)
        .map((candidate) => localeOpenGraph[candidate]),
      type,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: cleanTitle,
      description: cleanDescription,
      images: image ? [image] : undefined,
    },
  };
}
