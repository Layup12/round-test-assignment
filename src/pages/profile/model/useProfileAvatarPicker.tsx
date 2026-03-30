import { isCapacitorNativeRuntime } from '@shared/lib';
import { type ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

import { runBrowserFileAvatarPick, runNativeAvatarPick } from './profileAvatarPickFlows';

interface UseProfileAvatarPickerParams {
  userId: string;
  onAvatarPathChange?: (next: string | null) => void;
}

export function useProfileAvatarPicker({ userId, onAvatarPathChange }: UseProfileAvatarPickerParams) {
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [isAvatarBusy, setIsAvatarBusy] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!avatarError) {
      return;
    }
    const t = window.setTimeout(() => setAvatarError(null), 5000);
    return () => window.clearTimeout(t);
  }, [avatarError]);

  const applyPath = useCallback(
    (next: string | null) => {
      onAvatarPathChange?.(next);
    },
    [onAvatarPathChange],
  );

  const pickAvatar = useCallback(async () => {
    if (!onAvatarPathChange) {
      return;
    }

    setAvatarError(null);

    if (isCapacitorNativeRuntime()) {
      setIsAvatarBusy(true);
      try {
        await runNativeAvatarPick(
          userId,
          (path) => applyPath(path),
          (msg) => setAvatarError(msg),
        );
      } finally {
        setIsAvatarBusy(false);
      }
      return;
    }

    fileInputRef.current?.click();
  }, [applyPath, onAvatarPathChange, userId]);

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      event.target.value = '';
      if (!file || !onAvatarPathChange) {
        return;
      }

      setAvatarError(null);
      setIsAvatarBusy(true);
      try {
        await runBrowserFileAvatarPick(
          userId,
          file,
          (path) => applyPath(path),
          (msg) => setAvatarError(msg),
        );
      } finally {
        setIsAvatarBusy(false);
      }
    },
    [applyPath, onAvatarPathChange, userId],
  );

  const clearAvatar = useCallback(() => {
    setAvatarError(null);
    applyPath(null);
  }, [applyPath]);

  return {
    fileInputRef,
    avatarError,
    isAvatarBusy,
    pickAvatar,
    handleFileChange,
    clearAvatar,
  };
}
