import { useDispatch } from 'react-redux';

import type { AppDispatch } from './AppStore';

export function useAppDispatch(): AppDispatch {
  return useDispatch<AppDispatch>();
}
