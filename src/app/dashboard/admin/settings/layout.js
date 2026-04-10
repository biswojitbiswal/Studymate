"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Profile", path: "/dashboard/admin/settings/profile" },
  { label: "Change Password", path: "/dashboard/admin/settings/change-password" },
  { label: "Notifications", path: "/dashboard/admin/settings/notifications" },
];

export default function SettingsLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-2">Settings</h1>

      {/* Tabs */}
      <div className="flex gap-8 border-b mb-2">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;

          return (
            <Link
              key={tab.path}
              href={tab.path}
              className={`py-2 text-sm font-medium border-b-2 transition ${
                isActive
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-black"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Tab Content */}
      <div>{children}</div>
    </div>
  );
}