// Referências aos tokens de src/styles/global.css (a fonte da verdade é o @theme).
// Use em props que pedem uma string de cor (ex.: <Icon color />) ou em style inline.
export const colors = {
  primary: 'var(--color-primary)',
  primaryDeep: 'var(--color-primary-deep)',
  primarySoft: 'var(--color-primary-soft)',
  primarySoft2: 'var(--color-primary-soft2)',
  ink: 'var(--color-ink)',
  ink2: 'var(--color-ink2)',
  bg: 'var(--color-bg)',
  green: 'var(--color-green)',
  greenSoft: 'var(--color-green-soft)',
  blue: 'var(--color-blue)',
  blueSoft: 'var(--color-blue-soft)',
  red: 'var(--color-red)',
  redSoft: 'var(--color-red-soft)',
  yellow: 'var(--color-yellow)',
  yellowSoft: 'var(--color-yellow-soft)',
} as const;
