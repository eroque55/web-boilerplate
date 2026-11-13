'use client';

import { cn } from '@/utils/cn';

type Props = {
  isActive?: boolean;
  disabled?: boolean;
  onChange: () => void;
};

const Switch = ({ isActive = false, disabled = false, onChange }: Props) => {
  return (
    <button
      aria-checked={isActive}
      className={cn(
        'flex w-11 items-center rounded-full p-0.5 transition disabled:cursor-default disabled:opacity-60',
        isActive
          ? 'justify-end bg-alert-success'
          : 'justify-start bg-neutral-200 dark:bg-neutral-700',
      )}
      disabled={disabled}
      role="switch"
      type="button"
      onClick={onChange}
    >
      <span className="size-5 rounded-full bg-white shadow-xs transition" />
    </button>
  );
};

export default Switch;
