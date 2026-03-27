import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Sidebar from "@/components/navigation/Sidebar";
import MobileNav from "@/components/navigation/MobileNav";

export default async function TravelerLayout({
  children,
}: {
  children: ReactNode;
}) {
  // 1. SECURITY GATE: Ensure the user is logged in and is a TRAVELER
  const user = await getLoggedInUser();

  if (!user) {
    redirect("/login");
  }

  // We allow Admins to see this too for testing/support
  if (user.role !== "traveler" && user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen w-full bg-[#F8FAFC]">
      {/* DESKTOP SIDEBAR (Hidden on mobile) */}
      <Sidebar user={user} />

      <div className="flex flex-1 flex-col md:pl-64">
        {/* TOP HEADER (Search & Profile) */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white/80 px-6 backdrop-blur-md">
          <div className="md:hidden">
             <h2 className="text-xl font-bold text-blue-600">BT</h2>
          </div>
          
          <div className="flex flex-1 items-center justify-end gap-4">
            <div className="flex flex-col text-right">
              <span className="text-sm font-semibold text-gray-900">{user.full_name}</span>
              <span className="text-xs text-gray-500 uppercase tracking-wider">{user.role}</span>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-400" />
          </div>
        </header>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 pb-24 md:pb-8 overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* MOBILE BOTTOM NAVIGATION (Visible only on mobile) */}
      <MobileNav />
    </div>
  );
}