import { createEntityAdapter, createSlice, nanoid } from '@reduxjs/toolkit';

export interface PostEntity {
  id: string;
  authorId: string;
  text: string;
  createdAt: string;
}

const postAdapter = createEntityAdapter<PostEntity>();

export const postSlice = createSlice({
  name: 'posts',
  initialState: postAdapter.getInitialState(),
  reducers: {
    addPost: {
      reducer: postAdapter.addOne,
      prepare: (params: { authorId: string; text: string }) => ({
        payload: {
          id: nanoid(),
          authorId: params.authorId,
          text: params.text,
          createdAt: new Date().toISOString(),
        },
      }),
    },
    setPosts: postAdapter.setAll,
    removePost: postAdapter.removeOne,
  },
});

export const { addPost, setPosts, removePost } = postSlice.actions;

export const { selectById: selectPostById, selectAll: selectAllPosts } = postAdapter.getSelectors();
