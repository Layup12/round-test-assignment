import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  currentUserId: string | null;
}

const initialState: AuthState = {
  currentUserId: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: { payload: string }) => {
      state.currentUserId = action.payload;
    },
    clearCurrentUser: (state) => {
      state.currentUserId = null;
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = authSlice.actions;

export const selectCurrentUserId = (state: { auth: AuthState }) => state.auth.currentUserId;
