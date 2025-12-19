import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import Providers from "@/components/providers";

export const metadata = {
  title: "StudyMate",
  description: "Study & tuition management platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
