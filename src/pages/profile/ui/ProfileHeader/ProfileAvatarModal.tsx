import { ActionIcon, Button, Group, Modal, Stack, Text, Title } from '@mantine/core';
import { useMinBreakpoint } from '@shared/lib';
import { UserAvatar } from '@shared/ui';
import { IconTrash } from '@tabler/icons-react';

import classes from './ProfileAvatarModal.module.scss';

interface ProfileAvatarModalProps {
  opened: boolean;
  onClose: () => void;
  name: string;
  avatarPath?: string | null;
  avatarError: string | null;
  isAvatarBusy: boolean;
  onPick: () => void | Promise<void>;
  onRemove: () => void;
}

export function ProfileAvatarModal({
  opened,
  onClose,
  name,
  avatarPath,
  avatarError,
  isAvatarBusy,
  onPick,
  onRemove,
}: ProfileAvatarModalProps) {
  const hasAvatarRef = Boolean(avatarPath);
  const showDeleteLabel = useMinBreakpoint('sm');

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="md"
      withCloseButton
      title={
        <Title order={3} component="span" ta="center" display="block">
          Фото профиля
        </Title>
      }
    >
      <Stack pt="xs" gap="md">
        <div className={classes.previewWrap}>
          <UserAvatar name={name} avatarPath={avatarPath} size={120} className={classes.previewAvatar} />
        </div>

        {avatarError ? (
          <Text size="sm" c="red" role="alert">
            {avatarError}
          </Text>
        ) : null}

        <Group justify="flex-end" gap="xs" wrap="wrap">
          {hasAvatarRef ? (
            showDeleteLabel ? (
              <Button type="button" variant="light" color="red" disabled={isAvatarBusy} onClick={onRemove}>
                Удалить фото
              </Button>
            ) : (
              <ActionIcon
                type="button"
                variant="light"
                color="red"
                size="xl"
                radius="md"
                aria-label="Удалить фото"
                disabled={isAvatarBusy}
                onClick={onRemove}
              >
                <IconTrash size={20} stroke={1.5} />
              </ActionIcon>
            )
          ) : null}
          <Button
            type="button"
            variant="filled"
            loading={isAvatarBusy}
            disabled={isAvatarBusy}
            onClick={() => void onPick()}
          >
            {hasAvatarRef ? 'Изменить фото' : 'Добавить фото'}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
