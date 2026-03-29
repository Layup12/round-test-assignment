import { AndroidBackOverlayContext } from '@shared/lib';
import type { PropsWithChildren } from 'react';

import { useAndroidBackButton } from './useAndroidBackButton';
import { useAndroidBackOverlayValue } from './useAndroidBackOverlayValue';
import { useStatusBar } from './useStatusBar';

export function NativeShellProvider({ children }: PropsWithChildren) {
  useStatusBar();

  const androidBackOverlay = useAndroidBackOverlayValue();
  useAndroidBackButton(androidBackOverlay.consumeBack);

  return (
    <AndroidBackOverlayContext.Provider value={androidBackOverlay}>
      {children}
    </AndroidBackOverlayContext.Provider>
  );
}
