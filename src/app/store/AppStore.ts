import { authSlice, followSlice, likeSlice, postSlice, userSlice } from '@entities';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { safeRehydratePersistedState } from './safeRehydrate';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  users: userSlice.reducer,
  posts: postSlice.reducer,
  follows: followSlice.reducer,
  likes: likeSlice.reducer,
});

const persistConfig = {
  key: 'roundRoot',
  storage,
  version: 1,
  migrate: safeRehydratePersistedState,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const appStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const appPersistStore = persistStore(appStore);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof appStore.dispatch;
