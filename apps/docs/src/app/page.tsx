'use client';

import { useState } from 'react';
import {
  TextField,
  Modal,
  Tabs,
  Tab,
  QuoteCard,
  WatchlistTable,
  type WatchlistRow,
} from '@finkit/ui';

const watchlistData: WatchlistRow[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 189.84, change: 2.31, changePercent: 1.23, volume: 52_300_000 },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: 248.42, change: -5.18, changePercent: -2.04, volume: 98_100_000 },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 378.91, change: 12.47, changePercent: 3.4, volume: 23_400_000 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 141.8, change: 0.92, changePercent: 0.65, volume: 18_700_000 },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 178.25, change: -1.34, changePercent: -0.75, volume: 41_600_000 },
];

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [fieldValue, setFieldValue] = useState('');

  return (
    <>
      <section className="hero">
        <h1 className="hero__title">FinKit Components</h1>
        <p className="hero__subtitle">
          A finance-flavored UI design system. All 5 React components
          demonstrated below with live, interactive examples.
        </p>
      </section>

      {/* QuoteCard */}
      <section className="section">
        <h2 className="section__title">QuoteCard</h2>
        <p className="section__desc">
          Displays a stock or fund quote with formatted price and
          positive/negative change indicator.
        </p>
        <div className="demo-grid">
          <QuoteCard
            symbol="AAPL"
            name="Apple Inc."
            price={189.84}
            change={2.31}
            changePercent={1.23}
          />
          <QuoteCard
            symbol="TSLA"
            name="Tesla, Inc."
            price={248.42}
            change={-5.18}
            changePercent={-2.04}
          />
          <QuoteCard
            symbol="BRK.B"
            name="Berkshire Hathaway Inc."
            price={411.0}
            change={0.0}
            changePercent={0.0}
          />
        </div>
      </section>

      {/* WatchlistTable */}
      <section className="section">
        <h2 className="section__title">WatchlistTable</h2>
        <p className="section__desc">
          Sortable table of stock quotes. Click any column header to sort.
        </p>
        <WatchlistTable rows={watchlistData} aria-label="Demo Watchlist" />
      </section>

      {/* TextField */}
      <section className="section">
        <h2 className="section__title">TextField</h2>
        <p className="section__desc">
          Accessible text input with label, validation message, and error state.
        </p>
        <div className="demo-grid">
          <TextField
            label="Ticker Symbol"
            placeholder="e.g. AAPL"
            value={fieldValue}
            onChange={(e) => setFieldValue(e.target.value)}
          />
          <TextField
            label="Amount"
            placeholder="Enter amount"
            error={true}
            message="Amount must be positive"
          />
          <TextField
            label="Notes"
            placeholder="Optional notes"
            message="Max 200 characters"
          />
        </div>
      </section>

      {/* Modal */}
      <section className="section">
        <h2 className="section__title">Modal</h2>
        <p className="section__desc">
          Focus-trapped dialog with Escape and backdrop close.
        </p>
        <button
          className="nav__auth-btn"
          onClick={() => setModalOpen(true)}
        >
          Open Modal
        </button>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-label="Confirm Trade"
        >
          <p style={{ color: 'var(--fk-text-secondary)', marginBottom: 16 }}>
            Are you sure you want to buy 10 shares of AAPL at $189.84?
          </p>
          <button
            className="nav__auth-btn"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </button>
        </Modal>
      </section>

      {/* Tabs */}
      <section className="section">
        <h2 className="section__title">Tabs</h2>
        <p className="section__desc">
          Keyboard-navigable tabs with roving tabindex (Arrow keys, Home, End).
        </p>
        <Tabs defaultIndex={0}>
          <Tab label="Overview">
            <p style={{ color: 'var(--fk-text-secondary)', padding: '16px 0' }}>
              FinKit is a finance-flavored UI design system built with React,
              TypeScript, and CSS custom properties. All components meet WCAG AA
              accessibility standards.
            </p>
          </Tab>
          <Tab label="Holdings">
            <p style={{ color: 'var(--fk-text-secondary)', padding: '16px 0' }}>
              Your portfolio holdings would appear here — AAPL, MSFT, GOOGL
              and more.
            </p>
          </Tab>
          <Tab label="Performance">
            <p style={{ color: 'var(--fk-text-secondary)', padding: '16px 0' }}>
              Performance charts and analytics for your portfolio would be
              displayed in this tab.
            </p>
          </Tab>
        </Tabs>
      </section>
    </>
  );
}
