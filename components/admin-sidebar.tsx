"use client";

import * as React from "react";
import { createClient } from "@/lib/supabase/client"; // Use your CLIENT-side supabase creator
import { useRouter } from "next/navigation";
import {
  Bus,
  LayoutDashboard,
  Users,
  Wallet,
  Settings,
  ShieldCheck,
  MapPin,
  LogOut,
  TrendingUp
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import Link from "next/link";

const navItems = [
  {
    label: "Main",
    items: [
      { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
      { title: "Revenue Tracker", url: "/admin/revenue", icon: TrendingUp },
    ],
  },
  {
    label: "Fleet & Operations",
    items: [
      { title: "Bus Management", url: "/admin/buses", icon: Bus },
      { title: "Terminals", url: "/admin/terminals", icon: MapPin },
      { title: "Verify Operators", url: "/admin/verify", icon: ShieldCheck },
    ],
  },
  {
    label: "People",
    items: [
      { title: "Scout Network", url: "/admin/scouts", icon: Wallet },
      { title: "Traveler Database", url: "/admin/users", icon: Users },
    ],
  },
];

export function AdminSidebar() {
   const router = useRouter();
  const supabase = createClient(); // Initialize the bouncer on the client side

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (!error) {
      // Refresh the page or redirect to ensure the Proxy/Middleware catches the change
      router.push("/login");
      router.refresh(); 
    }
  };
  return (
    <Sidebar collapsible="icon" className="border-r border-gray-200">
      <SidebarHeader className="h-16 flex items-center px-4 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="bg-green-600 p-1.5 rounded-lg text-white">
            <Bus size={20} />
          </div>
          <span className="group-data-[collapsible=icon]:hidden">BRILLIANT<span className="text-green-600 font-light">TOUR</span></span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {navItems.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-gray-400">
              {group.label}
            </SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url} className="flex items-center gap-3 py-6">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-100 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleSignOut} className="text-gray-500 hover:text-red-600 transition-colors">
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}