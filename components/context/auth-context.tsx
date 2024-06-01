'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createSupabaseBrowserClient } from '@/supabase/client';
import { User } from '@/types/user';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createSupabaseBrowserClient();

  const checkUser = async () => {
    setLoading(true);
    const session = await supabase.auth.getSession();
    if (session?.data.session?.user) {
      const supabaseUser = session.data.session.user as any;
      const customUser: User = {
        ...supabaseUser,
        balance: 0, // Initialize with default values or fetch from your DB
        on_links_page: false, // Initialize with default values or fetch from your DB
      };
      setUser(customUser);
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkUser();
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      checkUser();
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser: checkUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
