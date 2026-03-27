// proxy.ts (Root Directory)
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Changed from "export function middleware" to "export function proxy"
export async function proxy(request: NextRequest) {

  console.log("🚦 PROXY HIT:", request.nextUrl.pathname);
  return await updateSession(request);
}

// At the very bottom of your middleware file
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap, etc.
     * - All images in public (png, jpg, etc)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};