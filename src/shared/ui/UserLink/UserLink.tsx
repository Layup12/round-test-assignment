import { Text, UnstyledButton } from '@mantine/core';
import type { PropsWithChildren } from 'react';

import classes from './UserLink.module.scss';

interface UserLinkProps {
  onClick?: () => void;
}

export function UserLink({ onClick, children }: PropsWithChildren<UserLinkProps>) {
  return (
    <UnstyledButton onClick={onClick} aria-label="Профиль пользователя" className={classes.root}>
      <Text fw={600} c="blue">
        {children}
      </Text>
    </UnstyledButton>
  );
}
