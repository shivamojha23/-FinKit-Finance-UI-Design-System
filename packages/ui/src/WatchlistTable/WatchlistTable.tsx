import { useState, useCallback, useMemo } from 'react';
import './WatchlistTable.css';

export interface WatchlistRow {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

export type SortField = keyof WatchlistRow;
export type SortDirection = 'asc' | 'desc';

export interface WatchlistTableProps {
  /** Row data to display. */
  rows: WatchlistRow[];
  /** Accessible label for the table. */
  'aria-label'?: string;
}

const COLUMNS: { key: SortField; label: string; align: 'left' | 'right' }[] = [
  { key: 'symbol', label: 'Symbol', align: 'left' },
  { key: 'name', label: 'Name', align: 'left' },
  { key: 'price', label: 'Price', align: 'right' },
  { key: 'change', label: 'Change', align: 'right' },
  { key: 'changePercent', label: '%', align: 'right' },
  { key: 'volume', label: 'Volume', align: 'right' },
];

function formatVolume(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

function compare(a: WatchlistRow, b: WatchlistRow, field: SortField): number {
  const av = a[field];
  const bv = b[field];
  if (typeof av === 'string' && typeof bv === 'string') {
    return av.localeCompare(bv);
  }
  return (av as number) - (bv as number);
}

export function WatchlistTable({
  rows,
  'aria-label': ariaLabel = 'Watchlist',
}: WatchlistTableProps) {
  const [sortField, setSortField] = useState<SortField>('symbol');
  const [sortDir, setSortDir] = useState<SortDirection>('asc');

  const handleSort = useCallback(
    (field: SortField) => {
      if (field === sortField) {
        setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortField(field);
        setSortDir('asc');
      }
    },
    [sortField],
  );

  const sorted = useMemo(() => {
    const copy = [...rows];
    copy.sort((a, b) => {
      const result = compare(a, b, sortField);
      return sortDir === 'asc' ? result : -result;
    });
    return copy;
  }, [rows, sortField, sortDir]);

  return (
    <table className="fk-watchlist" role="grid" aria-label={ariaLabel}>
      <thead>
        <tr>
          {COLUMNS.map(({ key, label, align }) => (
            <th
              key={key}
              scope="col"
              className={`fk-watchlist__th fk-watchlist__th--${align}`}
              aria-sort={
                sortField === key
                  ? sortDir === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : undefined
              }
            >
              <button
                className="fk-watchlist__sort-btn"
                onClick={() => handleSort(key)}
                type="button"
              >
                {label}
                {sortField === key && (
                  <span aria-hidden="true">
                    {sortDir === 'asc' ? ' ▲' : ' ▼'}
                  </span>
                )}
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sorted.map((row) => {
          const dir = row.change >= 0 ? 'positive' : 'negative';
          return (
            <tr key={row.symbol}>
              <td className="fk-watchlist__td fk-watchlist__symbol">
                {row.symbol}
              </td>
              <td className="fk-watchlist__td">{row.name}</td>
              <td className="fk-watchlist__td fk-watchlist__td--right fk-watchlist__mono">
                {row.price.toFixed(2)}
              </td>
              <td
                className={`fk-watchlist__td fk-watchlist__td--right fk-watchlist__mono fk-watchlist__${dir}`}
              >
                {row.change >= 0 ? '+' : ''}
                {row.change.toFixed(2)}
              </td>
              <td
                className={`fk-watchlist__td fk-watchlist__td--right fk-watchlist__mono fk-watchlist__${dir}`}
              >
                {row.changePercent >= 0 ? '+' : ''}
                {row.changePercent.toFixed(2)}%
              </td>
              <td className="fk-watchlist__td fk-watchlist__td--right fk-watchlist__mono">
                {formatVolume(row.volume)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
