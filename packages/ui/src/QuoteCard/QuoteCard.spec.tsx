import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import { QuoteCard } from './QuoteCard';

const base = {
  symbol: 'AAPL',
  name: 'Apple Inc.',
  price: 189.84,
  change: 2.31,
  changePercent: 1.23,
};

describe('QuoteCard', () => {
  it('renders symbol and name', () => {
    render(<QuoteCard {...base} />);
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('Apple Inc.')).toBeInTheDocument();
  });

  it('renders formatted price', () => {
    render(<QuoteCard {...base} />);
    expect(screen.getByText('$189.84')).toBeInTheDocument();
  });

  it('renders positive change with + prefix', () => {
    render(<QuoteCard {...base} />);
    const change = screen.getByLabelText(/Change:/);
    expect(change).toHaveTextContent('+2.31 (+1.23%)');
    expect(change).toHaveClass('fk-quote-card__change--positive');
  });

  it('renders negative change', () => {
    render(<QuoteCard {...base} change={-3.5} changePercent={-1.84} />);
    const change = screen.getByLabelText(/Change:/);
    expect(change).toHaveTextContent('-3.50 (-1.84%)');
    expect(change).toHaveClass('fk-quote-card__change--negative');
  });

  it('has an accessible article with aria-label', () => {
    render(<QuoteCard {...base} />);
    expect(screen.getByRole('article')).toHaveAttribute(
      'aria-label',
      'Apple Inc. stock quote',
    );
  });

  it('renders children in footer slot', () => {
    render(
      <QuoteCard {...base}>
        <button>Buy</button>
      </QuoteCard>,
    );
    expect(screen.getByText('Buy')).toBeInTheDocument();
  });

  it('omits footer when no children', () => {
    const { container } = render(<QuoteCard {...base} />);
    expect(container.querySelector('.fk-quote-card__footer')).toBeNull();
  });

  it('has no axe violations', async () => {
    const { container } = render(<QuoteCard {...base} />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
