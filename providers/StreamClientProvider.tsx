'use client';

import { ReactNode, useEffect, useState } from 'react';
import type { StreamVideoClient as StreamVideoClientType } from '@stream-io/video-react-sdk';
import { useSession } from '@/lib/auth-client';
import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY || 'h9ugy9qrd9zb';

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

      const fetchToken = async (): Promise<string> => {
        try {
          const res = await fetch('/api/stream-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user.id }),
          });

          if (res.ok) {
            const data = await res.json();
            if (data?.token) return data.token;
          }
        } catch (fetchErr) {
          console.warn('API token fetch failed, falling back to server action:', fetchErr);
        }

        // Fallback to server action
        return await tokenProvider(user.id);
      };

      client = new StreamVideoClient({
        apiKey: API_KEY,
        user: {
          id: user.id,
          name: user.name || user.email || user.id,
          image: user.image || undefined,
        },
        tokenProvider: fetchToken,
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
