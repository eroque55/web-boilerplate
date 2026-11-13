import { isAxiosError } from 'axios';

const DEFAULT_MESSAGE = 'Houve um imprevisto, tente novamente mais tarde';

const getApiMessage = (data: unknown): string | undefined => {
  if (typeof data === 'string' && data) {
    return data;
  }

  if (!data || typeof data !== 'object') {
    return undefined;
  }

  const { message, error } = data as {
    message?: unknown;
    error?: { message?: unknown };
  };

  if (typeof error?.message === 'string' && error.message) {
    return error.message;
  }

  if (Array.isArray(message) && typeof message[0] === 'string') {
    return message[0];
  }

  if (typeof message === 'string' && message) {
    return message;
  }

  return undefined;
};

export const handleError = (error: unknown): string => {
  if (process.env.NODE_ENV === 'development') {
    console.error(error);
  }

  if (typeof error === 'string' && error) {
    return error;
  }

  if (isAxiosError(error)) {
    return getApiMessage(error.response?.data) ?? DEFAULT_MESSAGE;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return DEFAULT_MESSAGE;
};
