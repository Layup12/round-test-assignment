import { Button, Group } from '@mantine/core';
import { getWordPlural, useMinBreakpoint } from '@shared/lib';
import { IconUsers, IconUsersGroup } from '@tabler/icons-react';
import type { MouseEventHandler } from 'react';

import classes from './ProfileFollowStats.module.scss';

interface ProfileFollowStatsProps {
  followersCount: number;
  followingCount: number;
  onFollowersClick?: MouseEventHandler<HTMLButtonElement>;
  onFollowingClick?: MouseEventHandler<HTMLButtonElement>;
}

export function ProfileFollowStats({
  followersCount,
  followingCount,
  onFollowersClick,
  onFollowingClick,
}: ProfileFollowStatsProps) {
  const showStatWords = useMinBreakpoint('sm');

  const followersLabel = getWordPlural(followersCount, 'подписчик', 'подписчика', 'подписчиков');
  const followingLabel = getWordPlural(followingCount, 'подписка', 'подписки', 'подписок');

  return (
    <Group gap="sm">
      <Button
        variant="subtle"
        px="xs"
        onClick={onFollowersClick}
        leftSection={<IconUsers size={20} stroke={1.75} />}
        aria-label={`${followersCount} ${followersLabel}`}
      >
        <span className={classes.statInner}>
          <span className={classes.statCount}>{followersCount}</span>
          {showStatWords && <span className={classes.statWords}>{followersLabel}</span>}
        </span>
      </Button>
      <Button
        variant="subtle"
        px="xs"
        onClick={onFollowingClick}
        leftSection={<IconUsersGroup size={20} stroke={1.75} />}
        aria-label={`${followingCount} ${followingLabel}`}
      >
        <span className={classes.statInner}>
          <span className={classes.statCount}>{followingCount}</span>
          {showStatWords && <span className={classes.statWords}>{followingLabel}</span>}
        </span>
      </Button>
    </Group>
  );
}
