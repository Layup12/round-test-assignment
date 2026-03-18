import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { AppLayout, AppMantineProvider, hideNativeSplash, NativeShellProvider } from './providers';
import { AppRouter } from './routes';
import { appPersistStore, appStore } from './store';

export function App() {
  return (
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={appPersistStore} onBeforeLift={hideNativeSplash}>
        <AppMantineProvider>
          <BrowserRouter>
            <NativeShellProvider>
              <AppLayout>
                <AppRouter />
              </AppLayout>
            </NativeShellProvider>
          </BrowserRouter>
        </AppMantineProvider>
      </PersistGate>
    </Provider>
  );
}
