// proxy.ts (Root Directory)
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Changed from "export function middleware" to "export function proxy"
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};