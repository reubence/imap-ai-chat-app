import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const DEFAULT_LOGIN_REDIRECT = "/";
const authRoutes = ["/login", "/register"];
const apiAuthPrefix = "/api/auth";

export function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const isLoggedIn = !!getSessionCookie(req);

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)

  if (isApiAuthRoute) return NextResponse.next();

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  } else if (!isAuthRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
