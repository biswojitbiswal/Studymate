"use client";

import RequireAuth from "@/components/auth/RequireAuth";
import BottomNav from "@/components/layout/tutor/BottomBar";
import Sidebar from "@/components/layout/tutor/Sidebar";
import TopBar from "@/components/layout/tutor/Topbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";

export default function TutorLayout({ children }) {
  const pathname = usePathname();

  // ✅ detect chat route
  const isChatPage = pathname.includes("/chats");
  return (
    <RequireAuth role="TUTOR">
      <TooltipProvider delayDuration={200}>
        <div className="h-dvh flex flex-col bg-slate-50 overflow-hidden">

          <TopBar />

          <div className="flex flex-1 overflow-hidden">

            <div className="hidden md:block">
              <Sidebar />
            </div>

            <main
              className={`flex-1 overflow-auto ${isChatPage ? "" : "p-4 md:p-6 pb-24"
                }`}
            >
              {children}
            </main>


          </div>

          <BottomNav />

        </div>
      </TooltipProvider>
    </RequireAuth>
  );
}