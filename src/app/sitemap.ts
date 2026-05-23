import type { MetadataRoute } from "next";
import { absoluteUrl, languageAlternates, localizedPath } from "@/lib/seo";
import { defaultLocale, locales, type Locale } from "@/lib/i18n";
import { getProjects, getServicePages } from "../../sanity/lib/fetch";

const servicePath = (locale: Locale, slug: string) => `/${locale === "en" ? "services" : "uslugi"}/${slug}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = ["/", "/o-mnie"];
  const staticEntries = staticPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizedPath(locale, path)),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
      alternates: {
        languages: languageAlternates(path),
      },
    }))
  );

  const projectGroups = await Promise.all(
    locales.map(async (locale) => {
      const projects = await getProjects(locale);
      return projects
        .filter((project) => project.slug?.current)
        .map((project) => {
          const path = `/projekt/${project.slug.current}`;
          return {
            url: absoluteUrl(localizedPath(locale, path)),
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
            alternates: {
              languages: languageAlternates(path),
            },
          };
        });
    })
  );

  const servicesByLocale = await Promise.all(
    locales.map(async (locale) => ({
      locale,
      services: await getServicePages(locale),
    }))
  );

  const serviceGroups = servicesByLocale.flatMap(({ locale, services }) =>
    services
      .filter((servicePage) => servicePage.slug?.current)
      .map((servicePage) => {
        const path = servicePath(locale, servicePage.slug!.current);
        const alternateEntries = servicesByLocale.flatMap(({ locale: alternateLocale, services: alternateServices }) => {
          const alternateService = alternateServices.find((candidate) => candidate._id === servicePage._id);
          if (!alternateService?.slug?.current) return [];
          const alternatePath = servicePath(alternateLocale, alternateService.slug.current);
          return [[alternateLocale, absoluteUrl(localizedPath(alternateLocale, alternatePath))] as const];
        });
        const defaultService = servicesByLocale
          .find(({ locale: candidateLocale }) => candidateLocale === defaultLocale)
          ?.services.find((candidate) => candidate._id === servicePage._id);
        const defaultPath = defaultService?.slug?.current
          ? servicePath(defaultLocale, defaultService.slug.current)
          : path;

        return {
          url: absoluteUrl(localizedPath(locale, path)),
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.85,
          alternates: {
            languages: {
              ...Object.fromEntries(alternateEntries),
              "x-default": absoluteUrl(localizedPath(defaultLocale, defaultPath)),
            },
          },
        };
      })
  );

  return [...staticEntries, ...projectGroups.flat(), ...serviceGroups];
}
