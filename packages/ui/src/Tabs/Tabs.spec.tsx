import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { Tabs, Tab } from './Tabs';

function renderTabs(defaultIndex = 0) {
  return render(
    <Tabs defaultIndex={defaultIndex}>
      <Tab label="Overview">Overview content</Tab>
      <Tab label="Holdings">Holdings content</Tab>
      <Tab label="Performance">Performance content</Tab>
    </Tabs>,
  );
}

describe('Tabs', () => {
  it('renders all tab buttons', () => {
    renderTabs();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('shows the default tab panel', () => {
    renderTabs();
    expect(screen.getByText('Overview content')).toBeVisible();
    expect(screen.queryByText('Holdings content')).not.toBeInTheDocument();
  });

  it('selects defaultIndex tab', () => {
    renderTabs(1);
    expect(screen.getByText('Holdings content')).toBeVisible();
    expect(screen.queryByText('Overview content')).not.toBeInTheDocument();
  });

  it('switches tab on click', async () => {
    const user = userEvent.setup();
    renderTabs();
    await user.click(screen.getByRole('tab', { name: 'Holdings' }));
    expect(screen.getByText('Holdings content')).toBeVisible();
    expect(screen.queryByText('Overview content')).not.toBeInTheDocument();
  });

  it('has correct ARIA attributes', () => {
    renderTabs();
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');

    const panel = screen.getByRole('tabpanel');
    expect(panel).toHaveAttribute('aria-labelledby', tabs[0].id);
    expect(tabs[0]).toHaveAttribute('aria-controls', panel.id);
  });

  it('uses roving tabindex', () => {
    renderTabs();
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('tabindex', '0');
    expect(tabs[1]).toHaveAttribute('tabindex', '-1');
    expect(tabs[2]).toHaveAttribute('tabindex', '-1');
  });

  it('navigates with ArrowRight', async () => {
    const user = userEvent.setup();
    renderTabs();
    screen.getByRole('tab', { name: 'Overview' }).focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Holdings' })).toHaveFocus();
    expect(screen.getByText('Holdings content')).toBeVisible();
  });

  it('wraps from last to first with ArrowRight', async () => {
    const user = userEvent.setup();
    renderTabs(2);
    screen.getByRole('tab', { name: 'Performance' }).focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveFocus();
  });

  it('navigates with ArrowLeft', async () => {
    const user = userEvent.setup();
    renderTabs(1);
    screen.getByRole('tab', { name: 'Holdings' }).focus();
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveFocus();
  });

  it('wraps from first to last with ArrowLeft', async () => {
    const user = userEvent.setup();
    renderTabs();
    screen.getByRole('tab', { name: 'Overview' }).focus();
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'Performance' })).toHaveFocus();
  });

  it('Home goes to first tab', async () => {
    const user = userEvent.setup();
    renderTabs(2);
    screen.getByRole('tab', { name: 'Performance' }).focus();
    await user.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveFocus();
  });

  it('End goes to last tab', async () => {
    const user = userEvent.setup();
    renderTabs();
    screen.getByRole('tab', { name: 'Overview' }).focus();
    await user.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Performance' })).toHaveFocus();
  });

  it('has no axe violations', async () => {
    const { container } = renderTabs();
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
