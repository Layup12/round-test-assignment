import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';

const AVATAR_SUBDIR = 'avatars';

export function getAvatarRelativePath(userId: string): string {
  return `${AVATAR_SUBDIR}/${userId}.jpg`;
}

function dataUrlToBase64(dataUrl: string): string {
  const i = dataUrl.indexOf(',');
  if (i === -1) {
    throw new Error('Invalid data URL');
  }
  return dataUrl.slice(i + 1);
}

export async function saveAvatarFromDataUrl(userId: string, dataUrl: string): Promise<string> {
  const path = getAvatarRelativePath(userId);
  const base64 = dataUrlToBase64(dataUrl);

  await Filesystem.writeFile({
    path,
    data: base64,
    directory: Directory.Data,
    recursive: true,
  });

  return path;
}

export async function deleteUserAvatarFile(relativePath: string): Promise<void> {
  try {
    await Filesystem.deleteFile({
      path: relativePath,
      directory: Directory.Data,
    });
  } catch {
    // файл уже удалён или путь недействителен
  }
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('readAsDataURL failed'));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

export async function resolveAvatarSrc(relativePath: string): Promise<string | undefined> {
  try {
    if (Capacitor.getPlatform() === 'web') {
      const { data } = await Filesystem.readFile({
        path: relativePath,
        directory: Directory.Data,
      });

      if (typeof data === 'string' && data.length > 0) {
        return `data:image/jpeg;base64,${data}`;
      }

      if (data instanceof Blob && data.size > 0) {
        return await blobToDataUrl(data);
      }

      return undefined;
    }

    await Filesystem.stat({
      path: relativePath,
      directory: Directory.Data,
    });
    const { uri } = await Filesystem.getUri({
      path: relativePath,
      directory: Directory.Data,
    });
    return Capacitor.convertFileSrc(uri);
  } catch {
    return undefined;
  }
}
