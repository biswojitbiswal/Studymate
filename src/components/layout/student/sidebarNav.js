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
    label: "Dashboard",
    href: "/dashboard/student",
    icon: LayoutDashboard,
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
  },
  {
    label: "Settings",
    href: "/dashboard/student/settings",
    icon: Settings,
  },

  // {
  //   label: "Knowledge Vault",
  //   href: "/dashboard/student/knowledge-vault",
  //   icon: BrainIcon,
  // }
];
