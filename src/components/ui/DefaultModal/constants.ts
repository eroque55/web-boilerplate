import { ModalType } from '@/store/defaultModalStore';
import { colors } from '@/theme/colors';

import { ButtonVariant } from '../Button/constants';
import { TIcon } from '../Icon';

export const MODAL_VARIANTS: Record<
  ModalType,
  {
    icon: TIcon;
    iconColor: string;
    badgeClassName: string;
    buttonVariant: ButtonVariant;
  }
> = {
  default: {
    icon: 'WarningCircleIcon',
    iconColor: colors.primary,
    badgeClassName: 'bg-primary/10 dark:bg-primary/20',
    buttonVariant: 'primary',
  },
  success: {
    icon: 'CheckCircleIcon',
    iconColor: colors.alert.success,
    badgeClassName: 'bg-alert-success/10 dark:bg-alert-success/20',
    buttonVariant: 'success',
  },
  error: {
    icon: 'WarningTriangleIcon',
    iconColor: colors.alert.error,
    badgeClassName: 'bg-alert-error/10 dark:bg-alert-error/20',
    buttonVariant: 'danger',
  },
};
