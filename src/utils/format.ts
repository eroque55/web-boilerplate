import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns';

// parseISO trata 'yyyy-MM-dd' como horário local; `new Date('2026-10-27')`
// seria meia-noite UTC e mostraria o dia anterior no Brasil.
const toDate = (date: Date | string) =>
  typeof date === 'string' ? parseISO(date) : date;

export const formatCurrency = (value = 0) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

export const formatDate = (date: Date | string, pattern = 'dd/MM/yyyy') => {
  const parsedDate = toDate(date);
  return isValid(parsedDate) ? format(parsedDate, pattern) : '-';
};

export const formatRelativeDate = (date: Date | string) => {
  const parsedDate = toDate(date);
  return isValid(parsedDate)
    ? formatDistanceToNow(parsedDate, { addSuffix: true })
    : '';
};

export const getNameInitials = (name?: string) => {
  if (!name) {
    return '';
  }

  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};
