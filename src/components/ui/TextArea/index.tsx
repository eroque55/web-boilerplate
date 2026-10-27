import { ChangeEvent, TextareaHTMLAttributes } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

import { cn } from '@/utils/cn';

import ErrorMessage from '../ErrorMessage';

type Props<TFieldValues extends FieldValues> = {
  label?: string;
  placeholder?: string;
  hint?: string;
  hideErrorMessage?: boolean;
} & UseControllerProps<TFieldValues> &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name' | 'defaultValue'>;

const TextArea = <TFieldValues extends FieldValues>({
  label,
  placeholder,
  hint,
  hideErrorMessage = false,
  name,
  control,
  rows = 4,
  className,
  onChange,
  ...props
}: Props<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const errorMessage = hideErrorMessage ? undefined : error?.message;
  const messageId = `${name}-message`;

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    field.onChange(event.target.value);
    onChange?.(event);
  };

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700" htmlFor={name}>
          {label}
        </label>
      )}

      <textarea
        {...field}
        aria-describedby={errorMessage || hint ? messageId : undefined}
        aria-invalid={!!error}
        className={cn(
          `w-full resize-none rounded-xl border-[1.5px] border-gray-200 bg-white px-3.5 py-3 text-sm transition
          outline-none placeholder:text-gray-400 hover:border-gray-300 focus:border-primary focus:shadow-md
          disabled:bg-gray-100 disabled:hover:border-gray-200 disabled:focus:shadow-none aria-invalid:border-red`,
          className,
        )}
        id={name}
        placeholder={placeholder}
        rows={rows}
        value={field.value ?? ''}
        onChange={handleChange}
        {...props}
      />

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

export default TextArea;
