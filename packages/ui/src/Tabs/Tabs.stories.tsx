import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, Tab } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs>
      <Tab label="Overview">
        <p style={{ color: '#f0f0f3' }}>Fund overview with key metrics and performance summary.</p>
      </Tab>
      <Tab label="Holdings">
        <p style={{ color: '#f0f0f3' }}>Top 10 holdings by weight in the portfolio.</p>
      </Tab>
      <Tab label="Performance">
        <p style={{ color: '#f0f0f3' }}>1Y, 3Y, 5Y annualised return data.</p>
      </Tab>
    </Tabs>
  ),
};

export const SecondTabDefault: Story = {
  name: 'Default to second tab',
  render: () => (
    <Tabs defaultIndex={1}>
      <Tab label="Summary">
        <p style={{ color: '#f0f0f3' }}>Account summary.</p>
      </Tab>
      <Tab label="Transactions">
        <p style={{ color: '#f0f0f3' }}>Recent transactions list.</p>
      </Tab>
    </Tabs>
  ),
};
