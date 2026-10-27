'use client';

import { MouseEvent, PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useModalEscapeAndScrollLock } from '@/hooks/useModalEscapeAndScrollLock';

type Props = {
  onClose?: () => void;
};

// Sem `onClose` o modal não fecha por clique fora nem por Esc.
const ModalBackdrop = ({ onClose, children }: PropsWithChildren<Props>) => {
  const [mounted, setMounted] = useState(false);

  useModalEscapeAndScrollLock(true, onClose);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClickOutside = (e: MouseEvent<HTMLDivElement>) => {
    if (onClose && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-100 flex animate-fade-in items-center justify-center bg-black/20 p-4 backdrop-blur-xs"
      onClick={handleClickOutside}
    >
      {children}
    </div>,
    document.body,
  );
};

export default ModalBackdrop;
