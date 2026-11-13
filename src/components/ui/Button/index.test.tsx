import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { act, fireEvent, renderWithProviders, screen } from '@/test/utils';

import Button from './index';

describe('Button', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the given text', () => {
    renderWithProviders(<Button text="Entrar" />);

    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    renderWithProviders(<Button text="Entrar" onClick={onClick} />);

    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('ignores repeated clicks during the blocking delay and re-enables afterwards', async () => {
    const onClick = vi.fn();
    renderWithProviders(<Button text="Entrar" onClick={onClick} />);

    const button = screen.getByRole('button', { name: 'Entrar' });

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);

    await act(() => vi.advanceTimersByTimeAsync(1000));

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('allows consecutive clicks when withoutDelay is set', () => {
    const onClick = vi.fn();
    renderWithProviders(
      <Button withoutDelay text="Entrar" onClick={onClick} />,
    );

    const button = screen.getByRole('button', { name: 'Entrar' });

    fireEvent.click(button);
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('shows the loading indicator when isLoading', () => {
    renderWithProviders(<Button isLoading text="Entrar" />);

    expect(screen.getByTestId('button-activity-indicator')).toBeInTheDocument();
  });

  it('does not show the indicator when not loading', () => {
    renderWithProviders(<Button text="Entrar" />);

    expect(screen.queryByTestId('button-activity-indicator')).toBeNull();
  });
});
