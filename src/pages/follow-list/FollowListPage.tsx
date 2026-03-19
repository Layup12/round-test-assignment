import { Box, Button, Container, Paper, Stack, Text, Title } from '@mantine/core';
import type { CSSProperties } from 'react';
import { AutoSizer, List } from 'react-virtualized';

import classes from './FollowListPage.module.scss';
import { type FollowListType, useFollowList } from './useFollowList';

interface FollowListPageProps {
  type: FollowListType;
}

export function FollowListPage({ type }: FollowListPageProps) {
  const { title, users, canLoadMore, handleBack, handleLoadMore, handleUserClick } = useFollowList(type);

  const rowHeight = 56;

  const rowRenderer = ({ index, key, style }: { index: number; key: string; style: CSSProperties }) => {
    const user = users[index];

    return (
      <div key={key} className={classes.followerRow} style={style}>
        <Paper
          withBorder
          radius="md"
          p="xs"
          shadow="xs"
          className={classes.followerCard}
          onClick={() => handleUserClick(user.id)}
        >
          <Text ta="center">{user.name}</Text>
        </Paper>
      </div>
    );
  };

  return (
    <Container>
      <Stack className={classes.content}>
        <Title size="h2" ta="center">
          {title}
        </Title>

        <Stack className={classes.listSection}>
          {users.length === 0 ? (
            <Text c="dimmed">Список пуст.</Text>
          ) : (
            <div className={classes.listWrapper}>
              <AutoSizer>
                {({ width, height }: { width: number; height: number }) => (
                  <List
                    width={width}
                    height={height}
                    rowCount={users.length}
                    rowHeight={rowHeight}
                    rowRenderer={rowRenderer}
                    overscanRowCount={3}
                  />
                )}
              </AutoSizer>
            </div>
          )}

          {canLoadMore && (
            <Button variant="light" onClick={handleLoadMore}>
              Загрузить ещё
            </Button>
          )}
        </Stack>

        <Box mt="auto">
          <Button variant="light" fullWidth onClick={handleBack}>
            Назад
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}
