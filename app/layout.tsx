import type { Metadata } from "next";
import Footer from "@/components/footer";
import Header from "@/components/header"; // Import the Header component
import '@/static/css/globals.css';
import '@/static/css/main.css';
import '@/static/css/app.css';
import '@/static/css/gumroad.css';
import '@/static/css/iphone.css';
import '@/static/css/reset.css';
import '@/static/css/style.css';
import '@/static/css/tipsy.css';
import { AuthProvider } from "@/components/context/auth-context";

export const metadata: Metadata = {
  title: "Gumroad",
  description: "Gumroad",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <div className="top-bar"></div>
          <div id="loading-indicator">Loading...</div>
          <div id="wrapper">
            <Header />
            <div className="rule"></div>
            {children}
          </div>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
