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

  const handleGoBack = () => {
    if (location.state?.fromFollowList) {
      navigate(-1);
      return;
    }
    navigate('/feed');
  };

  const handleFollowersClick = () => {
    if (!userId) {
      return;
    }

    navigate(`/profile/${userId}/followers`);
  };

  const handleFollowingClick = () => {
    if (!userId) {
      return;
    }

    navigate(`/profile/${userId}/following`);
  };

  const backButtonLabel = location.state?.fromFollowList ? 'Назад' : 'В ленту';

  return {
    handleGoBack,
    handleFollowersClick,
    handleFollowingClick,
    backButtonLabel,
  };
}
