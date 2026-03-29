import { Button, Container, Stack, Title } from '@mantine/core';

type ProfilePageNotFoundProps = {
  onBack: () => void;
};

export function ProfilePageNotFound({ onBack }: ProfilePageNotFoundProps) {
  return (
    <Container>
      <Stack>
        <Button variant="light" onClick={onBack}>
          Назад
        </Button>
        <Title order={3}>Пользователь не найден</Title>
      </Stack>
    </Container>
  );
}
