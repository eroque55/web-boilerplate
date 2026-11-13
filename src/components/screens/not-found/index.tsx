import Link from 'next/link';

import { Icon } from '@/components/ui';
import { HOME_ROUTE } from '@/constants/routes';

const NotFound = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <Icon className="text-neutral-400" name="WarningCircleIcon" size={40} />

      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Página não encontrada
        </h1>

        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          O endereço que você procurou não existe ou foi movido.
        </p>
      </div>

      <Link
        className="rounded-xl bg-primary px-4 py-3 text-sm font-medium text-white transition hover:bg-primary-hover"
        href={HOME_ROUTE}
      >
        Voltar ao início
      </Link>
    </main>
  );
};

export default NotFound;
