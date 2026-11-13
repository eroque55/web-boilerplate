'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button, CheckboxField, Input } from '@/components/ui';
import { APP_NAME } from '@/constants/app';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/hooks/common';
import { LoginForm, LoginSchema } from '@/validation/login.validation';

const Login = () => {
  const { login, isLoggingIn } = useAuth();
  const { toggleTheme } = useTheme();

  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      requestRefresh: false,
    },
  });

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div
        className="flex w-full max-w-sm flex-col gap-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm
          sm:p-8 dark:border-neutral-800 dark:bg-neutral-900"
      >
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            {APP_NAME}
          </h1>

          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Entre com suas credenciais para continuar.
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(login)}>
          <Input
            autoComplete="email"
            control={control}
            label="E-mail"
            name="email"
            placeholder="voce@email.com"
            type="email"
          />

          <Input
            isPassword
            autoComplete="current-password"
            control={control}
            label="Senha"
            name="password"
            placeholder="Sua senha"
          />

          <CheckboxField
            control={control}
            label="Manter-me conectado"
            name="requestRefresh"
          />

          <div className="flex flex-col gap-2.5 pt-2">
            <Button
              withoutDelay
              isLoading={isLoggingIn}
              text="Entrar"
              type="submit"
            />

            <Button
              wired
              withoutDelay
              text="Alterar tema"
              onClick={toggleTheme}
            />
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
