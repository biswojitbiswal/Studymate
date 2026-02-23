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
        
        {/* FULL APP SHELL */}
        <div className="h-[100dvh] flex flex-col bg-slate-50 overflow-hidden">

          {/* Top bar (never scrolls) */}
          <TopBar />

          {/* Content Area */}
          <div className="flex flex-1 overflow-hidden">

            {/* Desktop Sidebar */}
            <div className="hidden md:block">
              <Sidebar />
            </div>

            {/* SCROLLABLE CONTENT ONLY */}
            <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24">
              {children}
            </main>

          </div>

          {/* Bottom Navigation (fixed to screen) */}
          <BottomNav />

        </div>

      </TooltipProvider>
    </RequireAuth>
  );
}