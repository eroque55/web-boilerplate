'use client';

// eslint-disable-next-line no-restricted-imports
import NextImage, { ImageProps } from 'next/image';
import { useState } from 'react';

import { cn } from '@/utils/cn';

import Shimmer from '../Shimmer';

type Props = {
  showShimmer?: boolean;
  containerClassName?: string;
} & ImageProps;

const Image = ({
  showShimmer = false,
  containerClassName,
  className,
  onLoad,
  alt,
  ...props
}: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn('relative overflow-hidden', containerClassName)}>
      <NextImage
        alt={alt}
        className={className}
        onLoad={event => {
          setIsLoading(false);
          onLoad?.(event);
        }}
        {...props}
      />

      {isLoading && showShimmer && <Shimmer className="absolute inset-0" />}
    </div>
  );
};

export default Image;
