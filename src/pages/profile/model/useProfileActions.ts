import { useAppDispatch } from '@app/store';
import { addFollow, addPost, clearCurrentUser, removeFollow, renameUserIfUnique } from '@entities';
import { nanoid } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface UseProfileActionsParams {
  userId: string | undefined;
  currentUserId: string | null;
  isOwnProfile: boolean;
  isFollowing: boolean;
}

interface UseProfileActionsResult {
  handleToggleFollow: () => void;
  handleCreatePost: (text: string) => void;
  handleLogout: () => void;
  handleChangeName: (nextName: string) => void;
}

export function useProfileActions({
  userId,
  currentUserId,
  isOwnProfile,
  isFollowing,
}: UseProfileActionsParams): UseProfileActionsResult {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleToggleFollow = useCallback(() => {
    if (!userId || !currentUserId || isOwnProfile) {
      return;
    }

    const followId = `${currentUserId}_${userId}`;

    if (isFollowing) {
      dispatch(removeFollow(followId));
    } else {
      dispatch(
        addFollow({
          id: followId,
          followerId: currentUserId,
          followingId: userId,
        }),
      );
    }
  }, [currentUserId, dispatch, isFollowing, isOwnProfile, userId]);

  const handleCreatePost = useCallback(
    (text: string) => {
      if (!currentUserId || !isOwnProfile) {
        return;
      }

      dispatch(
        addPost({
          id: nanoid(),
          authorId: currentUserId,
          text,
          createdAt: new Date().toISOString(),
        }),
      );
    },
    [currentUserId, dispatch, isOwnProfile],
  );

  const handleLogout = useCallback(() => {
    dispatch(clearCurrentUser());
    navigate('/auth', { replace: true });
  }, [dispatch, navigate]);

  const handleChangeName = useCallback(
    (nextName: string) => {
      const trimmed = nextName.trim();

      if (!currentUserId || !isOwnProfile || trimmed.length < 4) {
        return;
      }

      dispatch(
        renameUserIfUnique({
          id: currentUserId,
          name: trimmed,
        }),
      );
    },
    [currentUserId, dispatch, isOwnProfile],
  );

  return {
    handleToggleFollow,
    handleCreatePost,
    handleLogout,
    handleChangeName,
  };
}
