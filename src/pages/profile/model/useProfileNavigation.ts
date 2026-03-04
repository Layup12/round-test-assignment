import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface UseProfileNavigationResult {
  handleGoBack: () => void;
  handleFollowersClick: () => void;
  handleFollowingClick: () => void;
  backButtonLabel: string;
}

export function useProfileNavigation(userId: string | undefined): UseProfileNavigationResult {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = useCallback(() => {
    if (location.state?.fromFollowList) {
      navigate(-1);
      return;
    }

    navigate('/feed');
  }, [location.state, navigate]);

  const handleFollowersClick = useCallback(() => {
    if (!userId) {
      return;
    }

    navigate(`/profile/${userId}/followers`);
  }, [navigate, userId]);

  const handleFollowingClick = useCallback(() => {
    if (!userId) {
      return;
    }

    navigate(`/profile/${userId}/following`);
  }, [navigate, userId]);

  const backButtonLabel = location.state?.fromFollowList ? 'Назад' : 'В ленту';

  return {
    handleGoBack,
    handleFollowersClick,
    handleFollowingClick,
    backButtonLabel,
  };
}
