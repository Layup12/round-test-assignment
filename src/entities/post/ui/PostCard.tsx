import type { UserEntity } from '@entities';
import { Button, Card, Group, Stack, Text } from '@mantine/core';
import { UserLink } from '@shared/ui';

import type { PostEntity } from '../model';

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
          <UserLink onClick={onAuthorClick}>{author?.name ?? 'Неизвестный пользователь'}</UserLink>
          <Text c="dimmed">{createdAt.toLocaleString()}</Text>
        </Group>

        <Text>{post.text}</Text>

        <Group justify="flex-end" gap="xs">
          <Button variant="subtle" onClick={onToggleLike}>
            {isLikedByCurrentUser ? 'Убрать лайк' : 'Лайк'}
          </Button>
          <Text size="sm" c="dimmed">
            {likesCount}
          </Text>
        </Group>
      </Stack>
    </Card>
  );
}
