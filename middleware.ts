import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Protect dashboard and other authenticated routes
    "/dashboard/:path*",
    // Protect API routes
    "/(api|trpc)(.*)",
    // Exclude static files, Next.js internals, and authentication routes
    "/((?!_next/static|_next/image|favicon.ico|sign-in|sign-up).*)",
  ],
};
