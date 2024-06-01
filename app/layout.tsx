import type { Metadata } from "next";
import Footer from "@/components/footer";
import '@/static/css/globals.css'
import '@/static/css/main.css';
import '@/static/css/app.css';
import '@/static/css/gumroad.css';
import '@/static/css/iphone.css';
import '@/static/css/reset.css';
import '@/static/css/style.css';
import '@/static/css/tipsy.css';
import Link from "next/link";
import { useAuth } from "@/components/context/auth-context";

export const metadata: Metadata = {
  title: "Gumroad",
  description: "Gumroad",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="top-bar"></div>
        <div id="loading-indicator">Loading...</div>

        <div id="wrapper">
          <div id="header">
            <a href="/"><h1 id="logo">Gumroad</h1></a>
            {!user ? (
              <p>Have an account? <Link href="/login" id="login-link" className="underline">Login</Link></p>
            ) : (
              <p id="account-navigation">
                <Link href={user.on_links_page ? "/home" : "/links"}>{user.on_links_page ? "Home" : "Your links"}</Link> &bull; 
                <span className="balance">${user.balance}</span> &bull; 
                <Link href="/settings">Settings</Link> &bull; 
                <Link href="/logout">Logout</Link>
              </p>
            )}
            <ul id="navigation" className="hidden">
              <li><a href="#">Tour</a></li>
              <li><a href="#">Examples</a></li>
              <li><a href="#">Sign up</a></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </div>
          <div className="rule"></div>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
