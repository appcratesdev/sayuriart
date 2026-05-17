import { client } from '../../../../../sanity/lib/client'
import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { perspectiveCookieName } from '@sanity/preview-url-secret/constants'
import { cookies, draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

const token = process.env.SANITY_API_TOKEN

export async function GET(request: Request) {
  if (!token) {
    console.error('SANITY_API_TOKEN is missing')
    return new Response('Configuration Error: Missing SANITY_API_TOKEN', { status: 500 })
  }

  const { isValid, redirectTo = '/', studioPreviewPerspective } = await validatePreviewUrl(
    client.withConfig({ token }),
    request.url
  )

  if (!isValid) {
    return new Response('Invalid or expired preview secret', { status: 401 })
  }

  const draft = await draftMode()
  if (!draft.isEnabled) {
    draft.enable()
  }

  const isProduction = process.env.NODE_ENV === 'production'
  const cookieStore = await cookies()
  const bypassCookie = cookieStore.get('__prerender_bypass')

  if (bypassCookie?.value) {
    cookieStore.set({
      name: '__prerender_bypass',
      value: bypassCookie.value,
      httpOnly: true,
      path: '/',
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
    })
  }

  cookieStore.set({
    name: perspectiveCookieName,
    value: studioPreviewPerspective || 'drafts',
    httpOnly: true,
    path: '/',
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
  })

  redirect(redirectTo)
}
