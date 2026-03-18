import { Text, UnstyledButton } from '@mantine/core';
import type { PropsWithChildren } from 'react';

interface UserLinkProps {
  onClick?: () => void;
}

export function UserLink({ onClick, children }: PropsWithChildren<UserLinkProps>) {
  return (
    <UnstyledButton
      onClick={onClick}
      aria-label="Профиль пользователя"
      style={{
        // minHeight: 44,
        // minWidth: 44,
        display: 'inline-flex',
        alignItems: 'center',
      }}
    >
      <Text fw={600} c="blue">
        {children}
      </Text>
    </UnstyledButton>
  );
}
