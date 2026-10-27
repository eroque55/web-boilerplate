import { describe, expect, it } from 'vitest';

import {
  maskCEP,
  maskCNPJ,
  maskCPF,
  maskDate,
  maskPhone,
  maskTime,
  unMask,
} from './masks';

describe('masks', () => {
  it('remove tudo que não é dígito', () => {
    expect(unMask('(11) 98765-4321')).toBe('11987654321');
  });

  it('formata CPF conforme o usuário digita', () => {
    expect(maskCPF('529')).toBe('529');
    expect(maskCPF('5299822')).toBe('529.982.2');
    expect(maskCPF('52998224725')).toBe('529.982.247-25');
    expect(maskCPF('529.982.247-25999')).toBe('529.982.247-25');
  });

  it('formata CNPJ numérico e alfanumérico', () => {
    expect(maskCNPJ('112223')).toBe('11.222.3');
    expect(maskCNPJ('11222333000181')).toBe('11.222.333/0001-81');
    expect(maskCNPJ('12abc34501de35')).toBe('12.ABC.345/01DE-35');
  });

  it('formata telefone fixo e celular', () => {
    expect(maskPhone('1133334444')).toBe('(11) 3333-4444');
    expect(maskPhone('11987654321')).toBe('(11) 98765-4321');
  });

  it('formata CEP, data e hora', () => {
    expect(maskCEP('01310100')).toBe('01310-100');
    expect(maskDate('27102026')).toBe('27/10/2026');
    expect(maskTime('0930')).toBe('09:30');
  });
});
