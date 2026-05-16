import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { client } from '../../../../../sanity/lib/client'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

const token = process.env.SANITY_API_TOKEN

export async function GET(request: Request) {
  console.log('Draft mode enable called with URL:', request.url)
  
  if (!token) {
    console.error('SANITY_API_TOKEN is missing!')
    return new Response('Configuration Error: Missing token', { status: 500 })
  }

  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    client.withConfig({ token }),
    request.url
  )

  console.log('validatePreviewUrl result:', { isValid, redirectTo })

  if (!isValid) {
    return new Response('Invalid secret', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()
  console.log('Draft mode enabled successfully, redirecting to:', redirectTo)

  redirect(redirectTo)
}
