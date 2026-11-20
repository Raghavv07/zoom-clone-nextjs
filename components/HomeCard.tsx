'use client';

import Image from 'next/image';

import { cn } from '@/lib/utils';

interface HomeCardProps {
  className?: string;
  img: string;
  title: string;
  description: string;
  handleClick?: () => void;
}

const HomeCard = ({ className, img, title, description, handleClick }: HomeCardProps) => {
  return (
    <section
      className={cn(
        'bg-orange-1 p-5 sm:px-4 sm:py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[190px] sm:min-h-[220px] xl:min-h-[260px] rounded-[16px] cursor-pointer transition-all duration-200 active:scale-[0.98] hover:opacity-95 shadow-md',
        className
      )}
      onClick={handleClick}
    >
      <div className="flex-center glassmorphism size-11 sm:size-12 rounded-[12px]">
        <Image src={img} alt="meeting" width={24} height={24} className="size-6" />
      </div>
      
      <div className="flex flex-col gap-1 sm:gap-2">
        <h1 className="text-xl sm:text-2xl font-bold text-white">{title}</h1>
        <p className="text-sm sm:text-base font-normal text-white/90">{description}</p>
      </div>
    </section>
  );
};

export default HomeCard;
