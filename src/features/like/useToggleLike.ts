import { useAppDispatch } from '@app/store';
import { toggleLikeForPost } from '@entities';
import { useCallback } from 'react';

export function useToggleLike() {
  const dispatch = useAppDispatch();

  const handleToggleLike = useCallback(
    (postId: string) => {
      dispatch(toggleLikeForPost(postId));
    },
    [dispatch],
  );

  return { handleToggleLike };
}
