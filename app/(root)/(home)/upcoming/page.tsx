import { Metadata } from 'next';
import CallList from '@/components/CallList';

export const metadata: Metadata = {
  title: 'Upcoming Meetings',
};

const UpcomingPage = () => {
  return (
    <section className="flex size-full flex-col gap-6 sm:gap-10 text-white">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Upcoming Meetings</h1>
      <CallList type="upcoming" />
    </section>
  );
};

export default UpcomingPage;
