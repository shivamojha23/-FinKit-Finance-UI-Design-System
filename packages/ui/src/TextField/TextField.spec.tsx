import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { TextField } from './TextField';

describe('TextField', () => {
  it('renders label and input linked by htmlFor', () => {
    render(<TextField label="Email" />);
    const input = screen.getByLabelText('Email');
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe('INPUT');
  });

  it('shows helper message linked via aria-describedby', () => {
    render(<TextField label="Name" message="Required" />);
    const input = screen.getByLabelText('Name');
    const msg = screen.getByText('Required');
    expect(input).toHaveAttribute('aria-describedby', msg.id);
  });

  it('sets aria-invalid and role=alert in error state', () => {
    render(<TextField label="Amount" message="Must be positive" error />);
    const input = screen.getByLabelText('Amount');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    const msg = screen.getByRole('alert');
    expect(msg).toHaveTextContent('Must be positive');
  });

  it('does not set aria-invalid when error is false', () => {
    render(<TextField label="Notes" />);
    expect(screen.getByLabelText('Notes')).not.toHaveAttribute('aria-invalid');
  });

  it('forwards native input props', async () => {
    const user = userEvent.setup();
    render(<TextField label="Search" placeholder="type here" />);
    const input = screen.getByPlaceholderText('type here');
    await user.type(input, 'hello');
    expect(input).toHaveValue('hello');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <TextField label="Accessible" message="Helper text" />,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });

  it('has no axe violations in error state', async () => {
    const { container } = render(
      <TextField label="Error field" message="Invalid" error />,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
