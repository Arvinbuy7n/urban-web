// Basic Auth gate for /admin/*.
// Anything under /admin requires ADMIN_USER / ADMIN_PASS env credentials.

import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/admin/:path*"],
};

export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASS;

  if (!user || !pass) {
    return new NextResponse(
      "Admin is not configured. Set ADMIN_USER and ADMIN_PASS.",
      { status: 503 }
    );
  }

  const header = req.headers.get("authorization");
  const isValid = (() => {
    if (!header?.startsWith("Basic ")) return false;
    const decoded = atob(header.slice(6));
    const idx = decoded.indexOf(":");
    const u = decoded.slice(0, idx);
    const p = decoded.slice(idx + 1);
    return u === user && p === pass;
  })();

  // Logout flow is a two-step dance because Basic Auth has no server-side
  // logout. State is tracked in the `uu_loggedout` cookie.
  //   step 1 (no cookie): reply 401 with a fresh realm so the browser
  //                       discards its cached credentials, then sets cookie.
  //   step 2 (cookie set, browser re-prompts + retries): accept the new
  //                       credentials and redirect back to /admin, clearing
  //                       the cookie.
  if (req.nextUrl.pathname === "/admin/logout") {
    const alreadyLoggedOut = req.cookies.get("uu_loggedout")?.value === "1";
    if (!alreadyLoggedOut) {
      const res = new NextResponse("Signed out.", {
        status: 401,
        headers: {
          "WWW-Authenticate": `Basic realm="Urban Uniform Admin (signed out ${Date.now()})", charset="UTF-8"`,
          "Cache-Control": "no-store",
        },
      });
      res.cookies.set("uu_loggedout", "1", {
        path: "/admin",
        maxAge: 60,
        sameSite: "lax",
      });
      return res;
    }
    if (isValid) {
      const redirect = NextResponse.redirect(new URL("/admin", req.url));
      redirect.cookies.delete({ name: "uu_loggedout", path: "/admin" });
      return redirect;
    }
    return new NextResponse("Authentication required.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Urban Uniform Admin", charset="UTF-8"',
        "Cache-Control": "no-store",
      },
    });
  }

  if (isValid) return NextResponse.next();

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Urban Uniform Admin", charset="UTF-8"',
    },
  });
}
