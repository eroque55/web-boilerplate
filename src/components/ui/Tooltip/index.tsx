'use client';

import { ITooltip, Tooltip as ReactTooltip } from 'react-tooltip';

import { cn } from '@/utils/cn';

type Props = ITooltip & {
  id: string;
};

// O portal no body evita o tooltip cortado por pais com overflow-hidden.
const Tooltip = ({ className, ...props }: Props) => {
  return (
    <ReactTooltip
      noArrow
      className={cn(
        'max-w-60 rounded-xl! bg-ink! px-3! py-2! text-xs! font-medium text-white! shadow-lg',
        className,
      )}
      opacity={1}
      place="top"
      portalRoot={typeof document === 'undefined' ? undefined : document.body}
      {...props}
    />
  );
};

export default Tooltip;
