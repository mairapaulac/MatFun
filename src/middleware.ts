import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./actions/session";

const publicRoutes = ["/auth/signin", "/auth/signup", "/"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);

  const session = await getSession();

  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  if (session && isPublicRoute) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // public
    "/",
    "/auth/signin",
    "/auth/signup",
    
    // protected
    "/home/:path*",
    "/ranking/:path*",
    "/module/:path*",
    "/game/:path*",
  ],
};