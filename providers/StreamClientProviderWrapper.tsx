'use client';

import dynamic from 'next/dynamic';
import Loader from '@/components/Loader';
import { ReactNode } from 'react';

const StreamVideoProvider = dynamic(
  () => import('./StreamClientProvider'),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

export default function StreamVideoProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <StreamVideoProvider>{children}</StreamVideoProvider>;
}
