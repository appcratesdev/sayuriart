import { defineLive } from 'next-sanity/live'
import { client } from './client'

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: process.env.SANITY_API_TOKEN,
  browserToken: process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN || false,
  fetchOptions: {
    revalidate: 3600,
  },
})
