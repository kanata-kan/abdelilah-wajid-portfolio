import { NextResponse, type NextRequest } from "next/server";
import { isLocale } from "./lib/i18n/locales";

// Validate before the static-file lookup: Windows can otherwise serve /en at /EN.
const assets = new Set([
  "/favicon.svg",
  "/favicon.ico",
  "/apple-touch-icon.png",
  "/brand/aw-primary-color.svg",
  "/robots.txt",
  "/sitemap.xml",
]);
const assetPrefixes = ["/_next/", "/images/"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    pathname === "/" ||
    assetPrefixes.some((prefix) => pathname.startsWith(prefix)) ||
    assets.has(pathname) ||
    isLocale(pathname.split("/")[1])
  ) {
    return NextResponse.next();
  }
  return new NextResponse("404 — Page not found / الصفحة غير موجودة", {
    status: 404,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
