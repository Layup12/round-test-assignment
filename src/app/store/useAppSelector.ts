import { useSelector } from 'react-redux';

import type { RootState } from './AppStore';

export function useAppSelector<T>(selector: (state: RootState) => T): T {
  return useSelector(selector);
}
