"use client";

import React, { useState } from 'react';
import { useAuth } from '@/components/Providers';

export function SignIn() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await signIn({ email, password });
    setLoading(false);
    if (res.error) setError(res.error.message || String(res.error));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <form onSubmit={onSubmit} className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Sign in</h2>
        {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
        <label className="block mb-2">
          <span className="text-sm">Email</span>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full mt-1 px-3 py-2 border rounded" />
        </label>
        <label className="block mb-4">
          <span className="text-sm">Password</span>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full mt-1 px-3 py-2 border rounded" />
        </label>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}

export function SignOutButton() {
  const { signOut } = useAuth();
  return (
    <button onClick={() => signOut()} className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
      Sign out
    </button>
  );
}
