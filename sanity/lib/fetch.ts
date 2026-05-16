import { client } from './client'
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
  processQuery,
  faqQuery,
  aboutQuery,
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
  Process,
  FAQ,
  About,
} from './types'

// Revalidate every hour
const revalidate = 3600

import { draftMode } from 'next/headers'

const isSanityConfigured = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)

async function safeFetch<T>(
  query: string,
  params: Record<string, unknown>,
  fallback: T
): Promise<T> {
  if (!isSanityConfigured) {
    return fallback
  }

  let isDraftMode = false
  try {
    const draft = await draftMode()
    isDraftMode = draft.isEnabled
  } catch (error) {
    // Ignore errors when draftMode is called outside of request context
  }

  try {
    if (isDraftMode) {
      const draftClient = client.withConfig({
        perspective: 'previewDrafts',
        useCdn: false,
        stega: true,
      })
      return await draftClient.fetch<T>(query, params, {
        next: { revalidate: 0 },
      })
    }
    return await client.fetch<T>(query, params, { next: { revalidate } })
  } catch (error) {
    console.error('Sanity fetch failed:', error)
    return fallback
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return safeFetch(siteSettingsQuery, {}, null)
}

export async function getHero(): Promise<Hero | null> {
  return safeFetch(heroQuery, {}, null)
}

export async function getManifesto(): Promise<Manifesto | null> {
  return safeFetch(manifestoQuery, {}, null)
}

export async function getServices(): Promise<Service[]> {
  return safeFetch(servicesQuery, {}, [])
}

export async function getBeforeAfter(): Promise<BeforeAfter[]> {
  return safeFetch(beforeAfterQuery, {}, [])
}

export async function getPortfolioSection(): Promise<PortfolioSection | null> {
  return safeFetch(portfolioSectionQuery, {}, null)
}

export async function getProjects(): Promise<Project[]> {
  return safeFetch(projectsQuery, {}, [])
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return safeFetch(projectBySlugQuery, { slug }, null)
}

export async function getPricing(): Promise<Pricing[]> {
  return safeFetch(pricingQuery, {}, [])
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return safeFetch(testimonialsQuery, {}, [])
}

export async function getProcess(): Promise<Process[]> {
  return safeFetch(processQuery, {}, [])
}

export async function getFAQ(): Promise<FAQ[]> {
  return safeFetch(faqQuery, {}, [])
}

export async function getAbout(): Promise<About | null> {
  return safeFetch(aboutQuery, {}, null)
}
