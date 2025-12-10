// src/app/layout.js
import "./globals.css";

export const metadata = {
  title: "StudyMate",
  description: "Study & tuition management platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <header className="h-14 border-b bg-white flex items-center justify-between px-6">
          <a href="/" className="font-semibold text-blue-600">
            StudyMate
          </a>
          <nav className="flex items-center gap-4 text-sm">
            <a href="/signin" className="hover:underline text-blue-600">
              Sign in
            </a>
            <a href="/signup" className="hover:underline text-blue-600">
              Sign up
            </a>
          </nav>
        </header>
        <main className="p-6 max-w-5xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
