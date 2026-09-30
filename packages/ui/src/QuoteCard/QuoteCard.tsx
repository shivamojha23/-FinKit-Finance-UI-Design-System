import type { ReactNode } from 'react';
import './QuoteCard.css';

export interface QuoteCardProps {
  /** Ticker symbol, e.g. "AAPL". */
  symbol: string;
  /** Company or fund name. */
  name: string;
  /** Current price. */
  price: number;
  /** Absolute change from previous close. */
  change: number;
  /** Percentage change from previous close. */
  changePercent: number;
  /** Optional slot rendered below the price row. */
  children?: ReactNode;
}

function formatPrice(n: number): string {
  return n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
}

function formatPercent(n: number): string {
  const sign = n >= 0 ? '+' : '';
  return `${sign}${n.toFixed(2)}%`;
}

function formatChange(n: number): string {
  const sign = n >= 0 ? '+' : '';
  return `${sign}${n.toFixed(2)}`;
}

export function QuoteCard({
  symbol,
  name,
  price,
  change,
  changePercent,
  children,
}: QuoteCardProps) {
  const direction = change >= 0 ? 'positive' : 'negative';

  return (
    <article className="fk-quote-card" aria-label={`${name} stock quote`}>
      <div className="fk-quote-card__header">
        <span className="fk-quote-card__symbol">{symbol}</span>
        <span className="fk-quote-card__name">{name}</span>
      </div>
      <div className="fk-quote-card__body">
        <span className="fk-quote-card__price">{formatPrice(price)}</span>
        <span
          className={`fk-quote-card__change fk-quote-card__change--${direction}`}
          aria-label={`Change: ${formatChange(change)} (${formatPercent(changePercent)})`}
        >
          {formatChange(change)} ({formatPercent(changePercent)})
        </span>
      </div>
      {children && <div className="fk-quote-card__footer">{children}</div>}
    </article>
  );
}
