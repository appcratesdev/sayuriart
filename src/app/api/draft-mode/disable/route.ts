import { perspectiveCookieName } from '@sanity/preview-url-secret/constants'
import { cookies } from 'next/headers'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const draft = await draftMode()
  draft.disable()

  const cookieStore = await cookies()
  cookieStore.delete(perspectiveCookieName)
  
  const url = new URL(request.url)
  const redirectTo = url.searchParams.get('redirectTo') || '/'
  
  redirect(redirectTo)
}
