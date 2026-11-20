import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Personal Room',
};

export default function PersonalRoomLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
