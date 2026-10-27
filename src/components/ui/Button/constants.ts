export type TButtonColor =
  | 'primary'
  | 'primary-soft'
  | 'white'
  | 'ink'
  | 'gray-50'
  | 'transparent'
  | 'green'
  | 'yellow'
  | 'red';

export const BUTTON_MAP: Record<
  TButtonColor,
  { bg: string; hover: string; text: string }
> = {
  primary: {
    bg: 'bg-primary',
    hover: 'hover:bg-primary-deep',
    text: 'text-white',
  },
  'primary-soft': {
    bg: 'bg-primary-soft',
    hover: 'hover:bg-primary-soft2',
    text: 'text-primary-deep',
  },
  white: { bg: 'bg-white', hover: 'hover:bg-gray-50', text: 'text-ink' },
  ink: { bg: 'bg-ink', hover: 'hover:bg-ink2', text: 'text-white' },
  'gray-50': { bg: 'bg-gray-50', hover: 'hover:bg-gray-100', text: 'text-ink' },
  transparent: {
    bg: 'bg-transparent',
    hover: 'hover:bg-gray-100',
    text: 'text-ink',
  },
  green: { bg: 'bg-green', hover: 'hover:brightness-95', text: 'text-white' },
  yellow: { bg: 'bg-yellow', hover: 'hover:brightness-95', text: 'text-white' },
  red: { bg: 'bg-red', hover: 'hover:brightness-95', text: 'text-white' },
};
