// components/Auth.tsx
'use client';

import { supabase } from '@/lib/supabase';
import { useState } from 'react';

export function Auth() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      alert(error.message);
    } else {
      alert('Check your email for the login link!');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Send magic link'}
      </button>
    </form>
  );
}