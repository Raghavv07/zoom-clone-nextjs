"use client";

import { useSession } from "@/lib/auth-client";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

import { useGetCallById } from "@/hooks/useGetCallById";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-start gap-1 sm:gap-2 xl:flex-row">
      <h1 className="text-sm sm:text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">
        {title}:
      </h1>
      <h1 className="break-all text-xs sm:text-sm font-bold text-white lg:text-xl">
        {description}
      </h1>
    </div>
  );
};

const PersonalRoom = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const client = useStreamVideoClient();
  const { toast } = useToast();

  const meetingId = user?.id;

  const { call } = useGetCallById(meetingId || "");

  const startRoom = async () => {
    if (!client || !user || !meetingId) {
      toast({
        title: 'Connecting to video services...',
        description: 'Please wait a moment and try again.',
      });
      return;
    }

    try {
      const newCall = client.call("default", meetingId);

      if (!call) {
        await newCall.getOrCreate({
          data: {
            starts_at: new Date().toISOString(),
          },
        });
      }

      router.push(`/meeting/${meetingId}?personal=true`);
    } catch (error: any) {
      console.error('Failed to start personal room:', error);
      toast({
        title: 'Failed to start Meeting',
        description: error?.message || 'Please check your connection and try again.',
      });
    }
  };

  const meetingLink = `${(typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_BASE_URL) || ''}/meeting/${meetingId}?personal=true`;

  return (
    <section className="flex size-full flex-col gap-6 sm:gap-10 text-white">
      <h1 className="text-xl font-bold sm:text-2xl lg:text-3xl">Personal Meeting Room</h1>
      <div className="flex w-full flex-col gap-5 sm:gap-8 rounded-2xl bg-dark-1 p-5 sm:p-7 xl:max-w-[900px] shadow-lg">
        <Table title="Topic" description={`${user?.name || user?.email || 'User'}'s Meeting Room`} />
        <Table title="Meeting ID" description={meetingId || ""} />
        <Table title="Invite Link" description={meetingLink} />
      </div>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full sm:w-auto">
        <Button className="bg-blue-1 h-11 w-full sm:w-auto px-6 text-sm sm:text-base font-semibold rounded-lg" onClick={startRoom}>
          Start Meeting
        </Button>
        <Button
          className="bg-dark-3 h-11 w-full sm:w-auto px-6 text-sm sm:text-base font-semibold rounded-lg hover:bg-dark-4"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Link Copied",
            });
          }}
        >
          Copy Invitation
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;
