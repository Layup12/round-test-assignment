import { Button, Container, Stack, TextInput, Title } from '@mantine/core';

import classes from './AuthPage.module.scss';
import { useAuthForm } from './useAuthForm';

export function AuthPage() {
  const { name, setName, isValid, handleSubmit } = useAuthForm();

  return (
    <Container size="xs" className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Stack>
          <Title ta="center">Введите имя</Title>
          <TextInput
            value={name}
            maxLength={12}
            placeholder="Введите имя"
            onChange={({ currentTarget: { value } }) => setName(value)}
            autoFocus
          />
          <Button type="submit" disabled={!isValid}>
            Продолжить
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
