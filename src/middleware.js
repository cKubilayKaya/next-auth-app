import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const unauthenticatedProtectedRoutes = ["/profile", "/dashboard", "/settings"];
const authenticatedProtectedRoutes = ["/login", "/register"];

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  let isValidToken = false;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

      await jwtVerify(token, secret);
      isValidToken = true;
    } catch (error) {
      console.log("Token doğrulama hatası:", error);
      isValidToken = false;
    }
  }

  if (!isValidToken && unauthenticatedProtectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isValidToken && authenticatedProtectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    ...unauthenticatedProtectedRoutes.flatMap((item) => [item, `${item}/:path*`]),
    ...authenticatedProtectedRoutes.flatMap((item) => [item, `${item}/:path*`]),
  ],
};
