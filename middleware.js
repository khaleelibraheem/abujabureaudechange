import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/about",
  "/services",
  "/faq",
  "/manifest.json", // Add manifest.json to public routes
]);

export default clerkMiddleware(async (auth, request) => {
  // Handle manifest.json specifically
  if (request.nextUrl.pathname === "/manifest.json") {
    return NextResponse.rewrite(new URL("/manifest.json", request.url));
  }

  // Handle other routes with authentication
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip)).*)",
    "/manifest.json",
    "/manifest.webmanifest",
    "/(api|trpc)(.*)",
  ],
};