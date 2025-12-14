import {
  Home,
  BookOpen,
  ShoppingCart,
  Folder,
  Users,
  Layers,
} from "lucide-react";

export const adminNavItems = [
  {
    label: "Dashboard",
    href: "/dashboard/admin",
    icon: Home,
  },
  {
    label: "Master",
    icon: Layers,
    children: [
      {
        label: "Board",
        href: "/dashboard/admin/boards",
        icon: BookOpen,
      },
      {
        label: "My Orders",
        href: "/dashboard/admin/orders",
        icon: ShoppingCart,
      },
      {
        label: "My Resources",
        href: "/dashboard/admin/resources",
        icon: Folder,
      },
      {
        label: "My Classes",
        href: "/dashboard/admin/classes",
        icon: Users,
      },
    ],
  },

  {
    label: "My Courses",
    href: "/dashboard/admin/courses",
    icon: BookOpen,
  },
  {
    label: "My Orders",
    href: "/dashboard/admin/orders",
    icon: ShoppingCart,
  },
  {
    label: "My Resources",
    href: "/dashboard/admin/resources",
    icon: Folder,
  }
];
