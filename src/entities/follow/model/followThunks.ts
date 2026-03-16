import type { AppDispatch, RootState } from '@app/store';

import { selectCurrentUserId } from '../../auth/model/authSlice';
import { addFollow, removeFollow, selectAllFollows } from './followSlice';

export const toggleFollowByUserId =
  (targetUserId: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const currentUserId = selectCurrentUserId(state);

    if (!currentUserId) {
      return;
    }

    const allFollows = selectAllFollows(state.follows);

    const existing = allFollows.find(
      (follow) => follow.followerId === currentUserId && follow.followingId === targetUserId,
    );

    if (existing) {
      dispatch(removeFollow(existing.id));

      return;
    }

    dispatch(addFollow(currentUserId, targetUserId));
  };
