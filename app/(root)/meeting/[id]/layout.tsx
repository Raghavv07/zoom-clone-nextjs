import type { Metadata } from 'next';
import { ReactNode } from 'react';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Meeting #${id}`,
  };
}

export default function MeetingLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
