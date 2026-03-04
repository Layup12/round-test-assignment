import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

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
  },
});

export const { addOne: addUser, setAll: setUsers, updateOne: updateUser } = userSlice.actions;

export const { selectById: selectUserById, selectAll: selectAllUsers } = userAdapter.getSelectors();
