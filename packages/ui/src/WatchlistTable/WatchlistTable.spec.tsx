import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { WatchlistTable, type WatchlistRow } from './WatchlistTable';

const mockRows: WatchlistRow[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 189.84, change: 2.31, changePercent: 1.23, volume: 52_300_000 },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: 248.42, change: -5.18, changePercent: -2.04, volume: 98_100_000 },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 378.91, change: 12.47, changePercent: 3.4, volume: 23_400_000 },
];

describe('WatchlistTable', () => {
  it('renders all rows', () => {
    render(<WatchlistTable rows={mockRows} />);
    const rows = screen.getAllByRole('row');
    // 1 header + 3 data rows
    expect(rows).toHaveLength(4);
  });

  it('renders all column headers', () => {
    render(<WatchlistTable rows={mockRows} />);
    expect(screen.getByText('Symbol')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Change')).toBeInTheDocument();
    expect(screen.getByText('Volume')).toBeInTheDocument();
  });

  it('displays formatted volume', () => {
    render(<WatchlistTable rows={mockRows} />);
    expect(screen.getByText('52.3M')).toBeInTheDocument();
    expect(screen.getByText('98.1M')).toBeInTheDocument();
  });

  it('applies positive class to gains', () => {
    const { container } = render(<WatchlistTable rows={mockRows} />);
    const positiveCells = container.querySelectorAll('.fk-watchlist__positive');
    expect(positiveCells.length).toBeGreaterThan(0);
  });

  it('applies negative class to losses', () => {
    const { container } = render(<WatchlistTable rows={mockRows} />);
    const negativeCells = container.querySelectorAll('.fk-watchlist__negative');
    expect(negativeCells.length).toBeGreaterThan(0);
  });

  it('sorts ascending by symbol by default', () => {
    render(<WatchlistTable rows={mockRows} />);
    const dataRows = screen.getAllByRole('row').slice(1);
    const firstCells = dataRows.map((r) => within(r).getAllByRole('cell')[0].textContent);
    expect(firstCells).toEqual(['AAPL', 'MSFT', 'TSLA']);
  });

  it('toggles to descending on second click', async () => {
    const user = userEvent.setup();
    render(<WatchlistTable rows={mockRows} />);
    await user.click(screen.getByText('Symbol'));
    const dataRows = screen.getAllByRole('row').slice(1);
    const firstCells = dataRows.map((r) => within(r).getAllByRole('cell')[0].textContent);
    expect(firstCells).toEqual(['TSLA', 'MSFT', 'AAPL']);
  });

  it('sorts by price ascending', async () => {
    const user = userEvent.setup();
    render(<WatchlistTable rows={mockRows} />);
    await user.click(screen.getByText('Price'));
    const dataRows = screen.getAllByRole('row').slice(1);
    const symbols = dataRows.map((r) => within(r).getAllByRole('cell')[0].textContent);
    expect(symbols).toEqual(['AAPL', 'TSLA', 'MSFT']);
  });

  it('sets aria-sort on the active column header', () => {
    render(<WatchlistTable rows={mockRows} />);
    const symbolHeader = screen.getByText('Symbol').closest('th');
    expect(symbolHeader).toHaveAttribute('aria-sort', 'ascending');
    const priceHeader = screen.getByText('Price').closest('th');
    expect(priceHeader).not.toHaveAttribute('aria-sort');
  });

  it('has aria-label on the table', () => {
    render(<WatchlistTable rows={mockRows} aria-label="My Watchlist" />);
    expect(screen.getByRole('grid')).toHaveAttribute('aria-label', 'My Watchlist');
  });

  it('has no axe violations', async () => {
    const { container } = render(<WatchlistTable rows={mockRows} />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
