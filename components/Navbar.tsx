import Image from 'next/image';
import Link from 'next/link';

import MobileNav from './MobileNav';
import UserButton from './UserButton';

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-4 py-3 sm:px-6 sm:py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="yoom logo"
          priority
          className="size-8 sm:size-9"
        />
        <p className="text-[20px] sm:text-[24px] lg:text-[26px] font-extrabold text-white">
          YOOM
        </p>
      </Link>
      <div className="flex-between gap-3 sm:gap-5">
        <UserButton />
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
