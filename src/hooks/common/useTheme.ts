import { useCallback, useSyncExternalStore } from 'react';

import { STORAGE_KEYS } from '@/constants/storageKeys';

const THEME_EVENT = 'theme-change';

const subscribe = (onStoreChange: () => void) => {
  window.addEventListener(THEME_EVENT, onStoreChange);
  window.addEventListener('storage', onStoreChange);

  return () => {
    window.removeEventListener(THEME_EVENT, onStoreChange);
    window.removeEventListener('storage', onStoreChange);
  };
};

const getSnapshot = () => document.documentElement.classList.contains('dark');

const getServerSnapshot = () => false;

export const useTheme = () => {
  const isDark = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const toggleTheme = useCallback(() => {
    const nextIsDark = !document.documentElement.classList.contains('dark');
    const nextTheme = nextIsDark ? 'dark' : 'light';

    document.documentElement.classList.toggle('dark', nextIsDark);
    document.documentElement.style.colorScheme = nextTheme;
    localStorage.setItem(STORAGE_KEYS.theme, nextTheme);
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  return {
    isDark,
    toggleTheme,
  };
};
