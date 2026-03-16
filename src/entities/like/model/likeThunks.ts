import type { AppDispatch, RootState } from '@app/store';

import { selectCurrentUserId } from '../../auth/model/authSlice';
import { toggleLike } from './likeSlice';

export const toggleLikeForPost = (postId: string) => (dispatch: AppDispatch, getState: () => RootState) => {
  const state = getState();
  const currentUserId = selectCurrentUserId(state);

  if (!currentUserId) {
    return;
  }

  dispatch(
    toggleLike({
      userId: currentUserId,
      postId,
    }),
  );
};
