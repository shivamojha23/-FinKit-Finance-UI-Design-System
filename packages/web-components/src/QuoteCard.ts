const STYLES = `
  :host {
    display: block;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
  }

  .card {
    background: #1a1d27;
    border: 1px solid #2e3240;
    border-radius: 12px;
    padding: 24px;
    min-width: 240px;
    color: #f0f0f3;
  }

  .header {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 12px;
  }

  .symbol {
    font-size: 1.125rem;
    font-weight: 700;
    letter-spacing: 0.04em;
  }

  .name {
    font-size: 0.875rem;
    color: #8b8fa2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .body {
    display: flex;
    align-items: baseline;
    gap: 12px;
  }

  .price {
    font-size: 1.5rem;
    font-weight: 600;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
  }

  .change {
    font-size: 0.875rem;
    font-weight: 500;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
  }

  .positive { color: #34d399; }
  .negative { color: #f87171; }

  .footer {
    margin-top: 16px;
    padding-top: 12px;
    border-top: 1px solid #2e3240;
  }
`;

const TEMPLATE = document.createElement('template');
TEMPLATE.innerHTML = `
  <style>${STYLES}</style>
  <article class="card">
    <div class="header">
      <span class="symbol" id="symbol"></span>
      <span class="name" id="name"></span>
    </div>
    <div class="body">
      <span class="price" id="price"></span>
      <span class="change" id="change"></span>
    </div>
    <div class="footer" id="footer" hidden>
      <slot></slot>
    </div>
  </article>
`;

function formatPrice(n: number): string {
  return n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
}

function formatChange(n: number): string {
  const sign = n >= 0 ? '+' : '';
  return `${sign}${n.toFixed(2)}`;
}

function formatPercent(n: number): string {
  const sign = n >= 0 ? '+' : '';
  return `${sign}${n.toFixed(2)}%`;
}

export class FkQuoteCard extends HTMLElement {
  static readonly observedAttributes = [
    'symbol',
    'name',
    'price',
    'change',
    'change-percent',
  ];

  #shadow: ShadowRoot;

  constructor() {
    super();
    this.#shadow = this.attachShadow({ mode: 'open' });
    this.#shadow.appendChild(TEMPLATE.content.cloneNode(true));
  }

  connectedCallback(): void {
    this.#render();

    const slot = this.#shadow.querySelector('slot');
    slot?.addEventListener('slotchange', () => {
      const footer = this.#shadow.getElementById('footer');
      if (footer) {
        footer.hidden = (slot.assignedNodes().length === 0);
      }
    });
  }

  attributeChangedCallback(): void {
    this.#render();
  }

  #render(): void {
    const symbol = this.getAttribute('symbol') ?? '';
    const name = this.getAttribute('name') ?? '';
    const price = parseFloat(this.getAttribute('price') ?? '0');
    const change = parseFloat(this.getAttribute('change') ?? '0');
    const changePercent = parseFloat(this.getAttribute('change-percent') ?? '0');
    const direction = change >= 0 ? 'positive' : 'negative';

    const symbolEl = this.#shadow.getElementById('symbol');
    const nameEl = this.#shadow.getElementById('name');
    const priceEl = this.#shadow.getElementById('price');
    const changeEl = this.#shadow.getElementById('change');
    const card = this.#shadow.querySelector('.card');

    if (symbolEl) symbolEl.textContent = symbol;
    if (nameEl) nameEl.textContent = name;
    if (priceEl) priceEl.textContent = formatPrice(price);
    if (changeEl) {
      changeEl.textContent = `${formatChange(change)} (${formatPercent(changePercent)})`;
      changeEl.className = `change ${direction}`;
    }
    if (card) {
      card.setAttribute(
        'aria-label',
        `${name} stock quote`,
      );
    }
  }
}

export function register(tagName = 'fk-quote-card'): void {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, FkQuoteCard);
  }
}
