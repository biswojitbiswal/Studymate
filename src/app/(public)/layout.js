import FloatingNavbar from "@/components/landing/Navbar";
import "../globals.css";
import Footer from "@/components/common/Footer";

export default function RootLayout({ children }) {
  return (
    <>
      <FloatingNavbar />

      <main>
        {children}
      </main>

      <Footer />
    </>
  );
}
