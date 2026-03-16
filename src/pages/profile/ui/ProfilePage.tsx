import { useAppSelector } from '@app/store';
import { selectAllLikes, VirtualizedPostList } from '@entities';
import { Box, Button, Container, Group, Modal, Stack, Text, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';

import {
  useCreatePostModal,
  useProfileActions,
  useProfileIdentity,
  useProfileNavigation,
  useProfilePosts,
} from '../model';
import { CreatePostForm } from './CreatePostForm';
import { ProfileHeader } from './ProfileHeader';
import classes from './ProfilePage.module.scss';

export function ProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const { currentUserId } = useAppSelector((state) => state.auth);
  const likes = useAppSelector((state) => selectAllLikes(state.likes));
  const { profileUser, isOwnProfile, followersCount, followingCount, isFollowing } =
    useProfileIdentity(userId);
  const { handleGoBack, handleFollowersClick, handleFollowingClick, backButtonLabel } =
    useProfileNavigation(userId);

  const { posts, hasMore, loadMore } = useProfilePosts(userId);
  const { handleToggleFollow, handleToggleLike, handleCreatePost, handleLogout, handleChangeName } =
    useProfileActions({
      userId,
      isOwnProfile,
    });

  const { isOpen, open, close, handleSubmitAndClose } = useCreatePostModal({
    onSubmit: handleCreatePost,
  });

  if (!profileUser) {
    return (
      <Container size="xs">
        <Stack>
          <Button variant="subtle" onClick={handleGoBack}>
            Назад
          </Button>
          <Title order={3}>Пользователь не найден</Title>
        </Stack>
      </Container>
    );
  }

  return (
    <Container size="xs" py="md" h="100vh" className={classes.root}>
      <Stack gap="md" className={classes.content}>
        <ProfileHeader
          name={profileUser.name}
          followersCount={followersCount}
          followingCount={followingCount}
          isOwnProfile={isOwnProfile}
          isFollowing={isFollowing}
          onNameChange={isOwnProfile ? handleChangeName : undefined}
          onToggleFollow={handleToggleFollow}
          onLogout={isOwnProfile ? handleLogout : undefined}
          onFollowersClick={handleFollowersClick}
          onFollowingClick={handleFollowingClick}
        />

        <Stack gap="xs" className={classes.postsSection}>
          <Group justify="space-between" align="center">
            <Title order={3}>Посты</Title>
            {isOwnProfile && (
              <Button variant="light" size="compact-xs" aria-label="Создать новый пост" onClick={open}>
                <span aria-hidden="true">＋</span>
              </Button>
            )}
          </Group>

          <Box className={classes.postsList}>
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
                onToggleLike={({ id }) => handleToggleLike(id)}
              />
            )}
          </Box>
        </Stack>

        {isOwnProfile && (
          <Modal
            opened={isOpen}
            onClose={close}
            centered
            size="md"
            withCloseButton
            title={
              <Title order={3} ta="center">
                Новый пост
              </Title>
            }
          >
            <CreatePostForm onSubmit={handleSubmitAndClose} />
          </Modal>
        )}

        <Box mt="auto">
          <Button variant="subtle" fullWidth onClick={handleGoBack}>
            {backButtonLabel}
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}
