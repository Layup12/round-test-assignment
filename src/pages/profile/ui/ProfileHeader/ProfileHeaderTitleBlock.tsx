import { Button, Text } from '@mantine/core';
import { Input } from '@shared/ui';
import { type KeyboardEvent, type MouseEventHandler } from 'react';

import classes from './ProfileHeader.module.scss';

interface ProfileHeaderTitleBlockProps {
  name: string;
  canEditName: boolean;
  isEditing: boolean;
  draftName: string;
  onChangeDraft: (value: string) => void;
  onBlurName: () => void;
  onStartEdit: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export function ProfileHeaderTitleBlock({
  name,
  canEditName,
  isEditing,
  draftName,
  onChangeDraft,
  onBlurName,
  onStartEdit,
  onKeyDown,
}: ProfileHeaderTitleBlockProps) {
  return (
    <div className={classes.nameBlock}>
      {canEditName ? (
        isEditing ? (
          <Input
            id="name"
            name="name"
            aria-label="Имя пользователя"
            placeholder="Введите имя"
            value={draftName}
            onChange={({ currentTarget: { value } }) => onChangeDraft(value)}
            onBlur={onBlurName}
            onKeyDown={onKeyDown}
            classes={{ root: classes.nameInputRoot }}
            maxLength={12}
            autoFocus
            canClear
          />
        ) : (
          <Button
            variant="subtle"
            onClick={onStartEdit as MouseEventHandler<HTMLButtonElement>}
            aria-label="Изменить имя"
            className={classes.nameButton}
          >
            <Text fw={600} size="lg" className="ellipsisText">
              {name}
            </Text>
          </Button>
        )
      ) : (
        <Text fw={600} size="lg" className="ellipsisText">
          {name}
        </Text>
      )}
    </div>
  );
}
