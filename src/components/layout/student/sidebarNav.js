import {
  Home,
  BookOpen,
  ShoppingCart,
  Folder,
 LayoutDashboard,
 ListTodo,
 MessagesSquare,
 School
} from "lucide-react";

export const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard/student",
    icon: LayoutDashboard,
  },

  {
    label: "My Task",
    href: "/dashboard/student/tasks",
    icon: ListTodo,
  },
  {
    label: "My Chats",
    href: "/dashboard/student/chats",
    icon: MessagesSquare,
  },
  {
    label: "My Classes",
    href: "/dashboard/student/classes",
    icon: School,
  }
];
