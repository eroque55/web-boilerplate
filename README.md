# web-boilerplate

Ponto de partida para projetos web em **Next.js**, com a arquitetura, o lint e os componentes base do `estuda-web-aluno` e o tooling atual do mercado.

## O que vem pronto

| Área         | O quê                                                                                                                  |
| ------------ | ---------------------------------------------------------------------------------------------------------------------- |
| Framework    | Next.js 16.4 (App Router, Turbopack, Cache Components + Partial Prefetching, typed routes), React 19.3, React Compiler |
| Linguagem    | TypeScript 6.0 estrito, paths `@/*` e `@public/*`                                                                      |
| Dados        | TanStack React Query 5 (com Devtools), query keys tipadas, invalidação por `meta`                                      |
| Estado de UI | Zustand 5                                                                                                              |
| HTTP         | Axios com token automático e refresh em fila                                                                           |
| Autenticação | Login, logout, "manter conectado", sessão em cookies e proteção de rotas no `proxy.ts`                                 |
| Formulários  | React Hook Form + Zod 4 (mensagens em pt-BR), máscaras e validadores BR (CPF, CNPJ alfanumérico, telefone)             |
| Estilo       | Tailwind CSS v4, tokens em `@theme`, `cn` (clsx + tailwind-merge)                                                      |
| UI base      | `Button`, `Icon` (SVGR), `TextInput`, `TextArea`, `DefaultModal`, `ModalBackdrop`, `Tooltip`, `Shimmer`, `Spinner`     |
| Env          | `@t3-oss/env-nextjs`: variáveis validadas no `dev`/`build`                                                             |
| Qualidade    | ESLint 10 + Prettier 3 (configs do estuda), husky + lint-staged + commitlint                                           |
| Testes       | Vitest 5 + Testing Library + jsdom                                                                                     |
| CI/CD        | GitHub Actions (lint, typecheck, testes, build) e Dependabot com cooldown                                              |
| IA           | `.claude/` com arquitetura, padrões de código e tokens; `AGENTS.md` apontando para os docs do Next instalado           |

## Requisitos

- Node.js 24 (`.nvmrc`; mínimo 22.22)
- Yarn 1.22

## Primeiros passos

```bash
yarn install
cp .env.example .env.local
yarn dev
```

Ao iniciar um projeto novo a partir daqui:

1. Troque `changethisname` em `package.json`, `src/constants/app.ts` e `.claude/CLAUDE.md`.
2. Ajuste `APP_DESCRIPTION` em `src/constants/app.ts`.
3. Configure `NEXT_PUBLIC_API_URL` no `.env.local` (e as novas variáveis em `src/env.ts`).
4. Alinhe o contrato de autenticação com o backend em `src/services/auth.ts` e `src/services/user.ts`.
5. Troque a paleta em `src/styles/global.css` e atualize `.claude/design_tokens.md`.
6. Troque o `src/app/favicon.ico`.

## Scripts

| Comando             | O que faz                        |
| ------------------- | -------------------------------- |
| `yarn dev`          | Dev server em `localhost:3000`   |
| `yarn build`        | Build de produção                |
| `yarn start`        | Sobe o build de produção         |
| `yarn lint`         | ESLint                           |
| `yarn lint:fix`     | ESLint corrigindo o que der      |
| `yarn format`       | Prettier em todo o projeto       |
| `yarn format:check` | Confere a formatação sem alterar |
| `yarn typecheck`    | `next typegen` + `tsc --noEmit`  |
| `yarn test`         | Vitest (uma rodada)              |
| `yarn test:watch`   | Vitest em modo watch             |
| `yarn analyze`      | Analisa o tamanho dos bundles    |

## Estrutura

```
src/
├── app/                 # Rotas. (auth)/ = área logada; page.tsx são Server Components finos
├── components/
│   ├── layout/          # Providers, AppHeader
│   ├── pages/           # Telas (Login, Dashboard, NotFound)
│   └── ui/              # Componentes base
├── constants/           # app, rotas, query keys, chaves de storage
├── hooks/               # hooks comuns + hooks/api (React Query)
├── services/            # HTTP (api.ts com interceptors + um arquivo por domínio)
├── stores/              # Zustand (só estado de UI)
├── styles/              # global.css (@theme) e theme.ts
├── types/               # tipos de domínio + Register do React Query
├── utils/               # cn, cookies, sessão, toasts, formatação, máscaras, validadores
├── validations/         # zod configurado + schemas
├── env.ts               # variáveis de ambiente validadas
└── proxy.ts             # proteção de rotas (antigo middleware)
public/svg/              # ícones usados pelo componente Icon
```

## Convenções

As regras vivem em `.claude/` e valem para pessoas e para agentes de IA:

- [`architecture.md`](./.claude/architecture.md) — camadas, autenticação, onde vive cada estado
- [`coding_standards.md`](./.claude/coding_standards.md) — nomenclatura, pastas, API, formulários, componentes, testes
- [`design_tokens.md`](./.claude/design_tokens.md) — cores, tipografia, sombras

Commits seguem [Conventional Commits](https://www.conventionalcommits.org/pt-br/) (`feat(auth): ...`, `fix(ui): ...`): o hook `commit-msg` bloqueia mensagens fora do padrão e o `pre-commit` roda ESLint + Prettier nos arquivos alterados.

## Mantendo atualizado

O Dependabot abre PRs semanais agrupando minor/patch e espera 7 dias após cada release antes de propor a atualização. Para atualizar o Next com ajuda de um agente de IA: `npx next upgrade --agent=latest`.
