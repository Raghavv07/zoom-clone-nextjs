'use client';

import { ReactNode, useEffect, useState } from 'react';
import type { StreamVideoClient as StreamVideoClientType } from '@stream-io/video-react-sdk';
import { useSession } from '@/lib/auth-client';
import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClientType>();
  const [StreamVideoComponent, setStreamVideoComponent] = useState<any>(null);
  const { data: session, isPending } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isPending || !user) return;
    if (!API_KEY) throw new Error('Stream API key is missing');

    let isMounted = true;
    let client: StreamVideoClientType | null = null;

    // Dynamically import Stream Video SDK on client side only to prevent SSR prototype errors
    import('@stream-io/video-react-sdk').then(({ StreamVideoClient, StreamVideo }) => {
      if (!isMounted) return;

      client = new StreamVideoClient({
        apiKey: API_KEY,
        user: {
          id: user.id,
          name: user.name || user.email || user.id,
          image: user.image || undefined,
        },
        tokenProvider,
      });

      setVideoClient(client);
      setStreamVideoComponent(() => StreamVideo);
    });

    return () => {
      isMounted = false;
      if (client) {
        client.disconnectUser();
      }
    };
  }, [user, isPending]);

  if (!videoClient || !StreamVideoComponent) return <Loader />;

  const StreamVideo = StreamVideoComponent;
  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
