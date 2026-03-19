import { Button, Group, Stack } from '@mantine/core';
import { Textarea } from '@shared/ui';

import { useCreatePostForm } from '../model';
import classes from './CreatePostForm.module.scss';

interface CreatePostFormProps {
  onSubmit: (text: string) => void;
}

export function CreatePostForm({ onSubmit }: CreatePostFormProps) {
  const { text, isValid, handleChange, handleSubmit } = useCreatePostForm({ onSubmit });

  return (
    <form name="create-post-form" aria-label="Форма создания поста" onSubmit={handleSubmit}>
      <Stack pt="xs">
        <Textarea
          id="create-post-text"
          name="postText"
          aria-label="Текст поста"
          placeholder="Напишите, чем хотите поделиться..."
          value={text}
          onChange={({ currentTarget: { value } }) => handleChange(value)}
          classes={{ textarea: classes.textarea }}
          autoFocus
          canClear
        />

        <Group justify="flex-end">
          <Button type="submit" disabled={!isValid}>
            Опубликовать
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
