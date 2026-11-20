'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await signIn.email({
        email,
        password,
        rememberMe,
      });

      if (res.error) {
        setError(res.error.message || 'Invalid email or password');
        setLoading(false);
        return;
      }

      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-dark-2 px-3 sm:px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-dark-1 p-5 sm:p-8 shadow-2xl border border-dark-3 text-white">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-2">
            <Image src="/icons/logo.svg" width={36} height={36} alt="YOOM logo" priority className="size-8 sm:size-9" />
            <h1 className="text-2xl font-bold tracking-tight">YOOM</h1>
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-white">Sign In</h2>
          <p className="text-xs sm:text-sm text-sky-2 mt-1">
            Enter your email and password to access your account
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-500/15 border border-red-500/30 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-sky-1 mb-1.5">
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-none bg-dark-3 text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-blue-1 h-11"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-sky-1 mb-1.5">
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-none bg-dark-3 text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-blue-1 h-11"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label htmlFor="rememberMe" className="flex items-center gap-2 text-sky-2 cursor-pointer">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded bg-dark-3 border-dark-4 text-blue-1 focus:ring-0"
              />
              Remember me
            </label>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-1 hover:bg-blue-600 text-white font-semibold h-11 rounded-lg transition"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-sky-2">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="font-semibold text-blue-1 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
}
