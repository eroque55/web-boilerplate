import { create } from 'zustand';

export type ModalType = 'default' | 'success' | 'error';

export type DefaultModalProps = {
  type: ModalType;
  title: string;
  message: string;
  confirmText: string;
  notice?: string;
  onConfirm?: () => Promise<void> | void;
  cancelText?: string;
  onCancel?: () => Promise<void> | void;
  successMessage?: string;
  closeOnClickOutside?: boolean;
};

type Store = {
  modal: DefaultModalProps | null;
  openModal: (props: DefaultModalProps) => void;
  closeModal: () => void;
};

export const useDefaultModalStore = create<Store>(set => ({
  modal: null,
  openModal: props => set({ modal: props }),
  closeModal: () => set({ modal: null }),
}));
