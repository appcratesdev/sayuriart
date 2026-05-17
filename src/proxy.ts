import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n";

const SANITY_PREVIEW_HEADER = "x-sanity-presentation-preview";

function preferredLocale(request: NextRequest) {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (isLocale(cookieLocale)) return cookieLocale;

  const acceptLanguage = request.headers.get("accept-language") || "";
  const preferred = acceptLanguage
    .split(",")
    .map((part) => part.split(";")[0]?.trim().toLowerCase())
    .find((language) => language.startsWith("en") || language.startsWith("pl"));

  if (preferred?.startsWith("en")) return "en";
  return defaultLocale;
}

function isSanityPresentationPreview(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const referer = request.headers.get("referer");
  let refererUrl: URL | null = null;

  if (referer) {
    try {
      refererUrl = new URL(referer);
    } catch {
      refererUrl = null;
    }
  }

  const isSanityReferer =
    refererUrl?.hostname === "sanity.io" ||
    refererUrl?.hostname.endsWith(".sanity.io") ||
    refererUrl?.hostname.endsWith(".sanity.studio");

  return (
    searchParams.has("sanity-preview-perspective") ||
    searchParams.has("sanity-preview-secret") ||
    Boolean(
      refererUrl?.searchParams.has("sanity-preview-perspective") ||
        refererUrl?.searchParams.has("sanity-preview-secret")
    ) ||
    Boolean(isSanityReferer) ||
    request.cookies.has("sanity-preview-perspective")
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];
  const isPreview = isSanityPresentationPreview(request);

  if (!isLocale(firstSegment)) {
    const locale = preferredLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
    const response = NextResponse.redirect(url);
    response.cookies.set("NEXT_LOCALE", locale, {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  }

  const headers = new Headers(request.headers);
  headers.set("x-locale", firstSegment);
  if (isPreview) {
    headers.set(SANITY_PREVIEW_HEADER, "1");
  }

  const response = NextResponse.next({
    request: {
      headers,
    },
  });

  response.cookies.set("NEXT_LOCALE", firstSegment, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}

export const config = {
  matcher: [
    "/((?!api|studio|_next|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
