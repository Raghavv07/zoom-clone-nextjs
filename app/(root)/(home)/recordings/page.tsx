import type { Metadata } from 'next';
import CallList from '@/components/CallList';

export const metadata: Metadata = {
  title: 'Recordings',
};

const RecordingsPage = () => {
  return (
    <section className="flex size-full flex-col gap-6 sm:gap-10 text-white">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Recordings</h1>

      <CallList type="recordings" />
    </section>
  );
};

export default RecordingsPage;
