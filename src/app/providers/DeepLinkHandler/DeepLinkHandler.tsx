import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { getRouteFromDeepLink } from '@shared/lib';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

let coldStartDeepLinkConsumed = false;

function normalizePath(path: string): string {
  return path.replace(/\/$/, '') || '/';
}

function navigateIfProfilePath(
  navigate: ReturnType<typeof useNavigate>,
  url: string,
  currentPathname: string,
) {
  const path = getRouteFromDeepLink(url);
  if (!path) {
    return;
  }
  if (normalizePath(path) === normalizePath(currentPathname)) {
    return;
  }
  navigate(path, { replace: true });
}

export function DeepLinkHandler() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathnameRef = useRef(location.pathname);

  useLayoutEffect(() => {
    pathnameRef.current = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    let removeListener: (() => void) | undefined;

    void App.getLaunchUrl().then((launch) => {
      if (coldStartDeepLinkConsumed) {
        return;
      }
      coldStartDeepLinkConsumed = true;
      if (launch?.url) {
        navigateIfProfilePath(navigate, launch.url, pathnameRef.current);
      }
    });

    void App.addListener('appUrlOpen', (event) => {
      navigateIfProfilePath(navigate, event.url, pathnameRef.current);
    }).then((handle) => {
      removeListener = () => {
        void handle.remove();
      };
    });

    return () => {
      removeListener?.();
    };
  }, [navigate]);

  return null;
}
