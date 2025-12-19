import {
  Home,
  BookOpen,
  ShoppingCart,
  Folder,
 LayoutDashboard,
 ListTodo,
 MessagesSquare,
 GraduationCap
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
    icon: ListTodo,
  },
  {
    label: "My Chats",
    href: "/dashboard/tutor/chats",
    icon: MessagesSquare,
  },
  {
    label: "My Students",
    href: "/dashboard/tutor/students",
    icon: GraduationCap ,
  }
];
