import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

const PUBLIC_ROUTES = ['/login', '/register', '/unauthorized']; // add more public routes if needed

export async function middleware(req: Request) {
  const { pathname } = new URL(req.url);

  // allow public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // check token
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], // protect all other pages
};
