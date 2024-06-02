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
      const supabaseUser = session.data.session.user;
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      const customUser: User = {
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        balance: profile?.balance ?? 0,
        number_of_links: profile?.number_of_links ?? 0,
        reset_hash: profile?.reset_hash ?? '',
        on_links_page: false,
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
  }, [checkUser, supabase.auth]);

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
