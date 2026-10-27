# Padrões de Código

> Fonte única das convenções de código do projeto. Leia este arquivo inteiro antes de escrever/editar qualquer componente, hook, service, store, type, validação ou teste. Para a visão arquitetural (porquê), veja `architecture.md`; para valores de design, `design_tokens.md`.

## Índice

- [Convenções de Nomenclatura](#convenções-de-nomenclatura) — arquivos, pastas, tipos, Props
- [Estrutura de Pastas por Feature](#estrutura-de-pastas-por-feature)
- [Estrutura de Componentes: PascalCase/index.tsx](#estrutura-de-componentes-pascalcaseindextsx-obrigatório)
- [Aninhamento por Uso Único (Co-location)](#aninhamento-por-uso-único-co-location)
- [Constantes: `constants.ts` co-localizado](#constantes-constantsts-co-localizado-obrigatório)
- [CSS Co-localizado: `styles.css`](#css-co-localizado-stylescss-quando-necessário)
- [Páginas (`src/app`)](#páginas-srcapp)
- [Padrão de API: Services → Hooks → Stores → Components](#padrão-de-api-services--hooks--stores--components)
- [Validação: React Hook Form + Zod](#validação-react-hook-form--zod)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Modais Padrão: `defaultModalStore`](#modais-padrão-defaultmodalstore)
- [Tooltips: componente `Tooltip`](#tooltips-componente-tooltip-obrigatório)
- [Ícones: componente local `Icon`](#ícones-sempre-use-o-componente-local-icon-obrigatório)
- [Botões: componente `Button`](#botões-componente-button-componentsuibutton)
- [Estilização: TailwindCSS v4](#estilização-tailwindcss-v4)
- [Navegação Tipada](#navegação-tipada)
- [Testes: Vitest + Testing Library](#testes-vitest--testing-library)
- [Componentes: Size & Structure](#componentes-size--structure)
- [Imports: Ordem Padrão](#imports-ordem-padrão)
- [Comentários: Minimais](#comentários-minimais)

---

## Convenções de Nomenclatura

### Arquivos e Pastas

| Tipo              | Padrão                   | Exemplo                              |
| ----------------- | ------------------------ | ------------------------------------ |
| Componentes React | PascalCase (pasta)       | `src/components/pages/Notes/`        |
| Hooks             | camelCase + `use` prefix | `src/hooks/useDebounce.ts`           |
| Hooks de API      | `[domain].ts`            | `src/hooks/api/note.ts`              |
| Serviços          | camelCase                | `src/services/note.ts`               |
| Stores (Zustand)  | camelCase + `Store`      | `src/stores/noteStore.ts`            |
| Validações        | `[domain].validation.ts` | `src/validations/note.validation.ts` |
| Tipos             | `[domain].ts`            | `src/types/note.ts`                  |
| Utils             | camelCase                | `src/utils/format.ts`                |
| Testes            | `*.test.ts(x)` ao lado   | `src/utils/masks.test.ts`            |

### TypeScript: Tipos

**Regra de Ouro:** Sempre use `type`, nunca `interface` (o ESLint bloqueia; a única exceção é declaration merging, como o `Register` do React Query). Prefixo `T` + PascalCase.

#### Props de Componentes

O tipo de props de um componente **sempre se chama `Props`**, sem prefixo do nome do componente. Use o nome do componente como prefixo **somente** quando precisar exportar o tipo para uso externo.

```typescript
// ✅ Correto — uso interno (maioria dos casos)
type Props = {
  noteId: string;
  onClose: () => void;
};

const NoteCard = ({ noteId, onClose }: Props) => { ... };

// ✅ Correto — exportado porque outro componente precisa do tipo
export type NoteCardProps = {
  noteId: string;
  onClose: () => void;
};

// ❌ Errado — prefixo desnecessário quando não exportado
type NoteCardProps = { ... };
```

#### Entidades, Payloads, Formulários e Filtros

```typescript
// Entidade (retorno da API)
type TNote = {
  id: string;
  title: string;
  createdAt: string;
};

// Payload (dados enviados)
type TCreateNotePayload = {
  title: string;
};

type TUpdateNotePayload = Partial<TCreateNotePayload>;

// Formulário (React Hook Form) — prefira inferir do schema Zod
type TCreateNoteForm = z.infer<typeof CreateNoteSchema>;

// Filtros (query params / GET)
type TNotesListFilters = {
  search?: string;
  page?: number;
};
```

#### Respostas Envelopadas

Use `TApiResponse<T>` de `src/types/api.ts` quando a API devolver `{ data, meta: { pagination } }`.

---

## Estrutura de Pastas por Feature

```
src/
├── app/                               # Rotas (page.tsx fino, ver "Páginas")
├── types/
│   └── [domain].ts                    # Tipos puros
├── services/
│   └── [domain].ts                    # Serviço HTTP
├── hooks/
│   └── api/
│       └── [domain].ts                # Hooks React Query
├── stores/
│   └── [domain]Store.ts               # Zustand store
├── validations/
│   └── [domain].validation.ts         # Schemas Zod
├── constants/
│   └── queryKeys.ts                   # Fábrica de query keys (adicione o domínio aqui)
└── components/
    ├── ui/                            # Componentes base reutilizáveis
    ├── layout/                        # Providers, header, shells
    └── pages/
        └── [Feature]/                 # Componentes da tela
            ├── index.tsx              # Componente casca
            ├── ComponentA/
            │   └── index.tsx
            └── ComponentB/
                └── index.tsx
```

---

## Estrutura de Componentes: PascalCase/index.tsx (OBRIGATÓRIO)

**Regra de Ouro (NÃO OPCIONAL):** Cada componente DEVE estar em uma pasta com seu nome (PascalCase) e o arquivo principal ser `index.tsx`.

```
src/components/
├── ui/
│   ├── Button/
│   │   ├── index.tsx
│   │   ├── constants.ts
│   │   └── index.test.tsx
│   └── DefaultModal/
│       ├── index.tsx
│       └── constants.ts
└── pages/
    └── Login/
        ├── index.tsx
        └── LoginForm/
            └── index.tsx
```

```typescript
// ✅ Correto: importa da pasta (resolve para index.tsx)
import Button from '@/components/ui/Button';
import LoginForm from './LoginForm';

// ❌ Errado: importa o arquivo
import Button from '@/components/ui/Button/index.tsx';

// ❌ Errado: componente solto
src / components / Button.tsx;
```

Não há barrel (`components/ui/index.ts`): cada componente é importado pelo próprio caminho.

---

## Aninhamento por Uso Único (Co-location)

**Regra:** Um subcomponente usado em **um único pai** deve morar **dentro da pasta desse pai**, não como irmão no mesmo nível. Só promova um componente para um nível acima quando ele passar a ser usado por **2+ pais**.

- ✅ **Localidade:** o componente fica ao lado de quem o usa
- ✅ **Escopo claro:** a árvore de pastas reflete a árvore de renderização
- ✅ **Refactor seguro:** mover/excluir o pai leva os filhos junto

```
Login/
├── index.tsx
└── LoginPanel/                      # usa LoginForm e SignupPitch
    ├── index.tsx
    ├── SignupPitch/
    │   └── index.tsx
    └── LoginForm/                   # usa o modal abaixo
        ├── index.tsx
        └── LoginFirstAccessModal/
            └── index.tsx
```

Assim que um segundo pai precisar do componente, mova-o para o ancestral comum mais próximo (ou para `src/components/ui/` se for genérico). Atualize os imports no mesmo passo.

O mesmo vale para arquivos de apoio: `queryClient.ts` mora em `components/layout/Providers/` porque só o `Providers` usa.

---

## Constantes: `constants.ts` Co-localizado (OBRIGATÓRIO)

**Regra:** Arrays, mapas (`Record`), listas de objetos e tabelas de configuração de um componente **NÃO** ficam soltos no `index.tsx`. Eles vão para um `constants.ts` co-localizado, exportando tipos + dados.

**Strings simples de copy (título, subtítulo, label de botão) ficam INLINE no JSX** — extrair uma string única só adiciona indireção.

| Conteúdo                                               | Onde fica      |
| ------------------------------------------------------ | -------------- |
| Array / `Record` / lista de objetos (com ou sem ícone) | `constants.ts` |
| String de copy única (título, subtítulo, label)        | inline no JSX  |
| Valor mágico reutilizado em >1 lugar                   | `constants.ts` |

```typescript
// LoginPitch/constants.ts
import { TIcon } from '@/components/ui/Icon';

export type Benefit = { icon: TIcon; text: string };

export const BENEFITS: Benefit[] = [{ icon: 'CheckCircleIcon', text: '...' }];
```

| Escopo                      | Local                                 |
| --------------------------- | ------------------------------------- |
| Específico de um componente | `constants.ts` na pasta do componente |
| Reutilizável em toda a app  | `src/constants/`                      |

Use `.ts` por padrão; `.tsx` **apenas** quando a constante contém JSX literal.

> Exceção: se a app adotar i18n, a copy passa a viver na camada de tradução.

---

## CSS Co-localizado: `styles.css` (quando necessário)

**Regra:** Quando um componente precisar de CSS que o Tailwind não expressa inline — pseudo-elementos (`::-webkit-slider-thumb`), `@keyframes` específicos, `@supports` — crie um `styles.css` **na pasta do próprio componente** e importe no `index.tsx` (exemplo real: `components/ui/Shimmer`).

| Situação                                     | Solução                                           |
| -------------------------------------------- | ------------------------------------------------- |
| Pseudo-elemento (`::thumb`, `::placeholder`) | `styles.css` co-localizado                        |
| Hover/focus/disabled/aria                    | Tailwind inline (`hover:`, `focus:`, `aria-*:`)   |
| Animação específica deste componente         | `styles.css` co-localizado                        |
| Animação reutilizável em toda a app          | `src/styles/global.css` (`@keyframes` + `@theme`) |

Nunca adicione CSS de componente ao `global.css`.

---

## Páginas (`src/app`)

`page.tsx` e `layout.tsx` são **Server Components finos**: exportam `metadata` e renderizam o componente da feature. A lógica e os hooks moram em `components/pages/[Feature]`, que leva `'use client'` quando precisa.

```typescript
// src/app/(auth)/notes/page.tsx
import type { Metadata } from 'next';

import ClientOnly from '@/components/layout/ClientOnly';
import Notes from '@/components/pages/Notes';

export const metadata: Metadata = {
  title: 'Anotações',
};

const NotesPage = () => {
  return (
    <ClientOnly>
      <Notes />
    </ClientOnly>
  );
};

export default NotesPage;
```

- Rotas da área logada ficam no grupo `src/app/(auth)/` e **sempre** envolvem a feature em `<ClientOnly>` (na página, nunca no layout — o porquê está em `architecture.md`, "Rotas e páginas"). Páginas públicas sem dados do React Query (como o login) dispensam.
- Rotas públicas precisam entrar em `PUBLIC_ROUTES` (`src/constants/routes.ts`), senão o `proxy.ts` redireciona para o login.
- Páginas com params usam o helper global `PageProps<'/rota/[id]'>` gerado pelo Next (`params` é uma `Promise`).

---

## Padrão de API: Services → Hooks → Stores → Components

### 1. Service Layer

```typescript
// src/services/note.ts
import { TCreateNotePayload, TNote } from '@/types/note';

import api from './api';

export const noteService = {
  list: async (): Promise<TNote[]> => {
    const { data } = await api.get<TNote[]>('notes');
    return data;
  },

  create: async (payload: TCreateNotePayload): Promise<TNote> => {
    const { data } = await api.post<TNote>('notes', payload);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`notes/${id}`);
  },
};
```

- Apenas chamadas HTTP, sempre pelo `api` de `src/services/api.ts` (auth e refresh já vêm prontos)
- Sem estado, sem cache, tipagem estrita

### 2. Query Keys

Toda chave nasce na fábrica `src/constants/queryKeys.ts`. Cada domínio tem `all()` (raiz, usada nas invalidações) e funções mais específicas:

```typescript
export const queryKeys = {
  user: { ... },
  notes: {
    all: () => ['notes'] as const,
    list: (filters: TNotesListFilters) => ['notes', 'list', filters] as const,
    detail: (id: string) => ['notes', 'detail', id] as const,
  },
};
```

Uma chave escrita na mão (`queryKey: ['notes']`) **não compila**: o `Register` restringe `queryKey` às chaves da fábrica.

### 3. Hook Layer

```typescript
// src/hooks/api/note.ts
import { useMutation, useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/queryKeys';
import { noteService } from '@/services/note';

export const useNotes = (filters: TNotesListFilters) => {
  return useQuery({
    queryKey: queryKeys.notes.list(filters),
    queryFn: () => noteService.list(filters),
  });
};

export const useCreateNote = () => {
  return useMutation({
    mutationFn: noteService.create,
    meta: { invalidateQueries: [queryKeys.notes.all()] },
  });
};

export const useDeleteNote = () => {
  return useMutation({
    mutationFn: (id: string) => noteService.delete(id),
    meta: { invalidateQueries: [queryKeys.notes.all()] },
  });
};
```

- Abstrai o React Query por completo
- `meta.invalidateQueries` recebe uma **lista** de chaves (invalidação por prefixo)
- Erros de mutation já viram toast pelo `onError` global (`utils/handleToast.ts`) — não repita em cada hook

### 4. Store Layer

```typescript
// src/stores/noteStore.ts
import { create } from 'zustand';

type Store = {
  filterOpen: boolean;
  setFilterOpen: (open: boolean) => void;
};

export const useNoteStore = create<Store>(set => ({
  filterOpen: false,
  setFilterOpen: open => set({ filterOpen: open }),
}));
```

- APENAS estado visual (UI state)
- NUNCA armazenar dados de API

### 5. Component Layer

```typescript
// src/components/pages/Notes/index.tsx
'use client';

import { useNotes } from '@/hooks/api/note';
import { useNoteStore } from '@/stores/noteStore';

const Notes = () => {
  const { data: notes, isLoading } = useNotes({});
  const { filterOpen, setFilterOpen } = useNoteStore();

  if (isLoading) {
    return <Shimmer className="h-40 rounded-xl" />;
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <Button text="Filtros" onClick={() => setFilterOpen(!filterOpen)} />

      {filterOpen && <NotesFilters />}

      {notes?.length ? (
        notes.map(note => <NoteCard key={note.id} note={note} />)
      ) : (
        <ListEmptyComponent message="Nenhuma anotação ainda." />
      )}
    </div>
  );
};

export default Notes;
```

- Zero `useState` em cascata
- TailwindCSS inline
- Componentes pequenos (máx. 100 linhas)

---

## Validação: React Hook Form + Zod

> **Importe sempre de `@/validations/zod`** (ou `./zod` dentro da pasta) — nunca de `zod` ou `yup` direto. Há regra ESLint (`no-restricted-imports`) que bloqueia. O `src/validations/zod.ts` exporta o `z` configurado com locale pt-BR e `customError` (`.min(1)` sem mensagem vira "Campo obrigatório", e-mail inválido vira "E-mail inválido"), além dos helpers `zOption` (selects `{ value, label }`) e `zPassword`.

```typescript
// src/validations/note.validation.ts
import z from './zod';

export const CreateNoteSchema = z.object({
  title: z.string().trim().min(1),
  text: z.string().trim().min(1),
});

export type TCreateNoteForm = z.infer<typeof CreateNoteSchema>;
```

```typescript
// src/components/pages/Notes/NoteCreator/index.tsx
const NoteCreator = () => {
  const { mutate: createNote } = useCreateNote();

  const { control, handleSubmit } = useForm<TCreateNoteForm>({
    resolver: zodResolver(CreateNoteSchema),
    defaultValues: {
      title: '',
      text: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(data => createNote(data))}>
      <TextInput control={control} label="Título" name="title" />

      <TextArea control={control} label="Texto" name="text" />

      <Button text="Criar" type="submit" />
    </form>
  );
};
```

### Convenções de `useForm`

- **`resolver: zodResolver(Schema)`** — sempre via `@hookform/resolvers/zod`.
- **Sem `mode`** — mantenha o padrão (`onSubmit`).
- **`defaultValues` sempre definidos** — **todos** os campos (`''`, `false`, `null`, `[]`), mesmo os opcionais.
- **Mensagens** — confie no erro global do `zod.ts`; passe mensagem explícita só quando for específica (`.regex(...)`, `.refine(...)`).
- **Inputs numéricos** — `z.number()` + `register('campo', { valueAsNumber: true })` (não use `z.coerce.number`).
- **Máscaras** — `TextInput` recebe `mask` (funções de `utils/masks.ts`: `maskCPF`, `maskCNPJ`, `maskPhone`, `maskCEP`, `maskDate`, `maskTime`) e as validações de `utils/isValid.ts` entram no schema via `.refine(isValidCpf, 'CPF inválido')`.
- **Botão de submit** — `<Button type="submit" isLoading={isPending} showLoadingIndicator withoutDelay />`.

---

## Variáveis de Ambiente

Toda variável passa por `src/env.ts` (`@t3-oss/env-nextjs`) — **nunca** leia `process.env` direto no código.

```typescript
// src/env.ts
export const env = createEnv({
  server: { SECRET_KEY: z.string() },
  client: { NEXT_PUBLIC_API_URL: z.url() },
  runtimeEnv: {
    SECRET_KEY: process.env.SECRET_KEY,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});

// uso
import { env } from '@/env';
```

- Variável nova: adicione no schema **e** no `runtimeEnv`, e documente em `.env.example`.
- O `next.config.ts` importa o `env`, então uma variável faltando quebra o `dev`/`build` com mensagem clara.
- `SKIP_ENV_VALIDATION=1` pula a validação (só para casos como build de Docker sem segredos).

---

## Modais Padrão: `defaultModalStore`

**Regra:** Todos os modais padrão (confirmação, sucesso, erro, alerta) DEVEM usar o `useDefaultModalStore`. Nunca crie um componente próprio para esses casos nem gerencie `useState` de abertura/fechamento.

O `<DefaultModal />` é renderizado uma única vez (no `Providers`). Para abrir, chame `openModal` de qualquer componente.

```typescript
// src/stores/defaultModalStore.ts
export type ModalType = 'default' | 'success' | 'error';

export type DefaultModalProps = {
  type: ModalType; // 'default' (primária), 'success' (verde), 'error' (vermelho)
  title: string;
  message: string;
  confirmText: string;
  notice?: string; // Texto auxiliar abaixo da mensagem
  onConfirm?: () => Promise<void> | void;
  cancelText?: string; // Se presente, exibe botão de cancelar
  onCancel?: () => Promise<void> | void;
  successMessage?: string; // Abre um modal de sucesso após onConfirm
  closeOnClickOutside?: boolean; // Também habilita fechar com Esc
};
```

```typescript
const DeleteButton = ({ noteId }: Props) => {
  const { openModal } = useDefaultModalStore();
  const { mutateAsync: deleteNote } = useDeleteNote();

  const handleDelete = () => {
    openModal({
      type: 'error',
      title: 'Excluir nota',
      message: 'Tem certeza que deseja excluir esta nota?',
      notice: 'Essa ação não pode ser desfeita.',
      confirmText: 'Excluir',
      cancelText: 'Cancelar',
      successMessage: 'Nota excluída com sucesso.',
      closeOnClickOutside: true,
      onConfirm: async () => {
        await deleteNote(noteId);
      },
    });
  };

  return <Button color="red" text="Excluir" onClick={handleDelete} />;
};
```

Para modais com conteúdo próprio (formulário dentro do modal), use `ModalBackdrop` (portal, scroll lock e Esc/clique fora via `onClose`).

---

## Tooltips: componente `Tooltip` (OBRIGATÓRIO)

**Regra de Ouro (NÃO OPCIONAL):** Todo tooltip usa `@/components/ui/Tooltip` (wrapper do `react-tooltip` com portal no `body`, sem seta e o visual padrão). **Nunca** implemente tooltip com `group-hover`, `onMouseEnter` + `useState` ou `<div>` posicionado com `absolute`.

```typescript
import { useId } from 'react';

import Tooltip from '@/components/ui/Tooltip';

const Example = () => {
  const tooltipId = useId();

  return (
    <>
      <button data-tooltip-id={tooltipId}>Passe o mouse aqui</button>

      <Tooltip id={tooltipId}>Texto do tooltip</Tooltip>
    </>
  );
};
```

- **`useId()`** gera um id único por instância — essencial em listas.
- **Vários triggers, um `<Tooltip>` só:** use `data-tooltip-content` em cada trigger e um único `<Tooltip id={tooltipId} />` compartilhado.
- Ajustes de posição/estilo: passe as props do `react-tooltip` (`place`, `className`, `delayShow`...).

---

## Ícones: Sempre Use o Componente Local `Icon` (OBRIGATÓRIO)

**Regra de Ouro (NÃO OPCIONAL):** Todos os ícones são renderizados pelo componente `Icon` (`@/components/ui/Icon`), que lê os SVGs de `public/svg/` (via SVGR). **Nunca** importe ícones de bibliotecas externas (`react-icons`, `lucide-react`, `@heroicons/react`, etc.).

```typescript
import Icon from '@/components/ui/Icon';

<Icon name="CheckIcon" />

// Tamanho e cor (qualquer cor CSS, inclusive tokens)
<Icon color={colors.primary} name="InfoCircleIcon" size={20} />

// Herdando a cor do texto (padrão: currentColor)
<span className="text-red"><Icon name="WarningTriangleIcon" /></span>

// Stroke e rotação
<Icon name="ChevronIcon" rotate={180} size={16} strokeWidth={1.5} />
```

| Prop          | Tipo     | Padrão           | Descrição                               |
| ------------- | -------- | ---------------- | --------------------------------------- |
| `name`        | `TIcon`  | obrigatório      | Nome exportado em `public/svg/index.ts` |
| `size`        | `number` | `24`             | Largura e altura em px                  |
| `color`       | `string` | `'currentColor'` | Cor do stroke (aceita `var(--color-*)`) |
| `strokeWidth` | `number` | `2`              | Espessura do traço                      |
| `rotate`      | `number` | `0`              | Rotação em graus                        |
| `fill`        | `string` | `'none'`         | Fill do SVG                             |
| `className`   | `string` | —                | Classes extras (ex.: `text-gray-500`)   |

Em `constants.ts`, referencie ícones pelo tipo `TIcon`.

### Precisa de um ícone novo?

Se o ícone não existe em `public/svg/`, **peça ao usuário** para adicioná-lo — nunca crie, copie ou gere SVGs por conta própria. Para adicionar: coloque o `.svg` (com `stroke="currentColor"`) em `public/svg/` e exporte em `public/svg/index.ts` como `export { default as NomeIcon } from './Nome.svg';`. Use `rotate` para variações de direção em vez de ícones redundantes.

---

## Botões: Componente `Button` (`@/components/ui/Button`)

**Regra:** todo botão de ação usa o componente `Button`. A cor vem de um **token semântico** (prop `color`) que mapeia para classes Tailwind estáticas — **nunca** passe hex nem monte `bg-*` por fora.

| Prop                                                  | Tipo           | Descrição                                                                                     |
| ----------------------------------------------------- | -------------- | --------------------------------------------------------------------------------------------- |
| `text`                                                | `string`       | Conteúdo do botão (obrigatório).                                                              |
| `color`                                               | `TButtonColor` | Variante de cor. Default `'primary'`. Define fundo + hover + cor de texto.                    |
| `textColor`                                           | `string`       | **Classe Tailwind** para sobrescrever a cor do texto (ex.: `"text-gray-700"`). Não é hex.     |
| `textClassName`                                       | `string`       | Tipografia do texto. Default `'text-sm font-medium'`. Não coloque cor aqui.                   |
| `leftIcon`/`rightIcon`                                | `TIconProps`   | Ícones; herdam a cor do texto via `currentColor`.                                             |
| `className`                                           | `string`       | **Só layout** (padding, largura, borda). Mesclado via `cn`: `px-3` substitui o `px-4` padrão. |
| `showHover`                                           | `boolean`      | Default `true`. Use `false` + `hover:*` no `className` para um hover customizado.             |
| `lift`                                                | `boolean`      | Eleva levemente no hover.                                                                     |
| `isLoading` / `showLoadingIndicator` / `withoutDelay` | `boolean`      | Estado de carregamento (spinner) e controle do bloqueio de clique duplo (1s).                 |

**Valores de `color` (`TButtonColor`):** `primary` (default), `primary-soft`, `white`, `ink`, `gray-50`, `transparent`, `green`, `yellow`, `red`.

```tsx
// ✅ Primário — hover já vem da variante
<Button text="Salvar" onClick={handleSave} />

// ✅ Secundário claro com borda e texto cinza
<Button className="border border-gray-200" color="white" text="Cancelar" textColor="text-gray-700" onClick={onClose} />

// ✅ Destrutivo
<Button color="red" text="Excluir" onClick={handleDelete} />

// ❌ hex na cor / fundo por className em vez do token
<Button color="#1654A2" text="Salvar" />
<Button className="bg-primary" text="Salvar" />
```

---

## Estilização: TailwindCSS v4

### Inline Classes (Zero `styles.ts`)

```typescript
// ✅ Correto
<div className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-sm">
  <h1 className="text-2xl font-bold">Título</h1>

  <p className="text-sm text-gray-700">Descrição</p>
</div>;

// ❌ Errado
import styled from 'styled-components';
```

### Classes condicionais: `cn`

Use `cn` (`@/utils/cn` — clsx + tailwind-merge) para combinar classes condicionais ou aceitar `className` de fora. Ele resolve conflitos: `cn('px-4', 'px-2')` → `px-2`.

```typescript
<div
  className={cn(
    'rounded-xl border p-4',
    isActive && 'border-primary',
    className,
  )}
/>
```

**Nunca** monte nomes de classe dinamicamente (`` `bg-${color}` ``) — o Tailwind só gera classes que aparecem inteiras no código. Use um mapa em `constants.ts` (como o `BUTTON_MAP`).

### Fonte e cor de texto: padrões globais (NÃO setar localmente)

A fonte (Inter, via `next/font` + `--font-sans`) e a cor `ink` já são o padrão de toda a aplicação (`src/styles/global.css`). **Não** repita `font-sans` nem `text-ink` nos componentes — use uma classe de cor só quando o trecho fugir do padrão.

### Cores em props: `colors` de `@/styles/theme`

Para props que pedem string de cor (`<Icon color />`) ou `style` inline dinâmico, use `colors` de `@/styles/theme`. Ele aponta para os tokens via `var(--color-*)`, então nunca fica fora de sincronia com o CSS.

```typescript
import { colors } from '@/styles/theme';

<Icon color={colors.primary} name="InfoCircleIcon" />
<div style={{ borderColor: colors.red }} />
```

> Bibliotecas que desenham em `<canvas>` (gráficos) não resolvem `var()`. Nesses casos leia o valor com `getComputedStyle(document.documentElement).getPropertyValue('--color-primary')`.

Tokens disponíveis: [design_tokens.md](./design_tokens.md).

---

## Navegação Tipada

`typedRoutes` está ligado: `<Link href>`, `router.push/replace` e `redirect` só aceitam rotas que existem — erro de digitação vira erro de compilação.

```typescript
router.push('/dashboard'); // ✅ validado
router.push(`/notes/${id}`); // ✅ template literal validado contra /notes/[id]

import type { Route } from 'next';
router.push(redirectFromQuery as Route); // string de runtime precisa de cast
```

Rotas reutilizadas (login, home) ficam em `src/constants/routes.ts`.

---

## Testes: Vitest + Testing Library

- Arquivo `*.test.ts(x)` **ao lado** do código testado (`utils/masks.test.ts`, `ui/Button/index.test.tsx`).
- Teste comportamento, não implementação: busque por papel/texto (`getByRole('button', { name: 'Salvar' })`), interaja com `userEvent`.
- Importe `describe/it/expect/vi` de `vitest` (sem globals).
- SVGs viram componentes nos testes (mesmo comportamento do SVGR no Next) e `NEXT_PUBLIC_API_URL` já vem definida no `vitest.config.mts`.

```typescript
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Button from '.';

describe('Button', () => {
  it('chama onClick ao clicar', async () => {
    const onClick = vi.fn();
    render(<Button text="Salvar" onClick={onClick} />);

    await userEvent.click(screen.getByRole('button', { name: 'Salvar' }));

    expect(onClick).toHaveBeenCalledOnce();
  });
});
```

---

## Componentes: Size & Structure

| Componente           | Linhas | Responsabilidade  |
| -------------------- | ------ | ----------------- |
| Page (main)          | 30-50  | Orquestração      |
| Componente Container | 50-100 | Layout + hooks    |
| Componente Simples   | 20-50  | Renderização pura |
| Sub-componente       | 10-30  | Elemental         |

Passou de 100 linhas: quebre em subcomponentes co-localizados.

### Regras de JSX que o lint cobra

- Componentes como **arrow function** (`const Foo = () => {}`), `export default` no fim.
- Props em ordem alfabética, com shorthands (`disabled`) primeiro e callbacks (`onClick`) por último.
- Linha em branco entre elementos JSX irmãos.
- `if` sempre com chaves (`curly: all`).

---

## Imports: Ordem Padrão

O ESLint (`import-x/order`) ordena e separa os grupos automaticamente (`yarn lint:fix`):

```typescript
// 1. Externos (React, Next, libs) — em ordem alfabética
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// 2. Internos absolutos (@/ e @public/)
import Button from '@/components/ui/Button';
import { useNotes } from '@/hooks/api/note';
import { cn } from '@/utils/cn';

// 3. Relativos (pai, irmão)
import NotesList from './NotesList';
```

Imports relativos com mais de 2 níveis (`../../../`) são bloqueados: use `@/`.

---

## Comentários: Minimais

**Não escreva comentários explicando O QUÊ o código faz** — nomes bons já dizem.

```typescript
// ❌ Inútil
const now = new Date(); // Get current date

// ✅ Código claro, sem comentário
const millisecondsDiff = deadline.getTime() - now.getTime();
```

**Escreva comentários apenas quando o POR QUÊ é não-óbvio:**

```typescript
// ✅ Restrição de negócio
// Flashcards não estão disponíveis para este tópico conforme retorno da API
if (!topic.flashcards) {
  return <DisabledButton />;
}

// ✅ Workaround
// parseISO trata 'yyyy-MM-dd' como horário local; new Date() usaria UTC
const toDate = (date: string) => parseISO(date);
```
