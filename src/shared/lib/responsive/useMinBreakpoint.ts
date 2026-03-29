import { useMediaQuery } from '@mantine/hooks';
import { useMemo } from 'react';

export type AppBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

function getMinWidthMediaQuery(breakpoint: AppBreakpoint): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const value = getComputedStyle(document.documentElement).getPropertyValue(`--app-bp-${breakpoint}`).trim();

  if (!value) {
    return null;
  }
  return `(min-width: ${value})`;
}

export function useMinBreakpoint(breakpoint: AppBreakpoint): boolean {
  const query = useMemo(() => getMinWidthMediaQuery(breakpoint), [breakpoint]);
  return useMediaQuery(query ?? '');
}
