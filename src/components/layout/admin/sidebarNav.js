import {
  Home,
  BookOpen,
  ShoppingCart,
  Folder,
  Users,
  Layers,
  Presentation,
  GraduationCap,
  Languages,
  NotebookPen,
  UserCheck,
  LayoutDashboard,
} from "lucide-react";
import { FaBookOpen, FaChalkboardTeacher } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa6";

export const adminNavItems = [
  {
    label: "Dashboard",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Master",
    icon: Layers,
    children: [
      {
        label: "Board",
        href: "/dashboard/admin/boards",
        icon: FaBookOpen,
      },
      {
        label: "Levels",
        href: "/dashboard/admin/levels",
        icon: FaChartBar,
      },
      {
        label: "Languages",
        href: "/dashboard/admin/languages",
        icon: Languages,
      },
      {
        label: "Subject",
        href: "/dashboard/admin/subjects",
        icon: NotebookPen,
      },
    ],
  },
  {
    label: "Tutor Requests",
    href: "/dashboard/admin/tutor-requests",
    icon: UserCheck,
  },
  {
    label: "Tutors",
    href: "/dashboard/admin/tutors",
    icon: FaChalkboardTeacher,
  },
{
    label: "Students",
    href: "/dashboard/admin/students",
    icon: GraduationCap,
  },
  {
    label: "Tuition Classes",
    href: "/dashboard/admin/classes",
    icon: Presentation,
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
