import type { MetadataRoute } from "next";
import { absoluteUrl, languageAlternates, localizedPath } from "@/lib/seo";
import { locales } from "@/lib/i18n";
import { getProjects } from "../../sanity/lib/fetch";

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

  return [...staticEntries, ...projectGroups.flat()];
}
