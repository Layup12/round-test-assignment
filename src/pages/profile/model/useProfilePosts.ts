import { useAppSelector } from '@app/store';
import { type PostEntity, selectAllPosts } from '@entities';
import { useMemo, useState } from 'react';

const PAGE_SIZE = 20;

interface UseProfilePostsResult {
  posts: PostEntity[];
  hasMore: boolean;
  loadMore: () => void;
}

export function useProfilePosts(userId: string | undefined): UseProfilePostsResult {
  const allPosts = useAppSelector((state) => selectAllPosts(state.posts));

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const sortedPosts = useMemo(() => {
    if (!userId) {
      return [];
    }

    return allPosts
      .filter((post) => post.authorId === userId)
      .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime());
  }, [allPosts, userId]);

  const posts = sortedPosts.slice(0, visibleCount);

  const hasMore = visibleCount < sortedPosts.length;

  const loadMore = () => {
    if (!hasMore) {
      return;
    }

    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, sortedPosts.length));
  };

  return {
    posts,
    hasMore,
    loadMore,
  };
}
