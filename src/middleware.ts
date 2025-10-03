import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

const publicRoutes = ['/auth/login', '/auth/inactivo', '/auth/verificar'];

export async function middleware(req: Request) {
  const { pathname } = new URL(req.url);

  // allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // check token
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie:
      process.env.NODE_ENV === 'production' &&
      process.env.NEXTAUTH_URL?.startsWith('https://'),
  });

  console.log('TOKEN:', token?.activo);

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if (token.activo === false) {
    return NextResponse.redirect(new URL('/auth/inactivo', req.url));
  } else if (token.role === 'sinverificar') {
    return NextResponse.redirect(new URL('/auth/verificar', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclude next-auth, static files, images, favicon, and all file extensions
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico)).*)',
  ],
};
