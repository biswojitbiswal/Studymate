import {
  Home,
  BookOpen,
  ShoppingCart,
  Folder,
  LayoutDashboard,
  ListTodo,
  MessagesSquare,
  School,
  Presentation,
  Brain,
  BrainIcon
} from "lucide-react";

export const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard/student",
    icon: LayoutDashboard,
  },
  {
    label: "My Task",
    href: "/dashboard/student/tasks/my",
    icon: ListTodo,
  },
  {
    label: "My Learning",
    href: "/dashboard/student/learning",
    icon: Presentation,
  },
  {
    label: "Billing & Purchases",
    href: "/dashboard/student/purchases",
    icon: Presentation,
  },
  {
    label: "My Chats",
    href: "/dashboard/student/chats",
    icon: MessagesSquare,
  },
  {
    label: "Knowledge Vault",
    href: "/dashboard/student/knowledge-vault",
    icon: BrainIcon,
  }
];
