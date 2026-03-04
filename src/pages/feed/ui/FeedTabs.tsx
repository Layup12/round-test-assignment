import { Tabs } from '@mantine/core';

import type { FeedTab } from '../model';

interface FeedTabsProps {
  value: FeedTab;
  onChange: (value: FeedTab) => void;
}

export function FeedTabs({ value, onChange }: FeedTabsProps) {
  return (
    <Tabs value={value} onChange={(next) => next && onChange(next as FeedTab)} variant="outline" radius="md">
      <Tabs.List grow>
        <Tabs.Tab value="all">Все посты</Tabs.Tab>
        <Tabs.Tab value="following">Подписки</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
