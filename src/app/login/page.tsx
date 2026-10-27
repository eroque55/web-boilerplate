import type { Metadata } from 'next';

import Login from '@/components/pages/Login';

export const metadata: Metadata = {
  title: 'Entrar',
};

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;
