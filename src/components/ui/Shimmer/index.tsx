import { HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

import './styles.css';

type Props = HTMLAttributes<HTMLDivElement>;

const Shimmer = ({ className, ...props }: Props) => {
  return (
    <div
      aria-hidden
      className={cn(
        'overflow-hidden bg-neutral-200 dark:bg-neutral-800',
        className,
      )}
      {...props}
    >
      <div
        className="shimmer h-full w-1/3 bg-linear-to-r from-transparent via-white/50 to-transparent dark:via-white/10"
      />
    </div>
  );
};

export default Shimmer;
