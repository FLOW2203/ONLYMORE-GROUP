import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "./lib/i18n";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip for static files, api routes, etc.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Detect locale from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language") || "";
  const preferredLocale = acceptLanguage
    .split(",")
    .map((lang) => lang.split(";")[0].trim().substring(0, 2).toLowerCase())
    .find((lang) => locales.includes(lang as (typeof locales)[number]));

  const locale = preferredLocale || defaultLocale;

  // Redirect to the locale-prefixed URL
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|favicon\\.ico|logo\\.svg|og-image\\.png|.*\\.(?:svg|png|jpg|jpeg|gif|ico|webp|css|js|woff|woff2|ttf)).*)"],
};
