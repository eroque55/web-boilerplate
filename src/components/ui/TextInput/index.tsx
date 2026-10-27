import { ChangeEvent, InputHTMLAttributes, ReactNode, useState } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

import Icon from '@/components/ui/Icon';
import { cn } from '@/utils/cn';

import ErrorMessage from '../ErrorMessage';

type Props<TFieldValues extends FieldValues> = {
  label?: string;
  placeholder?: string;
  leftIcon?: ReactNode;
  hint?: string;
  mask?: (value: string) => string;
  hideErrorMessage?: boolean;
} & UseControllerProps<TFieldValues> &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'defaultValue'>;

const TextInput = <TFieldValues extends FieldValues>({
  label,
  placeholder,
  leftIcon,
  hint,
  mask,
  hideErrorMessage = false,
  name,
  control,
  type = 'text',
  className,
  onChange,
  ...props
}: Props<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && passwordVisible ? 'text' : type;
  const errorMessage = hideErrorMessage ? undefined : error?.message;
  const messageId = `${name}-message`;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    field.onChange(mask ? mask(value) : value);
    onChange?.(event);
  };

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700" htmlFor={name}>
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <span className="pointer-events-none absolute left-3.5 flex items-center text-gray-400">
            {leftIcon}
          </span>
        )}

        <input
          {...field}
          aria-describedby={errorMessage || hint ? messageId : undefined}
          aria-invalid={!!error}
          className={cn(
            `w-full rounded-xl border-[1.5px] border-gray-200 bg-white px-3.5 py-3 text-sm transition outline-none
            placeholder:text-gray-400 hover:border-gray-300 focus:border-primary focus:shadow-md disabled:bg-gray-100
            disabled:hover:border-gray-200 disabled:focus:shadow-none aria-invalid:border-red`,
            leftIcon && 'pl-10.5',
            isPassword && 'pr-10.5',
            className,
          )}
          id={name}
          placeholder={placeholder}
          type={inputType}
          value={field.value ?? ''}
          onChange={handleChange}
          {...props}
        />

        {isPassword && (
          <button
            aria-label={passwordVisible ? 'Ocultar senha' : 'Mostrar senha'}
            className="absolute right-3 flex items-center rounded p-1 text-gray-400 transition-colors
              hover:text-gray-700"
            type="button"
            onClick={() => setPasswordVisible(prev => !prev)}
          >
            <Icon name={passwordVisible ? 'EyeOffIcon' : 'EyeIcon'} size={16} />
          </button>
        )}
      </div>

      {errorMessage ? (
        <ErrorMessage id={messageId} message={errorMessage} />
      ) : (
        hint && (
          <p
            className="text-[11.5px] leading-[1.45] text-gray-500"
            id={messageId}
          >
            {hint}
          </p>
        )
      )}
    </div>
  );
};

export default TextInput;
