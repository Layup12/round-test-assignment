import { useAppSelector } from '@app/store';
import { selectAllLikes } from '@entities';
import { Box, Button, Container, Modal, Stack, Title } from '@mantine/core';
import { shareProfile } from '@shared/lib';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';

import {
  useCreatePostModal,
  useProfileActions,
  useProfileIdentity,
  useProfileNavigation,
  useProfilePosts,
} from '../../model';
import { CreatePostForm } from '../CreatePostForm';
import { ProfileHeader } from '../ProfileHeader';
import { ProfilePageNotFound } from '../ProfilePageNotFound';
import { ProfilePostsSection } from '../ProfilePostsSection';
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
  const {
    handleToggleFollow,
    handleToggleLike,
    handleCreatePost,
    handleLogout,
    handleChangeName,
    handleAvatarPathChange,
  } = useProfileActions({
    userId,
    isOwnProfile,
  });

  const { isOpen, open, close, handleSubmitAndClose } = useCreatePostModal({
    onSubmit: handleCreatePost,
  });

  const handleShareProfile = useCallback(async () => {
    if (!profileUser) {
      return;
    }
    await shareProfile({ userId: profileUser.id, displayName: profileUser.name });
  }, [profileUser]);

  if (!profileUser) {
    return <ProfilePageNotFound onBack={handleGoBack} />;
  }

  return (
    <Container>
      <Stack className={classes.content}>
        <ProfileHeader
          userId={profileUser.id}
          name={profileUser.name}
          avatarPath={profileUser.avatarPath}
          onAvatarPathChange={isOwnProfile ? handleAvatarPathChange : undefined}
          followersCount={followersCount}
          followingCount={followingCount}
          isOwnProfile={isOwnProfile}
          isFollowing={isFollowing}
          onNameChange={isOwnProfile ? handleChangeName : undefined}
          onToggleFollow={handleToggleFollow}
          onLogout={isOwnProfile ? handleLogout : undefined}
          onFollowersClick={handleFollowersClick}
          onFollowingClick={handleFollowingClick}
          onShareProfile={handleShareProfile}
        />

        <ProfilePostsSection
          posts={posts}
          hasMore={hasMore}
          loadMore={loadMore}
          profileUser={profileUser}
          currentUserId={currentUserId}
          likes={likes}
          isOwnProfile={isOwnProfile}
          onOpenCreatePost={open}
          onToggleLike={handleToggleLike}
        />

        {isOwnProfile && (
          <Modal
            opened={isOpen}
            onClose={close}
            centered
            size="md"
            withCloseButton
            title={
              <Title order={3} component="span" ta="center" display="block">
                Новый пост
              </Title>
            }
          >
            <CreatePostForm onSubmit={handleSubmitAndClose} />
          </Modal>
        )}

        <Box mt="auto">
          <Button variant="light" fullWidth onClick={handleGoBack}>
            {backButtonLabel}
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}
