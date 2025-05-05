import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// Correct public routes based on your folder structure
const publicRoutes = [
  "/",
  "/pages/login",
  "/pages/register",
  "pages/otp-verification",
];

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|api/auth).*)"],
};

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isLoggedIn = !!token;
  const currentPath = req.nextUrl.pathname;
  const isOnPublicPage = publicRoutes.includes(currentPath);

  if (!isLoggedIn && !isOnPublicPage) {
    return NextResponse.redirect(new URL("/pages/login", req.url));
  }

  if (isLoggedIn && isOnPublicPage && currentPath !== "/") {
    return NextResponse.redirect(new URL("/pages/dashboard", req.url));
  }

  return NextResponse.next();
}
