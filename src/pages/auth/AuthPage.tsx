import {
  Button,
  Container,
  Stack,
  // TextInput,
  Title,
} from '@mantine/core';

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
            <input
              autoFocus
              value={name}
              onChange={({ currentTarget: { value } }) => setName(value)}
              style={{ width: '100%', height: 44 }}
            />
            {/* <TextInput
              id="auth-name"
              name="name"
              value={name}
              maxLength={12}
              placeholder="Введите имя"
              onChange={({ currentTarget: { value } }) => setName(value)}
              autoFocus
              w={300}
            /> */}
            <Button type="submit" disabled={!isValid}>
              Продолжить
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
}
