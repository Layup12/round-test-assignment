import { Avatar } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import type { CSSProperties } from 'react';

import { useAvatarDisplaySrc } from './useAvatarDisplaySrc';

interface UserAvatarProps {
  name?: string;
  avatarPath?: string | null;
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export function UserAvatar({ name, avatarPath, size = 32, className, style }: UserAvatarProps) {
  const displaySrc = useAvatarDisplaySrc(avatarPath);
  const hasPhoto = Boolean(displaySrc);
  const iconSize = Math.max(14, Math.round(size * 0.52));

  return (
    <Avatar
      src={hasPhoto ? displaySrc : undefined}
      alt={name ? `Аватар: ${name}` : 'Аватар пользователя'}
      size={size}
      radius="xl"
      color="gray"
      variant={hasPhoto ? 'filled' : 'light'}
      className={className}
      style={{ flexShrink: 0, ...style }}
    >
      {!hasPhoto ? <IconUser size={iconSize} stroke={1.5} aria-hidden /> : null}
    </Avatar>
  );
}
