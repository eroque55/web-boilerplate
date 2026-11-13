# Gotchas

Traps in this project that cost real debugging time. Each one is a decision
already made — do not undo it without reading why.

## Optimistic route guards (`src/proxy.ts`) and `src/app/page.tsx`

Next.js 16 replaces `middleware.ts` with `src/proxy.ts` exporting `proxy: NextProxy`.

`proxy.ts` performs **optimistic** cookie-existence checks (`accessToken` or
`refreshToken`):

- Authenticated user on an auth route (`/login`) → redirected to `/home`
- Unauthenticated user on a protected route → redirected to `/login?redirect=…`
  (except `/`, which redirects cleanly to `/login`)

`src/app/page.tsx` stays a pure dispatcher (`redirect(HOME_ROUTE)`). Never turn
`app/page.tsx` into a screen.

## Cache Components, Partial Prefetching & `<ClientOnly>`

`next.config.ts` enables both `cacheComponents: true` and
`experimental.partialPrefetching: true` (the Next.js 16.4 caching model).

Under this model, reading `cookies()` inside a Server Component opts that tree
out of static shell prerendering unless wrapped in `<Suspense>`, and reading
browser-only state during SSR causes hydration mismatches.

Instead:

1. Layouts (`app/layout.tsx`, `app/(main)/layout.tsx`) stay static and
   prerenderable — **never** wrap a layout in `<ClientOnly>`.
2. Authenticated pages (`app/(main)/home/page.tsx`) wrap their screen component
   in `<ClientOnly>`, so Next.js prerenders the static layout shell instantly
   and mounts the user-dependent client screen cleanly after hydration.

## Zero-FOUC dark mode & `useSyncExternalStore`

React Compiler is enabled (`reactCompiler: true`), and
`react-hooks/set-state-in-effect` warns whenever `setState` runs synchronously
inside `useEffect` (the old `const [mounted, setMounted] = useState(false)`
anti-pattern).

- **Initial paint:** `app/layout.tsx` injects a synchronous inline `<script>` in
  `<head>` that reads `localStorage.getItem(STORAGE_KEYS.theme)` (falling back
  to `prefers-color-scheme: dark`) and sets `.dark` + `style.colorScheme` on
  `<html>` before first paint (`suppressHydrationWarning` on `<html>`).
- **Hydration & theme state:** `useTheme`, `ClientOnly`, `ModalBackdrop`, and
  `AuthContext` all read client state via `useSyncExternalStore` with a safe
  server snapshot (`false`). Keep that pattern whenever bridging browser-only
  APIs to React 19.

## Token refresh is deduplicated

`src/services/http.ts` shares a single module-level `refreshPromise` across
concurrent `401` responses. When multiple requests fail simultaneously with an
expired access token, they all await the same refresh call instead of firing
parallel refresh requests — preventing refresh-token rotation stampedes that
would otherwise log the user out.

When refresh fails (or no refresh token exists), `session.end()` clears cookies
and redirects to `/login`.

## Error boundaries in Next.js 16.4

`src/app/error.tsx` and `src/app/global-error.tsx` receive
`{ error, retry }: { error: unknown; retry: () => void }` — **not** the older
`{ error, reset }` prop from earlier Next.js versions. Check
`node_modules/next/dist/docs/01-app/01-getting-started/10-error-handling.md`
before changing error boundary signatures.

## API error messages

`handleError` (`src/utils/handleError.ts`) reads `error.response.data`, not
`error.message`. Axios's `message` is `"Request failed with status code 400"` —
showing it to the user hides what the API actually said. Supported shapes:
`{ message }`, `{ error: { message } }` (Strapi), and a plain string.

Global `MutationCache.onError` in `src/services/queryClient.ts` pipes mutations
through `handleError` into `DefaultModal` automatically. Pass
`meta: { suppressErrorModal: true }` on a mutation only when the screen renders
its own inline error recovery.

## Why TypeScript is pinned to `~6.0.3`

TypeScript 7 (`7.x`) is published on npm as the native Go port, which drops the
JavaScript compiler API required by `typescript-eslint`'s `projectService`
(`typescript-eslint` peer range: `>=4.8.4 <6.1.0`). Keep `typescript` on
`~6.0.3` until `typescript-eslint` ships official TypeScript 7 support.

## `'use client'` lives on interactive leaf components, never on barrels

`src/components/ui/index.ts` re-exports both pure Server-compatible components
(`Icon`, `Shimmer`, `Spinner`, `Divider`, `EmptyComponent`, `ErrorText`) and
interactive Client Components (`Button`, `Input`, `Checkbox`, `CheckboxField`,
`Image`, `Switch`, `Tab`, `DefaultModal`, `ModalBackdrop`).

Any component in `ui/` that uses React hooks (`useState`, `useEffect`,
`useController`, `useSyncExternalStore`) or interactive callbacks must declare
`'use client'` at the top of its own `index.tsx` — **never** on the barrel
`ui/index.ts`. Otherwise, importing `{ Icon } from '@/components/ui'` inside a
Server Component fails `next build` when Turbopack evaluates sibling exports in
the RSC module graph.

## Keep `<!-- BEGIN:nextjs-agent-rules -->` in `AGENTS.md`

`next dev` automatically writes and re-adds the `nextjs-agent-rules` block in
`AGENTS.md`. Deleting that block only recreates an uncommitted diff the next
time someone starts the dev server.
