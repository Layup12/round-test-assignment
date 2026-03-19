import '@testing-library/jest-dom/vitest';

import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import { AuthPage } from './AuthPage';

vi.mock('@app/store', () => ({
  useAppDispatch: () => vi.fn(),
}));

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

describe('AuthPage', () => {
  it('при первом рендере фокус на инпуте и кнопка неактивна', () => {
    render(
      <MemoryRouter>
        <MantineProvider>
          <AuthPage />
        </MantineProvider>
      </MemoryRouter>,
    );

    const input = screen.getByLabelText('Имя пользователя');
    const submitButton = screen.getByRole('button', { name: 'Продолжить' });

    expect(input).toHaveFocus();
    expect(submitButton).toBeDisabled();
  });

  it('делает кнопку активной при валидном имени', async () => {
    render(
      <MemoryRouter>
        <MantineProvider>
          <AuthPage />
        </MantineProvider>
      </MemoryRouter>,
    );

    const input = screen.getByLabelText('Имя пользователя');
    const submitButton = screen.getByRole('button', { name: 'Продолжить' });

    expect(submitButton).toBeDisabled();

    await userEvent.type(input, 'Bobby');

    expect(submitButton).toBeEnabled();
  });

  it('оставляет кнопку неактивной при слишком коротком имени', async () => {
    render(
      <MemoryRouter>
        <MantineProvider>
          <AuthPage />
        </MantineProvider>
      </MemoryRouter>,
    );

    const input = screen.getByLabelText('Имя пользователя');
    const submitButton = screen.getByRole('button', { name: 'Продолжить' });

    await userEvent.type(input, 'Bob');

    expect(submitButton).toBeDisabled();
  });

  it('ограничивает ввод имени максимум 12 символами', async () => {
    render(
      <MemoryRouter>
        <MantineProvider>
          <AuthPage />
        </MantineProvider>
      </MemoryRouter>,
    );

    const input = screen.getByLabelText('Имя пользователя') as HTMLInputElement;

    await userEvent.type(input, 'ABCDEFGHIJKLMNO');

    expect(input.value.length).toBe(12);
  });
});
