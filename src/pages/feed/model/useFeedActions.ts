import { useToggleLike } from '@features';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface UseFeedActionsResult {
  handleToggleLike: (postId: string) => void;
  handleGoToProfile: (userId?: string | null) => void;
  handleGoToOwnProfile: () => void;
}

export function useFeedActions(currentUserId: string | null): UseFeedActionsResult {
  const { handleToggleLike } = useToggleLike();
  const navigate = useNavigate();

  const handleGoToProfile = useCallback(
    (userId?: string | null) => {
      if (!userId) {
        return;
      }

      navigate(`/profile/${userId}`);
    },
    [navigate],
  );

  const handleGoToOwnProfile = useCallback(() => {
    if (!currentUserId) {
      return;
    }

    navigate(`/profile/${currentUserId}`);
  }, [currentUserId, navigate]);

  return {
    handleToggleLike,
    handleGoToProfile,
    handleGoToOwnProfile,
  };
}
