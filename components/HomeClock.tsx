'use client';

import { useEffect, useState } from 'react';

export default function HomeClock() {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
      setDate(
        new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(now)
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-1 sm:gap-2">
      <h1 className="text-3xl sm:text-4xl lg:text-7xl font-extrabold min-h-[36px] sm:min-h-[40px] lg:min-h-[72px]" suppressHydrationWarning>
        {mounted ? time : '--:--'}
      </h1>
      <p className="text-sm sm:text-lg lg:text-2xl font-medium text-sky-1 min-h-[22px] sm:min-h-[28px] lg:min-h-[32px]" suppressHydrationWarning>
        {mounted ? date : 'Loading...'}
      </p>
    </div>
  );
}
