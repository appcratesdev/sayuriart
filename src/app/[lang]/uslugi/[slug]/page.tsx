import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServicePageContent, type ServicePageData } from "@/components/ServicePageContent";
import { assertLocale, getDictionary, locales, localizedHref, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { portableTextToPlainText, sanityImageUrl } from "@/lib/sanity-mappers";
import { createSanityEdit } from "../../../../../sanity/lib/edit";
import {
  getProjects,
  getServiceBySlug,
  getServices,
  getSiteSettings,
} from "../../../../../sanity/lib/fetch";
import type { GalleryBlock, Project, Service } from "../../../../../sanity/lib/types";

type Props = {
  params: Promise<{ lang: string; slug: string }>;
};

const localizedField = (field: string, locale: string) => `${field}.${locale}`;
const serviceBasePath = (locale: Locale) => (locale === "en" ? "/services" : "/uslugi");

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

const extractFirstImage = (block: GalleryBlock | undefined) => block?.images?.[0]?.image;

export async function generateStaticParams() {
  const params = await Promise.all(
    locales.map(async (lang) => {
      const services = await getServices(lang);
      return services
        .filter((service) => service.slug?.current)
        .map((service) => ({ lang, slug: service.slug!.current }));
    })
  );

  return params.flat();
}

export async function generateMetadata({ params }: Props) {
  const { lang, slug } = await params;
  const locale = assertLocale(lang);
  const dict = getDictionary(locale);
  const service = await getServiceBySlug(slug, locale);

  if (!service) {
    return buildMetadata({
      locale,
      path: `${serviceBasePath(locale)}/${slug}`,
      title: dict.home.defaultTitle,
      noIndex: true,
    });
  }

  const description =
    service.seo?.description ||
    service.pageLead ||
    service.description ||
    portableTextToPlainText(service.detailsBody);
  const image = sanityImageUrl(service.seo?.image || extractFirstImage(service.image), 1200, 630);

  return buildMetadata({
    locale,
    path: `${serviceBasePath(locale)}/${slug}`,
    title: service.seo?.title || service.pageTitle || service.title,
    description,
    image,
  });
}

function mapProject(project: Project, locale: Locale): NonNullable<ServicePageData["relatedProjects"]>[number] | null {
  if (!project.slug?.current) return null;

  return {
    title: project.title,
    slug: project.slug.current,
    category: project.categoryLabel || categoryLabels[locale][project.category] || project.category,
    excerpt: project.excerpt,
    image: sanityImageUrl(extractFirstImage(project.coverImage)),
    titleEdit: createSanityEdit(project, localizedField("title", locale)),
    categoryEdit: project.categoryLabel
      ? createSanityEdit(project, localizedField("categoryLabel", locale))
      : createSanityEdit(project, "category"),
    excerptEdit: createSanityEdit(project, localizedField("excerpt", locale)),
    imageEdit: createSanityEdit(project, "coverImage"),
  };
}

function mapOtherService(service: Service, locale: Locale): NonNullable<ServicePageData["otherServices"]>[number] | null {
  if (!service.slug?.current) return null;

  return {
    title: service.title,
    slug: service.slug.current,
    description: service.description,
    titleEdit: createSanityEdit(service, localizedField("title", locale)),
    descriptionEdit: createSanityEdit(service, localizedField("description", locale)),
  };
}

function mapServicePage(
  service: Service,
  locale: Locale,
  projects: Project[],
  allServices: Service[]
): ServicePageData {
  const relatedSource = service.relatedProjects?.length ? service.relatedProjects : projects.slice(0, 3);
  const relatedProjects = relatedSource
    .map((project) => mapProject(project, locale))
    .filter((project): project is NonNullable<ServicePageData["relatedProjects"]>[number] => Boolean(project))
    .slice(0, 3);

  const otherServices = allServices
    .filter((item) => item._id !== service._id)
    .map((item) => mapOtherService(item, locale))
    .filter((item): item is NonNullable<ServicePageData["otherServices"]>[number] => Boolean(item))
    .slice(0, 3);

  return {
    title: service.pageTitle || service.title,
    overline: service.pageOverline,
    backLinkText: service.backLinkText,
    lead: service.pageLead || service.description,
    heroImage: sanityImageUrl(extractFirstImage(service.image)),
    heroCtaText: service.heroCtaText,
    heroCtaLink: service.heroCtaLink,
    features: service.features,
    problemsTitle: service.problemsTitle,
    problemsIntro: service.problemsIntro,
    problems: (service.problems || []).map((item, index) => ({
      title: item.title,
      description: item.description,
      titleEdit: createSanityEdit(service, `problems[${index}].${localizedField("title", locale)}`),
      descriptionEdit: createSanityEdit(service, `problems[${index}].${localizedField("description", locale)}`),
    })),
    benefitsTitle: service.benefitsTitle,
    benefitsIntro: service.benefitsIntro,
    benefits: (service.benefits || []).map((item, index) => ({
      title: item.title,
      description: item.description,
      titleEdit: createSanityEdit(service, `benefits[${index}].${localizedField("title", locale)}`),
      descriptionEdit: createSanityEdit(service, `benefits[${index}].${localizedField("description", locale)}`),
    })),
    detailsTitle: service.detailsTitle,
    detailsBody: service.detailsBody,
    faqTitle: service.faqTitle,
    faqItems: (service.faqItems || []).map((item, index) => ({
      question: item.question,
      answer: item.answer,
      questionEdit: createSanityEdit(service, `faqItems[${index}].${localizedField("question", locale)}`),
      answerEdit: createSanityEdit(service, `faqItems[${index}].${localizedField("answer", locale)}`),
    })),
    relatedProjectsTitle: service.relatedProjectsTitle,
    relatedProjectsIntro: service.relatedProjectsIntro,
    relatedProjects,
    relatedProjectsCtaText: service.relatedProjectsCtaText,
    otherServicesTitle: service.otherServicesTitle,
    otherServicesIntro: service.otherServicesIntro,
    otherServices,
    otherServicesCtaText: service.otherServicesCtaText,
    finalCtaTitle: service.finalCtaTitle,
    finalCtaDescription: service.finalCtaDescription,
    finalCtaPrimaryText: service.finalCtaPrimaryText,
    finalCtaPrimaryLink: service.finalCtaPrimaryLink,
    finalCtaSecondaryText: service.finalCtaSecondaryText,
    finalCtaSecondaryLink: service.finalCtaSecondaryLink,
    titleEdit: createSanityEdit(service, service.pageTitle ? localizedField("pageTitle", locale) : localizedField("title", locale)),
    overlineEdit: createSanityEdit(service, localizedField("pageOverline", locale)),
    backLinkTextEdit: createSanityEdit(service, localizedField("backLinkText", locale)),
    leadEdit: createSanityEdit(service, service.pageLead ? localizedField("pageLead", locale) : localizedField("description", locale)),
    heroImageEdit: createSanityEdit(service, "image"),
    heroCtaTextEdit: createSanityEdit(service, localizedField("heroCtaText", locale)),
    featuresEdit: createSanityEdit(service, localizedField("features", locale)),
    problemsTitleEdit: createSanityEdit(service, localizedField("problemsTitle", locale)),
    problemsIntroEdit: createSanityEdit(service, localizedField("problemsIntro", locale)),
    benefitsTitleEdit: createSanityEdit(service, localizedField("benefitsTitle", locale)),
    benefitsIntroEdit: createSanityEdit(service, localizedField("benefitsIntro", locale)),
    detailsTitleEdit: createSanityEdit(service, localizedField("detailsTitle", locale)),
    detailsBodyEdit: createSanityEdit(service, localizedField("detailsBody", locale)),
    faqTitleEdit: createSanityEdit(service, localizedField("faqTitle", locale)),
    relatedProjectsTitleEdit: createSanityEdit(service, localizedField("relatedProjectsTitle", locale)),
    relatedProjectsIntroEdit: createSanityEdit(service, localizedField("relatedProjectsIntro", locale)),
    relatedProjectsCtaTextEdit: createSanityEdit(service, localizedField("relatedProjectsCtaText", locale)),
    otherServicesTitleEdit: createSanityEdit(service, localizedField("otherServicesTitle", locale)),
    otherServicesIntroEdit: createSanityEdit(service, localizedField("otherServicesIntro", locale)),
    otherServicesCtaTextEdit: createSanityEdit(service, localizedField("otherServicesCtaText", locale)),
    finalCtaTitleEdit: createSanityEdit(service, localizedField("finalCtaTitle", locale)),
    finalCtaDescriptionEdit: createSanityEdit(service, localizedField("finalCtaDescription", locale)),
    finalCtaPrimaryTextEdit: createSanityEdit(service, localizedField("finalCtaPrimaryText", locale)),
    finalCtaSecondaryTextEdit: createSanityEdit(service, localizedField("finalCtaSecondaryText", locale)),
  };
}

export default async function ServicePage({ params }: Props) {
  const { lang, slug } = await params;
  const locale = assertLocale(lang);
  const dict = getDictionary(locale);
  const [service, projects, services, siteSettings] = await Promise.all([
    getServiceBySlug(slug, locale),
    getProjects(locale),
    getServices(locale),
    getSiteSettings(locale),
  ]);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header title={siteSettings?.title} titleEdit={createSanityEdit(siteSettings, localizedField("title", locale))} locale={locale} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-section text-[var(--foreground)] mb-4">
              {locale === "en" ? "Service not found" : "Usluga nie znaleziona"}
            </h1>
            <Link href={localizedHref(locale, "/#services")} className="btn btn-primary">
              {dict.nav.services}
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header title={siteSettings?.title} titleEdit={createSanityEdit(siteSettings, localizedField("title", locale))} locale={locale} />
      <main className="flex-1">
        <ServicePageContent service={mapServicePage(service, locale, projects, services)} locale={locale} />
      </main>
      <Footer settings={siteSettings || undefined} locale={locale} />
    </div>
  );
}
