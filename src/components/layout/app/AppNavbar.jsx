import NavAuthActions from "@/components/auth/NavAuthActions";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";


export default function AppNavbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white border-b">
      <nav className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/">
          <Image src="/Logo.png" alt="StudyNest" width={120} height={40} />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 text-gray-600">
          <NavLinks pathname={pathname} />
        </div>

        {/* Right Actions */}
        <div className="hidden lg:block">
          <NavAuthActions />
        </div>

        {/* Mobile Navbar */}
        <div className="lg:hidden flex items-center gap-3">
          <NavAuthActions />
          <MobileMenu pathname={pathname} />
        </div>
      </nav>
    </header>
  );
}


/* ---------------- Nav Links ---------------- */
function NavLinks({ pathname, onClick }) {
  return (
    <>
      {["Classes", "Groups", "Tutors", "Resources", "About", "Contact"].map(
        (item) => {
          const href = `/${item.toLowerCase()}`;
          const isActive = pathname === href;

          return (
            <Link
              key={item}
              href={href}
              onClick={onClick}
              className={`transition ${
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {item}
            </Link>
          );
        }
      )}
    </>
  );
}


/* ---------------- Mobile Menu ---------------- */
function MobileMenu({ pathname }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-72">
        <SheetTitle>
          <Link href="/" onClick={() => setOpen(false)}>
            <Image src="/Logo.png" alt="StudyNest" width={130} height={50} />
          </Link>
        </SheetTitle>

        <nav className="flex flex-col gap-5 mt-8 text-lg">
          <NavLinks pathname={pathname} onClick={() => setOpen(false)} />
        </nav>
      </SheetContent>
    </Sheet>
  );
}