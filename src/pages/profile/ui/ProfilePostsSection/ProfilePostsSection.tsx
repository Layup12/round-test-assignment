import { type LikeEntity, type PostEntity, type UserEntity, VirtualizedPostList } from '@entities';
import { ActionIcon, Box, Group, Stack, Text, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import classes from './ProfilePostsSection.module.scss';

interface ProfilePostsSectionProps {
  posts: PostEntity[];
  hasMore: boolean;
  loadMore: () => void;
  profileUser: UserEntity;
  currentUserId: string | null;
  likes: LikeEntity[];
  isOwnProfile: boolean;
  onOpenCreatePost: () => void;
  onToggleLike: (postId: string) => void;
}

export function ProfilePostsSection({
  posts,
  hasMore,
  loadMore,
  profileUser,
  currentUserId,
  likes,
  isOwnProfile,
  onOpenCreatePost,
  onToggleLike,
}: ProfilePostsSectionProps) {
  return (
    <Stack className={classes.section}>
      <Group justify="space-between" align="center">
        <Title order={3}>Посты</Title>
        {isOwnProfile && (
          <ActionIcon
            variant="light"
            size="xl"
            radius="xl"
            aria-label="Создать новый пост"
            onClick={onOpenCreatePost}
          >
            <IconPlus size={18} stroke={2} />
          </ActionIcon>
        )}
      </Group>

      <Box className={classes.list}>
        {posts.length === 0 ? (
          <Text c="dimmed">Постов пока нет.</Text>
        ) : (
          <VirtualizedPostList
            posts={posts}
            hasMore={hasMore}
            loadMore={loadMore}
            getAuthor={() => profileUser}
            currentUserId={currentUserId}
            likes={likes}
            onToggleLike={({ id }) => onToggleLike(id)}
          />
        )}
      </Box>
    </Stack>
  );
}
