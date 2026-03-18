import { AppShell } from '@mantine/core';
import type { PropsWithChildren } from 'react';

import classes from './AppLayout.module.scss';

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <AppShell
      padding={0}
      withBorder={false}
      header={undefined}
      navbar={undefined}
      footer={undefined}
      classNames={{ main: classes.root }}
    >
      <AppShell.Main className={classes.content}>{children}</AppShell.Main>
    </AppShell>
  );
}
