# Design Tokens

Tokens definidos em `src/styles/global.css` com `@theme` (TailwindCSS v4). O `src/styles/theme.ts` só **referencia** esses tokens via `var(--color-*)` — a fonte da verdade é sempre o CSS.

> Os valores abaixo são o ponto de partida do boilerplate. Ao iniciar um projeto, troque a paleta da marca no `global.css` e atualize esta tabela.

---

## 🎨 Cores

### Marca

| Token                   | Valor     | Uso                                        |
| ----------------------- | --------- | ------------------------------------------ |
| `--color-primary`       | `#1654a2` | Cor principal, botões primários, destaques |
| `--color-primary-deep`  | `#0f3e7a` | Hover do primário, ênfase                  |
| `--color-primary-soft`  | `#eaf1fb` | Fundo de itens selecionados                |
| `--color-primary-soft2` | `#d4e2f5` | Hover do `primary-soft`, bordas em foco    |

```html
<button class="bg-primary hover:bg-primary-deep text-white">Salvar</button>
<div class="bg-primary-soft text-primary-deep">Selecionado</div>
```

### Texto e fundo

| Token          | Valor     | Uso                                                |
| -------------- | --------- | -------------------------------------------------- |
| `--color-ink`  | `#1a1a1a` | Texto principal (padrão do `body`, não repita)     |
| `--color-ink2` | `#2c2c2a` | Hover de fundos escuros                            |
| `--color-bg`   | `#f8f9fb` | Fundo global (aplicado no `body` pelo layout raiz) |

### Cinzas

A escala de cinzas é a padrão do Tailwind (`gray-50` a `gray-950`). Hierarquia recomendada:

| Classe     | Uso                               |
| ---------- | --------------------------------- |
| `gray-700` | Labels, parágrafos secundários    |
| `gray-500` | Metadados, textos de apoio        |
| `gray-400` | Placeholders, estados desativados |
| `gray-300` | Bordas em hover, scrollbar        |
| `gray-200` | Bordas padrão, divisores          |
| `gray-100` | Fundos secundários, skeletons     |
| `gray-50`  | Fundo de cards e linhas de tabela |

### Semânticas (status)

| Token                                    | Uso                   |
| ---------------------------------------- | --------------------- |
| `--color-green` / `--color-green-soft`   | Sucesso, concluído    |
| `--color-blue` / `--color-blue-soft`     | Informação            |
| `--color-red` / `--color-red-soft`       | Erro, ação destrutiva |
| `--color-yellow` / `--color-yellow-soft` | Atenção, pendente     |

```html
<span class="bg-green-soft text-green rounded-full px-3 py-1 text-xs">Concluído</span>
<p class="text-red text-xs">Campo obrigatório</p>
```

---

## 🔤 Tipografia

- Família: **Inter** (variável, via `next/font` em `src/app/layout.tsx`), exposta como `--font-sans`. Para trocar, mude a fonte no layout — o resto herda.
- Tamanhos: escala padrão do Tailwind (`text-xs` 12px, `text-sm` 14px, `text-base` 16px, `text-lg`, `text-2xl`...).
- Pesos usuais: `font-medium` (labels, botões), `font-semibold` (títulos), `font-bold` (números de destaque).

---

## 🌫️ Sombras e animações

| Token               | Uso                                                    |
| ------------------- | ------------------------------------------------------ |
| `--shadow-primary`  | Elevação colorida (`shadow-primary`, `lift` do Button) |
| `--animate-fade-in` | Entrada suave (`animate-fade-in`): modais, erros       |

Sombras neutras: use as do Tailwind (`shadow-sm`, `shadow-lg`, `shadow-2xl`).

---

## 📐 Espaçamento e raio

Use a escala padrão do Tailwind. Convenções do projeto:

- Cards e inputs: `rounded-xl`; modais: `rounded-2xl`; pílulas: `rounded-full`
- Padding de cards: `p-4` (mobile) / `p-6`+ (desktop)
- Gaps entre campos de formulário: `gap-4`

---

## Como trocar a paleta

1. Edite os valores em `@theme static { ... }` no `src/styles/global.css`.
2. Se criar um token novo, adicione a referência em `src/styles/theme.ts` (só se for usado em props de cor/`style`).
3. Atualize as tabelas deste arquivo.

O bloco usa `@theme static` para que todas as variáveis sejam emitidas mesmo sem nenhuma classe usando — é isso que permite ao `theme.ts` referenciá-las por `var()`.
