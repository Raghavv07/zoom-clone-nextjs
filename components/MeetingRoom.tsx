'use client';
import { useState } from 'react';
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { useRouter, useSearchParams } from 'next/navigation';
import { Users, LayoutList } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Loader from './Loader';
import EndCallButton from './EndCallButton';
import { cn } from '@/lib/utils';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');
  const router = useRouter();
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();

  // for more detail about types of CallingState see: https://getstream.io/video/docs/react/ui-cookbook/ringing-call/#incoming-call-panel
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden text-white bg-dark-2">
      <div className="relative flex size-full items-center justify-center pb-24 sm:pb-20">
        <div className="flex size-full max-w-[1200px] items-center justify-center p-2 sm:p-4">
          <CallLayout />
        </div>
        <div
          className={cn('h-[calc(100vh-100px)] hidden ml-2 max-sm:fixed max-sm:inset-0 max-sm:z-50 max-sm:h-full max-sm:w-full max-sm:ml-0 max-sm:p-4 max-sm:bg-dark-1/95 max-sm:backdrop-blur-md', {
            'show-block !block': showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      {/* video layout and call controls */}
      <div className="fixed bottom-0 left-0 flex w-full flex-wrap items-center justify-center gap-2 sm:gap-4 px-3 py-3 bg-dark-1/95 backdrop-blur-md border-t border-dark-3 z-40">
        <CallControls onLeave={() => router.push(`/`)} />

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex size-10 items-center justify-center cursor-pointer rounded-2xl bg-[#19232d] hover:bg-[#4c535b] transition">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
              {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
                <div key={index}>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-dark-3"
                    onClick={() =>
                      setLayout(item.toLowerCase() as CallLayoutType)
                    }
                  >
                    {item}
                  </DropdownMenuItem>
                  {index < 2 && <DropdownMenuSeparator className="border-dark-3" />}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <CallStatsButton />

          <button
            type="button"
            onClick={() => setShowParticipants((prev) => !prev)}
            aria-label="Toggle participants list"
            className="flex size-10 items-center justify-center cursor-pointer rounded-2xl bg-[#19232d] hover:bg-[#4c535b] transition"
          >
            <Users size={20} className="text-white" />
          </button>

          {!isPersonalRoom && <EndCallButton />}
        </div>
      </div>
    </section>
  );
};

export default MeetingRoom;
