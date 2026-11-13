'use client';

import { useDefaultModal } from '@/store/defaultModalStore';

import Button from '../Button';
import Icon from '../Icon';
import ModalBackdrop from '../ModalBackdrop';

import { MODAL_VARIANTS } from './constants';

const DefaultModal = () => {
  const { modal, openModal, closeModal } = useDefaultModal();

  if (!modal) {
    return null;
  }

  const variant = MODAL_VARIANTS[modal.type ?? 'default'];

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
        className="flex w-full max-w-md flex-col items-center gap-5 rounded-2xl border border-neutral-200 bg-white p-6
          shadow-2xl dark:border-neutral-800 dark:bg-neutral-900"
        role="dialog"
      >
        <div className={`rounded-full p-3.5 ${variant.badgeClassName}`}>
          <Icon color={variant.iconColor} name={variant.icon} />
        </div>

        <div className="flex w-full flex-col items-center gap-2 text-center">
          <h3
            className="text-lg font-semibold text-neutral-900 dark:text-neutral-100"
            id="default-modal-title"
          >
            {modal.title}
          </h3>

          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            {modal.message}
          </p>

          {modal.notice && (
            <p className="text-xs text-neutral-400">{modal.notice}</p>
          )}
        </div>

        <div className="flex w-full items-center gap-2.5">
          {modal.cancelText && (
            <Button
              className="flex-1"
              text={modal.cancelText}
              variant="neutral"
              onClick={handleCancel}
            />
          )}

          <Button
            className="flex-1"
            text={modal.confirmText}
            variant={variant.buttonVariant}
            onClick={handleConfirm}
          />
        </div>
      </div>
    </ModalBackdrop>
  );
};

export default DefaultModal;
