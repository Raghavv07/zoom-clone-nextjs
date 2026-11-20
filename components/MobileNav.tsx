'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <div className="sm:hidden flex items-center">
      <Sheet>
        <SheetTrigger asChild>
          <button
            type="button"
            className="flex items-center justify-center p-1 text-white focus:outline-none"
            aria-label="Open menu"
          >
            <Image
              src="/icons/hamburger.svg"
              width={32}
              height={32}
              alt="hamburger icon"
              className="cursor-pointer size-8"
            />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-dark-1 p-6 text-white w-[280px] max-w-[85vw]">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/icons/logo.svg"
              width={32}
              height={32}
              alt="yoom logo"
              className="size-8"
            />
            <p className="text-[22px] font-extrabold text-white">YOOM</p>
          </Link>
          <div className="flex h-[calc(100vh-80px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="flex h-full flex-col gap-3 pt-8 text-white">
                {sidebarLinks.map((item) => {
                  const isActive = pathname === item.route;

                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        key={item.label}
                        className={cn(
                          'flex gap-4 items-center p-3.5 rounded-xl w-full transition active:scale-[0.98]',
                          {
                            'bg-blue-1 text-white': isActive,
                            'hover:bg-dark-3 text-sky-2': !isActive,
                          }
                        )}
                      >
                        <Image
                          src={item.imgURL}
                          alt={item.label}
                          width={20}
                          height={20}
                          className="size-5"
                        />
                        <p className="text-sm font-semibold">{item.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
