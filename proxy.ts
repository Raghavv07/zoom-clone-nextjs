import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = [
  '/',
  '/upcoming',
  '/previous',
  '/recordings',
  '/personal-room',
  '/meeting',
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    route === '/' ? pathname === '/' : pathname.startsWith(route)
  );

  const isAuthRoute = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');

  // Check for Better Auth session cookie directly from request cookies
  const sessionCookie =
    request.cookies.get('better-auth.session_token') ||
    request.cookies.get('__Secure-better-auth.session_token') ||
    request.cookies.get('better-auth-session_token');

  if (isProtected && !sessionCookie) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isAuthRoute && sessionCookie) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next|api/auth).*)', '/', '/(api|trpc)(.*)'],
};
