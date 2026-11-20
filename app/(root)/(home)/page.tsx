import MeetingTypeList from '@/components/MeetingTypeList';
import HomeClock from '@/components/HomeClock';

const Home = () => {
  return (
    <section className="flex size-full flex-col gap-6 text-white">
      <div className="h-[220px] sm:h-[280px] lg:h-[303px] w-full rounded-[16px] sm:rounded-[20px] bg-hero bg-cover shadow-lg">
        <div className="flex h-full flex-col justify-between p-4 sm:p-6 lg:p-11">
          <h2 className="glassmorphism max-w-[220px] sm:max-w-[273px] rounded-lg py-1.5 sm:py-2 text-center text-xs sm:text-base font-medium">
            Upcoming Meeting at: 12:30 PM
          </h2>
          <HomeClock />
        </div>
      </div>

      <MeetingTypeList />
    </section>
  );
};

export default Home;
