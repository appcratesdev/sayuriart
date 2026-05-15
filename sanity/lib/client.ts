import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Set to false to bypass CDN for real-time updates when drafting
  perspective: 'published',
  stega: {
    enabled: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? true : false,
    studioUrl: '/studio',
  },
})
