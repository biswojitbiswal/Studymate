"use client";

import RequireAuth from "@/components/auth/RequireAuth";
import LogoutButton from "@/components/auth/LogoutButton";
import AdminSidebar from "@/components/layout/AdminSidebar";
import AdminTopBar from "@/components/layout/AdminTopBar";

export default function AdminLayout({ children }) {
  return (
    <RequireAuth role="ADMIN">
      <div className="h-screen flex overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Right content */}
        <div className="flex-1 flex flex-col">
          {/* Top bar */}
          <AdminTopBar />

          {/* Main content */}
          <main className="flex-1 overflow-y-auto p-6 bg-slate-50">
            {children}
          </main>
        </div>
      </div>
    </RequireAuth>
  );
}
