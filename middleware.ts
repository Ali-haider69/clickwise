import { NextResponse, type NextRequest } from "next/server";

/**
 * Normalize URLs so crawlers see one preferred host + path shape (reduces duplicate URLs).
 * Host-level www/http should also be set in your hosting (e.g. Vercel) — this is a safety net.
 */
export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const host = request.headers.get("host") ?? "";

  if (host.startsWith("www.")) {
    url.hostname = host.replace(/^www\./, "");
    return NextResponse.redirect(url.toString(), 308);
  }

  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.replace(/\/+$/, "") || "/";
    return NextResponse.redirect(url.toString(), 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:ico|png|jpg|jpeg|gif|webp|svg|txt|xml|json)$).*)"],
};
