'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';
import { useAuth } from '@/hooks/useAuth';
import { LoginSchema, TLoginForm } from '@/validations/auth.validation';

const LoginForm = () => {
  const { login, isLoggingIn } = useAuth();

  const { control, register, handleSubmit } = useForm<TLoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(login)}>
      <TextInput
        autoComplete="email"
        control={control}
        label="E-mail"
        name="email"
        placeholder="voce@email.com"
        type="email"
      />

      <TextInput
        autoComplete="current-password"
        control={control}
        label="Senha"
        name="password"
        placeholder="Sua senha"
        type="password"
      />

      <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
        <input
          className="size-4 accent-primary"
          type="checkbox"
          {...register('rememberMe')}
        />

        <span>Manter conectado</span>
      </label>

      <Button
        showLoadingIndicator
        withoutDelay
        isLoading={isLoggingIn}
        text="Entrar"
        type="submit"
      />
    </form>
  );
};

export default LoginForm;
