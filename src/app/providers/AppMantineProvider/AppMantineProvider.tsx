import '@mantine/core/styles.css';

import { createTheme, MantineProvider } from '@mantine/core';
import type { PropsWithChildren } from 'react';

const theme = createTheme({
  breakpoints: {
    xs: '390px',
    sm: '768px',
    md: '1024px',
    lg: '1280px',
    xl: '1440px',
  },
  components: {
    Button: {
      defaultProps: {
        size: 'lg',
        radius: 'md',
      },
    },
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
        size: 'xs',
        px: 'md',
        py: 'lg',
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
