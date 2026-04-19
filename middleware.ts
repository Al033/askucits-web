import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Soft site-wide password gate. Enabled whenever BASIC_AUTH_USER and
// BASIC_AUTH_PASSWORD are set in the Vercel environment; unset either and
// the middleware short-circuits (useful for local dev).
//
// Not a substitute for proper auth — this is deliberate: the site is a
// pre-launch preview, and we want to keep strangers out while we harden
// data, run issuer outreach, and get CCO sign-off. Strip this middleware
// before public launch.

const REALM = "AskUcits (preview)";

export function middleware(request: NextRequest) {
  const expectedUser = process.env.BASIC_AUTH_USER;
  const expectedPassword = process.env.BASIC_AUTH_PASSWORD;

  if (!expectedUser || !expectedPassword) {
    return NextResponse.next();
  }

  const header = request.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    const decoded = atob(header.slice("Basic ".length));
    const sep = decoded.indexOf(":");
    if (sep !== -1) {
      const user = decoded.slice(0, sep);
      const password = decoded.slice(sep + 1);
      if (user === expectedUser && password === expectedPassword) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"` },
  });
}

export const config = {
  // Run on every page + API route, but skip Next internals and static assets
  // so the 401 never blocks images / JS chunks / health probes.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.webp|.*\\.ico).*)",
  ],
};
