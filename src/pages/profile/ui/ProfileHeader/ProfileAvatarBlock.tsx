import { UnstyledButton } from '@mantine/core';
import { UserAvatar } from '@shared/ui';
import { useState } from 'react';

import { useProfileAvatarPicker } from '../../model';
import { ProfileAvatarModal } from './ProfileAvatarModal';
import classes from './ProfileHeader.module.scss';

interface ProfileAvatarBlockProps {
  userId: string;
  name: string;
  avatarPath?: string | null;
  onAvatarPathChange?: (next: string | null) => void;
}

export function ProfileAvatarBlock({
  userId,
  name,
  avatarPath,
  onAvatarPathChange,
}: ProfileAvatarBlockProps) {
  if (!onAvatarPathChange) {
    return (
      <span className={classes.avatarReadonly} aria-hidden>
        <UserAvatar name={name} avatarPath={avatarPath} size={44} className={classes.avatarCircle} />
      </span>
    );
  }

  return (
    <ProfileAvatarEditable
      userId={userId}
      name={name}
      avatarPath={avatarPath}
      onAvatarPathChange={onAvatarPathChange}
    />
  );
}

function ProfileAvatarEditable({
  userId,
  name,
  avatarPath,
  onAvatarPathChange,
}: Required<Pick<ProfileAvatarBlockProps, 'userId' | 'name' | 'onAvatarPathChange'>> & {
  avatarPath?: string | null;
}) {
  const [modalOpened, setModalOpened] = useState(false);
  const { fileInputRef, avatarError, isAvatarBusy, pickAvatar, handleFileChange, clearAvatar } =
    useProfileAvatarPicker({ userId, onAvatarPathChange });

  const avatarNode = (
    <UserAvatar
      name={name}
      avatarPath={avatarPath}
      size={44}
      className={classes.avatarCircle}
      style={{ opacity: isAvatarBusy ? 0.65 : 1 }}
    />
  );

  return (
    <>
      <UnstyledButton
        type="button"
        className={classes.avatarButton}
        onClick={() => setModalOpened(true)}
        aria-label="Изменить фото профиля"
      >
        {avatarNode}
      </UnstyledButton>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className={classes.hiddenFileInput}
        aria-hidden
        tabIndex={-1}
        onChange={handleFileChange}
      />
      <ProfileAvatarModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        name={name}
        avatarPath={avatarPath}
        avatarError={avatarError}
        isAvatarBusy={isAvatarBusy}
        onPick={pickAvatar}
        onRemove={clearAvatar}
      />
    </>
  );
}
