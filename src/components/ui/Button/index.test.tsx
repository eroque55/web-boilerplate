import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Button from '.';

describe('Button', () => {
  it('chama onClick ao clicar', async () => {
    const onClick = vi.fn();
    render(<Button text="Salvar" onClick={onClick} />);

    await userEvent.click(screen.getByRole('button', { name: 'Salvar' }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('ignora cliques repetidos enquanto a ação anterior está no delay', async () => {
    const onClick = vi.fn();
    render(<Button text="Salvar" onClick={onClick} />);

    const button = screen.getByRole('button', { name: 'Salvar' });
    await userEvent.click(button);
    await userEvent.click(button);

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('não dispara onClick quando desabilitado', async () => {
    const onClick = vi.fn();
    render(<Button disabled text="Salvar" onClick={onClick} />);

    await userEvent.click(screen.getByRole('button', { name: 'Salvar' }));

    expect(screen.getByRole('button', { name: 'Salvar' })).toBeDisabled();
    expect(onClick).not.toHaveBeenCalled();
  });
});
