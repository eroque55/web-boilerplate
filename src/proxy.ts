import { NextProxy, NextResponse } from 'next/server';

import {
  AUTH_ROUTES,
  HOME_ROUTE,
  LOGIN_ROUTE,
  PUBLIC_ROUTES,
} from '@/constants/routes';
import { STORAGE_KEYS } from '@/constants/storageKeys';

// Checagem otimista: só confere se os cookies de sessão existem. A validade do
// token quem decide é a API (401 → refresh → logout em src/services/api.ts).
export const proxy: NextProxy = request => {
  const { pathname, search } = request.nextUrl;
  const hasSession =
    request.cookies.has(STORAGE_KEYS.accessToken) ||
    request.cookies.has(STORAGE_KEYS.refreshToken);

  if (hasSession && AUTH_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL(HOME_ROUTE, request.url));
  }

  if (!hasSession && !PUBLIC_ROUTES.includes(pathname)) {
    const loginUrl = new URL(LOGIN_ROUTE, request.url);
    loginUrl.searchParams.set('redirect', `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico)$).*)',
  ],
};
