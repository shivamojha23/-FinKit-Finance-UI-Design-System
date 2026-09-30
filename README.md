# FinKit

A finance-flavored UI design system built as an Nx monorepo. Includes accessible React components, a framework-agnostic Web Component, a Next.js documentation site with GitHub OAuth, and full CI tooling.

## Quick Start

```bash
# Install dependencies
npm install

# Run the docs app
npx nx run docs:dev

# Run Storybook
npx nx run ui:storybook

# Run all checks (lint, typecheck, test, knip)
npm run verify
```

## Architecture

```
finkit/
├── packages/
│   ├── ui/                  # React + TypeScript component library
│   │   ├── src/
│   │   │   ├── TextField/   # Input with label, validation, error state
│   │   │   ├── Modal/       # Focus-trapped dialog (Escape, backdrop close)
│   │   │   ├── Tabs/        # Roving tabindex, keyboard navigation
│   │   │   ├── QuoteCard/   # Stock quote with price & change indicator
│   │   │   ├── WatchlistTable/ # Sortable stock watchlist table
│   │   │   ├── tokens.css   # Design tokens (CSS custom properties)
│   │   │   └── index.ts     # Barrel exports
│   │   └── .storybook/      # Storybook configuration
│   │
│   └── web-components/      # Framework-agnostic Custom Elements
│       └── src/
│           └── QuoteCard.ts  # <fk-quote-card> — Shadow DOM, zero deps
│
├── apps/
│   └── docs/                # Next.js 16 documentation site
│       └── src/
│           ├── app/
│           │   ├── page.tsx          # Component demos (all 5)
│           │   ├── protected/page.tsx # Auth-gated dashboard
│           │   └── api/auth/         # Auth.js API route
│           └── auth.ts               # Auth.js config (GitHub OAuth)
│
├── tools/
│   └── generators/
│       └── component/       # Nx generator: scaffolds new components
│
├── .github/workflows/ci.yml # CI: lint, typecheck, test, build, Lighthouse
└── lighthouserc.json        # Lighthouse CI thresholds
```

## Components

| Component | Package | Description |
|-----------|---------|-------------|
| `TextField` | `@finkit/ui` | Accessible input with label, validation message, error state |
| `Modal` | `@finkit/ui` | Focus-trapped dialog with Escape/backdrop close, focus restore |
| `Tabs` | `@finkit/ui` | Keyboard-navigable tabs (Arrow, Home, End) with roving tabindex |
| `QuoteCard` | `@finkit/ui` | Stock quote card with formatted price and ±change indicator |
| `WatchlistTable` | `@finkit/ui` | Sortable stock table with `aria-sort` column headers |
| `<fk-quote-card>` | `@finkit/web-components` | Web Component with Shadow DOM, zero runtime dependencies |

All React components meet **WCAG AA** accessibility standards (verified by axe-core in tests).

## Usage

### React (packages/ui)

```tsx
import { QuoteCard, WatchlistTable } from '@finkit/ui';

<QuoteCard
  symbol="AAPL"
  name="Apple Inc."
  price={189.84}
  change={2.31}
  changePercent={1.23}
/>
```

### Web Component (packages/web-components)

```html
<script type="module">
  import { register } from '@finkit/web-components';
  register();
</script>

<fk-quote-card
  symbol="AAPL"
  name="Apple Inc."
  price="189.84"
  change="2.31"
  change-percent="1.23"
></fk-quote-card>
```

## Scaffolding a New Component

```bash
npx nx g ./tools/generators/component:component MyComponent
```

This creates:
- `packages/ui/src/MyComponent/MyComponent.tsx` — component
- `packages/ui/src/MyComponent/MyComponent.css` — styles with design tokens
- `packages/ui/src/MyComponent/MyComponent.spec.tsx` — tests + axe check
- `packages/ui/src/MyComponent/MyComponent.stories.tsx` — Storybook story
- Updates `packages/ui/src/index.ts` with barrel exports

## Auth Setup (GitHub OAuth)

The docs app uses [Auth.js](https://authjs.dev) v5 with GitHub OAuth.

1. Create a GitHub OAuth App at [github.com/settings/developers](https://github.com/settings/developers)
   - Homepage URL: `http://localhost:3000`
   - Callback URL: `http://localhost:3000/api/auth/callback/github`
2. Copy the example env file:
   ```bash
   cp apps/docs/.env.local.example apps/docs/.env.local
   ```
3. Fill in `GITHUB_ID`, `GITHUB_SECRET`, and `AUTH_SECRET` (generate with `npx auth secret`)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run verify` | Run lint + typecheck + test + knip (exits non-zero on any failure) |
| `npx nx run docs:dev` | Start docs app dev server |
| `npx nx run docs:build` | Production build of docs app |
| `npx nx run ui:storybook` | Start Storybook for component library |
| `npx nx run ui:test` | Run component tests |
| `npx nx run-many --targets=build` | Build all packages |

## CI Pipeline

GitHub Actions runs on push to `main`/`master` and on PRs:

1. **Lint** — ESLint across all projects
2. **Type-check** — `tsc --build` for library packages
3. **Test** — Vitest with axe-core accessibility checks
4. **Build** — Production builds for all packages
5. **Knip** — Detect unused files, exports, and dependencies
6. **Lighthouse CI** — Performance and accessibility audits (on push only)

## Design Tokens

All components use CSS custom properties defined in `packages/ui/src/tokens.css`. Key tokens:

| Token | Value | Purpose |
|-------|-------|---------|
| `--fk-bg-primary` | `#0f1117` | Page background |
| `--fk-bg-surface` | `#1a1d27` | Card/surface background |
| `--fk-text-primary` | `#f0f0f3` | Primary text |
| `--fk-positive` | `#34d399` | Gains / positive indicators |
| `--fk-negative` | `#f87171` | Losses / negative indicators |

All text/background pairs meet **WCAG AA 4.5:1** contrast ratio.

## Tech Stack

- **Nx 23** — Monorepo management, caching, task orchestration
- **React 19** + **TypeScript** — Component library
- **Vite** — Library builds and test runner (vitest)
- **Next.js 16** — Documentation site (App Router)
- **Auth.js v5** — GitHub OAuth authentication
- **Storybook** — Component documentation and visual testing
- **axe-core** — Automated accessibility testing
- **Knip** — Unused code detection
- **Lighthouse CI** — Performance audits
