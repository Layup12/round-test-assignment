import { type CSSProperties, useEffect, useRef } from 'react';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';

import type { LikeEntity } from '../../like/model/likeSlice';
import type { UserEntity } from '../../user/userSlice';
import type { PostEntity } from '../model';
import { PostCard } from './PostCard';
import classes from './VirtualizedPostList.module.scss';

interface VirtualizedPostListProps {
  posts: PostEntity[];
  hasMore: boolean;
  loadMore: () => void;
  getAuthor: (post: PostEntity) => UserEntity | undefined;
  onAuthorClick?: (post: PostEntity) => void;
  likes?: LikeEntity[];
  currentUserId?: string | null;
  onToggleLike?: (post: PostEntity) => void;
}

interface ListInstance {
  recomputeRowHeights: () => void;
  forceUpdateGrid: () => void;
}

export function VirtualizedPostList({
  posts,
  hasMore,
  loadMore,
  getAuthor,
  onAuthorClick,
  likes = [],
  currentUserId,
  onToggleLike,
}: VirtualizedPostListProps) {
  const cacheRef = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 200,
    }),
  );

  const listRef = useRef<ListInstance | null>(null);

  useEffect(() => {
    cacheRef.current.clearAll();

    if (listRef.current) {
      listRef.current.recomputeRowHeights();
      listRef.current.forceUpdateGrid();
    }
  }, [posts]);

  const rowRenderer = ({
    index,
    key,
    style,
    parent,
  }: {
    index: number;
    key: string;
    style: CSSProperties;
    parent: unknown;
  }) => {
    const post = posts[index];
    const author = getAuthor(post);

    const postLikes = likes.filter((like) => like.postId === post.id);
    const likesCount = postLikes.length;
    const isLikedByCurrentUser =
      Boolean(currentUserId) && postLikes.some((like) => like.userId === currentUserId);

    return (
      <CellMeasurer key={key} cache={cacheRef.current} columnIndex={0} rowIndex={index} parent={parent}>
        {() => (
          <div className={classes.row} style={style}>
            <PostCard
              post={post}
              author={author}
              onAuthorClick={onAuthorClick ? () => onAuthorClick(post) : undefined}
              likesCount={likesCount}
              isLikedByCurrentUser={isLikedByCurrentUser}
              onToggleLike={onToggleLike ? () => onToggleLike(post) : undefined}
            />
          </div>
        )}
      </CellMeasurer>
    );
  };

  const handleScroll = ({
    clientHeight,
    scrollHeight,
    scrollTop,
  }: {
    clientHeight: number;
    scrollHeight: number;
    scrollTop: number;
  }) => {
    const distanceToBottom = scrollHeight - (scrollTop + clientHeight);

    if (distanceToBottom < 400 && hasMore) {
      loadMore();
    }
  };

  return (
    <AutoSizer>
      {({ width, height }: { width: number; height: number }) => (
        <List
          ref={(instance: ListInstance | null) => {
            listRef.current = instance;
          }}
          width={width}
          height={height}
          rowCount={posts.length}
          deferredMeasurementCache={cacheRef.current}
          rowHeight={({ index }: { index: number }) => cacheRef.current.rowHeight({ index })}
          rowRenderer={rowRenderer}
          onScroll={handleScroll}
          overscanRowCount={3}
        />
      )}
    </AutoSizer>
  );
}
