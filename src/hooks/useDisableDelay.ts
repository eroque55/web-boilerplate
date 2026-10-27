import { useState } from 'react';

export const useDisableDelay = (delay = 1000) => {
  const [isLoading, setIsLoading] = useState(false);

  const executeWithDelay = async (func: () => void | Promise<void>) => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      await func();
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, delay);
    }
  };

  return { executeWithDelay, isLoading };
};
