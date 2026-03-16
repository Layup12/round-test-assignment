import type { AppDispatch, RootState } from '@app/store';

import { addUser, selectAllUsers } from '../../user/userSlice';
import { setCurrentUser } from './authSlice';

export const loginByName = (rawName: string) => (dispatch: AppDispatch, getState: () => RootState) => {
  const trimmedName = rawName.trim();

  if (!trimmedName) {
    return;
  }

  const usersState = getState().users;
  const users = selectAllUsers(usersState);

  const existingUser = users.find((user) => user.name === trimmedName);

  let userId: string;

  if (existingUser) {
    userId = existingUser.id;
  } else {
    const action = addUser(trimmedName);
    dispatch(action);
    userId = action.payload.id;
  }

  dispatch(setCurrentUser(userId));
};
