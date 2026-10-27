import { ModalType } from '@/stores/defaultModalStore';
import { colors } from '@/styles/theme';

import { TButtonColor } from '../Button/constants';
import { TIcon } from '../Icon';

export const MODAL_MAP: Record<
  ModalType,
  { name: TIcon; color: string; bgColor: string; buttonColor: TButtonColor }
> = {
  default: {
    name: 'WarningCircleIcon',
    color: colors.primary,
    bgColor: colors.primarySoft,
    buttonColor: 'primary',
  },
  success: {
    name: 'CheckCircleIcon',
    color: colors.green,
    bgColor: colors.greenSoft,
    buttonColor: 'green',
  },
  error: {
    name: 'WarningTriangleIcon',
    color: colors.red,
    bgColor: colors.redSoft,
    buttonColor: 'red',
  },
};
