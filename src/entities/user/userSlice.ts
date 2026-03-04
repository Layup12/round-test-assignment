import { createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface UserEntity {
  id: string;
  name: string;
}

const userAdapter = createEntityAdapter<UserEntity>();

export const userSlice = createSlice({
  name: 'users',
  initialState: userAdapter.getInitialState(),
  reducers: {
    addOne: userAdapter.addOne,
    setAll: userAdapter.setAll,
    updateOne: userAdapter.updateOne,
    renameUserIfUnique: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
      }>,
    ) => {
      const { id, name } = action.payload;
      const trimmed = name.trim();

      if (trimmed.length < 4) {
        return;
      }

      const entities = state.entities;

      const hasDuplicateName = Object.values(entities).some(
        (user) => user && user.id !== id && user.name === trimmed,
      );

      if (hasDuplicateName) {
        return;
      }

      userAdapter.updateOne(state, {
        id,
        changes: { name: trimmed },
      });
    },
  },
});

export const { addOne: addUser, setAll: setUsers, renameUserIfUnique } = userSlice.actions;

export const { selectById: selectUserById, selectAll: selectAllUsers } = userAdapter.getSelectors();
