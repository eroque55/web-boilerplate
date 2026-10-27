import LoginForm from './LoginForm';

const Login = () => {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="flex w-full max-w-sm flex-col gap-6 rounded-2xl bg-white p-8 shadow-lg">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Entrar</h1>

          <p className="text-sm text-gray-500">
            Acesse sua conta para continuar.
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
};

export default Login;
