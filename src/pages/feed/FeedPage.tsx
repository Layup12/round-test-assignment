import { useAppDispatch } from '@app/store';
import { clearCurrentUser } from '@entities';
import { Button, Container, Stack, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export function FeedPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearCurrentUser());
    navigate('/auth', { replace: true });
  };

  return (
    <Container size="xs">
      <Stack>
        <Title ta="center">Лента</Title>
        <Button variant="outline" onClick={handleLogout}>
          Выйти
        </Button>
      </Stack>
    </Container>
  );
}
