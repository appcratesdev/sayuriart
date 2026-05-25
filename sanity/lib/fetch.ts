import { dataset, projectId, client } from './client'
import { sanityFetch } from './live'
import {
  siteSettingsQuery,
  headerQuery,
  heroQuery,
  manifestoQuery,
  servicePageBySlugQuery,
  servicePagesQuery,
  servicesQuery,
  servicesSectionQuery,
  beforeAfterQuery,
  beforeAfterSectionQuery,
  portfolioSectionQuery,
  projectsQuery,
  projectBySlugQuery,
  pricingQuery,
  pricingSectionQuery,
  testimonialsQuery,
  testimonialsSectionQuery,
  processSectionQuery,
  processQuery,
  faqQuery,
  faqSectionQuery,
  footerQuery,
  aboutQuery,
  legalPageQuery,
} from './queries'
import type {
  SiteSettings,
  HeaderContent,
  Hero,
  Manifesto,
  Service,
  ServicePage,
  ServicesSection,
  BeforeAfter,
  BeforeAfterSection,
  PortfolioSection,
  Project,
  Pricing,
  PricingSection,
  Testimonial,
  TestimonialsSection,
  ProcessSection,
  Process,
  FAQ,
  FAQSection,
  FooterContent,
  About,
  LegalPage,
} from './types'

import { defaultLocale, type Locale } from '@/lib/i18n'

const isSanityConfigured = Boolean(projectId && dataset)

async function safeFetch<T>(
  query: string,
  params: Record<string, unknown>,
  fallback: T,
  label = 'Sanity fetch'
): Promise<T> {
  if (!isSanityConfigured) {
    return fallback
  }

  try {
    const { data } = await sanityFetch({
      query,
      params,
    })

    return data as T
  } catch (error: any) {
    if (error?.digest === 'DYNAMIC_SERVER_USAGE') {
      console.warn(`${label} hit DYNAMIC_SERVER_USAGE, falling back to static client.fetch`)
      try {
        const data = await client.fetch(query, params)
        return data as T
      } catch (fallbackError) {
        console.error(`${label} static fallback failed:`, fallbackError)
        return fallback
      }
    }
    console.error(`${label} failed:`, error)
    return fallback
  }
}

const localeParams = (locale: Locale = defaultLocale) => ({ lang: locale })

export async function getSiteSettings(locale: Locale = defaultLocale): Promise<SiteSettings | null> {
  return safeFetch(siteSettingsQuery, localeParams(locale), null)
}

export async function getHeader(locale: Locale = defaultLocale): Promise<HeaderContent | null> {
  return safeFetch(headerQuery, localeParams(locale), null)
}

export async function getHero(locale: Locale = defaultLocale): Promise<Hero | null> {
  return safeFetch(heroQuery, localeParams(locale), null)
}

export async function getManifesto(locale: Locale = defaultLocale): Promise<Manifesto | null> {
  return safeFetch(manifestoQuery, localeParams(locale), null)
}

export async function getServices(locale: Locale = defaultLocale): Promise<Service[]> {
  return safeFetch(servicesQuery, localeParams(locale), [], 'getServices')
}

export async function getServicePages(locale: Locale = defaultLocale): Promise<ServicePage[]> {
  return safeFetch(servicePagesQuery, localeParams(locale), [])
}

export async function getServicePageBySlug(slug: string, locale: Locale = defaultLocale): Promise<ServicePage | null> {
  return safeFetch(servicePageBySlugQuery, { slug, ...localeParams(locale) }, null)
}

export async function getServicesSection(locale: Locale = defaultLocale): Promise<ServicesSection | null> {
  return safeFetch(servicesSectionQuery, localeParams(locale), null)
}

export async function getBeforeAfter(locale: Locale = defaultLocale): Promise<BeforeAfter[]> {
  return safeFetch(beforeAfterQuery, localeParams(locale), [])
}

export async function getBeforeAfterSection(locale: Locale = defaultLocale): Promise<BeforeAfterSection | null> {
  return safeFetch(beforeAfterSectionQuery, localeParams(locale), null)
}

export async function getPortfolioSection(locale: Locale = defaultLocale): Promise<PortfolioSection | null> {
  return safeFetch(portfolioSectionQuery, localeParams(locale), null)
}

export async function getProjects(locale: Locale = defaultLocale): Promise<Project[]> {
  return safeFetch(projectsQuery, localeParams(locale), [])
}

export async function getProjectBySlug(slug: string, locale: Locale = defaultLocale): Promise<Project | null> {
  return safeFetch(projectBySlugQuery, { slug, ...localeParams(locale) }, null)
}

export async function getPricing(locale: Locale = defaultLocale): Promise<Pricing[]> {
  return safeFetch(pricingQuery, localeParams(locale), [])
}

export async function getPricingSection(locale: Locale = defaultLocale): Promise<PricingSection | null> {
  return safeFetch(pricingSectionQuery, localeParams(locale), null)
}

export async function getTestimonials(locale: Locale = defaultLocale): Promise<Testimonial[]> {
  return safeFetch(testimonialsQuery, localeParams(locale), [])
}

export async function getTestimonialsSection(locale: Locale = defaultLocale): Promise<TestimonialsSection | null> {
  return safeFetch(testimonialsSectionQuery, localeParams(locale), null)
}

export async function getProcessSection(locale: Locale = defaultLocale): Promise<ProcessSection | null> {
  return safeFetch(processSectionQuery, localeParams(locale), null)
}

export async function getProcess(locale: Locale = defaultLocale): Promise<Process[]> {
  return safeFetch(processQuery, localeParams(locale), [])
}

export async function getFAQ(locale: Locale = defaultLocale): Promise<FAQ[]> {
  return safeFetch(faqQuery, localeParams(locale), [])
}

export async function getFAQSection(locale: Locale = defaultLocale): Promise<FAQSection | null> {
  return safeFetch(faqSectionQuery, localeParams(locale), null)
}

export async function getFooter(locale: Locale = defaultLocale): Promise<FooterContent | null> {
  return safeFetch(footerQuery, localeParams(locale), null)
}

export async function getAbout(locale: Locale = defaultLocale): Promise<About | null> {
  return safeFetch(aboutQuery, localeParams(locale), null)
}

export async function getLegalPageBySlug(slug: string, locale: Locale = defaultLocale): Promise<LegalPage | null> {
  return safeFetch(legalPageQuery, { slug, ...localeParams(locale) }, null)
}
