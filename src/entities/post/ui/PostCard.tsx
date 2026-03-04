import type { UserEntity } from '@entities';
import { Card, Group, Stack, Text } from '@mantine/core';
import clsx from 'clsx';

import type { PostEntity } from '../model';
import classes from './PostCard.module.scss';

interface PostCardProps {
  post: PostEntity;
  author?: UserEntity;
  onAuthorClick?: () => void;
}

export function PostCard({ post, author, onAuthorClick }: PostCardProps) {
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
      </Stack>
    </Card>
  );
}
