"use client";

import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { localizedHref, type Locale } from "@/lib/i18n";

interface EditableTextItem {
  title: string;
  description?: string;
  titleEdit?: string;
  descriptionEdit?: string;
}

interface ServiceProjectCard {
  title: string;
  slug: string;
  category?: string;
  excerpt?: string;
  image?: string;
  titleEdit?: string;
  categoryEdit?: string;
  excerptEdit?: string;
  imageEdit?: string;
}

interface OtherServiceCard {
  title: string;
  slug: string;
  description?: string;
  titleEdit?: string;
  descriptionEdit?: string;
}

interface ServiceFaqItem {
  question: string;
  answer: string;
  questionEdit?: string;
  answerEdit?: string;
}

export interface ServicePageData {
  title: string;
  overline?: string;
  backLinkText?: string;
  lead?: string;
  heroImage?: string;
  heroCtaText?: string;
  heroCtaLink?: string;
  features?: string[];
  problemsTitle?: string;
  problemsIntro?: string;
  problems?: EditableTextItem[];
  benefitsTitle?: string;
  benefitsIntro?: string;
  benefits?: EditableTextItem[];
  detailsTitle?: string;
  detailsBody?: Parameters<typeof PortableText>[0]["value"];
  faqTitle?: string;
  faqItems?: ServiceFaqItem[];
  relatedProjectsTitle?: string;
  relatedProjectsIntro?: string;
  relatedProjects?: ServiceProjectCard[];
  relatedProjectsCtaText?: string;
  otherServicesTitle?: string;
  otherServicesIntro?: string;
  otherServices?: OtherServiceCard[];
  otherServicesCtaText?: string;
  finalCtaTitle?: string;
  finalCtaDescription?: string;
  finalCtaPrimaryText?: string;
  finalCtaPrimaryLink?: string;
  finalCtaSecondaryText?: string;
  finalCtaSecondaryLink?: string;
  titleEdit?: string;
  overlineEdit?: string;
  backLinkTextEdit?: string;
  leadEdit?: string;
  heroImageEdit?: string;
  heroCtaTextEdit?: string;
  featuresEdit?: string;
  problemsTitleEdit?: string;
  problemsIntroEdit?: string;
  benefitsTitleEdit?: string;
  benefitsIntroEdit?: string;
  detailsTitleEdit?: string;
  detailsBodyEdit?: string;
  faqTitleEdit?: string;
  relatedProjectsTitleEdit?: string;
  relatedProjectsIntroEdit?: string;
  relatedProjectsCtaTextEdit?: string;
  otherServicesTitleEdit?: string;
  otherServicesIntroEdit?: string;
  otherServicesCtaTextEdit?: string;
  finalCtaTitleEdit?: string;
  finalCtaDescriptionEdit?: string;
  finalCtaPrimaryTextEdit?: string;
  finalCtaSecondaryTextEdit?: string;
}

const serviceBasePath = (locale: Locale) => (locale === "en" ? "/services" : "/uslugi");

export const ServicePageContent = ({ service, locale }: { service: ServicePageData; locale: Locale }) => {
  const projectLabel = service.relatedProjectsCtaText || (locale === "en" ? "Open project" : "Zobacz projekt");
  const serviceLabel = service.otherServicesCtaText || (locale === "en" ? "Open service" : "Zobacz usluge");

  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-[var(--background)] overflow-hidden">
        <div className="container-main">
          <Link
            href={localizedHref(locale, "/#services")}
            className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-8"
          >
            <ChevronLeft size={16} />
            <span data-sanity={service.backLinkTextEdit}>
              {service.backLinkText || (locale === "en" ? "Back to services" : "Wroc do uslug")}
            </span>
          </Link>

          <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)] gap-10 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              {service.overline && (
                <span className="overline block mb-5" data-sanity={service.overlineEdit}>
                  {service.overline}
                </span>
              )}
              <h1 className="heading-display text-[var(--foreground)] mb-6" data-sanity={service.titleEdit}>
                {service.title}
              </h1>
              {service.lead && (
                <p className="text-body-lg max-w-2xl mb-8" data-sanity={service.leadEdit}>
                  {service.lead}
                </p>
              )}
              {!!service.features?.length && (
                <ul className="grid sm:grid-cols-2 gap-3 mb-8" data-sanity={service.featuresEdit}>
                  {service.features.map((feature) => (
                    <li key={feature} className="pricing-feature">
                      <span className="w-2 h-2 rounded-full bg-[var(--primary)] shrink-0 mt-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
              <Link
                href={localizedHref(locale, service.heroCtaLink || "/#contact")}
                className="btn btn-primary btn-primary-lg"
                data-sanity={service.heroCtaTextEdit}
              >
                {service.heroCtaText || (locale === "en" ? "Start a project" : "Rozpocznij projekt")}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="img-wrapper aspect-[4/3] w-full"
              data-sanity={service.heroImageEdit}
            >
              <Image
                src={service.heroImage || "/images/placeholder.jpg"}
                alt={service.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 640px"
                quality={95}
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[var(--secondary)]">
        <div className="container-main">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
            <div>
              <h2 className="heading-section text-[var(--foreground)] mb-4" data-sanity={service.problemsTitleEdit}>
                {service.problemsTitle || (locale === "en" ? "Problems this service solves" : "Jakie problemy rozwiazuje ta usluga")}
              </h2>
              {service.problemsIntro && (
                <p className="text-body-lg" data-sanity={service.problemsIntroEdit}>
                  {service.problemsIntro}
                </p>
              )}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {(service.problems || []).map((problem, index) => (
                <article key={`${problem.title}-${index}`} className="card-flat p-6">
                  <div className="text-sm font-bold text-[var(--primary)] mb-4">{String(index + 1).padStart(2, "0")}</div>
                  <h3 className="heading-card text-[var(--foreground)] mb-3" data-sanity={problem.titleEdit}>
                    {problem.title}
                  </h3>
                  {problem.description && (
                    <p className="text-body text-sm" data-sanity={problem.descriptionEdit}>
                      {problem.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[var(--background)]">
        <div className="container-main">
          <div className="max-w-3xl mb-12">
            <h2 className="heading-section text-[var(--foreground)] mb-4" data-sanity={service.benefitsTitleEdit}>
              {service.benefitsTitle || (locale === "en" ? "Business benefits" : "Korzyści dla marki i sprzedazy")}
            </h2>
            {service.benefitsIntro && (
              <p className="text-body-lg" data-sanity={service.benefitsIntroEdit}>
                {service.benefitsIntro}
              </p>
            )}
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {(service.benefits || []).map((benefit, index) => (
              <article key={`${benefit.title}-${index}`} className="p-6 border border-[var(--border)] rounded-[var(--radius-lg)] bg-[var(--card)]">
                <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm font-bold mb-5">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="heading-card text-[var(--foreground)] mb-3" data-sanity={benefit.titleEdit}>
                  {benefit.title}
                </h3>
                {benefit.description && (
                  <p className="text-body text-sm" data-sanity={benefit.descriptionEdit}>
                    {benefit.description}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {(service.detailsTitle || service.detailsBody) && (
        <section className="py-16 md:py-24 bg-[var(--dark-bg)] text-white">
          <div className="container-main grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
            <h2 className="heading-section text-white" data-sanity={service.detailsTitleEdit}>
              {service.detailsTitle || service.title}
            </h2>
            {service.detailsBody && (
              <div className="prose prose-invert max-w-none text-white/75 prose-p:text-white/75 prose-strong:text-white" data-sanity={service.detailsBodyEdit}>
                <PortableText value={service.detailsBody} />
              </div>
            )}
          </div>
        </section>
      )}

      {!!service.relatedProjects?.length && (
        <section className="py-16 md:py-24 bg-[var(--background)]">
          <div className="container-main">
            <div className="max-w-3xl mb-12">
              <h2 className="heading-section text-[var(--foreground)] mb-4" data-sanity={service.relatedProjectsTitleEdit}>
                {service.relatedProjectsTitle || (locale === "en" ? "Related projects" : "Powiazane projekty")}
              </h2>
              {service.relatedProjectsIntro && (
                <p className="text-body-lg" data-sanity={service.relatedProjectsIntroEdit}>
                  {service.relatedProjectsIntro}
                </p>
              )}
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {service.relatedProjects.map((project) => (
                <Link key={project.slug} href={localizedHref(locale, `/projekt/${project.slug}`)} className="group block">
                  <div className="img-wrapper aspect-[4/3] mb-4" data-sanity={project.imageEdit}>
                    <Image
                      src={project.image || "/images/placeholder.jpg"}
                      alt={project.title}
                      fill
                      className="object-cover img-hover-zoom"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={90}
                    />
                  </div>
                  {project.category && (
                    <span className="badge badge-outline mb-3" data-sanity={project.categoryEdit}>
                      {project.category}
                    </span>
                  )}
                  <h3 className="text-lg font-serif text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors" data-sanity={project.titleEdit}>
                    {project.title}
                  </h3>
                  {project.excerpt && (
                    <p className="text-body text-sm mb-4" data-sanity={project.excerptEdit}>
                      {project.excerpt}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)]" data-sanity={service.relatedProjectsCtaTextEdit}>
                    {projectLabel}
                    <ArrowRight size={16} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {!!service.faqItems?.length && (
        <section className="py-16 md:py-24 bg-[var(--secondary)]">
          <div className="container-main grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
            <h2 className="heading-section text-[var(--foreground)]" data-sanity={service.faqTitleEdit}>
              {service.faqTitle || (locale === "en" ? "Service FAQ" : "FAQ uslugi")}
            </h2>
            <div className="border-t border-[var(--border)]">
              {service.faqItems.map((item, index) => (
                <details key={`${item.question}-${index}`} className="group border-b border-[var(--border)] py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                    <span className="text-base font-medium text-[var(--foreground)]" data-sanity={item.questionEdit}>
                      {item.question}
                    </span>
                    <span className="text-2xl leading-none text-[var(--primary)] group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-body text-sm mt-4 max-w-2xl" data-sanity={item.answerEdit}>
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {!!service.otherServices?.length && (
        <section className="py-16 md:py-24 bg-[var(--background)]">
          <div className="container-main">
            <div className="max-w-3xl mb-12">
              <h2 className="heading-section text-[var(--foreground)] mb-4" data-sanity={service.otherServicesTitleEdit}>
                {service.otherServicesTitle || (locale === "en" ? "Explore other services" : "Zobacz pozostale uslugi")}
              </h2>
              {service.otherServicesIntro && (
                <p className="text-body-lg" data-sanity={service.otherServicesIntroEdit}>
                  {service.otherServicesIntro}
                </p>
              )}
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {service.otherServices.map((item) => (
                <Link
                  key={item.slug}
                  href={localizedHref(locale, `${serviceBasePath(locale)}/${item.slug}`)}
                  className="p-6 border border-[var(--border)] rounded-[var(--radius-lg)] bg-[var(--card)] group"
                >
                  <h3 className="heading-card text-[var(--foreground)] mb-3 group-hover:text-[var(--primary)] transition-colors" data-sanity={item.titleEdit}>
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-body text-sm mb-5" data-sanity={item.descriptionEdit}>
                      {item.description}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)]" data-sanity={service.otherServicesCtaTextEdit}>
                    {serviceLabel}
                    <ArrowRight size={16} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-24 bg-[var(--dark-bg)] text-white">
        <div className="container-main text-center">
          <h2 className="heading-section text-white mb-4" data-sanity={service.finalCtaTitleEdit}>
            {service.finalCtaTitle || (locale === "en" ? "Ready to improve your product visuals?" : "Gotowa poprawic wizualna sprzedaz produktu?")}
          </h2>
          <p className="text-white/65 text-lg max-w-2xl mx-auto mb-8" data-sanity={service.finalCtaDescriptionEdit}>
            {service.finalCtaDescription ||
              (locale === "en"
                ? "Send a short brief and I will suggest the best visual direction for this service."
                : "Wyslij krotki brief, a zaproponuje najlepszy kierunek wizualny dla tej uslugi.")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href={localizedHref(locale, service.finalCtaPrimaryLink || "/#contact")}
              className="btn btn-white"
              data-sanity={service.finalCtaPrimaryTextEdit}
            >
              {service.finalCtaPrimaryText || (locale === "en" ? "Start a project" : "Rozpocznij projekt")}
            </Link>
            <Link
              href={localizedHref(locale, service.finalCtaSecondaryLink || "/#portfolio")}
              className="btn btn-ghost text-white border-white/20 hover:bg-white/10"
              data-sanity={service.finalCtaSecondaryTextEdit}
            >
              {service.finalCtaSecondaryText || (locale === "en" ? "View projects" : "Zobacz projekty")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
