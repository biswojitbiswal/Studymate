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
  HandCoins,
  Banknote,
  Wallet,
  Ticket,
  Star,
} from "lucide-react";
import { FaBookOpen, FaChalkboardTeacher } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa6";

export const adminNavItems = [
  {
    label: "Dashboard",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
    key: 'dashboard'
  },
  {
    label: "Academic",
    icon: Layers,
    children: [
      {
        label: "Board",
        href: "/dashboard/admin/boards",
        icon: FaBookOpen,
        key: 'boards'
      },
      {
        label: "Levels",
        href: "/dashboard/admin/levels",
        icon: FaChartBar,
        key: 'levels'
      },
      {
        label: "Languages",
        href: "/dashboard/admin/languages",
        icon: Languages,
        key: 'languages'
      },
      {
        label: "Subject",
        href: "/dashboard/admin/subjects",
        icon: NotebookPen,
        key: 'subjects'
      },
    ],
  },
  {
    label: "Pricing & Revenue",
    icon: Wallet,
    children: [
      {
        label: "Commissions",
        href: "/dashboard/admin/commissions",
        icon: HandCoins,
        key: 'commissions'
      },
      {
        label: "Taxes",
        href: "/dashboard/admin/taxes",
        icon: Banknote,
        key: 'taxes'
      },
      {
        label: "Coupons",
        href: "/dashboard/admin/coupons",
        icon: Ticket,
        key: 'coupons'
      },
    ],
  },
  {
    label: "Tutor Requests",
    href: "/dashboard/admin/tutor-requests",
    icon: UserCheck,
    key: 'tutor-requests'
  },
  {
    label: "Tutors",
    href: "/dashboard/admin/tutors",
    icon: FaChalkboardTeacher,
    key: 'tutors'
  },
  {
    label: "Students",
    href: "/dashboard/admin/students",
    icon: GraduationCap,
    key: 'students'
  },
  {
    label: "Tuition Classes",
    href: "/dashboard/admin/classes",
    icon: Presentation,
    key: 'classes'
  },
  {
    label: "My Orders",
    href: "/dashboard/admin/orders",
    icon: ShoppingCart,
    key: 'orders'
  },
  {
    label: "Rating & Reviews",
    href: "/dashboard/admin/reviews",
    icon: Star,
    key: 'reviews'
  }
];
