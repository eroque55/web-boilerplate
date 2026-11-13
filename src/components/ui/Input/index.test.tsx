import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { describe, expect, it } from 'vitest';

import { renderWithProviders, screen, userEvent } from '@/test/utils';
import z from '@/validation/zod';

import Button from '../Button';

import Input from './index';

const schema = z.object({
  email: z.string().min(1),
});

type Form = z.infer<typeof schema>;

type HostProps = {
  isPassword?: boolean;
  label?: string;
  placeholder?: string;
};

const FormHost = ({ isPassword, label, placeholder }: HostProps) => {
  const { control, handleSubmit } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  return (
    <form onSubmit={handleSubmit(() => {})}>
      <Input
        control={control}
        isPassword={isPassword}
        label={label}
        name="email"
        placeholder={placeholder}
      />

      <Button withoutDelay text="Enviar" type="submit" />
    </form>
  );
};

describe('Input', () => {
  it('renders the label and the placeholder', () => {
    renderWithProviders(
      <FormHost label="E-mail" placeholder="Digite seu e-mail" />,
    );

    expect(screen.getByText('E-mail')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Digite seu e-mail'),
    ).toBeInTheDocument();
  });

  it('updates the form value on typing', async () => {
    renderWithProviders(<FormHost placeholder="E-mail" />);

    await userEvent.type(
      screen.getByPlaceholderText('E-mail'),
      'contato@exemplo.com',
    );

    expect(screen.getByDisplayValue('contato@exemplo.com')).toBeInTheDocument();
  });

  it('shows the validation error message', async () => {
    renderWithProviders(<FormHost placeholder="E-mail" />);

    expect(screen.queryByText('Campo obrigatório')).toBeNull();

    await userEvent.click(screen.getByRole('button', { name: 'Enviar' }));

    expect(await screen.findByText('Campo obrigatório')).toBeInTheDocument();
  });

  it('toggles password visibility when the eye button is clicked', async () => {
    renderWithProviders(<FormHost isPassword placeholder="Senha" />);

    const input = screen.getByPlaceholderText('Senha');
    expect(input).toHaveAttribute('type', 'password');

    await userEvent.click(screen.getByTestId('input-password-toggle'));

    expect(input).toHaveAttribute('type', 'text');
  });
});
