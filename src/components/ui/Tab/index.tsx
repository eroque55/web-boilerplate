'use client';

import { cn } from '@/utils/cn';

type Props = {
  text: string;
  isActive?: boolean;
  className?: string;
  onClick: () => void;
};

const Tab = ({ text, isActive = false, className, onClick }: Props) => {
  return (
    <button
      className={cn(
        'rounded-full px-4 py-2 text-sm font-medium transition',
        isActive
          ? 'bg-primary text-white'
          : 'bg-transparent text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200',
        className,
      )}
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Tab;
