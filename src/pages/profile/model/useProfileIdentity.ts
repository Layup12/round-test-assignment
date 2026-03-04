import { useAppSelector } from '@app/store';
import { selectAllFollows, selectCurrentUserId, selectUserById, type UserEntity } from '@entities';
import { useMemo } from 'react';

interface UseProfileIdentityResult {
  currentUserId: string | null;
  profileUser: UserEntity | null;
  isOwnProfile: boolean;
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
}

export function useProfileIdentity(userId: string | undefined): UseProfileIdentityResult {
  const currentUserId = useAppSelector(selectCurrentUserId);
  const profileUser = useAppSelector((state) => (userId ? selectUserById(state.users, userId) : null));
  const allFollows = useAppSelector((state) => selectAllFollows(state.follows));

  const isOwnProfile = currentUserId != null && currentUserId === userId;

  const { followersCount, followingCount, isFollowing } = useMemo(() => {
    if (!userId || !currentUserId) {
      return {
        followersCount: 0,
        followingCount: 0,
        isFollowing: false,
      };
    }

    const followers = allFollows.filter((follow) => follow.followingId === userId);
    const following = allFollows.filter((follow) => follow.followerId === userId);

    const followingCurrent = allFollows.some(
      (follow) => follow.followerId === currentUserId && follow.followingId === userId,
    );

    return {
      followersCount: followers.length,
      followingCount: following.length,
      isFollowing: followingCurrent,
    };
  }, [allFollows, currentUserId, userId]);

  return {
    currentUserId,
    profileUser,
    isOwnProfile,
    followersCount,
    followingCount,
    isFollowing,
  };
}
