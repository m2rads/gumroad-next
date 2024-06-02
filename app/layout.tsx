'use client'
import type { Metadata } from "next";
import Footer from "@/components/footer";
import Header from "@/components/header";
import '@/static/css/global.css';
import '@/static/css/main.css';
import '@/static/css/app.css';
import '@/static/css/gumroad.css';
import '@/static/css/iphone.css';
import '@/static/css/reset.css';
import '@/static/css/style.css';
import '@/static/css/tipsy.css';
import { AuthProvider } from "@/components/context/auth-context";
import { usePathname } from 'next/navigation';

// export const metadata: Metadata = {
//   title: "Gumroad",
//   description: "Gumroad",
// };

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const hideHeaderFooter = pathname.startsWith('/view/');

  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <div className="top-bar"></div>
          <div id="loading-indicator">Loading...</div>
          <div id="wrapper">
            {!hideHeaderFooter && 
            <>
              <Header />
              <div className="rule"></div>
            </>
            }
            {children}
          </div>
          {!hideHeaderFooter && <Footer />}
        </body>
      </html>
    </AuthProvider>
  );
}
