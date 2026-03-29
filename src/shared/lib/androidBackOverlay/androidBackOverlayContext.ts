import { createContext } from 'react';

export type AndroidBackOverlayContextValue = {
  pushClose: (close: () => void) => () => void;
  consumeBack: () => boolean;
};

export const AndroidBackOverlayContext = createContext<AndroidBackOverlayContextValue | null>(null);
