'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { StreamClient } from '@stream-io/node-sdk';

export const tokenProvider = async (clientUserId?: string) => {
  let userId = clientUserId;

  try {
    const reqHeaders = await headers();
    const session = await auth.api.getSession({
      headers: reqHeaders,
    });

    if (session?.user?.id) {
      userId = String(session.user.id);
    }
  } catch (error) {
    console.warn('Failed to resolve Better Auth session in tokenProvider, falling back to client userId:', error);
  }

  if (!userId) {
    throw new Error('User is not authenticated. Please log in again.');
  }

  const apiKey =
    process.env.NEXT_PUBLIC_STREAM_API_KEY ||
    process.env.STREAM_API_KEY ||
    'h9ugy9qrd9zb';

  const apiSecret =
    process.env.STREAM_SECRET_KEY ||
    process.env.STREAM_API_SECRET ||
    process.env.STREAM_SECRET ||
    'pjvf2euf4vwf64b5mqkj7xabddceazd3jzvanx86jruhkvwa68ebdm2wyy5saqj4';

  if (!apiKey) throw new Error('Stream API key is missing');
  if (!apiSecret) throw new Error('Stream API secret is missing');

  const streamClient = new StreamClient(apiKey, apiSecret);

  const expirationTime = Math.floor(Date.now() / 1000) + 3600;
  const issuedAt = Math.floor(Date.now() / 1000) - 60;

  const token = streamClient.createToken(String(userId), expirationTime, issuedAt);

  return token;
};
