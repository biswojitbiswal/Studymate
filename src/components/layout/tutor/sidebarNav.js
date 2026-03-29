import {
  Home,
  BookOpen,
  ShoppingCart,
  Folder,
 LayoutDashboard,
 ListTodo,
 MessagesSquare,
 GraduationCap,
 CalendarRange,
 AlarmClock,
 BookOpenCheck,
 Send,
 Presentation,
 Settings
} from "lucide-react";
import { PiStudentFill } from "react-icons/pi";

export const navItems = [
     {
    label: "Dashboard",
    href: "/dashboard/tutor",
    icon: LayoutDashboard,
    key: 'dashboard'
  },
  {
    label: "My Classes",
    href: "/dashboard/tutor/classes",
    icon: Presentation,
    key: 'classes'
  },
  {
    label: "My Schedule",
    href: "/dashboard/tutor/schedule/availability",
    icon: AlarmClock,
    key: 'schedule'
  },
  {
    label: "My Chats",
    href: "/dashboard/tutor/chats",
    icon: Send,
    key: 'chats'
  },
  // {
  //   label: "Settings",
  //   href: "/dashboard/tutor/settings",
  //   icon: Settings ,
  //   key: 'settings'
  // }
];


export const MobNavItems = [
  {
    label: "My Classes",
    href: "/dashboard/tutor/classes",
    icon: Presentation,
    key: 'classes'
  },
  {
    label: "My Schedule",
    href: "/dashboard/tutor/schedule/availability",
    icon: AlarmClock,
    key: 'schedule'
  },
    {
    label: "Dashboard",
    href: "/dashboard/tutor",
    icon: LayoutDashboard,
    key: 'dashboard'
  },
  {
    label: "My Chats",
    href: "/dashboard/tutor/chats",
    icon: Send,
    key: 'chats'
  },
  {
    label: "Settings",
    href: "/dashboard/tutor/settings",
    icon: Settings ,
    key: 'settings'
  }
];
