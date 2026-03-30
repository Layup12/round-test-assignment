import { createEntityAdapter, createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

export interface UserEntity {
  id: string;
  name: string;
  avatarPath?: string;
}

const userAdapter = createEntityAdapter<UserEntity>();

export const userSlice = createSlice({
  name: 'users',
  initialState: userAdapter.getInitialState(),
  reducers: {
    addUser: {
      reducer: userAdapter.addOne,
      prepare: (name: string) => ({
        payload: {
          id: nanoid(),
          name,
        },
      }),
    },
    setUsers: userAdapter.setAll,
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
    setUserAvatar: (
      state,
      action: PayloadAction<{
        userId: string;
        avatarPath: string | null;
      }>,
    ) => {
      const { userId, avatarPath } = action.payload;
      userAdapter.updateOne(state, {
        id: userId,
        changes: avatarPath === null ? { avatarPath: undefined } : { avatarPath },
      });
    },
  },
});

export const { addUser, setUsers, renameUserIfUnique, setUserAvatar } = userSlice.actions;

export const { selectById: selectUserById, selectAll: selectAllUsers } = userAdapter.getSelectors();
