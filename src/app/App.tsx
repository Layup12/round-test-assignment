import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { AppRouter } from './routes';
import { appPersistStore, appStore } from './store';

export function App() {
  return (
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={appPersistStore}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
