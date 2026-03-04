import { Button, Container, Stack, TextInput, Title } from '@mantine/core';

import classes from './AuthPage.module.scss';
import { useAuthForm } from './useAuthForm';

export function AuthPage() {
  const { name, setName, isValid, handleSubmit } = useAuthForm();

  return (
    <Container size="xs" className={classes.root}>
      <form name="auth-form" aria-label="Форма авторизации" className={classes.form} onSubmit={handleSubmit}>
        <Stack>
          <Title ta="center">Введите имя</Title>
          <TextInput
            id="auth-name"
            name="name"
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
