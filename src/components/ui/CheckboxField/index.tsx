'use client';

import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

import Checkbox from '../Checkbox';
import ErrorText from '../ErrorText';

type Props<TFieldValues extends FieldValues> = {
  label: string;
  disabled?: boolean;
} & UseControllerProps<TFieldValues>;

const CheckboxField = <TFieldValues extends FieldValues>({
  label,
  name,
  control,
  disabled = false,
}: Props<TFieldValues>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const toggle = () => {
    if (!disabled) {
      field.onChange(!field.value);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex w-fit items-center gap-2.5 select-none">
        <Checkbox
          disabled={disabled}
          isSelected={Boolean(field.value)}
          onChange={toggle}
        />

        <span
          className="cursor-pointer text-sm text-neutral-600 dark:text-neutral-300"
          onClick={toggle}
        >
          {label}
        </span>
      </div>

      <ErrorText text={error?.message} />
    </div>
  );
};

export default CheckboxField;
