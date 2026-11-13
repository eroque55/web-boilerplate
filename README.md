# Next.js Boilerplate

An opinionated Next.js web template with batteries included: authentication flow
with deduplicated token refresh, optimistic route guards, dark mode without FOUC,
a complete UI kit, testing set up, and linting that enforces conventions instead
of just documenting them.

## Stack

|                                    |                                                                   |
| ---------------------------------- | ----------------------------------------------------------------- |
| **Next.js 16.4** · React 19.2      | App Router, Cache Components, Partial Prefetching, React Compiler |
| **TypeScript 6**                   | Strict mode + typed routes                                        |
| **Tailwind CSS 4**                 | CSS-first config with the palette shared with JS                  |
| **TanStack Query 5**               | Server state + typed query keys                                   |
| **Zustand 5**                      | Client state                                                      |
| **React Hook Form** + **Zod 4**    | Forms and validation, pt-BR error messages                        |
| **Axios**                          | HTTP client with automatic 401 refresh deduplication              |
| **Vitest 5** + **Testing Library** | Unit and component testing                                        |

## Get started

1. Copy the environment template:

   ```bash
   cp .env.example .env.local
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Start the development server:

   ```bash
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000). Mocked authentication is
   enabled out of the box in `src/services/api/auth.ts` so you can sign in
   immediately and swap in real API endpoints when ready.

## First things to change

1. Replace `changeme` in `package.json` (`name`) and `src/constants/app.ts`
   (`APP_NAME`, `APP_DESCRIPTION`). Cookie and `localStorage` keys derive from
   `APP_NAME` automatically via `src/constants/storageKeys.ts`.
2. Uncomment the real HTTP calls in `src/services/api/auth.ts` and adjust
   `src/types/user.ts` to match your backend payload.

## Project structure

```
assets/
  icons/            SVG icons + typed IconName registry
src/
  app/              Routes (Next.js App Router)
    page.tsx        Root route — a dispatcher, never a screen
    (auth)/         Unauthenticated routes (/login)
    (main)/         Authenticated shell + routes (/home)
  components/
    ui/             UI kit (Button, Input, Checkbox, Switch, Tab, Shimmer, DefaultModal, …)
    layout/         App chrome (AppHeader, ClientOnly, Providers)
    screens/        Screen implementations mirroring src/app/
  constants/        App metadata, routes, storage keys, typed query keys
  contexts/         AuthContext
  hooks/
    api/            Server calls (React Query)
    common/         Reusable hooks (useDebounce, useDisableDelay, useTheme, …)
  services/         Axios HTTP client, API layer, SSR-safe QueryClient
  store/            Zustand stores (defaultModalStore)
  test/             Test helpers (renderWithProviders)
  theme/            colors.ts and global.css
  types/            Domain and API types
  utils/            Pure helpers (format, masks, validators, cookies, session, handleError)
  validation/       Zod pt-BR config and form schemas
  env.ts            Environment variable validation
  proxy.ts          Optimistic session route guard
@types/             Ambient declarations and TanStack Query module augmentation
```

## What's included

**Authentication** — `AuthContext` + `session.ts` + `services/http.ts` handle
login, logout, user fetching, and automatic token refresh. Concurrent `401`
responses share a single in-flight refresh promise so rotating refresh tokens
never get invalidated by parallel requests.

**Route guards & caching** — `src/proxy.ts` redirects unauthenticated visitors
away from private routes (preserving `?redirect=…`) and authenticated users away
from `/login`. Next.js 16.4 `cacheComponents` and `partialPrefetching` keep
layouts statically prerendered while `<ClientOnly>` cleanly mounts
session-dependent screens.

**Error handling** — every failed mutation passes through `handleError`, which
extracts the real message returned by the API (`{ message }`, Strapi's
`{ error: { message } }`, or plain text) and surfaces it in the global
`DefaultModal`.

**Theme & Dark Mode** — `src/theme/colors.ts` is the single color source of
truth, shared between TypeScript and Tailwind CSS 4 via `@config`. A tiny inline
script in `app/layout.tsx` applies `.dark` before first paint (zero FOUC), paired
with `useTheme()` (`useSyncExternalStore`).

## Conventions

**Enforced by ESLint** (these fail the lint, they are not suggestions):

- Import `Image` from `@/components/ui`, never from `next/image`
- Import `z` from `@/validation/zod`, never from `zod` — the local instance is configured with pt-BR messages
- Import `render` / `renderWithProviders` from `@/test/utils`, never `render` from `@testing-library/react`
- No relative imports deeper than two levels; use the `@/` alias
- No circular dependencies (`import-x/no-cycle`)
- Imports and JSX props are grouped and alphabetized automatically

**By agreement:**

- Code, comments, tests, and docs in English. Portuguese only for strings the user reads.
- Components live in `Component/index.tsx`, with sub-components in nested folders.
- Prefer `type` over `interface`.

## Testing

Tests live next to the code they cover: `validators.ts` → `validators.test.ts`,
`Button/index.tsx` → `Button/index.test.tsx`.

```bash
yarn test              # run once
yarn test:watch        # watch mode
yarn test:coverage     # V8 coverage report in coverage/
```

### Writing a component test

Use `renderWithProviders` from `@/test/utils`, which wraps the component in a
fresh `QueryClientProvider` per test and re-exports everything from Testing
Library:

```tsx
import { vi } from 'vitest';

import { fireEvent, renderWithProviders, screen } from '@/test/utils';

it('calls onClick when clicked', () => {
  const onClick = vi.fn();
  renderWithProviders(<Button text="Enviar" onClick={onClick} />);

  fireEvent.click(screen.getByRole('button', { name: 'Enviar' }));

  expect(onClick).toHaveBeenCalledTimes(1);
});
```

## Useful commands

```bash
yarn dev            # start Next.js dev server
yarn build          # build for production
yarn typecheck      # next typegen && tsc --noEmit
yarn lint           # ESLint (0 warnings)
yarn lint:fix       # ESLint with --fix
yarn format         # Prettier over the whole project
```

## Author

Built and maintained by **Eduardo Roque** — [@eroque55](https://github.com/eroque55).
