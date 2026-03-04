import { useAppSelector } from '@app/store';
import {
  type PostEntity,
  selectAllFollows,
  selectAllPosts,
  selectAllUsers,
  selectCurrentUserId,
  type UserEntity,
} from '@entities';
import { useMemo, useState } from 'react';

export type FeedTab = 'all' | 'following';

const PAGE_SIZE = 20;

interface UseFeedPostsResult {
  currentUserId: string | null;
  usersById: Record<string, UserEntity>;
  posts: PostEntity[];
  activeTab: FeedTab;
  setActiveTab: (tab: FeedTab) => void;
  loadMore: () => void;
  hasMore: boolean;
}

export function useFeedPosts(): UseFeedPostsResult {
  const currentUserId = useAppSelector(selectCurrentUserId);
  const users = useAppSelector((state) => selectAllUsers(state.users));
  const posts = useAppSelector((state) => selectAllPosts(state.posts));
  const follows = useAppSelector((state) => selectAllFollows(state.follows));

  const [activeTab, setActiveTabState] = useState<FeedTab>('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const usersById = useMemo(() => Object.fromEntries(users.map((user) => [user.id, user])), [users]);

  const followingIds = useMemo(() => {
    if (!currentUserId) {
      return new Set<string>();
    }

    return new Set(
      follows.filter((follow) => follow.followerId === currentUserId).map((follow) => follow.followingId),
    );
  }, [currentUserId, follows]);

  const sortedFilteredPosts = useMemo(() => {
    const sorted = [...posts].sort(
      (left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
    );

    if (activeTab === 'all' || !currentUserId) {
      return sorted;
    }

    return sorted.filter((post) => post.authorId === currentUserId || followingIds.has(post.authorId));
  }, [activeTab, currentUserId, followingIds, posts]);

  const visiblePosts = useMemo(
    () => sortedFilteredPosts.slice(0, visibleCount),
    [sortedFilteredPosts, visibleCount],
  );

  const hasMore = visibleCount < sortedFilteredPosts.length;

  const loadMore = () => {
    if (!hasMore) {
      return;
    }

    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, sortedFilteredPosts.length));
  };

  const setActiveTab = (tab: FeedTab) => {
    setActiveTabState(tab);
    setVisibleCount(PAGE_SIZE);
  };

  return {
    currentUserId,
    usersById,
    posts: visiblePosts,
    activeTab,
    setActiveTab,
    loadMore,
    hasMore,
  };
}
