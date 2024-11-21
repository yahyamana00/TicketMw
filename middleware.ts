import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/tickets',
  '/settings',
  '/submit-ticket/details', // Protected ticket details/management
];

// Routes that are always public
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/verify',
  '/reset-password',
  '/chat',
  '/submit-ticket', // Initial ticket submission is public
  '/about',
  '/pricing',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check protected routes
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    const authCookie = request.cookies.get('appwrite_session');
    
    if (!authCookie) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}