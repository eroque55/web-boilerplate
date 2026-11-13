import { describe, expect, it } from 'vitest';

import {
  cleanMessage,
  formatCurrency,
  formatDateToEnUs,
  formatDateToPtBr,
  matchText,
  normalize,
  normalizeSearch,
} from './format';

describe('format', () => {
  it('formats BRL currency values', () => {
    expect(formatCurrency(1234.56)).toMatch(/R\$\s*1\.234,56/);
  });

  it('strips non-digit characters in normalize', () => {
    expect(normalize('123.456.789-00')).toBe('12345678900');
  });

  it('converts dates between pt-BR and ISO formats', () => {
    expect(formatDateToEnUs('25/12/2026')).toBe('2026-12-25');
    expect(formatDateToPtBr('2026-12-25')).toBe('25/12/2026');
    expect(formatDateToPtBr(undefined)).toBe('');
  });

  it('collapses trailing whitespace and excessive blank lines', () => {
    expect(cleanMessage('Hello\n\n\n\nWorld   ')).toBe('Hello\n\nWorld');
    expect(cleanMessage(undefined)).toBe('');
  });

  it('matches text case- and accent-insensitively', () => {
    expect(normalizeSearch('São Paulo')).toBe('sao paulo');
    expect(matchText('Anotação Rápida', 'anotacao')).toBe(true);
    expect(matchText('Anotação Rápida', 'outro')).toBe(false);
  });
});
