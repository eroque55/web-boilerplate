# Arquitetura do Projeto

> **Papel deste doc:** visão e _porquê_ da arquitetura. Para as _regras de código_ concretas (como nomear, estruturar, validar), veja `coding_standards.md`; para _valores de design_, `design_tokens.md`.

O projeto segue o padrão **Golden Standard**: camadas com uma responsabilidade cada, componentes pequenos e estilização sem runtime. Ele nasceu da migração do `estuda-web-aluno`, onde substituiu componentes de 400+ linhas com `styled-components`, `useState` em cascata e `useQuery` direto no componente.

---

## Camadas

```
API Services → API Hooks → Zustand Store → Components
```

### 1. Serviço (`src/services/[domain].ts`)

Responsável APENAS por chamadas HTTP.

```typescript
export const noteService = {
  list: async (): Promise<TNote[]> => {
    const { data } = await api.get<TNote[]>('notes');
    return data;
  },
  create: async (payload: TCreateNotePayload): Promise<TNote> => {
    const { data } = await api.post<TNote>('notes', payload);
    return data;
  },
};
```

- Objeto com métodos assíncronos
- Tipagem estrita de entrada/saída
- Sem estado, sem cache, sem lógica de negócio

### 2. Hooks de API (`src/hooks/api/[domain].ts`)

Abstraem o React Query por completo.

```typescript
export const useNotes = () => {
  return useQuery({
    queryKey: queryKeys.notes.list(),
    queryFn: noteService.list,
  });
};

export const useCreateNote = () => {
  return useMutation({
    mutationFn: noteService.create,
    meta: { invalidateQueries: [queryKeys.notes.all()] },
  });
};
```

- Nenhum componente importa `useQuery`/`useMutation` diretamente
- As chaves vêm da fábrica tipada `src/constants/queryKeys.ts` — o `Register` do React Query (`src/types/tanStack-query.d.ts`) faz o TypeScript **rejeitar** qualquer chave fora dela. Chave inconsistente é a causa nº 1 de "tela desatualizada"; aqui ela vira erro de compilação.
- Invalidação declarativa: `meta.invalidateQueries` é processado uma única vez no `MutationCache` (`components/layout/Providers/queryClient.ts`)

### 3. Zustand Store (`src/stores/[domain]Store.ts`)

Gerencia APENAS estado visual (UI state).

```typescript
export const useNotesStore = create<Store>(set => ({
  filterOpen: false,
  setFilterOpen: open => set({ filterOpen: open }),
}));
```

- Nunca armazena dados de API (o React Query já faz isso)
- Estados simples: modais, seleções, filtros, abas ativas

### 4. Componentes (`src/components/pages/[Feature]/`)

Puros, focados em renderização.

```typescript
const NotesPage = () => {
  const { data: notes } = useNotes();
  const { filterOpen, setFilterOpen } = useNotesStore();

  return (
    <div className="flex flex-col gap-4">
      <Button text="Filtros" onClick={() => setFilterOpen(!filterOpen)} />

      {filterOpen && <NotesFilters />}

      {notes?.map(note => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
};
```

- 30-100 linhas
- Zero `useState` em cascata
- Responsabilidade única: renderizar

---

## Onde vive cada estado

| Estado                                | Onde                          | Por quê                                                       |
| ------------------------------------- | ----------------------------- | ------------------------------------------------------------- |
| Dados vindos da API                   | React Query (via `hooks/api`) | Cache, deduplicação, invalidação e refetch prontos            |
| UI compartilhada (modal, filtro, aba) | Zustand (`stores/`)           | Simples, sem provider, inspecionável no Redux DevTools        |
| Campos de formulário                  | React Hook Form + Zod         | Validação tipada e sem re-render a cada tecla                 |
| Estado local de um componente só      | `useState`                    | Quando ninguém mais precisa dele                              |
| Sessão (tokens)                       | Cookies (`utils/session.ts`)  | O `proxy.ts` lê no servidor e redireciona antes de renderizar |
| Dados do usuário logado               | React Query (`useMe`)         | Nunca persistidos no navegador: sempre vêm da API             |

---

## Autenticação

```
Login ──► authService.login ──► session.start(tokens) ──► router.replace(?redirect ou HOME_ROUTE)
                                   (cookies)

Request ──► proxy.ts ── sem cookie de sessão em rota privada ──► /login?redirect=<rota>
                     ── com sessão em /login ─────────────────► HOME_ROUTE

API 401 ──► interceptor ──► refresh (uma chamada, as demais aguardam) ──► repete a request
                                └── refresh falhou ──► session.end() ──► /login
```

- **Tokens em cookies** (`utils/cookies.ts` + `utils/session.ts`), com o nome prefixado por `APP_NAME` (cookies de `localhost` são compartilhados entre projetos). "Manter conectado" grava cookies persistentes (30 dias) e guarda o refresh token; sem ele, os cookies são de sessão.
- **`src/proxy.ts`** faz a checagem _otimista_: só confere se o cookie existe. Quem valida o token é a API.
- **`src/services/api.ts`** injeta o `Authorization`, faz o refresh com fila única (várias requests com 401 disparam um refresh só) e encerra a sessão se o refresh falhar.
- **Logout** (`session.end`) usa navegação completa: zera de uma vez o cache do React Query, as stores do Zustand e o Router Cache do Next.
- Rotas públicas ficam em `src/constants/routes.ts` (`PUBLIC_ROUTES`); tudo fora delas exige sessão.
- **Contrato com o backend:** `services/auth.ts` espera `POST auth/login → { accessToken, refreshToken? }` e `POST auth/refresh`; `services/user.ts` espera `GET users/me`. Ajuste ao backend do projeto.

> Os tokens ficam legíveis por JavaScript (assim como no `localStorage`). Se o backend puder emitir cookies `HttpOnly`, prefira: o `proxy.ts` continua igual e o `session.ts` deixa de gravar tokens.

---

## Rotas e páginas

- `src/app/(auth)/` — área logada; o `layout.tsx` do grupo renderiza o `AppHeader`.
- **Cada `page.tsx` da área logada envolve a feature em `<ClientOnly>`.** Os dados vêm do React Query no cliente e o Next hidrata o layout antes da página: se o header já tiver buscado a mesma query (ex.: `useMe`), a página hidrataria com dados que o HTML do servidor não tinha (hydration mismatch). Com o `ClientOnly`, a página só monta depois da hidratação.
- O `ClientOnly` fica **na página, nunca no layout**: no layout ele tira o segmento da página do HTML do servidor e a validação de navegação instantânea do Next 16.4 passa a acusar "dropped from rendering" em toda página.
- Se uma página precisar de SSR de verdade, busque os dados no servidor (prefetch + `HydrationBoundary`) e dispense o `ClientOnly`.
- `src/app/login/` — rota pública.
- `app/**/page.tsx` é um **Server Component fino**: exporta `metadata` e renderiza o componente da feature (`components/pages/[Feature]`), que é Client Component quando usa hooks.
- **Cache Components + Partial Prefetching** (`cacheComponents` e `partialPrefetching: true`, o recomendado pelo Next 16.4 para projetos novos) estão ligados: os links pré-carregam um App Shell estático por rota. O padrão do projeto continua sendo buscar dados no cliente com React Query; se for buscar dados em Server Components, use `'use cache'` ou envolva em `<Suspense>` — leia `node_modules/next/dist/docs/01-app/01-getting-started/` (Caching) antes.
- **Typed routes** (`typedRoutes: true`): `<Link href>` e `router.push` só aceitam rotas que existem. Strings montadas em runtime precisam de `as Route`.

---

## Estilização: TailwindCSS v4

```typescript
// ❌ Runtime CSS-in-JS (styled-components)
const Container = styled.div`
  display: flex;
`;

// ✅ Golden Standard
<div className="flex gap-4">...</div>;
```

- CSS gerado em build time, arquivo único, nada processado no navegador
- Tokens em `src/styles/global.css` (`@theme`) — ver `design_tokens.md`

---

## Benefícios

- **Performance:** zero runtime CSS-in-JS, React Compiler memoizando automaticamente
- **Manutenibilidade:** componentes pequenos e focados
- **Testabilidade:** lógica desacoplada da renderização
- **Cache previsível:** chaves tipadas e invalidação centralizada
- **Escalabilidade:** o mesmo padrão em todas as features
