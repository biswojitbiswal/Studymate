import NavAuthActions from "@/components/auth/NavAuthActions";
import Image from "next/image";
import Link from "next/link";

export default function AppNavbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white border-b px-4 lg:px-22">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.png" alt="StudyNest" width={130} height={60} />
        </Link>

        <NavAuthActions />
      </div>
    </header>
  );
}
