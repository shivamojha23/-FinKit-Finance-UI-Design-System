import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  args: {
    label: 'Amount',
    placeholder: '0.00',
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {};

export const WithHelper: Story = {
  args: {
    label: 'Ticker Symbol',
    placeholder: 'e.g. AAPL',
    message: 'Enter a valid NYSE or NASDAQ symbol',
  },
};

export const Error: Story = {
  args: {
    label: 'Investment Amount',
    value: '-500',
    message: 'Amount must be a positive number',
    error: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Locked Field',
    value: 'Read only',
    disabled: true,
  },
};
