import { useAppDispatch, useAppSelector } from '@app/store';
import { addUser, selectAllUsers, setCurrentUser, type UserEntity } from '@entities';
import type { SubmitEvent } from 'react';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MIN_LENGTH = 4;
const MAX_LENGTH = 12;

export function useAuthForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => selectAllUsers(state.users));

  const [name, setName] = useState('');

  const trimmedName = name.trim();
  const isValid = trimmedName.length >= MIN_LENGTH && trimmedName.length <= MAX_LENGTH;

  const handleSubmit = useCallback(
    (event: SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!isValid) {
        return;
      }

      const existingUser = users.find((user) => user.name === trimmedName);

      let user: UserEntity;

      if (existingUser) {
        user = existingUser;
      } else {
        user = {
          id: crypto.randomUUID(),
          name: trimmedName,
        };
        dispatch(addUser(user));
      }

      dispatch(setCurrentUser(user.id));
      navigate('/feed', { replace: true });
    },
    [dispatch, isValid, navigate, trimmedName, users],
  );

  return { name, setName, isValid, handleSubmit };
}
