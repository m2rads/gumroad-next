'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
// import { getSession } from '@/app/auth-server-action/actions';
import { createSupabaseBrowserClient } from '@/supabase/client';
import { User } from '@/types/user'

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const checkUser = async () => {
      const session = await supabase.auth.getSession();
      if (session?.data.session?.user) {
        // Temporarily bypass type checking
        const supabaseUser = session.data.session.user as any;
        const customUser: User = {
          ...supabaseUser,
          balance: 0,
          on_links_page: false,
        };
        setUser(customUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
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
