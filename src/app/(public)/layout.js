import "../globals.css";
import NavAuthActions from "@/components/auth/NavAuthActions";

export default function PublicLayout({ children }) {
  return (
    <>
      <header className="h-14 border-b bg-white flex items-center justify-between px-6">
        <a href="/" className="font-bold text-blue-600">StudyMate</a>
        <NavAuthActions />
      </header>

      <main className="p-6 max-w-5xl mx-auto">
        {children}
      </main>
    </>
  );
}
