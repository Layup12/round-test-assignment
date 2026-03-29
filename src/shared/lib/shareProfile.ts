import { Share } from '@capacitor/share';

function buildProfileUrl(userId: string): string {
  if (typeof window === 'undefined') {
    return '';
  }
  return `${window.location.origin}/profile/${encodeURIComponent(userId)}`;
}

function isShareCancelled(error: unknown): boolean {
  if (error instanceof DOMException && error.name === 'AbortError') {
    return true;
  }
  const message = error instanceof Error ? error.message : String(error);
  return /cancel/i.test(message);
}

export async function shareProfile(params: { userId: string; displayName: string }): Promise<void> {
  const url = buildProfileUrl(params.userId);

  try {
    await Share.share({
      title: params.displayName,
      text: `Профиль: ${params.displayName}`,
      url,
      dialogTitle: 'Поделиться профилем',
    });
  } catch (error) {
    if (isShareCancelled(error)) {
      return;
    }
    throw error;
  }
}
