import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { auth } from '@/lib/auth';

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

export async function POST(req: NextRequest) {
  try {
    let userId: string | undefined;

    // 1. Try reading userId from request body
    try {
      const body = await req.json();
      if (body?.userId) {
        userId = String(body.userId);
      }
    } catch {}

    // 2. Fall back to Better Auth session if userId not provided in body
    if (!userId) {
      try {
        const session = await auth.api.getSession({
          headers: req.headers,
        });
        if (session?.user?.id) {
          userId = String(session.user.id);
        }
      } catch (err) {
        console.warn('Session resolution in /api/stream-token failed:', err);
      }
    }

    if (!userId) {
      return NextResponse.json(
        { error: 'User is not authenticated' },
        { status: 401 }
      );
    }

    const apiSecret =
      process.env.STREAM_SECRET_KEY ||
      process.env.STREAM_API_SECRET ||
      process.env.STREAM_SECRET ||
      'pjvf2euf4vwf64b5mqkj7xabddceazd3jzvanx86jruhkvwa68ebdm2wyy5saqj4';

    const token = generateStreamToken(userId, apiSecret);

    return NextResponse.json({ token });
  } catch (err: any) {
    console.error('Error generating stream token:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to generate token' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    let userId = req.nextUrl.searchParams.get('userId');

    if (!userId) {
      try {
        const session = await auth.api.getSession({
          headers: req.headers,
        });
        if (session?.user?.id) {
          userId = String(session.user.id);
        }
      } catch {}
    }

    if (!userId) {
      return NextResponse.json(
        { error: 'User is not authenticated' },
        { status: 401 }
      );
    }

    const apiSecret =
      process.env.STREAM_SECRET_KEY ||
      process.env.STREAM_API_SECRET ||
      process.env.STREAM_SECRET ||
      'pjvf2euf4vwf64b5mqkj7xabddceazd3jzvanx86jruhkvwa68ebdm2wyy5saqj4';

    const token = generateStreamToken(userId, apiSecret);

    return NextResponse.json({ token });
  } catch (err: any) {
    console.error('Error in GET /api/stream-token:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to generate token' },
      { status: 500 }
    );
  }
}
