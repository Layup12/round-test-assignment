import { Button, Group, Stack, Text } from '@mantine/core';
import { Input } from '@shared/ui';
import { type KeyboardEvent, type MouseEventHandler, useCallback, useState } from 'react';

import { useEditableProfileName } from '../../model';
import { ProfileFollowStats } from '../ProfileFollowStats';
import { ProfileHeaderToolbar } from '../ProfileHeaderToolbar';
import classes from './ProfileHeader.module.scss';

interface ProfileHeaderProps {
  name: string;
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
  name,
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
      <Group justify="space-between" gap="xs" wrap="nowrap" align="flex-start">
        <div className={classes.nameBlock}>
          {canEditName ? (
            isEditing ? (
              <Input
                id="name"
                name="name"
                aria-label="Имя пользователя"
                placeholder="Введите имя"
                value={draftName}
                onChange={({ currentTarget: { value } }) => handleChange(value)}
                onBlur={handleBlur}
                onKeyDown={handleNameKeyDown}
                classes={{ root: classes.nameInputRoot }}
                maxLength={12}
                autoFocus
                canClear
              />
            ) : (
              <Button
                variant="subtle"
                onClick={handleStartEdit as MouseEventHandler<HTMLButtonElement>}
                aria-label="Изменить имя"
                className={classes.nameButton}
              >
                <Text fw={600} size="lg" className="ellipsisText">
                  {name}
                </Text>
              </Button>
            )
          ) : (
            <Text fw={600} size="lg" className="ellipsisText">
              {name}
            </Text>
          )}
        </div>

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
