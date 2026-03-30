import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export type ProfileAvatarNativeError = 'cancelled' | 'permission_denied' | 'unavailable';

const MAX_FILE_BYTES = 2_500_000;

export async function pickProfileAvatarNative(): Promise<
  { ok: true; dataUrl: string } | { ok: false; error: ProfileAvatarNativeError }
> {
  const status = await Camera.requestPermissions({ permissions: ['camera', 'photos'] });

  const isDenied = (value: string) => value === 'denied';

  if (isDenied(status.camera) && isDenied(status.photos)) {
    return { ok: false, error: 'permission_denied' };
  }

  try {
    const photo = await Camera.getPhoto({
      quality: 82,
      width: 512,
      height: 512,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      saveToGallery: false,
      correctOrientation: true,
    });

    if (!photo.dataUrl) {
      return { ok: false, error: 'unavailable' };
    }

    return { ok: true, dataUrl: photo.dataUrl };
  } catch (cause) {
    const msg = cause instanceof Error ? cause.message : String(cause);
    if (/cancel|dismiss|closed|abort/i.test(msg)) {
      return { ok: false, error: 'cancelled' };
    }
    if (/permission|denied|not authorized/i.test(msg)) {
      return { ok: false, error: 'permission_denied' };
    }
    return { ok: false, error: 'unavailable' };
  }
}

export async function readImageFileAsDataUrl(
  file: File,
): Promise<{ ok: true; dataUrl: string } | { ok: false; error: 'too_large' | 'read_failed' }> {
  if (file.size > MAX_FILE_BYTES) {
    return { ok: false, error: 'too_large' };
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        resolve({ ok: true, dataUrl: result });
      } else {
        resolve({ ok: false, error: 'read_failed' });
      }
    };
    reader.onerror = () => resolve({ ok: false, error: 'read_failed' });
    reader.readAsDataURL(file);
  });
}
