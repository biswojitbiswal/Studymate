import { ChevronRight, Icon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import SettingItem from "./SettingItem";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto p-1 pb-24">
      {/* ACCOUNT */}
      <SettingSection title="Account">
        <SettingItem
          title="Profile Information"
          action={<ChevronRight size={18} />}
        />
        <SettingItem
          title="Change Password"
          action={<ChevronRight size={18} />}
        />
      </SettingSection>

      {/* NOTIFICATIONS */}
      <SettingSection title="Notifications">
        <SettingItem
          title="Class Reminders"
          action={<Switch defaultChecked />}
        />
        <SettingItem
          title="Assignments"
          action={<Switch defaultChecked />}
        />
        <SettingItem
          title="Messages"
          action={<Switch />}
        />
      </SettingSection>

      {/* SUPPORT */}
      <SettingSection title="Support & About">
        <SettingItem
          title="Help Center"
          action={<ChevronRight size={18} />}
        />
        <SettingItem
          title="Privacy Policy"
          action={<ChevronRight size={18} />}
        />
      </SettingSection>

    </div>
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