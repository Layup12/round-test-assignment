import { Group } from '@mantine/core';
import { ResponsiveLabeledAction } from '@shared/ui';
import { IconLogout, IconShare, IconUserMinus, IconUserPlus } from '@tabler/icons-react';
import type { MouseEventHandler } from 'react';

import classes from './ProfileHeaderToolbar.module.scss';

interface ProfileHeaderToolbarProps {
  isSharing: boolean;
  onShare: () => void;
  isOwnProfile: boolean;
  isFollowing: boolean;
  onLogout?: MouseEventHandler<HTMLButtonElement>;
  onToggleFollow?: MouseEventHandler<HTMLButtonElement>;
}

export function ProfileHeaderToolbar({
  isSharing,
  onShare,
  isOwnProfile,
  isFollowing,
  onLogout,
  onToggleFollow,
}: ProfileHeaderToolbarProps) {
  return (
    <Group gap={6} wrap="nowrap" className={classes.root}>
      <ResponsiveLabeledAction
        icon={<IconShare size={20} stroke={1.75} />}
        label="Поделиться"
        showLabelFrom="sm"
        aria-label="Поделиться профилем"
        onClick={onShare}
        loading={isSharing}
        narrowProps={{ variant: 'outline' }}
        labeledProps={{ variant: 'outline' }}
      />
      {isOwnProfile ? (
        <ResponsiveLabeledAction
          icon={<IconLogout size={20} stroke={1.75} />}
          label="Выйти"
          showLabelFrom="sm"
          aria-label="Выйти"
          onClick={(event) => onLogout?.(event)}
          narrowProps={{ variant: 'outline' }}
          labeledProps={{ variant: 'outline' }}
        />
      ) : (
        <ResponsiveLabeledAction
          icon={
            isFollowing ? <IconUserMinus size={20} stroke={1.75} /> : <IconUserPlus size={20} stroke={1.75} />
          }
          label={isFollowing ? 'Отписаться' : 'Подписаться'}
          showLabelFrom="sm"
          aria-label={isFollowing ? 'Отписаться' : 'Подписаться'}
          onClick={onToggleFollow}
          narrowProps={{
            variant: isFollowing ? 'outline' : 'filled',
            color: 'blue',
          }}
          labeledProps={{
            variant: isFollowing ? 'outline' : 'filled',
            color: 'blue',
          }}
        />
      )}
    </Group>
  );
}
