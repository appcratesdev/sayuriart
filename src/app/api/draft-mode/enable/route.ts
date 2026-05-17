import { client } from '../../../../../sanity/lib/client'
import { defineEnableDraftMode } from 'next-sanity/draft-mode'

const token = process.env.SANITY_API_TOKEN

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: token || '' }),
})
