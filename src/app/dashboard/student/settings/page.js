'use client';
import { ChevronRight, Icon, Wallet } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import SettingItem from "./SettingItem";
import Link from "next/link";
import { useNotificationPreference, useUpdateNotificationPreference } from "@/services/public/useNotificationPreference";

export default function SettingsPage() {
  const { data: pref, isLoading } = useNotificationPreference();
  const { mutate: updatePref } = useUpdateNotificationPreference();
  
  return (
    <div className="max-w-2xl mx-auto p-1 pb-24">
      {/* ACCOUNT */}
      <SettingSection title="Account">
        <Link href="/profile">
          <SettingItem
            title="Profile Information"
            action={<ChevronRight size={18} />}
          />
        </Link>

        <Link href="/change-password">
          <SettingItem
            title="Change Password"
            action={<ChevronRight size={18} />}
          />
        </Link>

        <Link href="/dashboard/student/billings">
          <SettingItem
            title="Billings & Purchased"
            action={<ChevronRight size={18} />}
          />
        </Link>
      </SettingSection>

      {/* NOTIFICATIONS */}
      <SettingSection title="Notifications">
        <SettingItem
          title="Email Notifications"
          action={
            <Switch
              checked={pref?.emailEnabled || false}
              disabled={isLoading}
              onCheckedChange={(val) =>
                updatePref({ emailEnabled: val })
              }
            />
          }
        />

        <SettingItem
          title="In-App Notifications"
          action={
            <Switch
              checked={pref?.inAppEnabled || false}
              disabled={isLoading}
              onCheckedChange={(val) =>
                updatePref({ inAppEnabled: val })
              }
            />
          }
        />

        <SettingItem
          title="SMS Notifications"
          action={
            <Switch
              checked={pref?.smsEnabled || false}
              disabled={isLoading}
              onCheckedChange={(val) =>
                updatePref({ smsEnabled: val })
              }
            />
          }
        />

        <SettingItem
          title="Push Notifications"
          action={
            <Switch
              checked={pref?.pushEnabled || false}
              disabled={isLoading}
              onCheckedChange={(val) =>
                updatePref({ pushEnabled: val })
              }
            />
          }
        />
      </SettingSection>

      {/* SUPPORT */}
      <SettingSection title="Support & About">
        <Link href="/help-center">
          <SettingItem
            title="Help Center"
            action={<ChevronRight size={18} />}
          />
        </Link>

        <Link href="/privacy-policy">
          <SettingItem
            title="Privacy Policy"
            action={<ChevronRight size={18} />}
          />
        </Link>
      </SettingSection>

    </div >
  );
}


function SettingSection({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="px-1 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {title}
      </h3>

      <div className="bg-white rounded-xl border divide-y">
        {children}
      </div>
    </div>
  );
}