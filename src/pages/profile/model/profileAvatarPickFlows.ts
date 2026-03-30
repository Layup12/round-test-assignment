import {
  pickProfileAvatarNative,
  type ProfileAvatarNativeError,
  readImageFileAsDataUrl,
  saveAvatarFromDataUrl,
} from '@shared/lib';

function nativeErrorMessage(error: ProfileAvatarNativeError): string {
  switch (error) {
    case 'permission_denied':
      return 'Нет доступа к камере и фото. Разрешите доступ в настройках устройства.';
    case 'unavailable':
      return 'Не удалось получить изображение.';
    default:
      return '';
  }
}

async function persistAvatarDataUrl(
  userId: string,
  dataUrl: string,
  applyPath: (relativePath: string) => void,
  setError: (message: string | null) => void,
): Promise<void> {
  try {
    const path = await saveAvatarFromDataUrl(userId, dataUrl);
    applyPath(path);
  } catch {
    setError('Не удалось сохранить файл аватара.');
  }
}

export async function runNativeAvatarPick(
  userId: string,
  applyPath: (relativePath: string) => void,
  setError: (message: string | null) => void,
): Promise<void> {
  const result = await pickProfileAvatarNative();
  if (result.ok) {
    await persistAvatarDataUrl(userId, result.dataUrl, applyPath, setError);
    return;
  }
  if (result.error === 'cancelled') {
    return;
  }
  const msg = nativeErrorMessage(result.error);
  if (msg) {
    setError(msg);
  }
}

export async function runBrowserFileAvatarPick(
  userId: string,
  file: File,
  applyPath: (relativePath: string) => void,
  setError: (message: string | null) => void,
): Promise<void> {
  const result = await readImageFileAsDataUrl(file);
  if (result.ok) {
    await persistAvatarDataUrl(userId, result.dataUrl, applyPath, setError);
    return;
  }
  if (result.error === 'too_large') {
    setError('Файл слишком большой (макс. ~2,5 МБ).');
    return;
  }
  setError('Не удалось прочитать файл.');
}
