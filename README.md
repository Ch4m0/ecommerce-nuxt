# Ecommerce Nuxt

A frontend e-commerce platform built with Nuxt 4, consuming the [Fake Store API](https://fakestoreapi.com). Features product browsing with category filtering, product detail views, and order management.

## Tech Stack

- **Nuxt 4** — SSR/SPA framework with `app/` as srcDir
- **Vue 3** — Composition API throughout
- **Pinia** — Global state management
- **TypeScript** — Strict mode enabled
- **Tailwind CSS** — Utility-first styling
- **@heroicons/vue** — Icon library (no inline SVGs)

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file at the project root:

```env
NUXT_PUBLIC_API_BASE_URL=https://fakestoreapi.com
```

### Development

```bash
npm run dev
```

App runs at `http://localhost:3000` and redirects to `/products` on load.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Architecture

The project follows a **feature co-location** pattern. Each page folder owns its components, composables, types, and tests under underscore-prefixed subdirectories (ignored by the Nuxt router).

```
app/
├── components/
│   ├── layout/          # AppHeader
│   └── ui/              # Reusable UI: AppButton, AppBadge, AppEmptyState, etc.
├── composables/
│   └── useApi.ts        # Base $fetch wrapper (get, post)
├── constants/
│   ├── api.constants.ts # API endpoint definitions
│   └── app.constants.ts # Route definitions, app name
├── pages/
│   ├── index.vue        # Redirects to /products
│   ├── products/
│   │   ├── index.vue                        # Product list with category + sort filters
│   │   ├── [id].vue                         # Product detail with quantity selector
│   │   ├── _components/                     # ProductCard, ProductCardSkeleton, ProductFilters
│   │   ├── _composables/
│   │   │   ├── useProducts.ts               # Product state + API calls
│   │   │   └── useProductRating.ts          # Star rating computed logic
│   │   └── _types/
│   │       └── product.types.ts
│   └── orders/
│       ├── index.vue                        # Order list
│       ├── new.vue                          # Order creation form
│       ├── _components/                     # OrderCard, OrderForm
│       ├── _composables/
│       │   └── useOrders.ts                 # Orders state + API calls
│       └── _types/
│           └── order.types.ts
├── stores/
│   ├── cart.ts          # Cart state (add, remove, update quantity, clear)
│   └── orders.ts        # Orders state (set, add)
└── utils/
    └── formatters.ts    # formatCurrency, formatDate (pure functions)
```

## Key Technical Decisions

### `useAsyncData` over `useFetch`

All data fetching uses `useAsyncData` wrapping composable functions. This was chosen because our composables also update `useState` (shared SSR state), and `useFetch` does not compose cleanly with that pattern. `useAsyncData` gives explicit control over keys, pending/error states, and `refresh()` for reactive filter changes.

### Feature Co-location

Pages own their domain logic. The `_components`, `_composables`, and `_types` underscore prefix makes Nuxt ignore them as routes while keeping code close to where it is used.

### Pure Utils vs Composables

Functions like `formatCurrency` and `formatDate` live in `utils/` as plain exported functions — they hold no Vue reactivity and do not need the composable pattern. Composables (`useProducts`, `useOrders`, `useProductRating`) are reserved for logic that uses `computed`, `watch`, or Nuxt/Vue composables internally.

### Pinia without Loading State

Pinia stores hold domain data only (`products`, `orders`, `cart`). Loading and error state are delegated entirely to `useAsyncData`, which avoids duplicating state and aligns with the Nuxt data-fetching lifecycle.

### No Server Routes

The app consumes the Fake Store API directly from the client. No backend proxy or server routes are needed since the API is public and CORS-permissive.

## CI/CD Pipeline

GitHub Actions workflows are in `.github/workflows/`.

### `ci.yml` — Runs on every push and pull request

| Job | Description |
| --- | --- |
| `install` | Installs dependencies and caches `node_modules` |
| `typecheck` | Generates Nuxt types and runs `nuxi typecheck` |
| `build` | Builds the application and uploads the `.output/` artifact |
| `deploy` | Simulated deploy on push to `main` with a GitHub Step Summary |

### `versioning.yml` — Runs on version tags (`v*.*.*`)

Creates a GitHub Release with an auto-generated changelog from commits since the previous tag. Marks the release as a pre-release if the tag contains a `-` (e.g. `v1.0.0-beta.1`).

### Creating a Release

```bash
git tag v1.0.0
git push origin v1.0.0
```
