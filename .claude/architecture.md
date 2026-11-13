# Architecture

## Folder map

```
assets/
  icons/              SVG icons + typed registry (index.ts)
src/
  app/                Routes. Next.js App Router, file-based.
    page.tsx          Root route. Dispatcher only — see conventions.
    layout.tsx        Root HTML shell, zero-FOUC theme script, Providers
    error.tsx         Segment error boundary ({ error, retry })
    global-error.tsx  Root error boundary ({ error, retry })
    not-found.tsx     404 route
    (auth)/           Unauthenticated routes (/login)
    (main)/           Authenticated shell + routes (/home)
  components/
    ui/               Generic pieces. Consumed by more than one screen.
    layout/           App chrome (AppHeader, ClientOnly, Providers).
    screens/          Mirror of app/. Single-screen components.
  constants/          App metadata, routes, storage keys, typed query keys.
  contexts/           React contexts (AuthContext)
  hooks/
    api/              Server calls. One hook file per domain.
    common/           Reusable hooks, exported through index.ts
  services/
    api/              Raw API functions. No React.
    http.ts           Axios instance + auth header + deduplicated 401 refresh
    queryClient.ts    SSR-safe QueryClient factory + global MutationCache
  store/              Zustand stores
  test/               Test helpers. Never imported by app code.
  theme/              colors.ts (source of truth) + global.css
  types/              Domain and API types (TUser, TApiError)
  utils/              Pure helpers + cookie/session utilities. No React.
  validation/         Zod config (zod.ts) + form schemas (*.validation.ts)
  env.ts              Fail-fast environment variable validation
  proxy.ts            Next.js request proxy (optimistic route guard)
@types/               Ambient declarations, module augmentation
```

## Layering

Dependencies point **downward only**. A lower layer must never import from a
higher one.

```
app/  →  components/  →  hooks/  →  services/  →  utils/ · types/ · constants/
                     ↘  store/  ↗
```

`import-x/no-cycle` is an ESLint **error**, so a violation fails the lint. The
common way to create one is a low-level module importing a type from a
component. If a store needs a type used by a component, the type belongs in the
store (or `types/`) and the component imports it — not the other way around.

## Data flow

```
Screen → hooks/api/useThing → services/api/thing → services/http (axios)
```

- `services/api/*` are plain async functions. No React, no hooks.
- `hooks/api/*` wrap them in `useQuery` / `useMutation`.
- Screens only ever touch `hooks/api/*`, never `services/` directly.

## Components

Three buckets. Which one a component belongs to follows from a single rule:

> **A component lives at the lowest common ancestor of its consumers.**

| Consumers                           | Lives in                              |
| ----------------------------------- | ------------------------------------- |
| One parent component                | Nested inside that parent's folder    |
| Two siblings inside the same screen | Hoisted to their shared parent folder |
| More than one screen                | `components/ui/`                      |

`ui/` is not a special category — it is the root of that tree, the common
ancestor of everything. When a component in `screens/` gains a consumer in
another screen, it moves to `ui/`.

`layout/` is the exception to the rule: it holds app chrome — the shell around
screens rather than content inside them (`AppHeader`, `ClientOnly`, `Providers`).

### Why `screens/` exists

`src/app/` is reserved strictly for Next.js routing files (`page.tsx`,
`layout.tsx`, `error.tsx`, `not-found.tsx`), route metadata, and server-level
wrappers like `<ClientOnly>`.

Keeping screen implementations and screen-local subcomponents in
`src/components/screens/` keeps `app/` declarative, preserves structural parity
with the mobile boilerplate, and cleanly separates Server Component route files
from interactive `'use client'` screen trees.

`screens/` mirrors `app/` **literally** (without route-group parentheses):
route `app/(main)/home/page.tsx` maps to `components/screens/main/home`.

### Barrels

`ui/`, `layout/`, and `hooks/common/` each export through an `index.ts`, so
consumers import from `@/components/ui`, `@/components/layout`, and
`@/hooks/common`.

`screens/` has **no barrel**. Its components are single-use; a barrel there
would only couple screens to each other.

Between siblings, import relatively (`../ComponentX`). Crossing into another
bucket, use `@/components/ui`. The lint rule that blocks `../../../` doubles as
a depth alarm: needing three levels up usually means the component should
already have been hoisted.

## Where to add things

| Adding                                     | Goes in                                                       |
| ------------------------------------------ | ------------------------------------------------------------- |
| A route                                    | `src/app/(auth)/` or `src/app/(main)/`, as `name/page.tsx`    |
| A component used by several screens        | `src/components/ui/Name/index.tsx` + export in `index.ts`     |
| App chrome (header, shell, wrapper)        | `src/components/layout/Name/index.tsx` + export in `index.ts` |
| A component used by one screen only        | `src/components/screens/<mirror of the route>/Name/index.tsx` |
| A sub-component used by one component only | Nested: `Parent/Child/index.tsx`                              |
| An endpoint                                | Function in `services/api/`, hook in `hooks/api/`             |
| A reusable hook                            | `hooks/common/`, exported through `hooks/common/index.ts`     |
| Global client state                        | `store/` (Zustand)                                            |
| A pure helper                              | `utils/`                                                      |
| A form schema                              | `validation/name.validation.ts`                               |
| A domain type                              | `types/`                                                      |
| An SVG icon                                | `assets/icons/Name.svg` + export in `assets/icons/index.ts`   |

## Query keys

All keys live in `src/constants/queryKeys.ts` and are type-checked through
module augmentation in `@types/tanStack-query.d.ts`. Never inline a query key
string.

Mutations can declare `meta.invalidateQueries` — the `MutationCache` in
`services/queryClient.ts` invalidates matching queries automatically on success,
and `onError` surfaces API errors through `DefaultModal` unless
`meta.suppressErrorModal` is `true`.

## Providers

`app/layout.tsx` wraps `{children}` in `<Providers>` (`components/layout/Providers`),
which mounts:

```
QueryClientProvider → AuthProvider → {children} + DefaultModal
```

`getQueryClient()` in `services/queryClient.ts` creates a fresh `QueryClient`
per server request (avoiding cross-request cache leakage during SSR) and reuses
a module singleton in the browser. Never instantiate `new QueryClient()` directly
inside a component render body.
