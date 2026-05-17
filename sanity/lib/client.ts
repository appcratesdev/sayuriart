import { createClient } from 'next-sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9u4sqgld'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2025-05-01'
export const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'https://grafikicommerce.sanity.studio'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false to bypass CDN for real-time updates when drafting
  perspective: 'published',
  stega: {
    enabled: false,
    studioUrl,
  },
})

/**
 * Create a client configured for draft/preview mode.
 * Enables stega encoding with studioUrl so visual editing overlays
 * can create proper edit intent links back to the Studio.
 */
export function getDraftClient() {
  const token = process.env.SANITY_API_TOKEN
  if (!token) {
    throw new Error('SANITY_API_TOKEN is required for draft mode')
  }

  return client.withConfig({
    token,
    perspective: 'previewDrafts',
    useCdn: false,
    stega: {
      enabled: true,
      studioUrl,
    },
  })
}
