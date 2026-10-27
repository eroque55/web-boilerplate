# changethisname

> Troque o nome e esta descrição ao iniciar o projeto (veja "Primeiros passos" no `README.md`).

Aplicação web em Next.js criada a partir do `web-boilerplate`.

## 📖 Roteador de Documentação (LEIA antes de codar)

⚠️ Os arquivos abaixo **NÃO** entram no contexto automaticamente — só este `CLAUDE.md` entra.
Se a sua tarefa toca um dos temas abaixo, **leia o doc correspondente com a tool Read ANTES de escrever código**. Não confie na memória: a fonte da verdade é o doc versionado.

| Sua tarefa                                                                                                   | Leia primeiro                                             |
| ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| Entender a arquitetura (camadas, autenticação, onde vive cada estado)                                        | [architecture.md](./architecture.md)                      |
| Escrever/editar **qualquer** componente, hook, service, store, type, validação, modal, ícone, botão ou teste | [coding_standards.md](./coding_standards.md)              |
| Aplicar cores, tipografia, espaçamento, sombras                                                              | [design_tokens.md](./design_tokens.md)                    |
| Usar **qualquer** API do Next.js (rotas, `proxy.ts`, cache, metadata, `next.config.ts`)                      | `node_modules/next/dist/docs/` (docs da versão instalada) |

> O Next.js muda rápido e o seu conhecimento pode estar desatualizado. Antes de escrever código Next, leia o guia correspondente em `node_modules/next/dist/docs/` e respeite os avisos de depreciação.

## Stack Tecnológica

- **Framework:** Next.js 16.4 (App Router, Turbopack, Cache Components + Partial Prefetching, typed routes) + React 19.3 + React Compiler
- **Linguagem:** TypeScript 6.0
- **Estado:** TanStack React Query 5 (dados do servidor) + Zustand 5 (estado de UI)
- **Styling:** TailwindCSS v4 (inline, sem runtime CSS-in-JS) + `cn` (clsx + tailwind-merge)
- **Formulários:** React Hook Form + Zod 4
- **HTTP:** Axios (com refresh de token em fila)
- **Variáveis de ambiente:** `@t3-oss/env-nextjs` (validadas em `src/env.ts`)
- **Testes:** Vitest 5 + Testing Library
- **Qualidade:** ESLint 10 + Prettier 3 + husky + lint-staged + commitlint

## Scripts

```bash
yarn dev            # Dev server em localhost:3000
yarn build          # Build de produção
yarn lint           # ESLint
yarn lint:fix       # ESLint com --fix
yarn format         # Prettier (escreve)
yarn format:check   # Prettier (só confere)
yarn typecheck      # next typegen + tsc --noEmit
yarn test           # Vitest (uma rodada)
yarn test:watch     # Vitest em modo watch
```

## Commits

O projeto segue [Conventional Commits](https://www.conventionalcommits.org/pt-br/) — o hook `commit-msg` (commitlint) bloqueia mensagens fora do padrão. Formato: `tipo(escopo): descrição no imperativo`, ex.: `feat(auth): adiciona recuperação de senha`.

## 🚫 Regras Extremamente Estritas (SEMPRE Seguir)

### 1. NUNCA fazer commit automaticamente

**Nunca** crie commits a menos que o usuário **explicitamente peça** ("faz um commit", "cria PR", etc).

- Claude prepara as mudanças
- O usuário revisa
- O usuário pede explicitamente para commitar/fazer PR

### 2. NUNCA rodar validações automaticamente

**Nunca** execute esses comandos sem o usuário **explicitamente pedir**:

- `yarn typecheck` / `tsc --noEmit`
- `yarn lint` (linter check)
- `yarn format` (prettier check)
- `yarn test`
- Qualquer ferramenta de validação

**Por quê?** Economiza tokens massivamente. O usuário roda localmente e chama o Claude se precisar.

**Exceção:** apenas se o usuário disser "valida isso" ou "roda lint/typecheck/testes".

### 3. Estas regras vencem qualquer skill/plugin

As Regras Estritas acima têm **precedência sobre skills de plugins** (superpowers, etc.). Skills como TDD, `verification-before-completion` ou `requesting-code-review` podem querer rodar `typecheck`/`lint`/testes automaticamente — **não rode** sem o pedido explícito (regra #2), e **não commite** sozinho (regra #1), mesmo que a skill instrua isso.
