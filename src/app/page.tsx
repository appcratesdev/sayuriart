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
import { Footer } from "@/components/Footer";
import {
  getBeforeAfter,
  getFAQ,
  getHero,
  getManifesto,
  getPortfolioSection,
  getPricing,
  getProcess,
  getProjects,
  getServices,
  getSiteSettings,
  getTestimonials,
} from "../../sanity/lib/fetch";
import { portableTextToPlainText, sanityImageUrl } from "@/lib/sanity-mappers";

const categoryLabels: Record<string, string> = {
  lifestyle: "Lifestyle",
  product: "Packshot",
  amazon: "A+ Content",
  infographics: "Infografiki",
};

const projectSpans = [
  "col-span-1 md:col-span-2 md:row-span-2",
  "col-span-1",
  "col-span-1",
  "col-span-1",
  "col-span-1 md:col-span-2",
  "col-span-1",
];

const projectAspects = [
  "aspect-[4/5]",
  "aspect-square",
  "aspect-square",
  "aspect-[3/4]",
  "aspect-[16/10]",
  "aspect-[3/4]",
];

export default async function Home() {
  const [
    hero,
    manifesto,
    services,
    beforeAfter,
    portfolioSection,
    projects,
    pricing,
    testimonials,
    process,
    faq,
    siteSettings,
  ] = await Promise.all([
    getHero(),
    getManifesto(),
    getServices(),
    getBeforeAfter(),
    getPortfolioSection(),
    getProjects(),
    getPricing(),
    getTestimonials(),
    getProcess(),
    getFAQ(),
    getSiteSettings(),
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header title={siteSettings?.title} />
      <main className="flex-1">
        <Hero
          content={
            hero
              ? {
                  title: hero.title,
                  subtitle: hero.subtitle,
                  ctaText: hero.ctaText,
                  ctaLink: hero.ctaLink,
                  image: sanityImageUrl(hero.heroImage, 1920, 1080),
                }
              : undefined
          }
        />
        <Manifesto text={portableTextToPlainText(manifesto?.description) || manifesto?.title} />
        <Services
          items={services.map((service) => ({
            title: service.title,
            desc: service.description,
            features: service.features,
            img: sanityImageUrl(service.image, 900, 700),
          }))}
        />
        <BeforeAfter
          items={beforeAfter
            .map((example) => {
              const before = sanityImageUrl(example.beforeImage, 1200, 900);
              const after = sanityImageUrl(example.afterImage, 1200, 900);
              if (!before || !after) return null;
              return {
                title: example.title,
                description: example.description,
                before,
                after,
              };
            })
            .filter((example): example is NonNullable<typeof example> => Boolean(example))}
        />
        <Portfolio
          content={{
            title: portfolioSection?.sectionTitle,
            description: portfolioSection?.sectionDescription,
            works: projects.map((project, index) => ({
              title: project.title,
              slug: project.slug.current,
              category: categoryLabels[project.category] || project.category,
              img: sanityImageUrl(project.coverImage, 900, 900),
              aspect: projectAspects[index % projectAspects.length],
              span: projectSpans[index % projectSpans.length],
            })),
          }}
        />
        <Pricing
          items={pricing.map((category) => ({
            id: category.categoryId,
            label: category.categoryLabel,
            packages: category.packages || [],
          }))}
        />
        <Testimonials
          items={testimonials.map((testimonial) => ({
            quote: testimonial.content,
            author: testimonial.name,
            role: testimonial.role,
          }))}
        />
        <Process
          items={process.map((step) => ({
            number: step.number,
            title: step.title,
            desc: step.description,
            iconName: step.iconName,
          }))}
        />
        <FAQ items={faq} />
      </main>
      <Footer
        settings={{
          title: siteSettings?.title,
          email: siteSettings?.email,
          instagram: siteSettings?.socialLinks?.instagram,
          facebook: siteSettings?.socialLinks?.facebook,
          linkedin: siteSettings?.socialLinks?.linkedin,
        }}
      />
    </div>
  );
}
