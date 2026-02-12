// components/Providers.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signIn: (opts: { email: string; password: string }) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function init() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!mounted) return;
      setUser(session?.user ?? null);
      setLoading(false);
    }

    init();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const signIn = async ({ email, password }: { email: string; password: string }) => {
    const result = await supabase.auth.signInWithPassword({ email, password });
    if (result.data?.user) setUser(result.data.user);
    return { error: result.error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
        {children}
      </AuthContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}