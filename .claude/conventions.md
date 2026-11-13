# Conventions

## Hard rules

Breaking any of these either fails the lint or breaks the app.

### Imports the linter blocks

| Never import                                | Import instead                                      |
| ------------------------------------------- | --------------------------------------------------- |
| `Image` from `next/image`                   | `@/components/ui`                                   |
| `z` from `zod`                              | `@/validation/zod` (configured with pt-BR messages) |
| `render` from `@testing-library/react`      | `@/test/utils` (`render` or `renderWithProviders`)  |
| Relative paths 3+ levels deep (`../../../`) | The `@/` alias                                      |

### `src/app/page.tsx` stays a dispatcher

`src/app/page.tsx` redirects immediately to `HOME_ROUTE`, while `src/proxy.ts`
handles optimistic session redirects before rendering. Never place UI inside
`src/app/page.tsx`.

### Colors come from `src/theme/colors.ts`

It is the single source of truth; `tailwind.config.mts` feeds it to Tailwind v4
via `@config` in `src/theme/global.css`. Never hardcode hex values in components
— use Tailwind classes (`bg-primary`, `text-danger`) or `colors.*` from
`@/theme/colors`.

### Pair light and dark classes

Dark mode is class-based (`@custom-variant dark (&:where(.dark, .dark *))`).
Whenever you style surfaces, borders, or text, pair light and dark variants
explicitly: `bg-white dark:bg-neutral-900`, `border-neutral-200 dark:border-neutral-800`,
`text-neutral-900 dark:text-neutral-100`.

### Language

Code, comments, commits, test names, documentation, and file names in **English**.
Portuguese **only** for strings the user reads — UI copy, validation messages,
and error text.

## Style

- Components: arrow functions. `react/function-component-definition` enforces it.
- Types: `type`, not `interface`. `@typescript-eslint/consistent-type-definitions`
  enforces it.
- Components live in `Name/index.tsx`. Sub-components nest in their parent's folder.
- Props of type "turn a default behavior off" are named `withoutX` (`withoutDelay`).
  Follow that convention when adding one.
- Imports are auto-grouped and alphabetized by `import-x/order`, and JSX props are
  sorted by `react/jsx-sort-props`. Run `yarn lint:fix` rather than sorting by hand.
- Don't write explanatory comments that restate the code. Comment only what
  cannot be inferred: a lint rule disabled and why, or a non-obvious framework
  constraint.

## Promises

`@typescript-eslint/no-floating-promises` is an error. A fire-and-forget promise
must be marked with `void`:

```ts
void queryClient.invalidateQueries({ queryKey: queryKeys.user.me });
```

Async handlers on JSX props (`onSubmit={handleSubmit(login)}`) are allowed —
`no-misused-promises` runs with `checksVoidReturn: { attributes: false }`.

## Intentionally unused arguments

Prefix with `_` — `no-unused-vars` runs with `argsIgnorePattern: '^_'`. Use it
when a signature requires a parameter the implementation does not consume yet
(as in the mocked stubs in `services/api/auth.ts`). Do not delete the parameter.

## Before claiming work is done

Run all four and report the real exit codes. Never say something passes without
having run it.

```bash
yarn typecheck && yarn lint && yarn test && yarn build
```

`yarn lint` exits 0 with **0 warnings**. Any warning introduced by a change must
be fixed at the root cause.
