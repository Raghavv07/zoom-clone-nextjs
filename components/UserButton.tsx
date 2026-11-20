'use client';

import { useSession, signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import Link from 'next/link';
import { LogOut } from 'lucide-react';

export default function UserButton() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  if (isPending) {
    return <div className="size-9 rounded-full bg-dark-3 animate-pulse" />;
  }

  if (!session?.user) {
    return (
      <Link
        href="/sign-in"
        className="rounded-lg bg-blue-1 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition"
      >
        Sign In
      </Link>
    );
  }

  const user = session.user;
  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/sign-in');
          router.refresh();
        },
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || 'User avatar'}
            width={36}
            height={36}
            className="size-9 rounded-full object-cover border border-dark-3 cursor-pointer"
          />
        ) : (
          <div className="flex size-9 items-center justify-center rounded-full bg-blue-1 text-sm font-bold text-white cursor-pointer hover:opacity-90">
            {initials}
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border-dark-1 bg-dark-1 text-white" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-white">{user.name}</p>
            <p className="text-xs leading-none text-sky-2 truncate">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-dark-3" />
        <DropdownMenuItem
          className="cursor-pointer text-red-400 focus:bg-dark-3 focus:text-red-400"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 size-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
