# Python Course — Content Design

**Date:** 2026-08-19
**Status:** Approved

## Purpose

Grow `Python asoslari` from its 3 sample lessons into a complete core-fundamentals curriculum (course folder + `course.meta.js` already exist — see [src/courses/python/course.meta.js](../../../src/courses/python/course.meta.js)). This spec covers 21 new lesson files, one existing-file rename+touch-up, and no supporting illustration assets beyond what's noted below.

## Audience & scope

Absolute beginners — assume no prior programming experience at all (unlike the React course, which assumes JS literacy). Core fundamentals only, ending at a solid "can write real small programs" level: basics, control flow, strings, the four core data structures (lists/tuples/dicts/sets), functions, error handling, modules, and file I/O. No object-oriented programming (`class`, `__init__`, `self`, inheritance), no decorators, no generators, no `async`, no type hints, no packaging/virtual environments/`pip` — those are deferred to a possible future "Python OOP / Intermediate" course.

## Lesson list

One concept per lesson, atomic and self-contained per [AGENTS.md](../../../AGENTS.md). Sections are consecutive so the sidebar groups them correctly. Lessons 01–02 already exist and are unchanged. Lesson 06 is the existing `03-loops.jsx`, renamed and lightly extended (see "Existing-file changes").

| File | `meta.section` | `meta.title` | Must cover |
|---|---|---|---|
| `01-hello-world.jsx` | Boshlash uchun | Salom, Dunyo! | *(existing, unchanged)* |
| `02-variables.jsx` | Boshlash uchun | O'zgaruvchilar va turlar | *(existing, unchanged)* |
| `03-input.jsx` | Boshlash uchun | Foydalanuvchidan ma'lumot olish | `input()`, it always returns `str`, converting with `int()`/`float()`, a simple interactive example (ask name + age, greet back) |
| `04-operators.jsx` | Amallar va shartlar | Operatorlar: arifmetik, taqqoslash, mantiqiy | Arithmetic recap (`+ - * / // % **`), comparison operators (`== != > < >= <=`), logical operators (`and or not`), operator precedence basics |
| `05-conditionals.jsx` | Amallar va shartlar | Shartli operatorlar (if, elif, else) | `if`/`elif`/`else`, nested conditions, truthy/falsy values, combining conditions with `and`/`or` |
| `06-loops.jsx` | Boshqaruv tuzilmalari | Sikllar: for va while | *(existing content — see "Existing-file changes")* |
| `07-loop-control.jsx` | Boshqaruv tuzilmalari | Sikllarni boshqarish: break, continue, else | `break`, `continue`, `for...else` |
| `08-nested-loops.jsx` | Boshqaruv tuzilmalari | Ichma-ich sikllar | Nested `for` loops, a visual pattern example (multiplication table or simple shape), performance intuition (avoid unnecessary nesting) |
| `09-strings.jsx` | Satrlar va ma'lumotlar tuzilmalari | Satrlar chuqurroq | Indexing/slicing, `len()`, `.upper()/.lower()/.strip()/.split()/.join()/.replace()`, f-string formatting details (widths/decimals) |
| `10-lists.jsx` | Satrlar va ma'lumotlar tuzilmalari | Ro'yxatlar (Lists) asoslari | Creating a list, indexing/slicing, mutability, `len()`, iterating with `for` |
| `11-list-methods.jsx` | Satrlar va ma'lumotlar tuzilmalari | Ro'yxat metodlari | `.append()/.insert()/.remove()/.pop()/.sort()/.reverse()`, checking membership with `in` |
| `12-list-comprehension.jsx` | Satrlar va ma'lumotlar tuzilmalari | List comprehension | Basic `[expr for x in iterable]`, adding a condition (`if`), when to prefer it over a manual loop (and when not to) |
| `13-tuples.jsx` | Satrlar va ma'lumotlar tuzilmalari | Kortejlar (Tuples) | Immutability vs. lists, tuple unpacking, common use cases (fixed records, multiple return values) |
| `14-dictionaries.jsx` | Satrlar va ma'lumotlar tuzilmalari | Lug'atlar (Dictionaries) | key-value pairs, creating/accessing/updating, `.keys()/.values()/.items()`, iterating, `in` for key membership |
| `15-sets.jsx` | Satrlar va ma'lumotlar tuzilmalari | To'plamlar (Sets) | Uniqueness, creating a set, `union`/`intersection`/`difference`, when a set beats a list |
| `16-functions.jsx` | Funksiyalar | Funksiyalar asoslari | `def`, parameters, `return` vs. printing, why functions (reuse/readability), calling a function |
| `17-default-args.jsx` | Funksiyalar | Standart va nomlangan argumentlar | Default parameter values, keyword arguments, mixing positional + keyword calls |
| `18-args-kwargs.jsx` | Funksiyalar | *args va **kwargs | Variable-length positional args (`*args`), variable-length keyword args (`**kwargs`), a realistic example (a flexible `total()` function) |
| `19-lambda.jsx` | Funksiyalar | Lambda funksiyalar | Anonymous single-expression functions, when to use vs. `def`, a brief `map()`/`filter()` + `sorted(key=...)` example |
| `20-try-except.jsx` | Xatoliklar bilan ishlash | Xatoliklar bilan ishlash: try/except | Why programs crash, `try`/`except`, catching a specific exception type (e.g. `ValueError`), catching multiple types |
| `21-exceptions-raise.jsx` | Xatoliklar bilan ishlash | finally, raise va maxsus xatoliklar | `finally`, raising your own exception with `raise`, a simple custom-message example (not custom exception classes — OOP territory, out of scope) |
| `22-modules-import.jsx` | Modullar va fayllar | Modullar va import | `import`, `from ... import ...`, `as` aliasing, a tour of 2–3 stdlib modules (`math`, `random`, `datetime`) |
| `23-files.jsx` | Modullar va fayllar | Fayllar bilan ishlash: o'qish va yozish | `open()`, read vs. write modes, the `with` statement (why it matters — auto-close), reading line by line, writing to a file |
| `24-capstone.jsx` | Amaliy loyiha | Yakuniy loyiha | Capstone combining variables, conditionals, loops, a data structure, a function, and basic error handling — a simple contacts/grades manager driven by `input()` in a loop |

## Content requirements (apply to every lesson)

- **Language:** Uzbek prose, matching the existing lessons' tone and register (see `src/courses/python/lessons/02-variables.jsx` as the reference example). Code/keywords stay in English; inline-bracket translations for new terms on first use per lesson (e.g. `moslashuvchan (flexible)`).
- **Primitives:** use only the contracts documented in AGENTS.md (`CodeBlock`, `Callout`, `Quiz`, `Exercise`, `Solution`, `KeyPoints`, `Figure`). Never invent new props or new components.
- **Interactivity:** every lesson includes at least one `Quiz` and one `Exercise`+`Solution` pair. Quiz options must have no duplicate strings (they're used as React keys).
- **Illustrations:** only where a diagram genuinely clarifies a mechanism — candidates: lesson 06 (loop flow — `loop-flow.svg` already exists), 08 (nested-loop iteration pattern), 10 (list indexing/slicing), 14 (dict key→value mapping). Follow the existing `loop-flow.svg` pattern if adding one: indigo brand palette (`#4f46e5` stroke/arrows, `#eef2ff` fill, `#312e81` text), `viewBox`, a `<title>` for accessibility, referenced via `Figure`. Don't force an illustration elsewhere.
- **Code samples:** realistic, runnable-looking Python (even though the app has no live execution), consistent variable naming across a lesson, Uzbek comments where they clarify non-obvious output (matching the `# natija` style already used in `02-variables.jsx`).
- **KeyPoints:** every lesson ends with a `KeyPoints` summary.
- **Structure:** every lesson exports `meta = { title, section }` per the table above and a default function component named after the topic (e.g. `export default function ConditionalsLesson()`).

## Existing-file changes

`src/courses/python/lessons/03-loops.jsx` is renamed to `06-loops.jsx` (git `mv`) — no rewrite of the existing `for`/`while`/`loop-flow.svg` content is needed. While renaming, add a `KeyPoints` summary block: it's the only one of the 3 original lessons missing one, which is now a documented requirement above.

## Workflow

Use `subagent-driven-development`. For lessons 03–24, in order:

1. **Writer subagent** drafts the lesson file per the table row and the content requirements above, plus any SVG asset it needs (only for the 4 candidate lessons noted above).
2. **Reviewer subagent** checks the draft against: the "Must cover" column for that lesson, the content requirements list, AGENTS.md's primitive contracts and folder/registry rules, and factual/technical correctness of the Python explanations. Reviewer reports concrete issues (missing topic, wrong primitive usage, incorrect technical claim, key-duplication bug, etc.) or approves.
3. Writer addresses reviewer feedback until the reviewer approves.
4. Move to the next lesson. Lessons build on prior vocabulary (e.g. lesson 11's list methods assume lesson 10 already introduced lists), so order matters and lessons must be done sequentially, not in parallel.

The `03-loops.jsx` → `06-loops.jsx` rename + KeyPoints addition happens first, before lesson 05 is authored, so the sidebar never shows a broken/misordered state mid-pass.

No Playwright/browser testing required for every lesson. After each lesson is approved, run `npm run build && npm run lint` (per AGENTS.md's "Verifying your work") — must stay clean throughout. A full manual browser pass happens once at the end, after lesson 24.

## Out of scope

- Classes, `__init__`/`self`, inheritance, decorators, generators, `async`, type hints, virtual environments/`pip`/packaging — deferred to a possible future "Python OOP / Intermediate" course.
- Any change to `registry.js`, content primitives, or layout components — this pass is content-only. If a genuine gap in the primitive set is discovered while writing, stop and flag it rather than inventing a new component ad hoc.
