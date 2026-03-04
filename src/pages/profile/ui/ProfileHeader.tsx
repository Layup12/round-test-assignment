import { Button, Group, Stack, Text, TextInput, Title } from '@mantine/core';
import { getWordPlural } from '@shared/lib';
import type { KeyboardEvent, MouseEventHandler } from 'react';

import { useEditableProfileName } from '../model';

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
    <Stack gap="xs">
      <Group justify="space-between">
        {canEditName ? (
          isEditing ? (
            <TextInput
              value={draftName}
              maxLength={12}
              autoFocus
              onChange={({ currentTarget: { value } }) => handleChange(value)}
              onBlur={handleBlur}
              onKeyDown={handleNameKeyDown}
            />
          ) : (
            <Button
              variant="subtle"
              onClick={handleStartEdit as MouseEventHandler<HTMLButtonElement>}
              aria-label="Изменить имя"
            >
              <Title order={2}>{name}</Title>
            </Button>
          )
        ) : (
          <Title order={2}>{name}</Title>
        )}
        {isOwnProfile ? (
          <Button variant="outline" onClick={onLogout}>
            Выйти
          </Button>
        ) : (
          <Button variant={isFollowing ? 'light' : 'filled'} onClick={onToggleFollow}>
            {isFollowing ? 'Отписаться' : 'Подписаться'}
          </Button>
        )}
      </Group>

      <Group gap="md">
        <Button variant="subtle" size="compact-sm" onClick={onFollowersClick}>
          <Text fw={500} mr={4}>
            {followersCount}
          </Text>
          <Text c="dimmed">{getWordPlural(followersCount, 'подписчик', 'подписчика', 'подписчиков')}</Text>
        </Button>
        <Button variant="subtle" size="compact-sm" onClick={onFollowingClick}>
          <Text fw={500} mr={4}>
            {followingCount}
          </Text>
          <Text c="dimmed">{getWordPlural(followingCount, 'подписка', 'подписки', 'подписок')}</Text>
        </Button>
      </Group>
    </Stack>
  );
}
