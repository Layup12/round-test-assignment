import { createEntityAdapter, createSlice, nanoid } from '@reduxjs/toolkit';

export interface LikeEntity {
  id: string;
  userId: string;
  postId: string;
}

const likeAdapter = createEntityAdapter<LikeEntity>();

export const likeSlice = createSlice({
  name: 'likes',
  initialState: likeAdapter.getInitialState(),
  reducers: {
    toggleLike: (state, action: { payload: { userId: string; postId: string } }) => {
      const { userId, postId } = action.payload;

      const existingLikeId = state.ids.find((id) => {
        const like = state.entities[id];

        return like?.userId === userId && like.postId === postId;
      });

      if (existingLikeId) {
        likeAdapter.removeOne(state, existingLikeId);

        return;
      }

      likeAdapter.addOne(state, {
        id: nanoid(),
        userId,
        postId,
      });
    },
  },
});

export const { toggleLike } = likeSlice.actions;

export const {
  selectAll: selectAllLikes,
  selectById: selectLikeById,
  selectIds: selectLikeIds,
} = likeAdapter.getSelectors();
