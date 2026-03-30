import type { UserEntity } from '@entities';
import { Box, Button, Card, Group, Stack, Text } from '@mantine/core';
import { formatPostDate } from '@shared/lib';
import { UserAvatar, UserLink } from '@shared/ui';
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
        <Group justify="space-between" align="center" wrap="nowrap" gap="sm">
          <Group gap="sm" align="center" wrap="nowrap" style={{ flex: 1, minWidth: 0 }}>
            <UserAvatar name={author?.name} avatarPath={author?.avatarPath} size={36} />
            <Box style={{ minWidth: 0, flex: 1 }}>
              <UserLink onClick={onAuthorClick}>{author?.name ?? 'Неизвестный пользователь'}</UserLink>
            </Box>
          </Group>
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
