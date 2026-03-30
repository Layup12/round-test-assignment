import { Group, Stack } from '@mantine/core';
import { type KeyboardEvent, type MouseEventHandler, useCallback, useState } from 'react';

import { useEditableProfileName } from '../../model';
import { ProfileFollowStats } from '../ProfileFollowStats';
import { ProfileHeaderToolbar } from '../ProfileHeaderToolbar';
import { ProfileAvatarBlock } from './ProfileAvatarBlock';
import { ProfileHeaderTitleBlock } from './ProfileHeaderTitleBlock';

interface ProfileHeaderProps {
  userId: string;
  name: string;
  avatarPath?: string | null;
  onAvatarPathChange?: (next: string | null) => void;
  followersCount: number;
  followingCount: number;
  isOwnProfile: boolean;
  isFollowing: boolean;
  onNameChange?: (nextName: string) => void;
  onLogout?: MouseEventHandler<HTMLButtonElement>;
  onToggleFollow?: MouseEventHandler<HTMLButtonElement>;
  onFollowersClick?: MouseEventHandler<HTMLButtonElement>;
  onFollowingClick?: MouseEventHandler<HTMLButtonElement>;
  onShareProfile: () => void | Promise<void>;
}

export function ProfileHeader({
  userId,
  name,
  avatarPath,
  onAvatarPathChange,
  followersCount,
  followingCount,
  isOwnProfile,
  isFollowing,
  onNameChange,
  onLogout,
  onToggleFollow,
  onFollowersClick,
  onFollowingClick,
  onShareProfile,
}: ProfileHeaderProps) {
  const canEditName = isOwnProfile && Boolean(onNameChange);
  const { isEditing, draftName, handleStartEdit, handleChange, handleBlur, handleCancel } =
    useEditableProfileName({
      name,
      canEdit: canEditName,
      onNameChange,
    });

  const [isSharing, setIsSharing] = useState(false);

  const handleShare = useCallback(async () => {
    setIsSharing(true);
    try {
      await onShareProfile();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSharing(false);
    }
  }, [onShareProfile]);

  const handleNameKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleBlur();
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      handleCancel();
    }
  };

  return (
    <Stack>
      <Group justify="space-between" gap="sm" wrap="nowrap" align="flex-start">
        <Group gap="sm" wrap="nowrap" align="flex-start" style={{ flex: 1, minWidth: 0 }}>
          <ProfileAvatarBlock
            userId={userId}
            name={name}
            avatarPath={avatarPath}
            onAvatarPathChange={onAvatarPathChange}
          />
          <ProfileHeaderTitleBlock
            name={name}
            canEditName={canEditName}
            isEditing={isEditing}
            draftName={draftName}
            onChangeDraft={handleChange}
            onBlurName={handleBlur}
            onStartEdit={handleStartEdit}
            onKeyDown={handleNameKeyDown}
          />
        </Group>

        <ProfileHeaderToolbar
          isSharing={isSharing}
          onShare={handleShare}
          isOwnProfile={isOwnProfile}
          isFollowing={isFollowing}
          onLogout={onLogout}
          onToggleFollow={onToggleFollow}
        />
      </Group>

      <ProfileFollowStats
        followersCount={followersCount}
        followingCount={followingCount}
        onFollowersClick={onFollowersClick}
        onFollowingClick={onFollowingClick}
      />
    </Stack>
  );
}
