import NavAuthActions from "@/components/auth/NavAuthActions";
import Image from "next/image";
import Link from "next/link";

export default function AppNavbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.png" alt="StudyNest" width={120} height={40} />
        </Link>

        <NavAuthActions />
      </div>
    </header>
  );
}
