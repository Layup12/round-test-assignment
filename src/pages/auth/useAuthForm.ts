import { useAppDispatch, useAppSelector } from '@app/store';
import { addUser, selectAllUsers, setCurrentUser } from '@entities';
import type { SubmitEvent } from 'react';
import { useState } from 'react';
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

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValid) {
      return;
    }

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
    navigate('/feed', { replace: true });
  };

  return { name, setName, isValid, handleSubmit };
}
