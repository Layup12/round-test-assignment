import { useAppSelector } from '@app/store';
import {
  type PostEntity,
  selectAllFollows,
  selectAllLikes,
  selectAllPosts,
  selectAllUsers,
  type UserEntity,
} from '@entities';
import { useMemo, useState } from 'react';

export type FeedTab = 'all' | 'following';

const PAGE_SIZE = 20;

interface UseFeedPostsResult {
  usersById: Record<string, UserEntity>;
  posts: PostEntity[];
  likes: ReturnType<typeof selectAllLikes>;
  activeTab: FeedTab;
  setActiveTab: (tab: FeedTab) => void;
  loadMore: () => void;
  hasMore: boolean;
}

export function useFeedPosts(currentUserId: string | null): UseFeedPostsResult {
  const users = useAppSelector((state) => selectAllUsers(state.users));
  const posts = useAppSelector((state) => selectAllPosts(state.posts));
  const follows = useAppSelector((state) => selectAllFollows(state.follows));
  const likes = useAppSelector((state) => selectAllLikes(state.likes));

  const [activeTab, setActiveTabState] = useState<FeedTab>('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const usersById = useMemo(() => Object.fromEntries(users.map((user) => [user.id, user] as const)), [users]);

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

  const visiblePosts = sortedFilteredPosts.slice(0, visibleCount);

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
    usersById,
    posts: visiblePosts,
    likes,
    activeTab,
    setActiveTab,
    loadMore,
    hasMore,
  };
}
