'use client';

import { MouseEvent, PropsWithChildren, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

import { useModalEscapeAndScrollLock } from '@/hooks/common';

type Props = {
  onClose?: () => void;
};

const subscribe = () => () => {};

const ModalBackdrop = ({ onClose, children }: PropsWithChildren<Props>) => {
  const isMounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  useModalEscapeAndScrollLock(isMounted, onClose);

  const handleClickOutside = (e: MouseEvent<HTMLDivElement>) => {
    if (onClose && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-100 flex animate-fade-in items-center justify-center bg-black/40 p-4 backdrop-blur-xs"
      onClick={handleClickOutside}
    >
      {children}
    </div>,
    document.body,
  );
};

export default ModalBackdrop;
