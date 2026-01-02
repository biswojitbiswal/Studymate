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
 Send
} from "lucide-react";
import { PiStudentFill } from "react-icons/pi";

export const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard/tutor",
    icon: LayoutDashboard,
  },

  {
    label: "My Classes",
    href: "/dashboard/tutor/classes",
    icon: BookOpenCheck,
  },
  {
    label: "My Schedule",
    href: "/dashboard/tutor/Schedule",
    icon: AlarmClock,
  },
  {
    label: "My Chats",
    href: "/dashboard/tutor/chats",
    icon: Send,
  },
  {
    label: "My Students",
    href: "/dashboard/tutor/students",
    icon: GraduationCap ,
  }
];
