import '@testing-library/jest-dom/vitest';

import { renderHook } from '@testing-library/react';
import type { SubmitEvent } from 'react';
import { act } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useAuthForm } from './useAuthForm';

const navigateMock = vi.fn();
const dispatchMock = vi.fn();

vi.mock('@app/store', () => ({
  useAppDispatch: () => dispatchMock,
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');

  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

beforeEach(() => {
  dispatchMock.mockClear();
  navigateMock.mockClear();
});

const correctName = 'Bobby';
const incorrectName = '  Bob  ';
const maxLengthName = 'A'.repeat(12);
const tooLongName = 'B'.repeat(13);

describe('useAuthForm', () => {
  it('отражает валидное состояние isValid для имени достаточной длины (с учётом trim)', () => {
    const { result } = renderHook(() => useAuthForm());

    expect(result.current.isValid).toBe(false);

    act(() => {
      result.current.setName(correctName);
    });

    expect(result.current.isValid).toBe(true);
  });

  it('отражает невалидное состояние isValid для слишком короткого имени', () => {
    const { result } = renderHook(() => useAuthForm());

    act(() => {
      result.current.setName(incorrectName);
    });

    expect(result.current.isValid).toBe(false);
  });

  it('считает имя валидным, если длина после trim ровно 12 символов', () => {
    const { result } = renderHook(() => useAuthForm());

    act(() => {
      result.current.setName(maxLengthName);
    });

    expect(result.current.isValid).toBe(true);
  });

  it('считает имя невалидным, если длина после trim больше 12 символов', () => {
    const { result } = renderHook(() => useAuthForm());

    act(() => {
      result.current.setName(tooLongName);
    });

    expect(result.current.isValid).toBe(false);
  });

  it('диспатчит авторизацию и навигируется на /feed при валидном имени', () => {
    const { result } = renderHook(() => useAuthForm());

    act(() => {
      result.current.setName(correctName);
    });

    const event = { preventDefault: vi.fn() } as unknown as SubmitEvent<HTMLFormElement>;

    act(() => {
      result.current.handleSubmit(event);
    });

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith('/feed', { replace: true });
  });

  it('не диспатчит и не навигируется при слишком коротком имени', () => {
    const { result } = renderHook(() => useAuthForm());

    act(() => {
      result.current.setName(incorrectName);
    });

    const event = { preventDefault: vi.fn() } as unknown as SubmitEvent<HTMLFormElement>;

    act(() => {
      result.current.handleSubmit(event);
    });

    expect(dispatchMock).not.toHaveBeenCalled();
    expect(navigateMock).not.toHaveBeenCalled();
  });
});
