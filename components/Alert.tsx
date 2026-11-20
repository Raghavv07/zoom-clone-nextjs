import Link from 'next/link';
import Image from 'next/image';

import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface PermissionCardProps {
  title: string;
  iconUrl?: string;
}

const Alert = ({ title, iconUrl }: PermissionCardProps) => {
  return (
    <section className="flex-center min-h-screen w-full px-4 py-8">
      <Card className="w-full max-w-[520px] border-none bg-dark-1 p-5 sm:p-6 py-7 sm:py-9 text-white rounded-2xl shadow-xl">
        <CardContent className="p-0 sm:p-6">
          <div className="flex flex-col gap-6 sm:gap-9">
            <div className="flex flex-col gap-3.5">
              {iconUrl && (
                <div className="flex-center">
                  <Image src={iconUrl} width={64} height={64} alt="icon" className="size-16" />
                </div>
              )}
              <p className="text-center text-lg sm:text-xl font-semibold leading-relaxed">{title}</p>
            </div>

            <Button asChild className="bg-blue-1 h-11 w-full font-semibold rounded-lg text-sm sm:text-base">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Alert;
