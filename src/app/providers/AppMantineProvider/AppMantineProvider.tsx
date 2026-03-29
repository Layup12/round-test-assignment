import '@mantine/core/styles.css';

import { Button, createTheme, MantineProvider } from '@mantine/core';
import type { PropsWithChildren } from 'react';

const theme = createTheme({
  breakpoints: {
    xs: 'var(--app-bp-xs)',
    sm: 'var(--app-bp-sm)',
    md: 'var(--app-bp-md)',
    lg: 'var(--app-bp-lg)',
    xl: 'var(--app-bp-xl)',
  },
  components: {
    Button: Button.extend({
      vars: (_, props) => {
        if (props.size === 'md') {
          return {
            root: {
              '--button-height': '44px',
              '--button-padding-x': '12px',
              '--button-fz': '18px',
            },
          };
        }

        return { root: {} };
      },
      defaultProps: {
        size: 'md',
        radius: 'md',
      },
    }),
    ActionIcon: {
      defaultProps: {
        size: 'lg',
        radius: 'xl',
      },
    },
    Tabs: {
      styles: {
        tab: {
          minHeight: '44px',
          minWidth: '44px',
        },
      },
    },
    Container: {
      defaultProps: {
        p: 'md',
      },
      styles: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          width: '100%',
          boxSizing: 'border-box',
        },
      },
    },
    Stack: {
      defaultProps: {
        gap: 'xs',
      },
    },
    Modal: {
      defaultProps: {
        closeButtonProps: {
          size: 'xl',
          radius: 'xl',
        },
      },
    },
  },
});

export function AppMantineProvider({ children }: PropsWithChildren) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
