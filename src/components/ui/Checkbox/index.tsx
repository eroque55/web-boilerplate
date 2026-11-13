'use client';

import { colors } from '@/theme/colors';
import { cn } from '@/utils/cn';

import Icon from '../Icon';

type Props = {
  isSelected?: boolean;
  disabled?: boolean;
  onChange?: () => void;
};

const Checkbox = ({
  isSelected = false,
  disabled = false,
  onChange,
}: Props) => {
  return (
    <button
      aria-checked={isSelected}
      className={cn(
        `flex size-5 shrink-0 items-center justify-center rounded-md border transition disabled:cursor-default
        disabled:opacity-60`,
        isSelected
          ? 'border-alert-success bg-alert-success'
          : 'border-neutral-300 bg-white dark:border-neutral-600 dark:bg-neutral-800',
      )}
      disabled={disabled}
      role="checkbox"
      type="button"
      onClick={onChange}
    >
      {isSelected && <Icon color={colors.white} name="CheckIcon" size={14} />}
    </button>
  );
};

export default Checkbox;
