import { useState } from 'react';

interface UseEditableProfileNameResult {
  isEditing: boolean;
  draftName: string;
  handleStartEdit: () => void;
  handleChange: (value: string) => void;
  handleBlur: () => void;
  handleCancel: () => void;
}

function resetEditing(params: {
  name: string;
  setIsEditing: (value: boolean) => void;
  setDraftName: (value: string) => void;
}) {
  const { name, setIsEditing, setDraftName } = params;
  setIsEditing(false);
  setDraftName(name);
}

export function useEditableProfileName({
  name,
  canEdit,
  onNameChange,
}: {
  name: string;
  canEdit: boolean;
  onNameChange?: (nextName: string) => void;
}): UseEditableProfileNameResult {
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState(name);

  const handleStartEdit = () => {
    if (!canEdit) {
      return;
    }

    setDraftName(name);
    setIsEditing(true);
  };

  const handleBlur = () => {
    if (!canEdit || !onNameChange) {
      resetEditing({ name, setIsEditing, setDraftName });
      return;
    }

    const trimmed = draftName.trim();

    if (trimmed.length < 4 || trimmed === name) {
      resetEditing({ name, setIsEditing, setDraftName });
      return;
    }

    onNameChange(trimmed);
    setIsEditing(false);
  };

  return {
    isEditing,
    draftName,
    handleStartEdit,
    handleChange: setDraftName,
    handleBlur,
    handleCancel: () => resetEditing({ name, setIsEditing, setDraftName }),
  };
}
