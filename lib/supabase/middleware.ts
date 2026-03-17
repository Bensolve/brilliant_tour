import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const updateSession = async (request: NextRequest) => {
  // 1. Create the initial response
  let supabaseResponse = NextResponse.next({
    request: { headers: request.headers },
  });

  // 2. Initialize the Supabase Client
  const supabase = createServerClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 3. GET THE USER (Must be after initialization)
  const { data: { user } } = await supabase.auth.getUser();

  // 4. PROTECT THE /ADMIN ROUTE
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Check if logged in
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Check if role is ADMIN
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return supabaseResponse;
};