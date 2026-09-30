import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { Modal } from './Modal';

function renderModal(open = true, onClose = vi.fn()) {
  return {
    onClose,
    ...render(
      <Modal open={open} onClose={onClose} aria-label="Test dialog">
        <button>First</button>
        <button>Second</button>
      </Modal>,
    ),
  };
}

describe('Modal', () => {
  it('renders nothing when open=false', () => {
    render(
      <Modal open={false} onClose={vi.fn()} aria-label="Hidden">
        <p>content</p>
      </Modal>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders a dialog when open=true', () => {
    renderModal();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('has aria-modal and aria-label', () => {
    renderModal();
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-label', 'Test dialog');
  });

  it('calls onClose on Escape', async () => {
    const user = userEvent.setup();
    const { onClose } = renderModal();
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose on backdrop click', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal open={true} onClose={onClose} aria-label="Backdrop test">
        <p>inner</p>
      </Modal>,
    );
    // Click the backdrop (the outer div)
    const backdrop = screen.getByRole('dialog').parentElement!;
    await user.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose on inner content click', async () => {
    const user = userEvent.setup();
    const { onClose } = renderModal();
    await user.click(screen.getByText('First'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('traps focus with Tab', async () => {
    const user = userEvent.setup();
    renderModal();
    // Wait for focus to move into dialog
    await waitFor(() => {
      expect(screen.getByText('First')).toHaveFocus();
    });
    await user.tab();
    expect(screen.getByText('Second')).toHaveFocus();
    // Tab from last should wrap to first
    await user.tab();
    expect(screen.getByText('First')).toHaveFocus();
  });

  it('traps focus with Shift+Tab', async () => {
    const user = userEvent.setup();
    renderModal();
    await waitFor(() => {
      expect(screen.getByText('First')).toHaveFocus();
    });
    // Shift+Tab from first should wrap to last
    await user.tab({ shift: true });
    expect(screen.getByText('Second')).toHaveFocus();
  });

  it('restores focus to trigger on close', async () => {
    const trigger = document.createElement('button');
    trigger.textContent = 'Open';
    document.body.appendChild(trigger);
    trigger.focus();

    const onClose = vi.fn();
    const { rerender } = render(
      <Modal open={true} onClose={onClose} aria-label="Restore test">
        <button>Inside</button>
      </Modal>,
    );

    rerender(
      <Modal open={false} onClose={onClose} aria-label="Restore test">
        <button>Inside</button>
      </Modal>,
    );

    expect(trigger).toHaveFocus();
    document.body.removeChild(trigger);
  });

  it('has no axe violations', async () => {
    const { container } = renderModal();
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
