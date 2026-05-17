import { defineLive } from 'next-sanity/live'
import { client, getSanityReadToken } from './client'

const sanityReadToken = getSanityReadToken()

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: sanityReadToken,
  browserToken: sanityReadToken || false,
  fetchOptions: {
    revalidate: 3600,
  },
})
