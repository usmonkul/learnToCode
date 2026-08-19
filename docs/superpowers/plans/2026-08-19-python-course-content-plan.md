# Python Course Content — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Grow `Python asoslari` (`src/courses/python/`) from 3 sample lessons to a 24-lesson core-fundamentals curriculum: rename+extend the existing loops lesson, then author 21 new lesson files.

**Design doc:** `docs/superpowers/specs/2026-08-19-python-course-content-design.md` — read for full rationale (audience, scope decisions, illustration/interactivity bar). This plan operationalizes that spec into one task per lesson.

**Audience & scope:** Absolute beginners, zero prior programming experience. Core fundamentals through functions, error handling, modules, and file I/O. No OOP (`class`, `__init__`, `self`, inheritance), no decorators, no generators, no `async`, no type hints, no packaging — out of scope for this track (a possible future "Python OOP" course).

## Global Constraints

Apply to every task in this plan:

- **Language:** Uzbek prose, matching the existing lessons' tone/register — read `src/courses/python/lessons/02-variables.jsx` as the reference example before writing. Code/keywords stay in English; new terms get an inline bracket translation on first use per lesson (e.g. `o'zgaruvchan (mutable)`).
- **Primitives only:** use exactly the contracts in AGENTS.md — `CodeBlock` (`lang`, `children`), `Callout` (`type`, `title?`, `children`), `Quiz` (`question`, `options` array with **no duplicate strings**, `correctIndex`, `explanation`), `Exercise` (`title?`, `children`) wrapping `Solution` (`children`), `KeyPoints` (`children` as `<li>`s), `Figure` (`src`, `alt`, `caption?`). Never invent new props or new components. If a lesson seems to need something the primitive set can't do, stop and flag it rather than improvising.
- **Interactivity:** every lesson includes at least one `Quiz` and one `Exercise` + `Solution` pair (except none is exempted in this plan — even the capstone gets both, unlike the React course's capstone).
- **Illustrations:** where a diagram genuinely clarifies a mechanism, add a hand-authored inline SVG under `src/assets/`, following the existing `src/assets/loop-flow.svg` pattern exactly — `viewBox`, indigo brand palette (`#4f46e5` stroke/arrows/marker, `#eef2ff` fill, `#312e81` text, `#475569` secondary labels), a `<title id="...">` for accessibility referenced via `aria-labelledby`, sans-serif `font-family`. Import it (`import xyzDiagram from '@/assets/xyz-diagram.svg'`) and render via `<Figure src={xyzDiagram} alt="..." caption="..." />`. Each task below states whether it requires one.
- **Code samples:** realistic, syntactically correct Python, consistent variable naming within a lesson, Uzbek comments where they clarify output (`# natija` style, matching `02-variables.jsx`).
- **Structure:** every lesson file exports `meta = { title, section }` (exact values given per task) and a default function component. Filename and `meta` values are given per task — use them verbatim, they drive the sidebar grouping (`registry.js` groups only *consecutive* lessons sharing `meta.section`).
- **Verification per task:** `npm run build && npm run lint` must both stay clean after each lesson is added. No Playwright/browser testing per-task; one manual pass happens at the end.
- **Sequencing:** tasks depend on prior lessons' vocabulary (e.g. Task 9's list methods assume Task 8 already introduced lists) — do not reorder or parallelize.

---

## Task 1: Rename the existing loops lesson and add its missing KeyPoints

**Files:**
- Rename (`git mv`): `src/courses/python/lessons/03-loops.jsx` → `src/courses/python/lessons/06-loops.jsx`
- No other file changes needed beyond the KeyPoints addition below

**Interfaces:**
- Consumes: nothing new — this is existing content
- Produces: `for`/`while`/`range()` vocabulary that Task 5 (loop control) and Task 6 (nested loops) build on

**meta:** unchanged — `{ title: 'Sikllar: for va while', section: 'Boshqaruv tuzilmalari' }` (already matches; no edit needed unless the existing title differs slightly, in which case update it to exactly this)

**Must cover:**
- No new topic content — the existing `for`/`while`/`range()`/Exercise+Solution/Quiz/`loop-flow.svg` Figure content is correct and stays as-is.
- Add a `KeyPoints` block at the end (the only gap found in the existing 3 lessons) summarizing: `for` iterates a known range/sequence, `while` repeats until a condition is false, `range(a, b)` excludes `b`.
- Do this task **before** Task 4 (conditionals, lesson 05) is authored, so the sidebar never shows a broken/misordered section mid-pass.

---

## Task 2: Lesson 03 — Foydalanuvchidan ma'lumot olish

**Files:**
- Create: `src/courses/python/lessons/03-input.jsx`

**Interfaces:**
- Consumes: `str`/`int`/`float`/`type()` vocabulary from lesson 02 (`02-variables.jsx`)
- Produces: `input()` vocabulary, used implicitly by later lessons' interactive examples (e.g. lesson 20's try/except commonly wraps `int(input(...))`)

**meta:** `{ title: "Foydalanuvchidan ma'lumot olish", section: 'Boshlash uchun' }`

**Must cover:**
- `input()` prompts the user and returns what they typed.
- `input()` **always** returns a `str`, even if the user types a number — this is the one thing every beginner trips on. Converting with `int()`/`float()` when a number is needed.
- A simple interactive example: ask for name and age, print a greeting using both (f-string).
- No illustration required unless genuinely useful.
- End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution`.

---

## Task 3: Lesson 04 — Operatorlar: arifmetik, taqqoslash, mantiqiy

**Files:**
- Create: `src/courses/python/lessons/04-operators.jsx`

**Interfaces:**
- Consumes: `int`/`float`/`bool` from lesson 02, arithmetic operators already briefly shown there (recap, don't re-teach from scratch — go deeper)
- Produces: comparison-operator and `and`/`or`/`not` vocabulary that lesson 05 (conditionals) depends on directly

**meta:** `{ title: 'Operatorlar: arifmetik, taqqoslash, mantiqiy', section: 'Amallar va shartlar' }`

**Must cover:**
- Arithmetic recap with the full set: `+ - * / // % **` (note `/` always returns `float`, `//` is integer/floor division — this distinction matters and lesson 02 only showed `//`/`%`, not `/` vs `//`).
- Comparison operators: `== != > < >= <=`, each returning a `bool`.
- Logical operators: `and`, `or`, `not`, with a truth-table-style example.
- Brief operator precedence note (arithmetic before comparison before logical), enough to explain why `x + 1 > 5 and y < 10` parses the way it does — not an exhaustive precedence table.
- No illustration required unless genuinely useful.
- End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution`.

---

## Task 4: Lesson 05 — Shartli operatorlar (if, elif, else)

**Files:**
- Create: `src/courses/python/lessons/05-conditionals.jsx`

**Interfaces:**
- Consumes: comparison/logical operators from Task 3
- Produces: `if`/`elif`/`else` vocabulary assumed known by every subsequent lesson (loops, exercises, capstone all use conditionals)

**meta:** `{ title: 'Shartli operatorlar (if, elif, else)', section: 'Amallar va shartlar' }`

**Must cover:**
- `if` on its own, then `if`/`else`, then `if`/`elif`/`else` chains.
- Nested conditions (an `if` inside another `if`) with one clear example — don't overdo nesting depth.
- Truthy/falsy values: `0`, `""`, empty containers are falsy; non-zero numbers and non-empty strings are truthy — a short `if` example demonstrating this.
- Combining conditions with `and`/`or` inside a single `if` (ties back to Task 3).
- No illustration required unless genuinely useful.
- End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution`.

---

## Task 5: Lesson 07 — Sikllarni boshqarish: break, continue, else

**Files:**
- Create: `src/courses/python/lessons/07-loop-control.jsx`

**Interfaces:**
- Consumes: `for`/`while` from lesson 06 (Task 1's renamed file), conditionals from Task 4 (break/continue are almost always gated by an `if`)
- Produces: `break`/`continue` vocabulary usable by any later lesson's examples

**meta:** `{ title: 'Sikllarni boshqarish: break, continue, else', section: 'Boshqaruv tuzilmalari' }`

**Must cover:**
- `break` — exits the loop immediately, with an example (e.g. search a list until found — conceptually only, lists aren't taught until Task 8, so use a `range()`-based search or a hardcoded sequence via `for x in [1, 2, 3, 4, 5]:` without dwelling on list syntax).
- `continue` — skips to the next iteration.
- `for...else` — the `else` block runs only if the loop completes without hitting `break`; one clear, minimal example (this is genuinely obscure — keep it short and don't oversell how often it's used).
- No illustration required unless genuinely useful.
- End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution`.

---

## Task 6: Lesson 08 — Ichma-ich sikllar

**Files:**
- Create: `src/courses/python/lessons/08-nested-loops.jsx`
- Create: an SVG under `src/assets/` illustrating a nested-loop iteration pattern (e.g. outer/inner loop grid, showing which cell each `(i, j)` pair visits)

**Interfaces:**
- Consumes: `for`/`range()` from lesson 06, `break`/`continue` from Task 5
- Produces: nested-loop vocabulary; not a hard dependency for later lessons, but list-of-lists patterns in later exercises may reference it

**meta:** `{ title: 'Ichma-ich sikllar', section: 'Boshqaruv tuzilmalari' }`

**Must cover:**
- A `for` loop inside another `for` loop — walk through execution order with a small example (e.g. print all `(i, j)` pairs for `i in range(3)`, `j in range(2)`).
- A visual pattern example: multiplication table (`for` i in 1..5, `for` j in 1..5, print `i * j`) or a simple printed shape (e.g. a triangle of `*`).
- Brief performance intuition: nested loops multiply iteration count (an `n`-by-`m` nested loop runs `n * m` times) — enough to build instinct, not Big-O formalism.
- Illustration required per Global Constraints: the outer/inner grid diagram described above.
- End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution`.

---

## Task 7: Lesson 09 — Satrlar chuqurroq

**Files:**
- Create: `src/courses/python/lessons/09-strings.jsx`

**Interfaces:**
- Consumes: `str` basics from lesson 02, f-strings from lesson 02
- Produces: string-indexing/slicing vocabulary that Task 8 (lists) explicitly parallels ("ro'yxatlar satrlarga o'xshaydi — indekslash bir xil ishlaydi")

**meta:** `{ title: 'Satrlar chuqurroq', section: "Satrlar va ma'lumotlar tuzilmalari" }`

**Must cover:**
- Indexing (`s[0]`, negative indices `s[-1]`) and slicing (`s[1:4]`, `s[:3]`, `s[::-1]` for reverse — mention reverse as a fun aside, not a deep dive on step slicing).
- `len()` on a string.
- Common methods: `.upper()`, `.lower()`, `.strip()`, `.split()`, `.join()`, `.replace()` — one example each, not exhaustive coverage of every string method.
- f-string formatting details beyond lesson 02's basic use: width/alignment or decimal-precision formatting (e.g. `f"{price:.2f}"`), since this is genuinely useful and not yet covered.
- No illustration required unless genuinely useful (indexing could be shown in a code block instead of a diagram — prefer that here to save the illustration budget for lesson 10's list diagram, which teaches the same mechanism to a first-time audience).
- End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution`.

---

## Task 8: Lesson 10 — Ro'yxatlar (Lists) asoslari

**Files:**
- Create: `src/courses/python/lessons/10-lists.jsx`
- Create: an SVG under `src/assets/` illustrating list indexing (boxes in a row, indices labeled above, including a negative-index callout)

**Interfaces:**
- Consumes: indexing/slicing vocabulary from Task 7 (explicitly reuse it: "xuddi satrlardagi kabi")
- Produces: list vocabulary that Tasks 9, 10 (list methods, comprehension) and the capstone (Task 22) depend on directly

**meta:** `{ title: 'Ro\'yxatlar (Lists) asoslari', section: "Satrlar va ma'lumotlar tuzilmalari" }`

**Must cover:**
- Creating a list (`[1, 2, 3]`, mixed types allowed but keep the teaching example single-type for clarity).
- Indexing and slicing (parallel to Task 7's string indexing — call out the similarity explicitly).
- Mutability: unlike strings, a list's elements can be reassigned by index (`items[0] = "yangi"`) — this is the key str-vs-list distinction, make it explicit.
- `len()` on a list, iterating with `for item in items:`.
- Illustration required per Global Constraints: the indexed-boxes diagram described above.
- End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution`.

---

## Task 9: Lesson 11 — Ro'yxat metodlari

**Files:**
- Create: `src/courses/python/lessons/11-list-methods.jsx`

**Interfaces:**
- Consumes: list basics from Task 8
- Produces: list-mutation-method vocabulary used freely by later exercises/capstone

**meta:** `{ title: "Ro'yxat metodlari", section: "Satrlar va ma'lumotlar tuzilmalari" }`

**Must cover:**
- `.append()`, `.insert()`, `.remove()`, `.pop()` — each with a small before/after example.
- `.sort()` (in place) vs. mentioning `sorted()` exists too is optional — keep the lesson's core to `.sort()`/`.reverse()` to stay scoped; a one-line callout mentioning `sorted()` returns a new list is fine but don't teach it in depth here.
- Checking membership with `in` (`"olma" in fruits`).
- No illustration required unless genuinely useful.
- End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution`.

---

## Task 10: Lesson 12 — List comprehension

**Files:**
- Create: `src/courses/python/lessons/12-list-comprehension.jsx`

**Interfaces:**
- Consumes: list basics (Task 8), list methods (Task 9), `for` loops (lesson 06)
- Produces: comprehension vocabulary; genuinely optional for later lessons to use (they may keep using plain loops), but should be recognizable if seen again

**meta:** `{ title: 'List comprehension', section: "Satrlar va ma'lumotlar tuzilmalari" }`

**Must cover:**
- The basic form `[expr for x in iterable]`, built up explicitly from the equivalent manual `for` loop + `.append()` version so the transformation is visible, not just presented as new syntax.
- Adding a filter condition: `[expr for x in iterable if condition]`.
- Guidance on when to prefer a comprehension (short, simple transform/filter) vs. a regular loop (multiple steps, side effects, harder-to-read one-liners) — this is a real judgment call worth stating plainly.
- No illustration required unless genuinely useful.
- End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution`.

---

## Task 11: Lesson 13 — Kortejlar (Tuples)

**Files:**
- Create: `src/courses/python/lessons/13-tuples.jsx`

**Interfaces:**
- Consumes: list vocabulary from Task 8 (contrast directly against it)
- Produces: tuple-unpacking vocabulary that echoes lesson 02's multiple-assignment section and previews dict `.items()` iteration in Task 13 (dictionaries)

**meta:** `{ title: 'Kortejlar (Tuples)', section: "Satrlar va ma'lumotlar tuzilmalari" }`

**Must cover:**
- Creating a tuple (`(1, 2, 3)`), and the key distinction from a list: **immutable** — attempting `t[0] = 5` raises an error, demonstrate this.
- Tuple unpacking (`x, y = point`) — connect back to lesson 02's multiple-assignment content as the same mechanism.
- Common use cases: representing a fixed record (e.g. a coordinate pair), a function returning more than one value (preview — functions aren't taught until Task 14, so keep this as a brief forward-looking mention, not a worked example requiring `def`).
- No illustration required unless genuinely useful.
- End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution`.

---

## Task 12: Lesson 14 — Lug'atlar (Dictionaries)

**Files:**
- Create: `src/courses/python/lessons/14-dictionaries.jsx`
- Create: an SVG under `src/assets/` illustrating key→value mapping (a small set of keys with arrows pointing to their values)

**Interfaces:**
- Consumes: list vocabulary (Task 8) for contrast, tuple `.items()`-style pairs conceptually previewed in Task 11
- Produces: dict vocabulary used freely by the capstone (Task 22, a natural fit for a "contacts/grades manager")

**meta:** `{ title: "Lug'atlar (Dictionaries)", section: "Satrlar va ma'lumotlar tuzilmalari" }`

**Must cover:**
- Creating a dict (`{"ism": "Aziz", "yosh": 25}`), accessing by key (`d["ism"]`), adding/updating a key (`d["shahar"] = "Toshkent"`).
- `.keys()`, `.values()`, `.items()` and iterating over each (`for key, value in d.items():` — ties back to tuple unpacking from Task 11).
- Checking key membership with `in` (`"ism" in d`).
- Illustration required per Global Constraints: the key→value mapping diagram described above.
- End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution`.

---

## Task 13: Lesson 15 — To'plamlar (Sets)

**Files:**
- Create: `src/courses/python/lessons/15-sets.jsx`

**Interfaces:**
- Consumes: list vocabulary (Task 8) for contrast
- Produces: set vocabulary; completeness of the "four core data structures" set, not a hard dependency for later lessons

**meta:** `{ title: "To'plamlar (Sets)", section: "Satrlar va ma'lumotlar tuzilmalari" }`

**Must cover:**
- Uniqueness: a set automatically drops duplicates — demonstrate by creating a set from a list with repeats (`set([1, 2, 2, 3])`).
- Creating a set (`{1, 2, 3}` or `set()`, noting `{}` alone makes an empty **dict**, not a set — a real gotcha worth one line).
- `union`, `intersection`, `difference` (`|`, `&`, `-` or the method names — pick one style and be consistent, method names are more explicit for beginners: `.union()`, `.intersection()`, `.difference()`).
- When a set beats a list: fast membership checks, automatic de-duplication — a short "use a set when..." callout.
- No illustration required unless genuinely useful.
- End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution`.

---

## Task 14: Lesson 16 — Funksiyalar asoslari

**Files:**
- Create: `src/courses/python/lessons/16-functions.jsx`

**Interfaces:**
- Consumes: everything through Task 13 (functions are typically demonstrated by wrapping earlier concepts)
- Produces: `def`/parameters/`return` vocabulary that every remaining lesson in the "Funksiyalar" section builds on directly

**meta:** `{ title: 'Funksiyalar asoslari', section: 'Funksiyalar' }`

**Must cover:**
- Why functions: reuse and readability — a short "same code repeated 3 times" vs. "wrapped in a function" contrast.
- `def name(params):`, calling a function.
- `return` vs. just `print()`ing inside the function — explain a function can compute and hand back a value without printing anything itself, and why that's more reusable.
- A function with no parameters, then one with a parameter, building up gradually.
- No illustration required unless genuinely useful.
- End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution`.

---

## Task 15: Lesson 17 — Standart va nomlangan argumentlar

**Files:**
- Create: `src/courses/python/lessons/17-default-args.jsx`

**Interfaces:**
- Consumes: `def`/parameters from Task 14
- Produces: default/keyword-argument vocabulary used by Task 16 (`*args`/`**kwargs` contrasts against this)

**meta:** `{ title: 'Standart va nomlangan argumentlar', section: 'Funksiyalar' }`

**Must cover:**
- Default parameter values (`def greet(name="Do'st"):`), calling with and without the argument.
- Keyword arguments — calling with `name=value` instead of position, and why that's clearer for functions with several parameters.
- Mixing positional and keyword arguments in one call, with the rule that positional args come first.
- No illustration required unless genuinely useful.
- End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution`.

---

## Task 16: Lesson 18 — *args va **kwargs

**Files:**
- Create: `src/courses/python/lessons/18-args-kwargs.jsx`

**Interfaces:**
- Consumes: default/keyword arguments from Task 15
- Produces: `*args`/`**kwargs` vocabulary (fundamentals-track completeness; not a hard dependency for later lessons)

**meta:** `{ title: '*args va **kwargs', section: 'Funksiyalar' }`

**Must cover:**
- `*args` — collecting any number of positional arguments into a tuple, with a realistic example (a flexible `total(*numbers)` summing function).
- `**kwargs` — collecting any number of keyword arguments into a dict, with a small example (e.g. printing each key/value passed in).
- Note both are conventions (the names `args`/`kwargs` aren't required, `*`/`**` are what matter) — one line is enough, don't over-explain.
- No illustration required unless genuinely useful.
- End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution`.

---

## Task 17: Lesson 19 — Lambda funksiyalar

**Files:**
- Create: `src/courses/python/lessons/19-lambda.jsx`

**Interfaces:**
- Consumes: `def`/functions from Task 14
- Produces: lambda vocabulary; last lesson in the "Funksiyalar" section

**meta:** `{ title: 'Lambda funksiyalar', section: 'Funksiyalar' }`

**Must cover:**
- Anonymous single-expression functions: `lambda x: x * 2`, contrasted directly against the equivalent `def` version.
- When to reach for a lambda vs. `def`: short, throwaway, single-expression logic passed somewhere else — not for anything with multiple statements or that needs a name for reuse.
- A brief practical example using `sorted(items, key=lambda x: ...)` and/or `map()`/`filter()` with a lambda — one working example is enough, this is a taste, not a functional-programming deep dive.
- No illustration required unless genuinely useful.
- End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution`.

---

## Task 18: Lesson 20 — Xatoliklar bilan ishlash: try/except

**Files:**
- Create: `src/courses/python/lessons/20-try-except.jsx`

**Interfaces:**
- Consumes: `input()`/`int()` conversion from Task 2 (the classic motivating example: converting bad user input crashes the program)
- Produces: `try`/`except` vocabulary that Task 19 (finally/raise) builds on directly

**meta:** `{ title: 'Xatoliklar bilan ishlash: try/except', section: 'Xatoliklar bilan ishlash' }`

**Must cover:**
- Why programs crash: an unhandled error (e.g. `int("abc")` raising `ValueError`) stops the whole program — demonstrate the crash first, then the fix.
- `try`/`except` basic structure, catching a specific exception type (`except ValueError:`).
- Catching multiple exception types (either multiple `except` blocks or `except (TypeError, ValueError):`).
- A realistic example: safely converting user input from Task 2's `input()` lesson, re-prompting or printing a friendly message on failure.
- No illustration required unless genuinely useful.
- End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution`.

---

## Task 19: Lesson 21 — finally, raise va maxsus xatoliklar

**Files:**
- Create: `src/courses/python/lessons/21-exceptions-raise.jsx`

**Interfaces:**
- Consumes: `try`/`except` from Task 18
- Produces: `finally`/`raise` vocabulary; last lesson in the "Xatoliklar bilan ishlash" section

**meta:** `{ title: 'finally, raise va maxsus xatoliklar', section: 'Xatoliklar bilan ishlash' }`

**Must cover:**
- `finally` — runs whether or not an exception occurred, with a short example (e.g. a "tugatildi" message that always prints).
- `raise` — deliberately raising an exception with a custom message (`raise ValueError("yosh manfiy bo'lishi mumkin emas")`), e.g. inside a simple validation function.
- Explicitly scope out custom exception *classes* (`class MyError(Exception):`) as OOP territory, out of scope for this course — `raise` with a built-in exception type + custom message is enough.
- No illustration required unless genuinely useful.
- End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution`.

---

## Task 20: Lesson 22 — Modullar va import

**Files:**
- Create: `src/courses/python/lessons/22-modules-import.jsx`

**Interfaces:**
- Consumes: nothing new structurally, but the stdlib examples can reuse earlier vocabulary (e.g. `random` examples can use lists from Task 8)
- Produces: `import` vocabulary; first lesson in the "Modullar va fayllar" section

**meta:** `{ title: 'Modullar va import', section: 'Modullar va fayllar' }`

**Must cover:**
- `import module_name` and calling `module_name.function()`.
- `from module import name` and `import module as alias` — both forms, with an example of each.
- A short tour of 2–3 useful stdlib modules: `math` (e.g. `math.sqrt`, `math.pi`), `random` (e.g. `random.randint`, `random.choice` on a list), `datetime` (e.g. `datetime.date.today()`) — enough to show modules are genuinely useful, not an exhaustive stdlib tour.
- No illustration required unless genuinely useful.
- End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution`.

---

## Task 21: Lesson 23 — Fayllar bilan ishlash: o'qish va yozish

**Files:**
- Create: `src/courses/python/lessons/23-files.jsx`

**Interfaces:**
- Consumes: `try`/`except` from Task 18 (file operations are a natural place to mention error handling, e.g. `FileNotFoundError` — a brief callback, not a required deep-dive)
- Produces: file-I/O vocabulary used by the capstone (Task 22, if it chooses to persist data — optional per that task)

**meta:** `{ title: "Fayllar bilan ishlash: o'qish va yozish", section: 'Modullar va fayllar' }`

**Must cover:**
- `open()`, read mode (`"r"`) vs. write mode (`"w"`) vs. append mode (`"a"`) — what each does.
- The `with` statement and why it matters: automatically closes the file, even if an error happens — contrast briefly against manually calling `.close()` and forgetting to.
- Reading a file line by line (`for line in f:` or `.readlines()`), and writing to a file (`f.write(...)`).
- No illustration required unless genuinely useful.
- End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution`.

---

## Task 22: Lesson 24 — Yakuniy loyiha (capstone)

**Files:**
- Create: `src/courses/python/lessons/24-capstone.jsx`

**Interfaces:**
- Consumes: variables (02), input (03), operators/conditionals (04–05), loops (06–08), a data structure — list or dict (08 or 14), functions (16), error handling (20) — this lesson is the integration point for the whole course
- Produces: nothing further (last lesson)

**meta:** `{ title: 'Yakuniy loyiha', section: 'Amaliy loyiha' }`

**Must cover:**
- A complete small program built up incrementally in the lesson: a contacts or grades manager driven by a `while True:` menu loop reading `input()`, storing entries in a dict or list of dicts, with at least: add an entry, look up/display an entry, and a clean exit condition (e.g. typing `"chiqish"`).
- Explicitly reuse, and name in prose, each concept it's drawing on as it's used (e.g. "bu yerda 14-darsda o'rgangan lug'atdan foydalanamiz") so students see the whole course connect.
- Wrap the risky part (e.g. converting a numeric grade from `input()`) in `try`/`except` per Task 18/19, tying error handling into the final project rather than leaving it unused.
- End with `KeyPoints` summarizing the whole course's key building blocks, at least one `Quiz` testing understanding of the assembled program, and — unlike the React course's capstone — still include a standalone `Exercise`+`Solution` (e.g. "dasturga yana bitta buyruq qo'shing") per this plan's Global Constraints, since this course's capstone doesn't replace that requirement.

---

## Final check

After Task 22's review is clean: `npm run build && npm run lint` must both pass. Then do one full manual pass with `npm run dev` (per AGENTS.md's "Verifying your work" — this is the point where a real browser check is warranted, unlike the per-task checks): confirm the sidebar shows all 8 sections in the right order with the right lessons grouped under each, prev/next navigation works end-to-end from lesson 01 through the capstone, and spot-check a few Quiz/Exercise/Solution interactions across different lessons.
