import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import { register, FkQuoteCard } from './QuoteCard';

beforeAll(() => {
  register();
});

function createElement(attrs: Record<string, string> = {}): FkQuoteCard {
  const el = document.createElement('fk-quote-card') as FkQuoteCard;
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
  document.body.appendChild(el);
  return el;
}

afterEach(() => {
  document.body.innerHTML = '';
});

describe('FkQuoteCard', () => {
  it('is registered as a custom element', () => {
    expect(customElements.get('fk-quote-card')).toBe(FkQuoteCard);
  });

  it('renders symbol and name in shadow DOM', () => {
    const el = createElement({
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: '189.84',
      change: '2.31',
      'change-percent': '1.23',
    });
    const shadow = el.shadowRoot!;
    expect(shadow.getElementById('symbol')?.textContent).toBe('AAPL');
    expect(shadow.getElementById('name')?.textContent).toBe('Apple Inc.');
  });

  it('renders formatted price', () => {
    const el = createElement({ symbol: 'X', name: 'X', price: '189.84', change: '0', 'change-percent': '0' });
    expect(el.shadowRoot!.getElementById('price')?.textContent).toBe('$189.84');
  });

  it('renders positive change with + prefix and positive class', () => {
    const el = createElement({
      symbol: 'X',
      name: 'X',
      price: '100',
      change: '2.31',
      'change-percent': '1.23',
    });
    const changeEl = el.shadowRoot!.getElementById('change')!;
    expect(changeEl.textContent).toBe('+2.31 (+1.23%)');
    expect(changeEl.classList.contains('positive')).toBe(true);
  });

  it('renders negative change with negative class', () => {
    const el = createElement({
      symbol: 'X',
      name: 'X',
      price: '100',
      change: '-3.50',
      'change-percent': '-1.84',
    });
    const changeEl = el.shadowRoot!.getElementById('change')!;
    expect(changeEl.textContent).toBe('-3.50 (-1.84%)');
    expect(changeEl.classList.contains('negative')).toBe(true);
  });

  it('sets aria-label on the card article', () => {
    const el = createElement({
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: '100',
      change: '0',
      'change-percent': '0',
    });
    const article = el.shadowRoot!.querySelector('.card');
    expect(article?.getAttribute('aria-label')).toBe('Apple Inc. stock quote');
  });

  it('updates when attributes change', () => {
    const el = createElement({
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: '100',
      change: '0',
      'change-percent': '0',
    });
    el.setAttribute('symbol', 'MSFT');
    el.setAttribute('name', 'Microsoft Corporation');
    expect(el.shadowRoot!.getElementById('symbol')?.textContent).toBe('MSFT');
    expect(el.shadowRoot!.getElementById('name')?.textContent).toBe('Microsoft Corporation');
  });

  it('hides footer when no slotted content', () => {
    const el = createElement({
      symbol: 'X',
      name: 'X',
      price: '0',
      change: '0',
      'change-percent': '0',
    });
    const footer = el.shadowRoot!.getElementById('footer');
    expect(footer?.hidden).toBe(true);
  });

  it('does not call register twice', () => {
    // Should not throw
    register();
    expect(customElements.get('fk-quote-card')).toBe(FkQuoteCard);
  });
});
