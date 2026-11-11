# Adding a project (Loyihalar)

Reached from AGENTS.md when adding or editing a project in `src/projects/`. A project is a folder of two files; it appears on `/loyihalar` automatically.

## Steps

1. Create `src/projects/NN-<slug>/`: next zero-padded number, **English** slug. The slug (prefix stripped) becomes the URL `/loyihalar/<slug>`.
2. Add `project.meta.js`:

   ```js
   export default {
     title: '…',          // Uzbek, shown only on the gallery card
     description: '…',    // Uzbek, shown only on the gallery card
     icon: 'calendar',    // key in PROJECT_ICONS (src/lib/projectIcons.js); add the lucide import there if new
     type: 'JavaScript',  // or an array, e.g. ['JavaScript', 'React'], when the project suits either stack
     level: 'Beginner',   // 'Beginner' | 'Intermediate' | 'Advanced'
     guide: { … },        // optional, see below
   }
   ```

   `type` values: `'HTML' | 'CSS' | 'JavaScript' | 'React' | 'API'`. Pick the project's main teaching point. A new type needs a `TYPE_STYLES` entry in `src/components/layout/ProjectCard.jsx` and a `TYPE_OPTIONS` entry in `src/pages/ProjectsPage.jsx`.

3. Add `Project.jsx`: a default-exported component with no props. It renders as a **full standalone page** (no TopNav/Footer, no container), so it owns a `min-h-screen` wrapper and its own visual identity with plain Tailwind colors. Brand tokens and `dark:` variants are not used here.

4. Run `npm run build`, then open the project in `npm run dev`.

## `guide`: the info (ⓘ) modal

`ProjectGuideModal` renders whichever fields are present; with no `guide` the button is hidden.

```js
guide: {
  colors: [{ name: 'Indigo (asosiy)', hex: '#4f46e5' }],  // match the Tailwind shades used in Project.jsx exactly
  fonts: ["Figtree (standart, sayt bo'yicha global shrift)"],
  formulas: [{ name: 'Selsiy → Farengeyt', formula: '°F = °C × 9 / 5 + 32' }],  // calculators
  topics: ['filter()', 'useEffect cleanup'],                                     // concepts the project practises
  api: { name: 'JSONPlaceholder /users', url: 'https://…' },                    // projects that fetch
}
```

Students copy from this modal, so every value must be accurate to the code.

## Conventions in the existing set

- Beginner calculators compute **on a button click**, not on every keystroke. They show a short Uzbek error for empty or impossible input.
- Prices are in so'm, formatted with `toLocaleString('ru-RU')`, which gives space-separated thousands.
- Keep each project small: one concept or one real-life task, usually under ~150 lines. Extra data (product lists, etc.) goes in a sibling `.js` file in the same folder.
