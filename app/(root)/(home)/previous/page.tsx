import { Metadata } from 'next';
import CallList from '@/components/CallList';

export const metadata: Metadata = {
  title: 'Previous Meetings',
};

const PreviousPage = () => {
  return (
    <section className="flex size-full flex-col gap-6 sm:gap-10 text-white">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Previous Calls</h1>
      <CallList type="ended" />
    </section>
  );
};

export default PreviousPage;
