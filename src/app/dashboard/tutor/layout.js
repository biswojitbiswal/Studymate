"use client";

import RequireAuth from "@/components/auth/RequireAuth";
import BottomNav from "@/components/layout/tutor/BottomBar";
import Sidebar from "@/components/layout/tutor/Sidebar";
import TopBar from "@/components/layout/tutor/Topbar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function TutorLayout({ children }) {
  return (
    <RequireAuth role="TUTOR">
      <TooltipProvider delayDuration={200}>
      <div className="h-screen flex flex-col overflow-hidden bg-slate-50">
        {/* Top bar */}
        <TopBar />

        <div className="flex flex-1 h-full overflow-hidden">
          {/* Desktop Sidebar */}
          <div className="hidden md:block">
            <Sidebar />
          </div>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {children}
          </main>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden">
          <BottomNav />
        </div>
      </div>
      </TooltipProvider>
    </RequireAuth>
  );
}
