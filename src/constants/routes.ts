export const LOGIN_ROUTE = '/login';

export const HOME_ROUTE = '/dashboard';

// Rotas de autenticação redirecionam para a home quando já existe sessão.
export const AUTH_ROUTES: string[] = [LOGIN_ROUTE];

export const PUBLIC_ROUTES: string[] = [...AUTH_ROUTES];
