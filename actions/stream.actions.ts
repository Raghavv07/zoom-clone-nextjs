'use server';

import crypto from 'crypto';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

function generateStreamToken(userId: string, secret: string): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    user_id: userId,
    iat: now - 60,
    exp: now + 3600,
  };

  const base64Url = (obj: any) =>
    Buffer.from(JSON.stringify(obj))
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

  const h = base64Url(header);
  const p = base64Url(payload);
  const input = `${h}.${p}`;

  const sig = crypto
    .createHmac('sha256', secret)
    .update(input)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return `${input}.${sig}`;
}

export const tokenProvider = async (clientUserId?: string) => {
  let userId = clientUserId;

  if (!userId) {
    try {
      const reqHeaders = await headers();
      const session = await auth.api.getSession({
        headers: reqHeaders,
      });

      if (session?.user?.id) {
        userId = String(session.user.id);
      }
    } catch (error) {
      console.warn('Failed to resolve session in tokenProvider:', error);
    }
  }

  if (!userId) {
    throw new Error('User is not authenticated. Please log in again.');
  }

  const apiSecret =
    process.env.STREAM_SECRET_KEY ||
    process.env.STREAM_API_SECRET ||
    process.env.STREAM_SECRET ||
    'pjvf2euf4vwf64b5mqkj7xabddceazd3jzvanx86jruhkvwa68ebdm2wyy5saqj4';

  return generateStreamToken(String(userId), apiSecret);
};
