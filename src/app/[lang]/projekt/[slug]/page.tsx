import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { ProjectPageContent } from "@/components/ProjectPageContent";
import Link from "next/link";
import { assertLocale, getDictionary, locales, localizedHref } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { portableTextToPlainText, sanityImageUrl } from "@/lib/sanity-mappers";
import { createSanityEdit } from "../../../../../sanity/lib/edit";
import { getProjectBySlug, getProjects, getSiteSettings } from "../../../../../sanity/lib/fetch";

type Props = {
  params: Promise<{ lang: string; slug: string }>;
};

const categoryLabels = {
  pl: {
    lifestyle: "Lifestyle",
    product: "Packshot",
    amazon: "A+ Content",
    infographics: "Infografiki",
  },
  en: {
    lifestyle: "Lifestyle",
    product: "Packshot",
    amazon: "A+ Content",
    infographics: "Infographics",
  },
};

const localizedField = (field: string, locale: string) => `${field}.${locale}`;



export async function generateMetadata({ params }: Props) {
  const { lang, slug } = await params;
  const locale = assertLocale(lang);
  const dict = getDictionary(locale);
  const project = await getProjectBySlug(slug, locale);

  if (!project) {
    return buildMetadata({
      locale,
      path: `/projekt/${slug}`,
      title: dict.project.fallbackTitle,
      noIndex: true,
    });
  }

  const extractFirstImage = (block: import("../../../../../sanity/lib/types").GalleryBlock) => block?.images?.[0]?.image;

  const description =
    project.seo?.description || project.excerpt || portableTextToPlainText(project.description);
  const image = sanityImageUrl(project.seo?.image || extractFirstImage(project.coverImage), 1200, 630);

  return buildMetadata({
    locale,
    path: `/projekt/${slug}`,
    title: project.seo?.title || project.title,
    description,
    image,
    type: "article",
  });
}

export default async function ProjectPage({ params }: Props) {
  const { lang, slug } = await params;
  const locale = assertLocale(lang);
  const dict = getDictionary(locale);
  const [project, siteSettings] = await Promise.all([
    getProjectBySlug(slug, locale),
    getSiteSettings(locale),
  ]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header title={siteSettings?.title} titleEdit={createSanityEdit(siteSettings, localizedField("title", locale))} locale={locale} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-section text-[var(--foreground)] mb-4">{dict.project.notFoundTitle}</h1>
            <Link href={localizedHref(locale, "/#portfolio")} className="btn btn-primary">
              {dict.project.backToPortfolio}
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const extractFirstImage = (block: import("../../../../../sanity/lib/types").GalleryBlock) => block?.images?.[0]?.image;
  const coverImage = sanityImageUrl(extractFirstImage(project.coverImage)) || "/images/placeholder.jpg";

  const mappedProject = {
    title: project.title,
    category: categoryLabels[locale][project.category] || project.category,
    client: project.client || "Lifestyle Images",
    year: project.year ? String(project.year) : "",
    description: portableTextToPlainText(project.description) || project.excerpt || "",
    challenge: project.challenge || "",
    solution: project.solution || "",
    results: project.results?.length ? project.results : project.services || [],
    coverImage,
    gallery: project.gallery || [],
    images: [coverImage], // legacy support for lightbox
    titleEdit: createSanityEdit(project, localizedField("title", locale)),
    categoryEdit: createSanityEdit(project, "category"),
    clientEdit: createSanityEdit(project, "client"),
    yearEdit: createSanityEdit(project, "year"),
    descriptionEdit: createSanityEdit(project, localizedField("description", locale)),
    challengeEdit: createSanityEdit(project, localizedField("challenge", locale)),
    solutionEdit: createSanityEdit(project, localizedField("solution", locale)),
    resultsEdit: createSanityEdit(project, project.results?.length ? localizedField("results", locale) : localizedField("services", locale)),
    coverImageEdit: createSanityEdit(project, "coverImage"),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header title={siteSettings?.title} titleEdit={createSanityEdit(siteSettings, localizedField("title", locale))} locale={locale} />
      <main className="flex-1">
        <ProjectPageContent project={mappedProject} locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
