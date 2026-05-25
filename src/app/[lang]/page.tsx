import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Services } from "@/components/Services";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Portfolio } from "@/components/Portfolio";
import { Pricing } from "@/components/Pricing";
import { Testimonials } from "@/components/Testimonials";
import { Process } from "@/components/Process";
import { FAQ } from "@/components/FAQ";
import { SiteFooter } from "@/components/SiteFooter";
import { assertLocale, getDictionary, locales } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { portableTextToPlainText, sanityImageUrl } from "@/lib/sanity-mappers";
import { createSanityEdit } from "../../../sanity/lib/edit";
import {
  getBeforeAfter,
  getBeforeAfterSection,
  getFAQ,
  getFAQSection,
  getFooter,
  getHeader,
  getHero,
  getManifesto,
  getPortfolioSection,
  getPricing,
  getPricingSection,
  getProcess,
  getProcessSection,
  getProjects,
  getServices,
  getServicesSection,
  getSiteSettings,
  getTestimonials,
  getTestimonialsSection,
} from "../../../sanity/lib/fetch";

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

type Props = {
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props) {
  const locale = assertLocale((await params).lang);
  const dict = getDictionary(locale);
  const [siteSettings, hero] = await Promise.all([getSiteSettings(locale), getHero(locale)]);
  const title = hero?.seo?.title || siteSettings?.seo?.title || siteSettings?.title || dict.home.defaultTitle;
  const description =
    hero?.seo?.description || siteSettings?.seo?.description || siteSettings?.description || dict.home.defaultDescription;
  const image = sanityImageUrl(hero?.seo?.image || siteSettings?.seo?.image || hero?.heroImage, 1200, 630);

  return buildMetadata({
    locale,
    path: "/",
    title,
    description,
    image,
  });
}

export default async function Home({ params }: Props) {
  const locale = assertLocale((await params).lang);
  const [
    hero,
    manifesto,
    services,
    servicesSection,
    beforeAfter,
    beforeAfterSection,
    portfolioSection,
    projects,
    pricing,
    pricingSection,
    testimonials,
    testimonialsSection,
    process,
    processSection,
    faq,
    faqSection,
    footer,
    header,
    siteSettings,
  ] = await Promise.all([
    getHero(locale),
    getManifesto(locale),
    getServices(locale),
    getServicesSection(locale),
    getBeforeAfter(locale),
    getBeforeAfterSection(locale),
    getPortfolioSection(locale),
    getProjects(locale),
    getPricing(locale),
    getPricingSection(locale),
    getTestimonials(locale),
    getTestimonialsSection(locale),
    getProcess(locale),
    getProcessSection(locale),
    getFAQ(locale),
    getFAQSection(locale),
    getFooter(locale),
    getHeader(locale),
    getSiteSettings(locale),
  ]);

  const extractFirstImage = (block: import("../../../sanity/lib/types").GalleryBlock) => block?.images?.[0]?.image;

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        title={siteSettings?.title}
        titleEdit={createSanityEdit(siteSettings, localizedField("title", locale))}
        locale={locale}
        content={{
          servicesLabel: header?.servicesLabel,
          portfolioLabel: header?.portfolioLabel,
          pricingLabel: header?.pricingLabel,
          processLabel: header?.processLabel,
          aboutLabel: header?.aboutLabel,
          ctaLabel: header?.ctaLabel,
          menuLabel: header?.menuLabel,
          closeLabel: header?.closeLabel,
          polishLocaleLabel: header?.polishLocaleLabel,
          englishLocaleLabel: header?.englishLocaleLabel,
          servicesLabelEdit: createSanityEdit(header, localizedField("servicesLabel", locale)),
          portfolioLabelEdit: createSanityEdit(header, localizedField("portfolioLabel", locale)),
          pricingLabelEdit: createSanityEdit(header, localizedField("pricingLabel", locale)),
          processLabelEdit: createSanityEdit(header, localizedField("processLabel", locale)),
          aboutLabelEdit: createSanityEdit(header, localizedField("aboutLabel", locale)),
          ctaLabelEdit: createSanityEdit(header, localizedField("ctaLabel", locale)),
          menuLabelEdit: createSanityEdit(header, localizedField("menuLabel", locale)),
          closeLabelEdit: createSanityEdit(header, localizedField("closeLabel", locale)),
          polishLocaleLabelEdit: createSanityEdit(header, "polishLocaleLabel"),
          englishLocaleLabelEdit: createSanityEdit(header, "englishLocaleLabel"),
        }}
      />
      <main className="flex-1">
        <Hero
          locale={locale}
          content={
            hero
              ? {
                title: hero.title,
                subtitle: hero.subtitle,
                ctaText: hero.ctaText,
                ctaLink: hero.ctaLink,
                secondaryCtaText: hero.secondaryCtaText,
                image: sanityImageUrl(hero.heroImage),
                titleEdit: createSanityEdit(hero, localizedField("title", locale)),
                subtitleEdit: createSanityEdit(hero, localizedField("subtitle", locale)),
                ctaTextEdit: createSanityEdit(hero, localizedField("ctaText", locale)),
                secondaryCtaTextEdit: createSanityEdit(hero, localizedField("secondaryCtaText", locale)),
                imageEdit: createSanityEdit(hero, "heroImage"),
              }
              : undefined
          }
        />
        <Manifesto
          text={portableTextToPlainText(manifesto?.description) || manifesto?.title}
          textEdit={createSanityEdit(manifesto, manifesto?.description ? localizedField("description", locale) : localizedField("title", locale))}
        />
        <Services
          locale={locale}
          sectionTitle={servicesSection?.sectionTitle}
          sectionDescription={servicesSection?.sectionDescription}
          ctaText={servicesSection?.ctaText}
          servicePageCtaText={servicesSection?.servicePageCtaText}
          sectionTitleEdit={createSanityEdit(servicesSection, localizedField("sectionTitle", locale))}
          sectionDescriptionEdit={createSanityEdit(servicesSection, localizedField("sectionDescription", locale))}
          ctaTextEdit={createSanityEdit(servicesSection, localizedField("ctaText", locale))}
          servicePageCtaTextEdit={createSanityEdit(servicesSection, localizedField("servicePageCtaText", locale))}
          items={services.map((service) => {
            const firstGalleryImage = service.image?.images?.[0];
            const firstImage = extractFirstImage(service.image);
            
            const imageBlock = service.image;
            const ratio =
              firstGalleryImage?.aspectRatio === "custom"
                ? firstGalleryImage.customAspectRatio
                : firstGalleryImage?.aspectRatio && firstGalleryImage.aspectRatio !== "auto"
                  ? firstGalleryImage.aspectRatio
                  : imageBlock?.aspectRatio === "custom"
                    ? imageBlock.customAspectRatio
                    : imageBlock?.aspectRatio;
            
            const finalRatio = ratio && ratio !== "auto" ? ratio : "4 / 3";

            return {
              title: service.title,
              slug: service.pageSlug?.current,
              desc: service.description,
              features: service.features,
              img: sanityImageUrl(firstImage),
              aspectRatio: finalRatio,
              titleEdit: createSanityEdit(service, localizedField("title", locale)),
              descEdit: createSanityEdit(service, localizedField("description", locale)),
              featuresEdit: createSanityEdit(service, localizedField("features", locale)),
              imageEdit: createSanityEdit(service, "image"),
              _id: service._id,
              _type: service._type,
              imageValue: firstImage
                ? {
                    hotspot: firstImage.hotspot,
                    crop: firstImage.crop,
                  }
                : null,
            };
          })}
        />
        <BeforeAfter
          sectionTitle={beforeAfterSection?.sectionTitle}
          sectionDescription={beforeAfterSection?.sectionDescription}
          titleEdit={createSanityEdit(beforeAfterSection, localizedField("sectionTitle", locale))}
          descriptionEdit={createSanityEdit(beforeAfterSection, localizedField("sectionDescription", locale))}
          beforeLabel={beforeAfterSection?.beforeLabel}
          afterLabel={beforeAfterSection?.afterLabel}
          instruction={beforeAfterSection?.instruction}
          beforeLabelEdit={createSanityEdit(beforeAfterSection, localizedField("beforeLabel", locale))}
          afterLabelEdit={createSanityEdit(beforeAfterSection, localizedField("afterLabel", locale))}
          instructionEdit={createSanityEdit(beforeAfterSection, localizedField("instruction", locale))}
          items={beforeAfter
            .map((example) => {
              const before = sanityImageUrl(extractFirstImage(example.beforeImage));
              const after = sanityImageUrl(extractFirstImage(example.afterImage));
              if (!before || !after) return null;
              return {
                title: example.title,
                description: example.description,
                before,
                after,
                titleEdit: createSanityEdit(example, localizedField("title", locale)),
                descriptionEdit: createSanityEdit(example, localizedField("description", locale)),
                beforeImageEdit: createSanityEdit(example, "beforeImage"),
                afterImageEdit: createSanityEdit(example, "afterImage"),
              };
            })
            .filter((example): example is NonNullable<typeof example> => Boolean(example))}
        />
        <Portfolio
          locale={locale}
          content={{
            title: portfolioSection?.sectionTitle,
            description: portfolioSection?.sectionDescription,
            openProjectLabel: portfolioSection?.openProjectLabel,
            titleEdit: createSanityEdit(portfolioSection, localizedField("sectionTitle", locale)),
            descriptionEdit: createSanityEdit(portfolioSection, localizedField("sectionDescription", locale)),
            openProjectLabelEdit: createSanityEdit(portfolioSection, localizedField("openProjectLabel", locale)),
            works: projects.map((project) => ({
              title: project.title,
              slug: project.slug.current,
              category: project.categoryLabel || categoryLabels[locale][project.category] || project.category,
              coverImageBlock: project.coverImage, // Pass full block
              titleEdit: createSanityEdit(project, localizedField("title", locale)),
              categoryEdit: project.categoryLabel
                ? createSanityEdit(project, localizedField("categoryLabel", locale))
                : createSanityEdit(project, "category"),
              imageEdit: createSanityEdit(project, "coverImage"),
            })),
          }}
        />
        <Pricing
          locale={locale}
          sectionTitle={pricingSection?.sectionTitle}
          sectionDescription={pricingSection?.sectionDescription}
          customQuestion={pricingSection?.customQuestion}
          customCta={pricingSection?.customCta}
          popularLabel={pricingSection?.popularLabel}
          orderLabel={pricingSection?.orderLabel}
          currencyLabel={pricingSection?.currencyLabel}
          savingsLabel={pricingSection?.savingsLabel}
          orderMessageTemplate={pricingSection?.orderMessageTemplate}
          sectionTitleEdit={createSanityEdit(pricingSection, localizedField("sectionTitle", locale))}
          sectionDescriptionEdit={createSanityEdit(pricingSection, localizedField("sectionDescription", locale))}
          customQuestionEdit={createSanityEdit(pricingSection, localizedField("customQuestion", locale))}
          customCtaEdit={createSanityEdit(pricingSection, localizedField("customCta", locale))}
          popularLabelEdit={createSanityEdit(pricingSection, localizedField("popularLabel", locale))}
          orderLabelEdit={createSanityEdit(pricingSection, localizedField("orderLabel", locale))}
          currencyLabelEdit={createSanityEdit(pricingSection, localizedField("currencyLabel", locale))}
          savingsLabelEdit={createSanityEdit(pricingSection, localizedField("savingsLabel", locale))}
          items={pricing.map((category) => ({
            id: category.categoryId,
            label: category.categoryLabel,
            labelEdit: createSanityEdit(category, localizedField("categoryLabel", locale)),
            packages: (category.packages || []).map((pkg, packageIndex) => ({
              ...pkg,
              nameEdit: createSanityEdit(category, `packages[${packageIndex}].${localizedField("name", locale)}`),
              priceEdit: createSanityEdit(category, `packages[${packageIndex}].price`),
              unitEdit: createSanityEdit(category, `packages[${packageIndex}].${localizedField("unit", locale)}`),
              savingsEdit: createSanityEdit(category, `packages[${packageIndex}].savings`),
              originalValueEdit: createSanityEdit(category, `packages[${packageIndex}].originalValue`),
              featuresEdit: createSanityEdit(category, `packages[${packageIndex}].${localizedField("features", locale)}`),
            })),
          }))}
        />
        <Process
          locale={locale}
          title={processSection?.sectionTitle}
          description={processSection?.sectionDescription}
          titleEdit={createSanityEdit(processSection, localizedField("sectionTitle", locale))}
          descriptionEdit={createSanityEdit(processSection, localizedField("sectionDescription", locale))}
          items={process.map((step) => ({
            number: step.number,
            title: step.title,
            desc: step.description,
            iconName: step.iconName,
            numberEdit: createSanityEdit(step, "number"),
            titleEdit: createSanityEdit(step, localizedField("title", locale)),
            descEdit: createSanityEdit(step, localizedField("description", locale)),
          }))}
        />
        <Testimonials
          locale={locale}
          sectionTitle={testimonialsSection?.sectionTitle}
          sectionDescription={testimonialsSection?.sectionDescription}
          previousLabel={testimonialsSection?.previousLabel}
          nextLabel={testimonialsSection?.nextLabel}
          goToSlideLabel={testimonialsSection?.goToSlideLabel}
          sectionTitleEdit={createSanityEdit(testimonialsSection, localizedField("sectionTitle", locale))}
          sectionDescriptionEdit={createSanityEdit(testimonialsSection, localizedField("sectionDescription", locale))}
          previousLabelEdit={createSanityEdit(testimonialsSection, localizedField("previousLabel", locale))}
          nextLabelEdit={createSanityEdit(testimonialsSection, localizedField("nextLabel", locale))}
          goToSlideLabelEdit={createSanityEdit(testimonialsSection, localizedField("goToSlideLabel", locale))}
          items={testimonials.map((testimonial) => ({
            quote: testimonial.content,
            author: testimonial.name,
            role: testimonial.role,
            quoteEdit: createSanityEdit(testimonial, localizedField("content", locale)),
            authorEdit: createSanityEdit(testimonial, "name"),
            roleEdit: createSanityEdit(testimonial, localizedField("role", locale)),
          }))}
        />
        <FAQ
          locale={locale}
          section={{
            sectionTitle: faqSection?.sectionTitle,
            sectionDescription: faqSection?.sectionDescription,
            contactTitle: faqSection?.contactTitle,
            contactDescription: faqSection?.contactDescription,
            contactCta: faqSection?.contactCta,
            sectionTitleEdit: createSanityEdit(faqSection, localizedField("sectionTitle", locale)),
            sectionDescriptionEdit: createSanityEdit(faqSection, localizedField("sectionDescription", locale)),
            contactTitleEdit: createSanityEdit(faqSection, localizedField("contactTitle", locale)),
            contactDescriptionEdit: createSanityEdit(faqSection, localizedField("contactDescription", locale)),
            contactCtaEdit: createSanityEdit(faqSection, localizedField("contactCta", locale)),
          }}
          items={faq.map((item) => ({
            ...item,
            questionEdit: createSanityEdit(item, localizedField("question", locale)),
            answerEdit: createSanityEdit(item, localizedField("answer", locale)),
          }))}
        />
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
