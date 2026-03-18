import { useAppSelector } from '@app/store';
import { VirtualizedPostList } from '@entities';
import { Box, Button, Container, Group, Stack, Text, Title } from '@mantine/core';

import { useFeedActions, useFeedPosts } from '../model';
import classes from './FeedPage.module.scss';
import { FeedTabs } from './FeedTabs';

export function FeedPage() {
  const { currentUserId } = useAppSelector((state) => state.auth);

  const { activeTab, setActiveTab, usersById, posts, likes, hasMore, loadMore } = useFeedPosts(currentUserId);

  const { handleToggleLike, handleGoToProfile, handleGoToOwnProfile } = useFeedActions(currentUserId);

  return (
    <Container>
      <Stack gap="md" className={classes.content}>
        <Title ta="center">Лента</Title>

        <FeedTabs value={activeTab} onChange={setActiveTab} />

        <Box className={classes.feedList}>
          {posts.length === 0 ? (
            <Text c="dimmed" ta="center">
              Постов пока нет.
            </Text>
          ) : (
            <VirtualizedPostList
              posts={posts}
              hasMore={hasMore}
              loadMore={loadMore}
              getAuthor={(post) => usersById[post.authorId]}
              onAuthorClick={(post) => handleGoToProfile(post.authorId)}
              likes={likes}
              currentUserId={currentUserId}
              onToggleLike={(post) => handleToggleLike(post.id)}
            />
          )}
        </Box>

        <Group justify="center" mt="auto" className={classes.profileButtonRow}>
          <Button variant="light" fullWidth onClick={handleGoToOwnProfile} disabled={!currentUserId}>
            В профиль
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
