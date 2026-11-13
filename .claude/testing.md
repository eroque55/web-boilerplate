# Testing

Read this before writing or fixing a test.

## Setup

- **Vitest 5** with the `jsdom` environment (`vitest.config.mts`)
- **@testing-library/react** + **@testing-library/jest-dom/vitest** (`vitest.setup.ts`)
- Tests live **next to the code**: `validators.ts` → `validators.test.ts`,
  `Button/index.tsx` → `Button/index.test.tsx`

```bash
yarn test            # single run
yarn test:watch      # watch mode
yarn test:coverage   # V8 coverage report in coverage/
```

## Rendering components

Always use `renderWithProviders` (or its `render` alias) from `@/test/utils`. It
wraps the component in `QueryClientProvider` (with a fresh, retry-disabled
`QueryClient` per test) and re-exports everything from `@testing-library/react`,
so one import is enough:

```tsx
import { vi } from 'vitest';

import { fireEvent, renderWithProviders, screen } from '@/test/utils';

import Button from './index';

it('calls onClick when clicked', () => {
  const onClick = vi.fn();
  renderWithProviders(<Button text="Enviar" onClick={onClick} />);

  fireEvent.click(screen.getByRole('button', { name: 'Enviar' }));

  expect(onClick).toHaveBeenCalledTimes(1);
});
```

Importing `render` directly from `@testing-library/react` is blocked by ESLint
(`no-restricted-imports`).

For hooks needing React Query, pass `createWrapper()` from `@/test/utils` as
`renderHook`'s `wrapper`.

## SVGs work out of the box

`vitest.config.mts` loads `vite-plugin-svgr` with `include: '**/*.svg'`, matching
the Turbopack SVGR loader in `next.config.ts`. Components rendering `<Icon />`
work in tests without manual module mocks.

## Timers

Components using `useDisableDelay` (`Button`, `DefaultModal`) schedule a 1s
cooldown timer on click unless `withoutDelay` is set. Use `vi.useFakeTimers()`
in `beforeEach` and `vi.useRealTimers()` in `afterEach`, or timers will leak
across tests:

```ts
await act(() => vi.advanceTimersByTimeAsync(1000));
```

## What to test

Priority order:

1. **Pure functions & schemas** — `utils/validators.ts`, `utils/masks.ts`,
   `utils/format.ts`, `validation/*.validation.ts`. Highest value per line, zero
   setup.
2. **Behavior we deliberately built** — the double-click cooldown guard in
   `useDisableDelay` / `Button`, API message extraction in `handleError`.
3. **Component contracts** — renders expected accessible roles/states, forwards
   form values and validation errors, invokes callbacks.

Do not test third-party library internals, Tailwind class strings, or
implementation details.

**Never derive an expected value from the function under test.** Fixtures like
CPF and CNPJ numbers in `validators.test.ts` have their check digits verified
independently. A test that computes its own expectation validates nothing.

## Prove the test can fail

After writing a test, break the behavior it covers and confirm it goes red. A
test that has never failed is not evidence.
