'use client';

import {
  ChangeEvent,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useState,
} from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

import { colors } from '@/theme/colors';
import { cn } from '@/utils/cn';

import ErrorText from '../ErrorText';
import Icon, { IconProps } from '../Icon';

type SharedProps<TFieldValues extends FieldValues> = {
  label?: string;
  placeholder?: string;
  isPassword?: boolean;
  leftIcon?: IconProps;
  rightIcon?: IconProps;
  hint?: string;
  mask?: (value: string) => string;
  hideErrorMessage?: boolean;
} & UseControllerProps<TFieldValues>;

type SingleLineProps = {
  multiline?: false;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'name' | 'defaultValue' | 'value' | 'onChange'
> & {
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  };

type MultiLineProps = {
  multiline: true;
  rows?: number;
} & Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'name' | 'defaultValue' | 'value' | 'onChange'
> & {
    onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  };

type Props<TFieldValues extends FieldValues> = SharedProps<TFieldValues> &
  (SingleLineProps | MultiLineProps);

const BASE_CLASSES =
  'w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-3 text-sm text-neutral-900 transition outline-none placeholder:text-neutral-400 hover:border-neutral-300 focus:border-primary disabled:bg-neutral-100 aria-invalid:border-alert-error dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:hover:border-neutral-600 dark:focus:border-primary dark:disabled:bg-neutral-900';

const Input = <TFieldValues extends FieldValues>(
  props: Props<TFieldValues>,
) => {
  const {
    label,
    placeholder,
    isPassword = false,
    leftIcon,
    rightIcon,
    hint,
    mask,
    hideErrorMessage = false,
    name,
    control,
    className,
  } = props;

  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({ name, control });

  const [passwordHidden, setPasswordHidden] = useState(true);

  const errorMessage = hideErrorMessage ? undefined : error?.message;
  const messageId = `${name}-message`;

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label
          className="text-sm font-medium text-neutral-600 dark:text-neutral-300"
          htmlFor={name}
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <span className="pointer-events-none absolute left-3.5 flex items-center text-neutral-400">
            <Icon size={18} {...leftIcon} />
          </span>
        )}

        {props.multiline ? (
          <textarea
            aria-describedby={errorMessage || hint ? messageId : undefined}
            aria-invalid={Boolean(error)}
            className={cn('resize-none', BASE_CLASSES, className)}
            disabled={props.disabled}
            id={name}
            name={name}
            placeholder={placeholder}
            rows={props.rows ?? 4}
            value={value ?? ''}
            onBlur={onBlur}
            onChange={event => {
              const next = event.target.value;
              onChange(mask ? mask(next) : next);
              props.onChange?.(event);
            }}
          />
        ) : (
          <input
            aria-describedby={errorMessage || hint ? messageId : undefined}
            aria-invalid={Boolean(error)}
            autoComplete={props.autoComplete}
            className={cn(
              BASE_CLASSES,
              leftIcon && 'pl-10.5',
              (isPassword || rightIcon) && 'pr-10.5',
              className,
            )}
            disabled={props.disabled}
            id={name}
            inputMode={props.inputMode}
            maxLength={props.maxLength}
            name={name}
            placeholder={placeholder}
            type={
              isPassword
                ? passwordHidden
                  ? 'password'
                  : 'text'
                : (props.type ?? 'text')
            }
            value={value ?? ''}
            onBlur={onBlur}
            onChange={event => {
              const next = event.target.value;
              onChange(mask ? mask(next) : next);
              props.onChange?.(event);
            }}
          />
        )}

        {rightIcon && !isPassword && (
          <span className="pointer-events-none absolute right-3.5 flex items-center text-neutral-400">
            <Icon size={18} {...rightIcon} />
          </span>
        )}

        {isPassword && !props.multiline && (
          <button
            aria-label={passwordHidden ? 'Mostrar senha' : 'Ocultar senha'}
            className="absolute right-3 flex items-center rounded-full p-1 transition hover:bg-neutral-100
              dark:hover:bg-neutral-700"
            data-testid="input-password-toggle"
            type="button"
            onClick={() => setPasswordHidden(prev => !prev)}
          >
            <Icon
              color={passwordHidden ? colors.neutral[400] : colors.primary}
              name={passwordHidden ? 'EyeOffIcon' : 'EyeIcon'}
              size={18}
            />
          </button>
        )}
      </div>

      {errorMessage ? (
        <ErrorText id={messageId} text={errorMessage} />
      ) : (
        hint && (
          <p
            className="text-xs text-neutral-500 dark:text-neutral-400"
            id={messageId}
          >
            {hint}
          </p>
        )
      )}
    </div>
  );
};

export default Input;
