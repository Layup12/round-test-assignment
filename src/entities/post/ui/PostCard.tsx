import type { UserEntity } from '@entities';
import { Button, Card, Group, Stack, Text } from '@mantine/core';
import { UserLink } from '@shared/ui';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';

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
      <Stack gap={0}>
        <Group justify="space-between" align="center">
          <UserLink onClick={onAuthorClick}>{author?.name ?? 'Неизвестный пользователь'}</UserLink>
          <Text c="dimmed">{createdAt.toLocaleString()}</Text>
        </Group>

        <Text>{post.text}</Text>

        <Group justify="flex-end" gap="xs" mt="md">
          <Button
            variant="subtle"
            color={isLikedByCurrentUser ? 'red' : 'gray'}
            onClick={onToggleLike}
            leftSection={isLikedByCurrentUser ? <IconHeartFilled size={24} /> : <IconHeart size={24} />}
          >
            {likesCount}
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
