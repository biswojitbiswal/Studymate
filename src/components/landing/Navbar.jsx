"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import NavAuthActions from "../auth/NavAuthActions";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";


export default function FloatingNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-6 inset-x-0 z-50 flex justify-center">
      <nav className="w-[86%] max-w-7xl">

        {/* Desktop Navbar */}
        <div className="hidden lg:flex items-center justify-between
      rounded-2xl px-6 py-3
      transition-all duration-300
      border border-blue-100
      bg-white/80 backdrop-blur-xl shadow-lg">

          <DesktopNav />
        </div>

        {/* Mobile / Tablet Navbar */}
        <div className="lg:hidden">
          <MobileNav />
        </div>

      </nav>
    </header>

  );



  function DesktopNav() {
    return (
      <>
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="StudyNest" width={130} height={40} />
        </Link>

        {/* Center Navigation */}
        <div className="flex items-center gap-6 text-gray-600">
          {["Classes", "Groups", "Tutors", "Resources", "About", "Contact"].map(
            (item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="hover:text-blue-600 transition"
              >
                {item}
              </Link>
            )
          )}
        </div>

        <NavAuthActions />
      </>
    );
  }


  function MobileNav() {
    return (
      <div className="flex items-center justify-between
      bg-white/90 backdrop-blur-xl
      border rounded-2xl px-4 py-3 shadow-md">

        {/* Logo */}
        <Link href="/">
          <Image src="/logo.png" alt="StudyNest" width={110} height={32} />
        </Link>

        <div className="flex items-center gap-3">
          <NavAuthActions />

          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="w-72">
              {/* ✅ Accessibility title (hidden visually) */}
              {/* <VisuallyHidden> */}
              {/* <SheetTitle>StudyNest Menu</SheetTitle> */}
              {/* </VisuallyHidden> */}

              <SheetTitle>
                <Link href="/">
                  <Image src="/logo.png" alt="StudyNest" width={140} height={100} />
                </Link>
              </SheetTitle>
              <MobileNavLinks />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    );
  }


  function MobileNavLinks() {
    return (
      <nav className="flex flex-col gap-4 mt-8 text-lg">
        {[
          "Classes",
          "Groups",
          "Tutors",
          "Resources",
          "About",
          "Contact",
        ].map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase()}`}
            className="hover:text-blue-600 transition"
          >
            {item}
          </Link>
        ))}
      </nav>
    );
  }

}
