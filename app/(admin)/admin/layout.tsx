import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto">
          {/* This bar stays at the top of every admin page */}
          <header className="h-16 border-b border-gray-200 bg-white flex items-center px-6 sticky top-0 z-10">
            <SidebarTrigger className="mr-4" />
            <h1 className="font-semibold text-gray-700">Admin Control Panel</h1>
          </header>
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}