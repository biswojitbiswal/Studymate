'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const tabs = [
  { label: 'Availability', href: '/dashboard/tutor/schedule/availability' },
  { label: 'Time Off', href: '/dashboard/tutor/schedule/time-off' },
  { label: 'Leave', href: '/dashboard/tutor/schedule/leave' },
];

export default function ScheduleLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          My Schedule
        </h1>
        <p className="text-sm text-gray-500">
          Manage your availability, time-off and leave
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex gap-6">
          {tabs.map((tab) => {
            const active = pathname === tab.href;

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={clsx(
                  'pb-1 px-4 text-sm font-semibold transition-colors',
                  active
                    ? 'border-b-2 border-blue-600 px-3 text-blue-600'
                    : 'text-gray-500 hover:text-blue-600',
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Page Content */}
      <div>{children}</div>
    </div>
  );
}
