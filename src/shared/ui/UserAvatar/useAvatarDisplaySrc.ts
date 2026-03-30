import { resolveAvatarSrc } from '@shared/lib';
import { useEffect, useState } from 'react';

export function useAvatarDisplaySrc(avatarPath: string | null | undefined): string | undefined {
  const [src, setSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!avatarPath) {
      return;
    }

    let cancelled = false;

    void (async () => {
      const resolved = await resolveAvatarSrc(avatarPath);
      if (!cancelled) {
        setSrc(resolved);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [avatarPath]);

  if (!avatarPath) {
    return undefined;
  }

  return src;
}
