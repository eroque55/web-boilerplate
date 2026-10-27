import { ButtonHTMLAttributes, MouseEvent } from 'react';

import Icon, { TIconProps } from '@/components/ui/Icon';
import Spinner from '@/components/ui/Spinner';
import { useDisableDelay } from '@/hooks/useDisableDelay';
import { cn } from '@/utils/cn';

import { BUTTON_MAP, TButtonColor } from './constants';

type Props = {
  text: string;
  color?: TButtonColor;
  textColor?: string;
  textClassName?: string;
  leftIcon?: TIconProps;
  rightIcon?: TIconProps;
  lift?: boolean;
  showHover?: boolean;
  withoutDelay?: boolean;
  isLoading?: boolean;
  showLoadingIndicator?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'onClick'>;

const Button = ({
  text,
  color = 'primary',
  textColor,
  textClassName = 'text-sm font-medium',
  leftIcon,
  rightIcon,
  lift = false,
  showHover = true,
  withoutDelay = false,
  isLoading = false,
  showLoadingIndicator = false,
  className,
  type = 'button',
  disabled,
  onClick,
  ...props
}: Props) => {
  const { executeWithDelay, isLoading: isDelaying } = useDisableDelay();

  const variant = BUTTON_MAP[color];
  const isBusy = isLoading || isDelaying;
  const showSpinner = isBusy && showLoadingIndicator;

  const renderIcon = (icon: TIconProps) => <Icon size={16} {...icon} />;

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    if (!onClick) {
      return;
    }

    if (withoutDelay) {
      await onClick(e);
      return;
    }

    await executeWithDelay(() => onClick(e));
  };

  return (
    <button
      className={cn(
        'flex items-center justify-center gap-2 rounded-xl px-4 py-3 transition disabled:cursor-default',
        disabled
          ? 'bg-gray-200 text-gray-400'
          : [variant.bg, textColor ?? variant.text],
        !disabled && showHover && variant.hover,
        !disabled && lift && 'hover:-translate-y-0.5 hover:shadow-primary',
        isBusy && 'opacity-75',
        className,
      )}
      disabled={disabled || isBusy}
      type={type}
      onClick={handleClick}
      {...props}
    >
      {showSpinner ? <Spinner size={16} /> : leftIcon && renderIcon(leftIcon)}

      <span className={textClassName}>{text}</span>

      {rightIcon && renderIcon(rightIcon)}
    </button>
  );
};

export default Button;
