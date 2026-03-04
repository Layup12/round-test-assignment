import { useAppDispatch } from '@app/store';
import { addFollow, addPost, clearCurrentUser, removeFollow, renameUserIfUnique } from '@entities';
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

  const handleToggleFollow = () => {
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

  return {
    handleToggleFollow,
    handleCreatePost,
    handleLogout,
    handleChangeName,
  };
}
