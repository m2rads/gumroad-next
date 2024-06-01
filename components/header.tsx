'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from './context/auth-context';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/supabase/client';

const supabase = createSupabaseBrowserClient();

const Header = () => {
  const { user, loading, refreshUser } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    } else {
      await refreshUser();
      router.push('/');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="header">
      <a href="/"><h1 id="logo">Gumroad</h1></a>
      {!user ? (
        <p>Have an account? <Link href="/login" id="login-link" className="underline">Login</Link></p>
      ) : (
        <p id="account-navigation">
          <Link href={user.on_links_page ? "/home" : "/links"}>{user.on_links_page ? "Home" : "Your links"}</Link> &bull; 
          <span className="balance">${user.balance}</span> &bull; 
          <Link href="/settings">Settings</Link> &bull; 
          <button onClick={handleLogout} className="underline">Logout</button>
        </p>
      )}
      <ul id="navigation" className="hidden">
        <li><a href="#">Tour</a></li>
        <li><a href="#">Examples</a></li>
        <li><a href="#">Sign up</a></li>
        <li><a href="/faq">FAQ</a></li>
      </ul>
    </div>
  );
};

export default Header;
