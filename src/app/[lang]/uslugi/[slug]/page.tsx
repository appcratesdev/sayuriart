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
  getServicePageBySlug,
  getServicePages,
  getServices,
  getSiteSettings,
} from "../../../../../sanity/lib/fetch";
import type { GalleryBlock, Project, Service, ServicePage as ServicePageDocument } from "../../../../../sanity/lib/types";

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
      const servicePages = await getServicePages(lang);
      return servicePages
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
  const servicePage = await getServicePageBySlug(slug, locale);

  if (!servicePage) {
    return buildMetadata({
      locale,
      path: `${serviceBasePath(locale)}/${slug}`,
      title: dict.home.defaultTitle,
      noIndex: true,
    });
  }

  const description =
    servicePage.seo?.description ||
    servicePage.pageLead ||
    servicePage.service?.description ||
    portableTextToPlainText(servicePage.detailsBody);
  const image = sanityImageUrl(servicePage.seo?.image || servicePage.heroImage || extractFirstImage(servicePage.service?.image), 1200, 630);

  return buildMetadata({
    locale,
    path: `${serviceBasePath(locale)}/${slug}`,
    title: servicePage.seo?.title || servicePage.pageTitle || servicePage.service?.title || dict.home.defaultTitle,
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
  if (!service.pageSlug?.current) return null;

  return {
    title: service.title,
    slug: service.pageSlug.current,
    description: service.description,
    titleEdit: createSanityEdit(service, localizedField("title", locale)),
    descriptionEdit: createSanityEdit(service, localizedField("description", locale)),
  };
}

function mapServicePage(
  servicePage: ServicePageDocument,
  locale: Locale,
  projects: Project[],
  allServices: Service[]
): ServicePageData {
  const service = servicePage.service;
  const relatedSource = servicePage.relatedProjects?.length ? servicePage.relatedProjects : projects.slice(0, 3);
  const relatedProjects = relatedSource
    .map((project) => mapProject(project, locale))
    .filter((project): project is NonNullable<ServicePageData["relatedProjects"]>[number] => Boolean(project))
    .slice(0, 3);

  const otherServices = allServices
    .filter((item) => item._id !== service?._id)
    .map((item) => mapOtherService(item, locale))
    .filter((item): item is NonNullable<ServicePageData["otherServices"]>[number] => Boolean(item))
    .slice(0, 3);

  return {
    title: servicePage.pageTitle || service?.title || "",
    overline: servicePage.pageOverline,
    backLinkText: servicePage.backLinkText,
    lead: servicePage.pageLead || service?.description,
    heroImage: sanityImageUrl(servicePage.heroImage || extractFirstImage(service?.image)),
    heroCtaText: servicePage.heroCtaText,
    heroCtaLink: servicePage.heroCtaLink,
    features: service?.features,
    problemsTitle: servicePage.problemsTitle,
    problemsIntro: servicePage.problemsIntro,
    problems: (servicePage.problems || []).map((item, index) => ({
      title: item.title,
      description: item.description,
      titleEdit: createSanityEdit(servicePage, `problems[${index}].${localizedField("title", locale)}`),
      descriptionEdit: createSanityEdit(servicePage, `problems[${index}].${localizedField("description", locale)}`),
    })),
    benefitsTitle: servicePage.benefitsTitle,
    benefitsIntro: servicePage.benefitsIntro,
    benefits: (servicePage.benefits || []).map((item, index) => ({
      title: item.title,
      description: item.description,
      titleEdit: createSanityEdit(servicePage, `benefits[${index}].${localizedField("title", locale)}`),
      descriptionEdit: createSanityEdit(servicePage, `benefits[${index}].${localizedField("description", locale)}`),
    })),
    detailsTitle: servicePage.detailsTitle,
    detailsBody: servicePage.detailsBody,
    faqTitle: servicePage.faqTitle,
    faqItems: (servicePage.faqItems || []).map((item, index) => ({
      question: item.question,
      answer: item.answer,
      questionEdit: createSanityEdit(servicePage, `faqItems[${index}].${localizedField("question", locale)}`),
      answerEdit: createSanityEdit(servicePage, `faqItems[${index}].${localizedField("answer", locale)}`),
    })),
    relatedProjectsTitle: servicePage.relatedProjectsTitle,
    relatedProjectsIntro: servicePage.relatedProjectsIntro,
    relatedProjects,
    relatedProjectsCtaText: servicePage.relatedProjectsCtaText,
    otherServicesTitle: servicePage.otherServicesTitle,
    otherServicesIntro: servicePage.otherServicesIntro,
    otherServices,
    otherServicesCtaText: servicePage.otherServicesCtaText,
    finalCtaTitle: servicePage.finalCtaTitle,
    finalCtaDescription: servicePage.finalCtaDescription,
    finalCtaPrimaryText: servicePage.finalCtaPrimaryText,
    finalCtaPrimaryLink: servicePage.finalCtaPrimaryLink,
    finalCtaSecondaryText: servicePage.finalCtaSecondaryText,
    finalCtaSecondaryLink: servicePage.finalCtaSecondaryLink,
    titleEdit: createSanityEdit(servicePage, localizedField("pageTitle", locale)),
    overlineEdit: createSanityEdit(servicePage, localizedField("pageOverline", locale)),
    backLinkTextEdit: createSanityEdit(servicePage, localizedField("backLinkText", locale)),
    leadEdit: createSanityEdit(servicePage, localizedField("pageLead", locale)),
    heroImageEdit: createSanityEdit(servicePage.heroImage ? servicePage : service, servicePage.heroImage ? "heroImage" : "image"),
    heroCtaTextEdit: createSanityEdit(servicePage, localizedField("heroCtaText", locale)),
    featuresEdit: createSanityEdit(service, localizedField("features", locale)),
    problemsTitleEdit: createSanityEdit(servicePage, localizedField("problemsTitle", locale)),
    problemsIntroEdit: createSanityEdit(servicePage, localizedField("problemsIntro", locale)),
    benefitsTitleEdit: createSanityEdit(servicePage, localizedField("benefitsTitle", locale)),
    benefitsIntroEdit: createSanityEdit(servicePage, localizedField("benefitsIntro", locale)),
    detailsTitleEdit: createSanityEdit(servicePage, localizedField("detailsTitle", locale)),
    detailsBodyEdit: createSanityEdit(servicePage, localizedField("detailsBody", locale)),
    faqTitleEdit: createSanityEdit(servicePage, localizedField("faqTitle", locale)),
    relatedProjectsTitleEdit: createSanityEdit(servicePage, localizedField("relatedProjectsTitle", locale)),
    relatedProjectsIntroEdit: createSanityEdit(servicePage, localizedField("relatedProjectsIntro", locale)),
    relatedProjectsCtaTextEdit: createSanityEdit(servicePage, localizedField("relatedProjectsCtaText", locale)),
    otherServicesTitleEdit: createSanityEdit(servicePage, localizedField("otherServicesTitle", locale)),
    otherServicesIntroEdit: createSanityEdit(servicePage, localizedField("otherServicesIntro", locale)),
    otherServicesCtaTextEdit: createSanityEdit(servicePage, localizedField("otherServicesCtaText", locale)),
    finalCtaTitleEdit: createSanityEdit(servicePage, localizedField("finalCtaTitle", locale)),
    finalCtaDescriptionEdit: createSanityEdit(servicePage, localizedField("finalCtaDescription", locale)),
    finalCtaPrimaryTextEdit: createSanityEdit(servicePage, localizedField("finalCtaPrimaryText", locale)),
    finalCtaSecondaryTextEdit: createSanityEdit(servicePage, localizedField("finalCtaSecondaryText", locale)),
  };
}

export default async function ServicePage({ params }: Props) {
  const { lang, slug } = await params;
  const locale = assertLocale(lang);
  const dict = getDictionary(locale);
  const [servicePage, projects, services, siteSettings] = await Promise.all([
    getServicePageBySlug(slug, locale),
    getProjects(locale),
    getServices(locale),
    getSiteSettings(locale),
  ]);

  if (!servicePage) {
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
        <ServicePageContent service={mapServicePage(servicePage, locale, projects, services)} locale={locale} />
      </main>
      <Footer settings={siteSettings || undefined} locale={locale} />
    </div>
  );
}
