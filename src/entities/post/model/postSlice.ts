import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

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
    addOne: postAdapter.addOne,
    setAll: postAdapter.setAll,
    removeOne: postAdapter.removeOne,
  },
});

export const { addOne: addPost, setAll: setPosts, removeOne: removePost } = postSlice.actions;

export const { selectById: selectPostById, selectAll: selectAllPosts } = postAdapter.getSelectors();
