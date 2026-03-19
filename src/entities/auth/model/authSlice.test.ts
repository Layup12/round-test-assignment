import { describe, expect, it } from 'vitest';

import { authSlice, clearCurrentUser, selectCurrentUserId, setCurrentUser } from './authSlice';

describe('selectCurrentUserId', () => {
  it('возвращает id текущего пользователя, если он установлен', () => {
    const state = {
      auth: { currentUserId: 'user-1' },
    };

    expect(selectCurrentUserId(state)).toBe('user-1');
  });

  it('возвращает null, если пользователь не авторизован', () => {
    const state = {
      auth: { currentUserId: null },
    };

    expect(selectCurrentUserId(state)).toBeNull();
  });

  it('корректно работает в связке с редьюсером', () => {
    const initialAuthState = authSlice.getInitialState();

    const withUser = authSlice.reducer(initialAuthState, setCurrentUser('user-1'));
    const cleared = authSlice.reducer(withUser, clearCurrentUser());

    expect(selectCurrentUserId({ auth: withUser })).toBe('user-1');
    expect(selectCurrentUserId({ auth: cleared })).toBeNull();
  });
});
