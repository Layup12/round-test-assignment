import type { UserEntity } from '@entities';
import { Card, Group, Stack, Text } from '@mantine/core';
import clsx from 'clsx';

import type { PostEntity } from '../model';
import classes from './PostCard.module.scss';

interface PostCardProps {
  post: PostEntity;
  author?: UserEntity;
  onAuthorClick?: () => void;
  likesCount?: number;
  isLikedByCurrentUser?: boolean;
  onToggleLike?: () => void;
}

export function PostCard({
  post,
  author,
  onAuthorClick,
  likesCount = 0,
  isLikedByCurrentUser = false,
  onToggleLike,
}: PostCardProps) {
  const createdAt = new Date(post.createdAt);

  return (
    <Card withBorder shadow="xs" radius="md">
      <Stack gap="xs">
        <Group justify="space-between" align="flex-start">
          <Text
            fw={600}
            c="blue"
            className={clsx(classes.author, onAuthorClick && classes.authorClickable)}
            onClick={onAuthorClick}
          >
            {author?.name ?? 'Неизвестный пользователь'}
          </Text>
          <Text c="dimmed">{createdAt.toLocaleString()}</Text>
        </Group>

        <Text>{post.text}</Text>

        <Group justify="flex-end" gap="xs">
          <button
            type="button"
            className={clsx(classes.likeButton, isLikedByCurrentUser && classes.likeButtonActive)}
            onClick={onToggleLike}
          >
            {isLikedByCurrentUser ? 'Убрать лайк' : 'Лайк'}
          </button>
          <Text size="sm" c="dimmed">
            {likesCount}
          </Text>
        </Group>
      </Stack>
    </Card>
  );
}
