import * as IconAssets from '@/assets/icons/index';
import { cn } from '@/utils/cn';

export type TIcon = keyof typeof IconAssets;

export type IconProps = {
  name: TIcon;
  size?: number;
  color?: string;
  strokeWidth?: number;
  rotate?: number;
  fill?: string;
  className?: string;
};

const Icon = ({
  name,
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  rotate = 0,
  fill = 'none',
  className,
}: IconProps) => {
  const IconAsset = IconAssets[name];

  if (!IconAsset) {
    return null;
  }

  return (
    <IconAsset
      className={cn('shrink-0 overflow-visible', className)}
      fill={fill}
      height={size}
      strokeWidth={strokeWidth}
      style={{ color, rotate: rotate ? `${rotate}deg` : undefined }}
      width={size}
    />
  );
};

export default Icon;
