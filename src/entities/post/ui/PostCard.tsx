import type { UserEntity } from '@entities';
import { Button, Card, Group, Stack, Text } from '@mantine/core';
import { formatPostDate } from '@shared/lib';
import { UserLink } from '@shared/ui';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import cn from 'classnames';

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
  return (
    <Card withBorder shadow="xs" radius="md">
      <Stack gap={0}>
        <Group justify="space-between" align="center" wrap="nowrap">
          <UserLink onClick={onAuthorClick}>{author?.name ?? 'Неизвестный пользователь'}</UserLink>
          <Text c="dimmed" className="ellipsisText" style={{ flexShrink: 0 }}>
            {formatPostDate(post.createdAt)}
          </Text>
        </Group>

        <Text className={cn(classes.text, 'ellipsisText')}>{post.text}</Text>

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
