import type { AppDispatch, RootState } from '@app/store';
import { describe, expect, it, vi } from 'vitest';

import { addUser } from '../../user';
import { setCurrentUser } from './authSlice';
import { loginByName } from './authThunks';

const createState = (users: Array<{ id: string; name: string }>): RootState =>
  ({
    auth: {
      currentUserId: null,
    },
    users: {
      ids: users.map((user) => user.id),
      entities: users.reduce<Record<string, { id: string; name: string }>>((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {}),
    },
    posts: {
      ids: [],
      entities: {},
    },
    follows: {
      ids: [],
      entities: {},
    },
    likes: {
      ids: [],
      entities: {},
    },
  }) as RootState;

describe('loginByName', () => {
  it('логинит существующего пользователя без создания нового', () => {
    const existingUser = { id: '1', name: 'Alice' };

    const getState = vi.fn(() => createState([existingUser])) as unknown as () => RootState;
    const dispatch = vi.fn() as unknown as AppDispatch;

    const thunk = loginByName('Alice');

    thunk(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(setCurrentUser(existingUser.id));
    expect(
      (dispatch as unknown as ReturnType<typeof vi.fn>).mock.calls.some(
        ([action]) => action.type === addUser.type,
      ),
    ).toBe(false);
  });

  it('создаёт нового пользователя и логинит его, если такого имени нет', () => {
    const getState = vi.fn(() => createState([])) as unknown as () => RootState;
    const dispatchMock = vi.fn();
    const dispatch = dispatchMock as unknown as AppDispatch;

    const thunk = loginByName('  Bob  ');

    thunk(dispatch, getState);

    const addUserCall = dispatchMock.mock.calls.find(([action]) => action.type === addUser.type);

    expect(addUserCall).toBeDefined();

    const addUserAction = addUserCall?.[0] as ReturnType<typeof addUser>;

    expect(addUserAction.payload.name).toBe('Bob');

    expect(dispatchMock).toHaveBeenCalledWith(setCurrentUser(addUserAction.payload.id));
  });

  it('ничего не делает для пустого имени', () => {
    const getState = vi.fn(() => createState([])) as unknown as () => RootState;
    const dispatch = vi.fn() as unknown as AppDispatch;

    const thunk = loginByName('   ');

    thunk(dispatch, getState);

    expect(dispatch).not.toHaveBeenCalled();
  });
});
