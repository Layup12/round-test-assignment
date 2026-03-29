import { useCallback, useContext, useEffect, useRef } from 'react';

import { AndroidBackOverlayContext } from './androidBackOverlayContext';

export function useRegisterAndroidBackOverlay(onClose: () => void, isActive: boolean) {
  const ctx = useContext(AndroidBackOverlayContext);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const stableClose = useCallback(() => {
    onCloseRef.current();
  }, []);

  useEffect(() => {
    if (!isActive || !ctx) {
      return;
    }
    return ctx.pushClose(stableClose);
  }, [isActive, ctx, stableClose]);
}
