# Adding an Arena challenge or topic

Reached from AGENTS.md when adding or editing anything in `src/arena/`. A new challenge file appears on `/arena` automatically. For how grading and the engines work, see [registry-contract.md](registry-contract.md#arena-srcarenaregistryjs).

`prompt` and `hint` are Uzbek prose: the quoting gotchas in [course-writing.md](course-writing.md) apply.

## SQL challenge

`src/arena/sql/challenges/NN-<slug>.js`:

```js
export default { title, difficulty: 'easy' | 'medium' | 'hard', prompt, starterQuery, solutionQuery, hint }
```

`prompt` is a full paragraph: what the tables/columns mean, what the query must return, and the SQL concept involved.

## JavaScript or Python challenge

`src/arena/javascript/challenges/NN-<slug>.js` or `src/arena/python/challenges/NN-<slug>.js`:

```js
export default { title, difficulty, prompt, functionName, paramNames, starterCode, examples, tests, hint }
```

- `starterCode`: doc comment + empty function stub; copy the style of an existing challenge.
- `examples`: 1–2 `{ args, expected }`. Shown in the prompt and used by "Yuritish" (Run).
- `tests`: the full `{ args, expected }` list used by "Yuborish" (Submit). Comparison is `JSON.stringify`, so expected values are plain primitives, arrays and objects (no `NaN`, `undefined` or functions).
- `paramNames` is optional (falls back to `arg1`, `arg2`, …).

## New topic

1. `src/arena/<topic-id>/topic.meta.js` → `{ title, icon, description, hasSandbox }`, then challenges as above.
2. Add the icon to `ICONS` in `src/pages/ArenaPage.jsx`.
3. Set `hasSandbox: true` only for a language that already has a playground (SQL, JavaScript, Python). A new language needs a new engine, which requires an explicit ask.
