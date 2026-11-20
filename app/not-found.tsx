import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-dark-2 px-4 text-center text-white">
      <div className="flex items-center gap-2 mb-6">
        <Image src="/icons/logo.svg" width={40} height={40} alt="YOOM logo" />
        <span className="text-3xl font-extrabold">YOOM</span>
      </div>
      <h1 className="text-6xl sm:text-7xl font-extrabold text-blue-1 mb-3">404</h1>
      <h2 className="text-xl sm:text-2xl font-bold mb-2">Page Not Found</h2>
      <p className="text-sky-2 max-w-md mb-8 text-sm sm:text-base">
        The meeting room or page you are trying to reach does not exist, has ended, or may have been moved.
      </p>
      <Button asChild className="rounded-lg bg-blue-1 px-6 h-11 font-semibold hover:bg-blue-600 transition w-full sm:w-auto max-w-xs">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
