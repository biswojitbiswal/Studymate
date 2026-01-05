import FloatingNavbar from "@/components/landing/Navbar";
import "../globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-white antialiased">
        
        {/* Global Floating Navbar */}
        <FloatingNavbar />

        {/* Push content below fixed navbar */}
        <main>
          {children}
        </main>

      </body>
    </html>
  );
}
