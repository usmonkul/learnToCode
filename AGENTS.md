# AGENTS.md

Yaratuvchi.uz: a programming tutorial platform with courses, **Arena** (graded practice challenges) and **Loyihalar** (a gallery of small working projects). React 19 + Vite + Tailwind v4 + Supabase, plain `.jsx`.

**Core rule: content is the filesystem.** A lesson is one file, a course/project is one folder, a challenge is one file; `import.meta.glob` registries discover them. Never add a hand-maintained index.

## Task pointers

Read the matching doc before starting:

- **Lesson or course**: adding or editing → [docs/agents/course-writing.md](docs/agents/course-writing.md)
- **Primitives** (CodeBlock, Callout, Quiz, playgrounds…): their props → [docs/agents/content-primitives.md](docs/agents/content-primitives.md)
- **Project** (Loyihalar): adding or editing → [docs/agents/projects.md](docs/agents/projects.md)
- **Arena**: challenge or topic → [docs/agents/arena.md](docs/agents/arena.md)
- **Registry**: changing discovery or any `*.meta.js` shape → [docs/agents/registry-contract.md](docs/agents/registry-contract.md)
- **Dark mode**: any `dark:` class or raw Tailwind color in app chrome → [docs/agents/dark-mode.md](docs/agents/dark-mode.md)
- **Auth/progress**: sign-in, completions, streaks, Supabase schema → [docs/agents/auth-and-progress.md](docs/agents/auth-and-progress.md)
- **Vocabulary**: course-design terms (section project, stretch task…) → [CONTEXT.md](CONTEXT.md)

## Code rules

- Import with the `@/` alias (`@/lib/cn`). Only `src/main.jsx` uses relative paths.
- Conditional classNames go through `cn()` from `@/lib/cn`.
- Tailwind classes are always literal text. To pick a color or icon at runtime, use a static lookup object (pattern: `src/lib/courseIcons.js`).
- In CSS comments, write `* /` with a space wherever `*/` would appear mid-comment, because `*/` ends the comment early.
- Use the stack in `package.json`; add new libraries only when asked.

## Styling (app chrome)

Tailwind v4 is configured in `src/index.css` (there is no `tailwind.config.js`). Use the design tokens, which already adapt to dark mode:

- `brand-*` (terracotta, primary) · `brand2-*` (olive, only where a section or state needs to stand apart)
- `bg-canvas` / `bg-canvas-muted` / `border-line` for surfaces · `text-ink` / `text-ink-muted` for text
- `font-heading` (Caprasimo); `font-body` (Figtree) is the default

Project pages (`Project.jsx`) are the exception: each owns its own look with plain Tailwind colors.

## Language

Visible prose and UI copy are **Uzbek**. Code and technical terms stay English, with an inline Uzbek gloss where it helps a beginner: `o'zgaruvchi (variable)`.

Slugs, folder/file names, ids, route segments, route params and query params are **English**. The two top-level routes `/kurslar` and `/loyihalar` are the only Uzbek ones.

## Non-goals

Build these only on explicit request:

- TypeScript (`@types/*` exist for editor hints only)
- A test runner
- An admin or authoring UI
- New tracked data beyond lesson completions and Arena solves
- zustand `persist` middleware
- A new code-execution engine. The three that exist are `SqlPlayground`, `JsPlayground` and `PyPlayground`.

## Done means

```bash
npm run build   # must pass; this is also the only check that exercises the registries
npm run lint    # clean apart from the existing only-export-components warnings on lesson files
```

For UI or interaction changes, also check the page in a browser via `npm run dev`.
