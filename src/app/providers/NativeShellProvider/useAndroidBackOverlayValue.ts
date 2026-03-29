import type { AndroidBackOverlayContextValue } from '@shared/lib';
import { useCallback, useMemo, useRef } from 'react';

export function useAndroidBackOverlayValue(): AndroidBackOverlayContextValue {
  const stackRef = useRef<(() => void)[]>([]);

  const pushClose = useCallback((close: () => void) => {
    stackRef.current.push(close);
    return () => {
      const arr = stackRef.current;
      const i = arr.lastIndexOf(close);
      if (i !== -1) {
        arr.splice(i, 1);
      }
    };
  }, []);

  const consumeBack = useCallback(() => {
    const arr = stackRef.current;
    if (arr.length === 0) {
      return false;
    }
    const handler = arr.pop()!;
    handler();
    return true;
  }, []);

  return useMemo(() => ({ pushClose, consumeBack }), [pushClose, consumeBack]);
}
