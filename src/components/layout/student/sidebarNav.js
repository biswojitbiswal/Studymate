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
  BrainIcon,
  Wallet,
  Send,
  Settings,
  Compass
} from "lucide-react";

export const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard/student",
    icon: LayoutDashboard,
    key: "dashboard",
  },
  {
    label: "My Task",
    href: "/dashboard/student/tasks/my",
    icon: ListTodo,
    key: "tasks",
  },
  {
    label: "My Learning",
    href: "/dashboard/student/learning",
    icon: Presentation,
    key: "learning",
  },

  // {
  //   label: "Explore",
  //   href: "/classes",
  //   icon: Compass,
  // },
  {
    label: "My Chats",
    href: "/dashboard/student/chats",
    icon: Send,
    key: "chats",
  },
  {
    label: "Billings",
    href: "/dashboard/student/billings",
    icon: Wallet,
    key: "billings",
  },

  // {
  //   label: "Knowledge Vault",
  //   href: "/dashboard/student/knowledge-vault",
  //   icon: BrainIcon,
  // }
];


export const mobNavItems = [
  {
    label: "My Task",
    href: "/dashboard/student/tasks/my",
    icon: ListTodo,
    key: "tasks",
  },
  {
    label: "My Learning",
    href: "/dashboard/student/learning",
    icon: Presentation,
    key: "learning",
  },
  {
    label: "Dashboard",
    href: "/dashboard/student",
    icon: LayoutDashboard,
    key: "dashboard",
  },
  {
    label: "My Chats",
    href: "/dashboard/student/chats",
    icon: Send,
    key: "chats",
  },
  {
    label: "Settings",
    href: "/dashboard/student/settings",
    icon: Settings,
    key: "settings",
  },
];