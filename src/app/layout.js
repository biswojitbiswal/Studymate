import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import Providers from "@/components/providers";

export const metadata = {
  title: "StudyNest",
  description: "Study & tuition management platform",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-y-scroll">
        <Providers>

          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
