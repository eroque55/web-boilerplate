import { describe, expect, it } from 'vitest';

import {
  validateCnpj,
  validateCpf,
  validateCpfOrCnpj,
  validateDate,
  validateLettersSpaces,
  validatePhone,
  validateRG,
  validateTime,
  validateUsername,
} from './validators';

describe('validators', () => {
  it('validates CPF check digits and rejects repeated digits', () => {
    expect(validateCpf('529.982.247-25')).toBe(true);
    expect(validateCpf('529.982.247-00')).toBe(false);
    expect(validateCpf('111.111.111-11')).toBe(false);
  });

  it('validates numeric and alphanumeric CNPJs', () => {
    expect(validateCnpj('11.222.333/0001-81')).toBe(true);
    expect(validateCnpj('12.ABC.345/01DE-35')).toBe(true);
    expect(validateCnpj('11.222.333/0001-00')).toBe(false);
    expect(validateCnpj('00.000.000/0000-00')).toBe(false);
  });

  it('validates CPF or CNPJ together', () => {
    expect(validateCpfOrCnpj('52998224725')).toBe(true);
    expect(validateCpfOrCnpj('11222333000181')).toBe(true);
    expect(validateCpfOrCnpj('invalid')).toBe(false);
  });

  it('validates Brazilian landline and mobile phone numbers', () => {
    expect(validatePhone('(11) 98765-4321')).toBe(true);
    expect(validatePhone('(11) 3456-7890')).toBe(true);
    expect(validatePhone('(11) 88765-4321')).toBe(false);
    expect(validatePhone('(05) 98765-4321')).toBe(false);
    expect(validatePhone('')).toBe(false);
  });

  it('validates dd/MM/yyyy dates and HH:mm times', () => {
    expect(validateDate('29/02/2024')).toBe(true);
    expect(validateDate('29/02/2025')).toBe(false);
    expect(validateTime('23:59')).toBe(true);
    expect(validateTime('24:00')).toBe(false);
  });

  it('validates RG, names and usernames', () => {
    expect(validateRG('12345678X')).toBe(true);
    expect(validateRG('111111111')).toBe(false);
    expect(validateLettersSpaces('João Silva')).toBe(true);
    expect(validateLettersSpaces('Maria-Clara', true)).toBe(true);
    expect(validateLettersSpaces('João 123')).toBe(false);
    expect(validateUsername('eduardo.roque_1')).toBe(true);
    expect(validateUsername('invalid space')).toBe(false);
  });
});
