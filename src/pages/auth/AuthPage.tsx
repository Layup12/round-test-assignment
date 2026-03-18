import { Button, Container, Stack, Title } from '@mantine/core';
import { Input } from '@shared/ui';

import classes from './AuthPage.module.scss';
import { useAuthForm } from './useAuthForm';

export function AuthPage() {
  const { name, setName, isValid, handleSubmit } = useAuthForm();

  return (
    <Container className={classes.root}>
      <Stack className={classes.formWrapper}>
        <form
          name="auth-form"
          aria-label="Форма авторизации"
          className={classes.form}
          onSubmit={handleSubmit}
        >
          <Stack>
            <Title ta="center">Введите имя</Title>
            <Input
              id="auth-name"
              name="name"
              aria-label="Имя пользователя"
              placeholder="Например, Валерий"
              value={name}
              onChange={({ currentTarget: { value } }) => setName(value)}
              maxLength={12}
              autoFocus
              canClear
            />

            <Button type="submit" disabled={!isValid}>
              Продолжить
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
}
