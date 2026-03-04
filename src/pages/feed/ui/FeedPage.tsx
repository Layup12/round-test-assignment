import { VirtualizedPostList } from '@entities';
import { Box, Button, Container, Group, Stack, Text, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { useFeedPosts } from '../model';
import classes from './FeedPage.module.scss';
import { FeedTabs } from './FeedTabs';

export function FeedPage() {
  const navigate = useNavigate();

  const { activeTab, setActiveTab, currentUserId, usersById, posts, hasMore, loadMore } = useFeedPosts();

  const handleGoToProfile = () => {
    if (!currentUserId) {
      return;
    }

    navigate(`/profile/${currentUserId}`);
  };

  return (
    <Container size="xs" py="md" h="100vh" className={classes.root}>
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
              onAuthorClick={(post) => navigate(`/profile/${post.authorId}`)}
            />
          )}
        </Box>

        <Group justify="center" mt="auto" className={classes.profileButtonRow}>
          <Button variant="light" fullWidth onClick={handleGoToProfile} disabled={!currentUserId}>
            В профиль
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
