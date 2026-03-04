import { useAppSelector } from '@app/store';
import { selectAllFollows, selectAllUsers, type UserEntity } from '@entities';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export type FollowListType = 'followers' | 'following';

const PAGE_SIZE = 5;

interface UseFollowListResult {
  title: string;
  users: UserEntity[];
  canLoadMore: boolean;
  handleBack: () => void;
  handleLoadMore: () => void;
  handleUserClick: (userId: string) => void;
}

export function useFollowList(type: FollowListType): UseFollowListResult {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const allUsers = useAppSelector((state) => selectAllUsers(state.users));
  const allFollows = useAppSelector((state) => selectAllFollows(state.follows));

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const usersById = useMemo(
    () => Object.fromEntries(allUsers.map((user) => [user.id, user] as const)),
    [allUsers],
  );

  const items = useMemo(() => {
    if (!userId) {
      return [] as UserEntity[];
    }

    const filteredFollows =
      type === 'followers'
        ? allFollows.filter((follow) => follow.followingId === userId)
        : allFollows.filter((follow) => follow.followerId === userId);

    return filteredFollows
      .map((follow) => {
        const otherUserId = type === 'followers' ? follow.followerId : follow.followingId;
        const user = usersById[otherUserId];

        if (!user) {
          return null;
        }

        return user;
      })
      .filter((user): user is UserEntity => Boolean(user));
  }, [allFollows, type, userId, usersById]);

  const title = type === 'followers' ? 'Подписчики' : 'Подписки';

  const users = items.slice(0, visibleCount);
  const canLoadMore = visibleCount < items.length;

  const handleBack = () => {
    if (!userId) {
      navigate('/feed');
      return;
    }

    navigate(`/profile/${userId}`);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  const handleUserClick = (targetUserId: string) => {
    navigate(`/profile/${targetUserId}`, { state: { fromFollowList: true } });
  };

  return {
    title,
    users,
    canLoadMore,
    handleBack,
    handleLoadMore,
    handleUserClick,
  };
}
