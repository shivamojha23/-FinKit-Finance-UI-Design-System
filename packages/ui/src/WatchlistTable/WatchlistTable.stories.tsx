import type { Meta, StoryObj } from '@storybook/react';
import { WatchlistTable, type WatchlistRow } from './WatchlistTable';

const sampleRows: WatchlistRow[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 189.84, change: 2.31, changePercent: 1.23, volume: 52_300_000 },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: 248.42, change: -5.18, changePercent: -2.04, volume: 98_100_000 },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 378.91, change: 12.47, changePercent: 3.4, volume: 23_400_000 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 141.8, change: 0.92, changePercent: 0.65, volume: 18_700_000 },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 178.25, change: -1.34, changePercent: -0.75, volume: 41_600_000 },
];

const meta: Meta<typeof WatchlistTable> = {
  title: 'Components/WatchlistTable',
  component: WatchlistTable,
};

export default meta;
type Story = StoryObj<typeof WatchlistTable>;

export const Default: Story = {
  args: {
    rows: sampleRows,
    'aria-label': 'Tech Watchlist',
  },
};

export const SingleRow: Story = {
  args: {
    rows: [sampleRows[0]],
  },
};
