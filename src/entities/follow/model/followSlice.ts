import { createEntityAdapter, createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

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
    addOne: {
      reducer: (state, action: PayloadAction<FollowEntity>) => {
        const { followerId, followingId } = action.payload;

        if (followerId === followingId) {
          return;
        }

        const exists = state.ids.some((existingId) => {
          const follow = state.entities[existingId];

          return follow?.followerId === followerId && follow.followingId === followingId;
        });

        if (exists) {
          return;
        }

        followAdapter.addOne(state, action);
      },
      prepare: (followerId: string, followingId: string) => ({
        payload: {
          id: nanoid(),
          followerId,
          followingId,
        },
      }),
    },
    removeOne: followAdapter.removeOne,
  },
});

export const { addOne: addFollow, removeOne: removeFollow } = followSlice.actions;

export const {
  selectById: selectFollowById,
  selectAll: selectAllFollows,
  selectIds: selectFollowIds,
} = followAdapter.getSelectors();
