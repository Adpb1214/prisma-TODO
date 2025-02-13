import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Get the pathname (e.g., /profile, /dashboard, etc.)
  const path = req.nextUrl.pathname;

  // Check if the user is logged in
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Admin pages (restrict users)
  if (path.startsWith("/admin") && token.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // User pages (restrict admins)
  if (path.startsWith("/todos") && token.role === "admin") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/todos/:path*"], // Apply middleware to admin & user pages
};
