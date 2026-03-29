import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { getRouteFromDeepLink } from '@shared/lib';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function navigateIfProfilePath(navigate: ReturnType<typeof useNavigate>, url: string) {
  const path = getRouteFromDeepLink(url);
  if (path) {
    navigate(path, { replace: true });
  }
}

export function DeepLinkHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    let removeListener: (() => void) | undefined;

    void App.getLaunchUrl().then((launch) => {
      if (launch?.url) {
        navigateIfProfilePath(navigate, launch.url);
      }
    });

    void App.addListener('appUrlOpen', (event) => {
      navigateIfProfilePath(navigate, event.url);
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
