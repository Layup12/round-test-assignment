export function getRouteFromDeepLink(urlString: string): string | null {
  try {
    const url = new URL(urlString);
    let path = url.pathname || '';
    path = path.replace(/\/$/, '') || '/';
    if (!path.startsWith('/profile/')) {
      return null;
    }
    const rest = path.slice('/profile/'.length);
    const segments = rest.split('/').filter(Boolean);
    if (segments.length === 1) {
      return path;
    }
    if (segments.length === 2 && (segments[1] === 'followers' || segments[1] === 'following')) {
      return path;
    }
    return null;
  } catch {
    return null;
  }
}
