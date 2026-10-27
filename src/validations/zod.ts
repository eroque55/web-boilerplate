// eslint-disable-next-line no-restricted-imports
import { z } from 'zod';

z.config({
  ...z.locales.pt(),
  customError: issue => {
    if (!issue.input) {
      return 'Campo obrigatório';
    }

    if (issue.code === 'too_small') {
      if (issue.minimum === 1) {
        return 'Campo obrigatório';
      }
      return `Mínimo de ${issue.minimum} caracteres`;
    }

    if (issue.code === 'too_big') {
      return `Máximo de ${issue.maximum} caracteres`;
    }

    if (issue.format === 'email' && issue.code === 'invalid_format') {
      return 'E-mail inválido';
    }

    return 'Campo inválido';
  },
});

export default z;

export const zOption = z.object({
  value: z.string(),
  label: z.string(),
});

export const zPassword = z
  .string()
  .min(8)
  .regex(/[A-Z]/, 'Deve conter letra maiúscula')
  .regex(/[a-z]/, 'Deve conter letra minúscula')
  .regex(/[0-9]/, 'Deve conter pelo menos um número');
