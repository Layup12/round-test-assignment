import type { FormEvent } from 'react';
import { useCallback, useState } from 'react';

interface UseCreatePostFormParams {
  onSubmit: (text: string) => void;
}

interface UseCreatePostFormResult {
  text: string;
  isValid: boolean;
  handleChange: (value: string) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function useCreatePostForm({ onSubmit }: UseCreatePostFormParams): UseCreatePostFormResult {
  const [text, setText] = useState('');

  const trimmed = text.trim();
  const isValid = trimmed.length > 0;

  const handleChange = useCallback((value: string) => {
    setText(value);
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!isValid) {
        return;
      }

      onSubmit(trimmed);
      setText('');
    },
    [isValid, onSubmit, trimmed],
  );

  return {
    text,
    isValid,
    handleChange,
    handleSubmit,
  };
}
