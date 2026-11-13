import { isValid, parse } from 'date-fns';

import { unMask } from './masks';

const CNPJ_FIRST_WEIGHTS = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
const CNPJ_SECOND_WEIGHTS = [6, ...CNPJ_FIRST_WEIGHTS];

const hasAllSameCharacters = (value: string) => /^(.)\1+$/.test(value);

const cpfCheckDigit = (digits: string) => {
  const factor = digits.length + 1;
  const sum = [...digits].reduce(
    (total, digit, index) => total + Number(digit) * (factor - index),
    0,
  );
  const rest = (sum * 10) % 11;
  return rest === 10 ? 0 : rest;
};

// Alphanumeric CNPJ assigns (ASCII code - 48) per character: '0'-'9' -> 0-9, 'A' -> 17.
const cnpjCheckDigit = (base: string, weights: number[]) => {
  const sum = weights.reduce(
    (total, weight, index) => total + (base.charCodeAt(index) - 48) * weight,
    0,
  );
  const rest = sum % 11;
  return rest < 2 ? 0 : 11 - rest;
};

export const validateCpf = (value: string) => {
  const cpf = unMask(value);

  if (cpf.length !== 11 || hasAllSameCharacters(cpf)) {
    return false;
  }

  return (
    cpfCheckDigit(cpf.slice(0, 9)) === Number(cpf[9]) &&
    cpfCheckDigit(cpf.slice(0, 10)) === Number(cpf[10])
  );
};

export const validateCnpj = (value: string) => {
  const cnpj = value.replace(/[^0-9a-z]/gi, '').toUpperCase();

  if (!/^[0-9A-Z]{12}\d{2}$/.test(cnpj) || hasAllSameCharacters(cnpj)) {
    return false;
  }

  return (
    cnpjCheckDigit(cnpj, CNPJ_FIRST_WEIGHTS) === Number(cnpj[12]) &&
    cnpjCheckDigit(cnpj, CNPJ_SECOND_WEIGHTS) === Number(cnpj[13])
  );
};

export const validateCpfOrCnpj = (value: string) =>
  validateCpf(value) || validateCnpj(value);

export const validatePhone = (value?: string) => {
  if (!value) {
    return false;
  }

  const phone = unMask(value);
  const areaCode = Number(phone.slice(0, 2));

  if (phone.length < 10 || phone.length > 11) {
    return false;
  }

  if (areaCode < 11 || hasAllSameCharacters(phone)) {
    return false;
  }

  return phone.length === 10 || phone[2] === '9';
};

export const validateDate = (
  date: string,
  minimumYear?: number,
  maximumYear?: number,
): boolean => {
  if (!date || !/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
    return false;
  }

  const parsedDate = parse(date, 'dd/MM/yyyy', new Date());

  if (!isValid(parsedDate)) {
    return false;
  }

  const currentYear = new Date().getFullYear();
  const minYear = minimumYear ?? currentYear - 200;
  const maxYear = maximumYear ?? currentYear + 200;
  const year = parsedDate.getFullYear();

  return year > minYear && year < maxYear;
};

export const validateTime = (value: string) =>
  /^([01]\d|2[0-3]):[0-5]\d$/.test(value);

export const validateRG = (rg: string) => {
  if (!rg || !/^[A-Za-z0-9]+$/.test(rg)) {
    return false;
  }

  return !/^(\d)\1{4,19}$/.test(rg);
};

export const validateLettersSpaces = (text?: string, acceptHyphen = false) => {
  if (!text) {
    return true;
  }

  const regex = acceptHyphen ? /^[A-Za-zÀ-ú\s-]+$/ : /^[A-Za-zÀ-ú\s]+$/;
  return regex.test(text);
};

export const validateUsername = (username: string) =>
  /^[a-zA-Z0-9._]+$/.test(username);
