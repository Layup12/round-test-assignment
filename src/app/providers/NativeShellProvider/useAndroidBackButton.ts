import { App } from '@capacitor/app';
import type { PluginListenerHandle } from '@capacitor/core';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AUTH_ROUTE, FEED_ROUTE } from '../../routes/paths';

export function useAndroidBackButton(consumeOverlay: () => boolean) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let handler: PluginListenerHandle | undefined;

    void App.addListener('backButton', (event: { canGoBack?: boolean }) => {
      if (consumeOverlay()) {
        return;
      }

      if (event.canGoBack) {
        navigate(-1);
        return;
      }

      if ([AUTH_ROUTE, FEED_ROUTE].includes(location.pathname)) {
        void App.exitApp();
      }
    }).then((handle) => {
      handler = handle;
    });

    return () => {
      handler?.remove();
    };
  }, [consumeOverlay, location.pathname, navigate]);
}
