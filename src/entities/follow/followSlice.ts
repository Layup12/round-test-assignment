import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export interface FollowEntity {
  id: string;
  followerId: string;
  followingId: string;
}

const followAdapter = createEntityAdapter<FollowEntity>();

export const followSlice = createSlice({
  name: 'follows',
  initialState: followAdapter.getInitialState(),
  reducers: {
    addOne: followAdapter.addOne,
    removeOne: followAdapter.removeOne,
  },
});

export const { addOne: addFollow, removeOne: removeFollow } = followSlice.actions;

export const {
  selectById: selectFollowById,
  selectAll: selectAllFollows,
  selectIds: selectFollowIds,
} = followAdapter.getSelectors();
