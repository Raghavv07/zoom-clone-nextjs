'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-dark-2 px-4 text-center text-white">
      <div className="flex items-center gap-2 mb-6">
        <Image src="/icons/logo.svg" width={40} height={40} alt="YOOM logo" />
        <span className="text-3xl font-extrabold">YOOM</span>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-red-400">Something went wrong!</h1>
      <p className="text-sky-2 max-w-md mb-8 text-sm sm:text-base">
        An unexpected error occurred while loading this page. You can try again or return to the main dashboard.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto max-w-xs">
        <Button
          onClick={() => reset()}
          className="rounded-lg bg-blue-1 px-6 h-11 font-semibold hover:bg-blue-600 transition w-full sm:w-auto"
        >
          Try Again
        </Button>
        <Button
          asChild
          variant="outline"
          className="rounded-lg border-dark-3 bg-dark-1 text-white hover:bg-dark-3 transition h-11 w-full sm:w-auto"
        >
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
