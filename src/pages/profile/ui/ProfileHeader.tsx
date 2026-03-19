import { Button, Group, Stack, Text } from '@mantine/core';
import { getWordPlural } from '@shared/lib';
import { Input } from '@shared/ui';
import type { KeyboardEvent, MouseEventHandler } from 'react';

import { useEditableProfileName } from '../model';
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
}: ProfileHeaderProps) {
  const canEditName = isOwnProfile && Boolean(onNameChange);
  const { isEditing, draftName, handleStartEdit, handleChange, handleBlur, handleCancel } =
    useEditableProfileName({
      name,
      canEdit: canEditName,
      onNameChange,
    });

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
      <Group justify="space-between" gap="xs" wrap="nowrap">
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
        {isOwnProfile ? (
          <Button variant="outline" onClick={onLogout} className={classes.followButton}>
            Выйти
          </Button>
        ) : (
          <Button
            variant={isFollowing ? 'light' : 'filled'}
            onClick={onToggleFollow}
            className={classes.followButton}
          >
            {isFollowing ? 'Отписаться' : 'Подписаться'}
          </Button>
        )}
      </Group>

      <Group gap="md">
        <Button variant="subtle" onClick={onFollowersClick}>
          <Text fw={500} mr={4}>
            {followersCount}
          </Text>
          <Text>{getWordPlural(followersCount, 'подписчик', 'подписчика', 'подписчиков')}</Text>
        </Button>
        <Button variant="subtle" onClick={onFollowingClick}>
          <Text fw={500} mr={4}>
            {followingCount}
          </Text>
          <Text>{getWordPlural(followingCount, 'подписка', 'подписки', 'подписок')}</Text>
        </Button>
      </Group>
    </Stack>
  );
}
