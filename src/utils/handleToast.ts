import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

const DEFAULT_ERROR_MESSAGE =
  'Houve um imprevisto, tente novamente mais tarde.';

// Mensagens que o backend devolve em inglês. Traduza aqui conforme a API do projeto.
const ERROR_TRANSLATIONS: Record<string, string> = {
  'Too many requests, please try again later.':
    'Muitas requisições, tente novamente mais tarde.',
};

// Cobre os formatos mais comuns: `{ message }`, `{ error: { message } }` (Strapi)
// e `{ message: string[] }` (validação do NestJS).
type TApiErrorBody = {
  message?: unknown;
  error?: { message?: unknown };
};

const extractMessage = (body?: TApiErrorBody) => {
  const message = body?.error?.message ?? body?.message;
  return Array.isArray(message) ? message[0] : message;
};

export const getErrorMessage = (err: unknown): string => {
  if (isAxiosError<TApiErrorBody>(err)) {
    const message = extractMessage(err.response?.data);
    return typeof message === 'string' && message
      ? message
      : DEFAULT_ERROR_MESSAGE;
  }

  if (err instanceof Error) {
    return err.message;
  }

  if (typeof err === 'string') {
    return err;
  }

  return DEFAULT_ERROR_MESSAGE;
};

const handleError = (err: unknown) => {
  const message = getErrorMessage(err);

  return toast.error(ERROR_TRANSLATIONS[message] ?? message);
};

export const handleSuccess = (message: string) => {
  return toast.success(message);
};

export default handleError;
