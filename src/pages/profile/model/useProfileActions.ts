import { useAppDispatch, useAppSelector } from '@app/store';
import {
  addPost,
  clearCurrentUser,
  renameUserIfUnique,
  setUserAvatar,
  toggleFollowByUserId,
} from '@entities';
import { useToggleLike } from '@features';
import { deleteUserAvatarFile, getAvatarRelativePath } from '@shared/lib';
import { useNavigate } from 'react-router-dom';

interface UseProfileActionsParams {
  userId: string | undefined;
  isOwnProfile: boolean;
}

interface UseProfileActionsResult {
  handleToggleFollow: () => void;
  handleToggleLike: (postId: string) => void;
  handleCreatePost: (text: string) => void;
  handleLogout: () => void;
  handleChangeName: (nextName: string) => void;
  handleAvatarPathChange: (next: string | null) => void;
}

export function useProfileActions({
  userId,
  isOwnProfile,
}: UseProfileActionsParams): UseProfileActionsResult {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUserId } = useAppSelector((state) => state.auth);
  const { handleToggleLike } = useToggleLike();

  const handleToggleFollow = () => {
    if (!userId || isOwnProfile) {
      return;
    }

    dispatch(toggleFollowByUserId(userId));
  };

  const handleCreatePost = (text: string) => {
    if (!currentUserId || !isOwnProfile) {
      return;
    }

    dispatch(
      addPost({
        authorId: currentUserId,
        text,
      }),
    );
  };

  const handleLogout = () => {
    dispatch(clearCurrentUser());
    navigate('/auth', { replace: true });
  };

  const handleChangeName = (nextName: string) => {
    if (!currentUserId || !isOwnProfile) {
      return;
    }

    dispatch(
      renameUserIfUnique({
        id: currentUserId,
        name: nextName,
      }),
    );
  };

  const handleAvatarPathChange = (next: string | null) => {
    if (!currentUserId || !isOwnProfile) {
      return;
    }

    if (next === null) {
      void deleteUserAvatarFile(getAvatarRelativePath(currentUserId));
    }

    dispatch(setUserAvatar({ userId: currentUserId, avatarPath: next }));
  };

  return {
    handleToggleFollow,
    handleToggleLike,
    handleCreatePost,
    handleLogout,
    handleChangeName,
    handleAvatarPathChange,
  };
}
