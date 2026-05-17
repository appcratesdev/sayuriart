import { dataset, projectId } from './client'
import { sanityFetch } from './live'
import {
  siteSettingsQuery,
  heroQuery,
  manifestoQuery,
  servicesQuery,
  beforeAfterQuery,
  portfolioSectionQuery,
  projectsQuery,
  projectBySlugQuery,
  pricingQuery,
  testimonialsQuery,
  processSectionQuery,
  processQuery,
  faqQuery,
  aboutQuery,
  legalPageQuery,
} from './queries'
import type {
  SiteSettings,
  Hero,
  Manifesto,
  Service,
  BeforeAfter,
  PortfolioSection,
  Project,
  Pricing,
  Testimonial,
  ProcessSection,
  Process,
  FAQ,
  About,
  LegalPage,
} from './types'

import { defaultLocale, type Locale } from '@/lib/i18n'
import { isSanityPreviewRequest } from './preview'

const isSanityConfigured = Boolean(projectId && dataset)

async function safeFetch<T>(
  query: string,
  params: Record<string, unknown>,
  fallback: T
): Promise<T> {
  if (!isSanityConfigured) {
    return fallback
  }

  let isPreview = false
  try {
    isPreview = await isSanityPreviewRequest()
  } catch {
    // Ignore errors when preview checks run outside of request context
  }

  try {
    const { data } = await sanityFetch({
      query,
      params,
      perspective: isPreview ? undefined : 'published',
      stega: isPreview ? undefined : false,
      tags: ['sanity'],
    })

    return data as T
  } catch (error) {
    console.error('Sanity fetch failed:', error)
    return fallback
  }
}

const localeParams = (locale: Locale = defaultLocale) => ({ lang: locale })

export async function getSiteSettings(locale: Locale = defaultLocale): Promise<SiteSettings | null> {
  return safeFetch(siteSettingsQuery, localeParams(locale), null)
}

export async function getHero(locale: Locale = defaultLocale): Promise<Hero | null> {
  return safeFetch(heroQuery, localeParams(locale), null)
}

export async function getManifesto(locale: Locale = defaultLocale): Promise<Manifesto | null> {
  return safeFetch(manifestoQuery, localeParams(locale), null)
}

export async function getServices(locale: Locale = defaultLocale): Promise<Service[]> {
  return safeFetch(servicesQuery, localeParams(locale), [])
}

export async function getBeforeAfter(locale: Locale = defaultLocale): Promise<BeforeAfter[]> {
  return safeFetch(beforeAfterQuery, localeParams(locale), [])
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

export async function getTestimonials(locale: Locale = defaultLocale): Promise<Testimonial[]> {
  return safeFetch(testimonialsQuery, localeParams(locale), [])
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

export async function getAbout(locale: Locale = defaultLocale): Promise<About | null> {
  return safeFetch(aboutQuery, localeParams(locale), null)
}

export async function getLegalPageBySlug(slug: string, locale: Locale = defaultLocale): Promise<LegalPage | null> {
  return safeFetch(legalPageQuery, { slug, ...localeParams(locale) }, null)
}
