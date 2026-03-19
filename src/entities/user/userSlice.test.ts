import { describe, expect, it } from 'vitest';

import { renameUserIfUnique, userSlice } from './userSlice';

const createState = () => {
  const initialState = userSlice.getInitialState();

  return {
    ...initialState,
    ids: ['1', '2'],
    entities: {
      '1': { id: '1', name: 'Alice' },
      '2': { id: '2', name: 'Bob' },
    },
  };
};

describe('renameUserIfUnique', () => {
  it('переименовывает пользователя, если имя достаточно длинное и уникальное (с обрезкой пробелов)', () => {
    const stateWithUsers = createState();

    const action = renameUserIfUnique({
      id: '1',
      name: '  Charlie  ',
    });

    const nextState = userSlice.reducer(stateWithUsers, action);

    expect(nextState.entities['1']?.name).toBe('Charlie');
  });

  it('не меняет состояние, если новое имя после trim слишком короткое', () => {
    const stateWithUsers = createState();

    const action = renameUserIfUnique({
      id: '1',
      name: '  Ab  ',
    });

    const nextState = userSlice.reducer(stateWithUsers, action);

    expect(nextState.entities['1']?.name).toBe('Alice');
    expect(nextState).toEqual(stateWithUsers);
  });

  it('не меняет состояние, если у другого пользователя уже есть такое имя', () => {
    const stateWithUsers = createState();

    const action = renameUserIfUnique({
      id: '1',
      name: '  Bob  ',
    });

    const nextState = userSlice.reducer(stateWithUsers, action);

    expect(nextState.entities['1']?.name).toBe('Alice');
  });

  it('не меняет состояние, если пользователя с переданным id не существует', () => {
    const stateWithUsers = createState();

    const action = renameUserIfUnique({
      id: '3',
      name: 'Charlie',
    });

    const nextState = userSlice.reducer(stateWithUsers, action);

    expect(nextState).toEqual(stateWithUsers);
  });
});
