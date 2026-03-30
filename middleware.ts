import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";

  if (host === "clickwise-pi.vercel.app") {
    const url = request.nextUrl.clone();
    url.host = "clickwise.website";
    url.protocol = "https:";
    url.port = "";
    return NextResponse.redirect(url, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
