import { useCallback, useEffect, useState } from 'react';

interface UseEditableProfileNameParams {
  name: string;
  canEdit: boolean;
  onNameChange?: (nextName: string) => void;
}

interface UseEditableProfileNameResult {
  isEditing: boolean;
  draftName: string;
  handleStartEdit: () => void;
  handleChange: (value: string) => void;
  handleBlur: () => void;
  handleCancel: () => void;
}

export function useEditableProfileName({
  name,
  canEdit,
  onNameChange,
}: UseEditableProfileNameParams): UseEditableProfileNameResult {
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState(name);

  useEffect(() => {
    setDraftName(name);
  }, [name]);

  const reset = useCallback(() => {
    setIsEditing(false);
    setDraftName(name);
  }, [name]);

  const handleStartEdit = useCallback(() => {
    if (!canEdit) {
      return;
    }

    setIsEditing(true);
  }, [canEdit]);

  const handleChange = useCallback((value: string) => {
    setDraftName(value);
  }, []);

  const handleApply = useCallback(() => {
    if (!canEdit || !onNameChange) {
      reset();
      return;
    }

    const trimmed = draftName.trim();

    if (trimmed.length < 4 || trimmed === name) {
      reset();
      return;
    }

    onNameChange(trimmed);
    setIsEditing(false);
  }, [canEdit, draftName, name, onNameChange, reset]);

  const handleBlur = useCallback(() => {
    handleApply();
  }, [handleApply]);

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  return {
    isEditing,
    draftName,
    handleStartEdit,
    handleChange,
    handleBlur,
    handleCancel,
  };
}
