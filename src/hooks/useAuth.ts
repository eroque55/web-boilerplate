import type { Route } from 'next';
import { useRouter } from 'next/navigation';

import { HOME_ROUTE } from '@/constants/routes';
import { useLogin } from '@/hooks/api/auth';
import { session } from '@/utils/session';
import { TLoginForm } from '@/validations/auth.validation';

// Só aceita caminhos internos para evitar open redirect (?redirect=https://...).
const getRedirectPath = (): Route => {
  const redirect = new URLSearchParams(window.location.search).get('redirect');

  if (redirect?.startsWith('/') && !redirect.startsWith('//')) {
    return redirect as Route;
  }

  return HOME_ROUTE;
};

export const useAuth = () => {
  const router = useRouter();
  const { mutate: loginRequest, isPending: isLoggingIn } = useLogin();

  const login = ({ email, password, rememberMe }: TLoginForm) => {
    loginRequest(
      { email, password },
      {
        onSuccess: tokens => {
          session.start(tokens, rememberMe);
          router.replace(getRedirectPath());
        },
      },
    );
  };

  return { login, logout: session.end, isLoggingIn };
};
