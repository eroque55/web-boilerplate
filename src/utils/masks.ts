export const unMask = (value: string) => value.replace(/\D/g, '');

const unMaskAlphanumeric = (value: string) =>
  value.replace(/[^0-9a-z]/gi, '').toUpperCase();

export const maskCPF = (value: string) =>
  unMask(value)
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

// Aceita o CNPJ alfanumérico (letras nas 12 primeiras posições), vigente desde jul/2026.
export const maskCNPJ = (value: string) =>
  unMaskAlphanumeric(value)
    .slice(0, 14)
    .replace(/^(\w{2})(\w)/, '$1.$2')
    .replace(/^(\w{2})\.(\w{3})(\w)/, '$1.$2.$3')
    .replace(/\.(\w{3})(\w)/, '.$1/$2')
    .replace(/(\w{4})(\w)/, '$1-$2');

export const maskPhone = (value: string) => {
  const digits = unMask(value).slice(0, 11);
  const withAreaCode = digits.replace(/^(\d{2})(\d)/, '($1) $2');

  return digits.length <= 10
    ? withAreaCode.replace(/(\d{4})(\d)/, '$1-$2')
    : withAreaCode.replace(/(\d{5})(\d)/, '$1-$2');
};

export const maskCEP = (value: string) =>
  unMask(value)
    .slice(0, 8)
    .replace(/^(\d{5})(\d)/, '$1-$2');

export const maskDate = (value: string) =>
  unMask(value)
    .slice(0, 8)
    .replace(/^(\d{2})(\d)/, '$1/$2')
    .replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');

export const maskTime = (value: string) =>
  unMask(value)
    .slice(0, 4)
    .replace(/^(\d{2})(\d)/, '$1:$2');
