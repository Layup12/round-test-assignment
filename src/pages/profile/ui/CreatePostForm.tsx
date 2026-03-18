import { Button, Group, Stack } from '@mantine/core';

import { useCreatePostForm } from '../model';

interface CreatePostFormProps {
  onSubmit: (text: string) => void;
}

export function CreatePostForm({ onSubmit }: CreatePostFormProps) {
  const { text, isValid, handleChange, handleSubmit } = useCreatePostForm({ onSubmit });

  return (
    <form name="create-post-form" aria-label="Форма создания поста" onSubmit={handleSubmit}>
      <Stack gap="xs">
        <textarea
          autoFocus
          value={text}
          onChange={({ currentTarget: { value } }) => handleChange(value)}
          placeholder="Напишите, чем хотите поделиться..."
          style={{ width: '100%', height: 100, padding: 12 }}
        />
        {/* <Textarea
          id="create-post-text"
          name="postText"
          value={text}
          autosize
          minRows={2}
          maxRows={4}
          placeholder="Напишите, чем хотите поделиться..."
          onChange={({ currentTarget: { value } }) => handleChange(value)}
          flex={1}
        /> */}

        <Group justify="flex-end">
          <Button type="submit" disabled={!isValid}>
            Опубликовать
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
