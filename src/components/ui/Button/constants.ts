export type ButtonVariant =
  'primary' | 'neutral' | 'danger' | 'success' | 'transparent';

export const BUTTON_VARIANTS: Record<
  ButtonVariant,
  { solid: string; wired: string }
> = {
  primary: {
    solid: 'border-transparent bg-primary text-white hover:bg-primary-hover',
    wired:
      'border-primary bg-transparent text-primary hover:bg-primary/10 dark:hover:bg-primary/20',
  },
  neutral: {
    solid:
      'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700',
    wired:
      'border-neutral-300 bg-transparent text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800',
  },
  danger: {
    solid: 'border-transparent bg-alert-error text-white hover:brightness-95',
    wired:
      'border-alert-error bg-transparent text-alert-error hover:bg-alert-error/10',
  },
  success: {
    solid: 'border-transparent bg-alert-success text-white hover:brightness-95',
    wired:
      'border-alert-success bg-transparent text-alert-success hover:bg-alert-success/10',
  },
  transparent: {
    solid:
      'border-transparent bg-transparent text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800',
    wired:
      'border-transparent bg-transparent text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800',
  },
};
