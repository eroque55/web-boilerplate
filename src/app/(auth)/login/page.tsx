import type { Metadata } from 'next';

import Login from '@/components/screens/auth/login';

export const metadata: Metadata = {
  title: 'Entrar',
};

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;
