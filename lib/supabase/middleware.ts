import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const updateSession = async (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
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

  const path = request.nextUrl.pathname;

  // 1. Define exactly what we are protecting
  const isPathAdmin = path.startsWith('/admin');
  const isPathTraveler = path.startsWith('/dashboard/traveler');

  // 2. Early Exit: If it's a public page, don't waste time on DB calls
  if (!isPathAdmin && !isPathTraveler) {
    return supabaseResponse;
  }

  // 3. Authenticate User
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 4. Get the Role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

 // ... (After you fetch the profile from Supabase) ...

const userRole = profile?.role?.toLowerCase(); 

// 🕵️ DEBUG LOG: Watch your terminal for this line!
console.log(`Checking Access: Path [${path}] | User Role [${userRole}]`);

// 1. ADMIN PROTECTION (If it works, don't touch it)
if (isPathAdmin && userRole !== 'admin') {
  return NextResponse.redirect(new URL('/', request.url));
}

// 2. TRAVELER PROTECTION (The "No-Fail" Logic)
if (path.startsWith('/dashboard/traveler')) {
  
  // Safety Net: If the user is an ADMIN, let them in anyway
  if (userRole === 'admin') return supabaseResponse;

  // Safety Net: If the user is NOT a traveler, kick them out
  if (userRole !== 'traveler') {
    console.log("🚫 ACCESS DENIED: User is not a traveler. Sending to Home.");
    return NextResponse.redirect(new URL('/', request.url));
  }
}

// 3. SUCCESS: If they passed the tests, let them through
return supabaseResponse;}