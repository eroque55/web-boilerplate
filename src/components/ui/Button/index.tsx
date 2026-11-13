'use client';

import { ButtonHTMLAttributes, MouseEvent } from 'react';

import { useDisableDelay } from '@/hooks/common';
import { cn } from '@/utils/cn';

import Icon, { IconProps } from '../Icon';
import Spinner from '../Spinner';

import { BUTTON_VARIANTS, ButtonVariant } from './constants';

type Props = {
  text: string;
  variant?: ButtonVariant;
  wired?: boolean;
  leftIcon?: IconProps;
  rightIcon?: IconProps;
  withoutDelay?: boolean;
  isLoading?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;

const Button = ({
  text,
  variant = 'primary',
  wired = false,
  leftIcon,
  rightIcon,
  withoutDelay = false,
  isLoading = false,
  className,
  type = 'button',
  disabled,
  onClick,
  ...props
}: Props) => {
  const { executeWithDelay, isLoading: isDelaying } = useDisableDelay();

  const styles = BUTTON_VARIANTS[variant];
  const showSpinner = isLoading || isDelaying;

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    if (!onClick || showSpinner) {
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
        `flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition
        disabled:cursor-default disabled:opacity-60`,
        wired ? styles.wired : styles.solid,
        className,
      )}
      disabled={disabled || isLoading}
      type={type}
      onClick={handleClick}
      {...props}
    >
      {leftIcon && <Icon size={16} {...leftIcon} />}

      <span>{text}</span>

      {showSpinner ? (
        <span data-testid="button-activity-indicator">
          <Spinner size={16} />
        </span>
      ) : (
        rightIcon && <Icon size={16} {...rightIcon} />
      )}
    </button>
  );
};

export default Button;
