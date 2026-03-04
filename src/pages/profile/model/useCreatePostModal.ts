import { useState } from 'react';

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

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const handleSubmitAndClose = (text: string) => {
    onSubmit(text);
    setIsOpen(false);
  };

  return {
    isOpen,
    open,
    close,
    handleSubmitAndClose,
  };
}
