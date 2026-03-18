import type { PropsWithChildren } from 'react';

import { useAndroidBackButton } from './useAndroidBackButton';
import { useStatusBar } from './useStatusBar';

export function NativeShellProvider({ children }: PropsWithChildren) {
  useStatusBar();
  useAndroidBackButton();

  return children;
}
