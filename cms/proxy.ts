import { NextResponse, type NextRequest } from "next/server";

/**
 * Optimistic check only: no session cookie -> send to login. The real authorization happens on
 * every server page (getSessionUser) and API route (requireUser), as recommended for Proxy.
 */
const PUBLIC_ADMIN = ["/admin/login", "/admin/forgot-password", "/admin/reset-password"];

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  if (PUBLIC_ADMIN.some((p) => pathname.startsWith(p))) return NextResponse.next();
  if (!req.cookies.get("pm_session")?.value) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = `?next=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
