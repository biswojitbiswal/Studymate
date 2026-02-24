"use client";

import RequireAuth from "@/components/auth/RequireAuth";
import Sidebar from "@/components/layout/student/Sidebar";
import TopBar from "@/components/layout/student/Topbar";
import BottomNav from "@/components/layout/student/BottomBar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function StudentLayout({ children }) {
  return (
    <RequireAuth role="STUDENT">
      <TooltipProvider delayDuration={200}>
        <div className="h-dvh flex flex-col bg-slate-50 overflow-hidden">
          <TopBar />

          <div className="flex flex-1 overflow-hidden">
            <div className="hidden md:block">
              <Sidebar />
            </div>

            <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24">
              {children}
            </main>
          </div>

          <BottomNav />
        </div>
      </TooltipProvider>
    </RequireAuth>
  );
}
