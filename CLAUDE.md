@AGENTS.md
@.claude/architecture.md
@.claude/conventions.md

# Project

Next.js boilerplate. Every web app starts from a clone of this, so a mistake here
is copied into every project — prefer the correct fix over the quick one.

**Stack:** Next.js 16.4 (App Router · Cache Components · Partial Prefetching ·
Typed Routes) · React 19.2 (Compiler on) · Tailwind CSS 4 · TanStack Query 5 ·
Zustand 5 · React Hook Form + Zod 4 · Axios · Vitest 5 + Testing Library

## Commands

```bash
yarn dev            # dev server (Turbopack)
yarn build          # production build
yarn start          # start production server
yarn typecheck      # next typegen && tsc --noEmit
yarn lint           # ESLint
yarn lint:fix
yarn format         # Prettier
yarn format:check
yarn test           # Vitest (single run)
yarn test:watch
yarn test:coverage
```

## Read before acting

These carry decisions already made. Read the relevant file **before** writing
code in that area, not after something breaks.

| Before you                                               | Read                           |
| -------------------------------------------------------- | ------------------------------ |
| Write or change any test                                 | `.claude/testing.md`           |
| Touch Next.js APIs, routing, caching or `next.config.ts` | `node_modules/next/dist/docs/` |
| Touch route guards, `proxy.ts`, `ClientOnly` or `app/`   | `.claude/gotchas.md`           |
| Touch auth, cookies, session or the 401 token refresh    | `.claude/gotchas.md`           |
| Touch dark mode or hydration-sensitive hooks             | `.claude/gotchas.md`           |
| Add, remove or bump a dependency                         | `.claude/gotchas.md`           |

## Non-negotiables

1. **Verify before claiming.** Run `yarn typecheck`, `yarn lint`, `yarn test`
   and `yarn build`, and report the real exit codes. Never state that something
   passes without having run it.
2. **`src/app/page.tsx` is a dispatcher**, never a screen.
3. **Colors come from `src/theme/colors.ts`.** No hardcoded hex anywhere.
4. **English in code, Portuguese only in strings the user reads.**
5. **Don't silence a lint rule to make a diff look clean.** If a rule is wrong,
   say why and disable it deliberately with the reason recorded.
6. **Next.js 16.4 changed a lot.** Check `node_modules/next/dist/docs/` and the
   installed `.d.ts` files before assuming an API — `proxy.ts` (replacing
   `middleware.ts`), `{ error, retry }` in error boundaries, `cacheComponents`,
   and `partialPrefetching` differ from older Next.js versions.

## State of the repo

All four verification commands (`typecheck`, `lint`, `test`, `build`) are green.
Keep them that way.

`yarn lint` exits 0 with **0 warnings**. Any warning means your change
introduced it — fix the underlying cause rather than silencing the rule.
