import type { Meta, StoryObj } from '@storybook/react';
import { QuoteCard } from './QuoteCard';

const meta: Meta<typeof QuoteCard> = {
  title: 'Components/QuoteCard',
  component: QuoteCard,
};

export default meta;
type Story = StoryObj<typeof QuoteCard>;

export const Positive: Story = {
  args: {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 189.84,
    change: 2.31,
    changePercent: 1.23,
  },
};

export const Negative: Story = {
  args: {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 248.42,
    change: -5.18,
    changePercent: -2.04,
  },
};

export const WithFooter: Story = {
  render: () => (
    <QuoteCard
      symbol="MSFT"
      name="Microsoft Corporation"
      price={378.91}
      change={12.47}
      changePercent={3.4}
    >
      <span style={{ fontSize: '0.75rem', color: '#a0a3b1' }}>
        Updated 2 min ago
      </span>
    </QuoteCard>
  ),
};

export const Flat: Story = {
  args: {
    symbol: 'BRK.B',
    name: 'Berkshire Hathaway Inc.',
    price: 411.0,
    change: 0.0,
    changePercent: 0.0,
  },
};
