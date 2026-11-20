import { ReactNode } from 'react';
import StreamVideoProviderWrapper from '@/providers/StreamClientProviderWrapper';

export const dynamic = 'force-dynamic';

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main>
      <StreamVideoProviderWrapper>{children}</StreamVideoProviderWrapper>
    </main>
  );
};

export default RootLayout;
