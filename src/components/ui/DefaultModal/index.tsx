'use client';

import { useDefaultModalStore } from '@/stores/defaultModalStore';

import Button from '../Button';
import Icon from '../Icon';
import ModalBackdrop from '../ModalBackdrop';

import { MODAL_MAP } from './constants';

const DefaultModal = () => {
  const { modal, openModal, closeModal } = useDefaultModalStore();

  if (!modal) {
    return null;
  }

  const variant = MODAL_MAP[modal.type];

  const handleConfirm = async () => {
    if (modal.onConfirm) {
      await modal.onConfirm();
    }

    closeModal();

    if (modal.successMessage) {
      openModal({
        type: 'success',
        title: 'Sucesso!',
        message: modal.successMessage,
        confirmText: 'Voltar',
      });
    }
  };

  const handleCancel = async () => {
    if (modal.onCancel) {
      await modal.onCancel();
    }
    closeModal();
  };

  return (
    <ModalBackdrop onClose={modal.closeOnClickOutside ? closeModal : undefined}>
      <div
        aria-labelledby="default-modal-title"
        aria-modal="true"
        className="flex w-110 max-w-full flex-col items-center gap-5 rounded-2xl bg-white p-7 shadow-2xl"
        role="dialog"
      >
        <div
          className="rounded-full p-4"
          style={{ backgroundColor: variant.bgColor }}
        >
          <Icon color={variant.color} name={variant.name} />
        </div>

        <div className="flex w-full flex-col items-center gap-2">
          <h3
            className="text-center text-lg font-semibold"
            id="default-modal-title"
          >
            {modal.title}
          </h3>

          <p className="w-full text-center text-sm text-gray-700">
            {modal.message}
          </p>

          {modal.notice && (
            <p className="w-full text-center text-xs text-gray-400">
              {modal.notice}
            </p>
          )}
        </div>

        <div className="flex w-full items-center justify-center gap-2">
          {modal.cancelText && (
            <Button
              className="flex-1 border border-gray-200"
              color="white"
              text={modal.cancelText}
              textColor="text-gray-700"
              onClick={handleCancel}
            />
          )}

          <Button
            className="flex-1"
            color={variant.buttonColor}
            text={modal.confirmText}
            onClick={handleConfirm}
          />
        </div>
      </div>
    </ModalBackdrop>
  );
};

export default DefaultModal;
