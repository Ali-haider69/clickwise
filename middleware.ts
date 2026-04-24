import { NextResponse, type NextRequest } from "next/server";

/** Legacy slug → canonical slug (must match next.config.ts redirects). */
const SLUG_REDIRECTS: Record<string, string> = {
  "/blog/how-to-get-ai-clients-24-hours-no-experience": "/blog/how-to-get-ai-clients",
  "/blog/how-to-get-ai-clients-fast": "/blog/how-to-get-ai-clients",
  "/blog/how-to-start-ai-automation-agency-2026": "/blog/ai-automation-agency",
};

/**
 * Normalize URLs so crawlers see one preferred host + path shape (reduces duplicate URLs).
 * All normalization happens in a single redirect to avoid redirect chains.
 */
export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const host = request.headers.get("host") ?? "";

  // 1. Redirect www. to non-www.
  if (host.startsWith("www.")) {
    url.hostname = host.replace(/^www\./, "");
  }

  // 2. Normalize trailing slashes (Next.js default is no trailing slash)
  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.replace(/\/+$/, "") || "/";
  }

  // 3. Resolve legacy slugs so the chain collapses into one hop
  const canonical = SLUG_REDIRECTS[url.pathname];
  if (canonical) {
    url.pathname = canonical;
  }

  // Single redirect for all normalizations
  if (url.toString() !== request.url) {
    return NextResponse.redirect(url.toString(), 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:ico|png|jpg|jpeg|gif|webp|svg|txt|xml|json)$).*)"],
};
