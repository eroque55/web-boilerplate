import { cn } from '@/utils/cn';
import * as Assets from '@public/svg/index';

export type TIcon = keyof typeof Assets;

export type TIconProps = {
  name: TIcon;
  size?: number;
  color?: string;
  strokeWidth?: number;
  rotate?: number;
  fill?: string;
  className?: string;
};

// A cor vai por `style` (e não pelo atributo SVG) para aceitar var(--color-*).
const Icon = ({
  name,
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  rotate = 0,
  fill = 'none',
  className,
}: TIconProps) => {
  return Assets[name]({
    width: size,
    height: size,
    strokeWidth,
    fill,
    className: cn('shrink-0 overflow-visible', className),
    style: { color, rotate: `${rotate}deg` },
  });
};

export default Icon;
