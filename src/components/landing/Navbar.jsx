"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import NavAuthActions from "../auth/NavAuthActions";
import Image from "next/image";

export default function FloatingNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-6 left-1/2 z-50 w-[86%] max-w-7xl -translate-x-1/2 ">
      <nav
        className={`
    relative flex items-center justify-between
    rounded-2xl px-6 py-3
    transition-all duration-300 ease-out
    hover:-translate-y-px hover:shadow-xl border border-blue-100
    ${scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-lg"
            : "bg-transparent shadow-md"
          }
  `}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="StudyNest Logo"
            unoptimized
            width={130}
            height={100}
            priority
          />
        </Link>

        {/* Center Navigation */}
        <div className="hidden md:flex items-center gap-6 text-md text-gray-600">
          <Link href="/classes" className="hover:text-blue-600 transition">
            Classes
          </Link>
          <Link href="/groups" className="hover:text-blue-600 transition">
            Groups
          </Link>
          <Link href="/tutors" className="hover:text-blue-600 transition">
            Tutors
          </Link>
          <Link href="/resources" className="hover:text-blue-600 transition">
            Resources
          </Link>
          <Link href="/about" className="hover:text-blue-600 transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-blue-600 transition">
            Contact
          </Link>
        </div>

        {/* Auth Actions */}
        <NavAuthActions />
      </nav>
    </header>
  );
}
