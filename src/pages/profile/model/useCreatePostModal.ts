import { useCallback, useState } from 'react';

interface UseCreatePostModalParams {
  onSubmit: (text: string) => void;
}

interface UseCreatePostModalResult {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  handleSubmitAndClose: (text: string) => void;
}

export function useCreatePostModal({ onSubmit }: UseCreatePostModalParams): UseCreatePostModalResult {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSubmitAndClose = useCallback(
    (text: string) => {
      onSubmit(text);
      setIsOpen(false);
    },
    [onSubmit],
  );

  return {
    isOpen,
    open,
    close,
    handleSubmitAndClose,
  };
}
