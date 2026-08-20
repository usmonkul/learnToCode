# SQL Course — Content Design

**Date:** 2026-08-20
**Status:** Approved

## Purpose

Author a new `sql` course (folder scaffolded, `course.meta.js` + `database` icon registration already done — see [src/courses/sql/course.meta.js](../../../src/courses/sql/course.meta.js)) built around genuine hands-on practice: every lesson includes at least one live, in-browser query the student runs themselves via the new `SqlPlayground` content primitive ([src/components/content/SqlPlayground.jsx](../../../src/components/content/SqlPlayground.jsx), backed by `sql.js`/WASM — already built and validated in a real browser). This spec covers the 28 lesson files only; the playground primitive and its `src/lib/sqlEngine.js` loader are already done.

## Audience & scope

Absolute beginners — zero prior database or SQL experience assumed. Core querying + basic data/schema manipulation: SELECT-family querying (filtering, sorting, aggregation, joins, subqueries), then INSERT/UPDATE/DELETE, then CREATE TABLE with keys. No transactions, indexes, views, window functions, stored procedures, normalization theory, or cross-database dialect differences (MySQL vs. Postgres vs. SQLite) — good material for a possible future "SQL Advanced" course. All SQL taught and run is standard SQLite syntax (since that's what `sql.js` executes), close enough to standard SQL for everyday querying that the vast majority transfers directly to Postgres/MySQL.

## The sample database

One database, introduced in two phases, used for every lesson's `SqlPlayground` — students should recognize the tables by lesson 5 and never be confused by an unfamiliar schema:

**Phase 1 — single table (lessons 01–15).** `mahsulotlar` (products: `id`, `nom`, `narx`, `kategoriya`) — simple enough for absolute beginners, with two rows carrying a `NULL` `kategoriya` for the NULL-handling lesson.

**Phase 2 — full relational schema (lessons 16 onward).** Adds `mijozlar` (customers: `id`, `ism`, `email`, `shahar` — one row with a `NULL` email, one with a `NULL` city, one customer with zero orders for LEFT JOIN), `buyurtmalar` (orders: `id`, `mijoz_id`, `sana`), `buyurtma_tafsilotlari` (order line items: `id`, `buyurtma_id`, `mahsulot_id`, `miqdor`).

The exact `CREATE TABLE`/`INSERT` SQL for both phases is given verbatim in the implementation plan's Global Constraints — every lesson's `SqlPlayground schema` prop must use it verbatim (copy-paste, not paraphrase), so the data students see never drifts between lessons.

## Lesson list

One concept per lesson, atomic and self-contained per [AGENTS.md](../../../AGENTS.md). Sections are consecutive so the sidebar groups them correctly.

| File | `meta.section` | `meta.title` | Must cover | Schema phase |
|---|---|---|---|---|
| `01-malumotlar-bazasi-va-sql-nima.jsx` | Kirish | Ma'lumotlar bazasi va SQL nima? | What a database/table is, what SQL is for, the relational model in plain terms — no playground yet, this is pure orientation | — |
| `02-jadval-qator-va-ustun.jsx` | Kirish | Jadvallar, qatorlar va ustunlar | The `mahsulotlar` table introduced; rows/columns/primary key concept; first-ever `SqlPlayground` (a trivial `SELECT * FROM mahsulotlar;`) | 1 |
| `03-select-va-from.jsx` | SELECT asoslari | SELECT va FROM | Selecting specific columns vs. `SELECT *` | 1 |
| `04-where.jsx` | SELECT asoslari | WHERE — filtrlash | Basic row filtering | 1 |
| `05-solishtirish-operatorlari.jsx` | SELECT asoslari | Solishtirish operatorlari | `= != > < >= <=` | 1 |
| `06-order-by.jsx` | SELECT asoslari | ORDER BY | Sorting, ASC/DESC, multi-column sort | 1 |
| `07-limit.jsx` | SELECT asoslari | LIMIT | Capping result size | 1 |
| `08-and-or-not.jsx` | Murakkab filtrlash | AND, OR, NOT | Combining conditions, precedence with parentheses | 1 |
| `09-null.jsx` | Murakkab filtrlash | NULL bilan ishlash | `IS NULL`/`IS NOT NULL`, why `= NULL` never matches (uses the two NULL-`kategoriya` rows) | 1 |
| `10-in-va-between.jsx` | Murakkab filtrlash | IN va BETWEEN | Set membership, ranges | 1 |
| `11-like.jsx` | Murakkab filtrlash | LIKE | Pattern matching, `%`/`_` wildcards | 1 |
| `12-distinct.jsx` | Murakkab filtrlash | DISTINCT | Removing duplicate rows (on `kategoriya`) | 1 |
| `13-agregat-funksiyalar.jsx` | Agregatsiya | Agregat funksiyalar | `COUNT SUM AVG MIN MAX` | 1 |
| `14-group-by.jsx` | Agregatsiya | GROUP BY | Grouping rows before aggregating (by `kategoriya`) | 1 |
| `15-having.jsx` | Agregatsiya | HAVING | Filtering on aggregated results, contrasted directly with WHERE | 1 |
| `16-nega-bir-nechta-jadval.jsx` | JOIN | Nega bir nechta jadval kerak? | Why data is split across tables, foreign keys — introduces the full schema (Phase 2) | 2 |
| `17-inner-join.jsx` | JOIN | INNER JOIN | Combining matched rows from two tables (`mijozlar` + `buyurtmalar`) | 2 |
| `18-left-join.jsx` | JOIN | LEFT JOIN | Keeping unmatched rows (surfaces the zero-order customer) | 2 |
| `19-kop-jadval-birlashtirish.jsx` | JOIN | Bir nechta jadvalni birlashtirish | Joining all 4 tables at once (who bought what) | 2 |
| `20-quyi-sorovlar.jsx` | Kengaytirilgan so'rovlar | Quyi so'rovlar (Subqueries) | A query inside a query (e.g. `WHERE ... IN (SELECT ...)`) | 2 |
| `21-taxalluslar.jsx` | Kengaytirilgan so'rovlar | Taxalluslar (Aliases) | `AS` for columns/tables, readability in multi-table queries | 2 |
| `22-case.jsx` | Kengaytirilgan so'rovlar | CASE | Conditional logic inside SELECT (e.g. price-tier labels) | 2 |
| `23-insert.jsx` | Ma'lumotlarni o'zgartirish | INSERT | Adding rows (to `mijozlar`) | 2 |
| `24-update.jsx` | Ma'lumotlarni o'zgartirish | UPDATE | Modifying rows, and the "forgot WHERE" danger (updates every row) | 2 |
| `25-delete.jsx` | Ma'lumotlarni o'zgartirish | DELETE | Removing rows, same WHERE danger | 2 |
| `26-create-table.jsx` | Jadval yaratish | CREATE TABLE | Schema definition, data types — student creates a new `sharhlar` (reviews) table from scratch in the playground | 2 |
| `27-primary-va-foreign-key.jsx` | Jadval yaratish | PRIMARY KEY va FOREIGN KEY | Keys and relationships, ties back to lesson 16 and the table created in lesson 26 | 2 |
| `28-yakuniy-loyiha.jsx` | Amaliy loyiha | Yakuniy loyiha | Capstone: a series of real business questions ("which city has the most customers", "top-selling product", etc.) answered against the full schema | 2 |

## Content requirements (apply to every lesson)

- **Language:** Uzbek prose, matching the existing courses' tone (see `src/courses/python/lessons/02-variables.jsx`). SQL keywords stay uppercase/English by convention; new terms get a bracketed Uzbek translation on first use per lesson.
- **Primitives:** the standard set (`CodeBlock`, `Callout`, `Quiz`, `Exercise`, `Solution`, `KeyPoints`, `Figure`) plus the new `SqlPlayground` — exact contracts in AGENTS.md. Never invent new props.
- **Hands-on requirement (this course's version of "Interactivity"):** every lesson from 02 onward includes at least one `SqlPlayground` the student actually runs — this is the practice-based core of the course, not optional decoration. `initialQuery` should be a real, runnable starting point (often the "wrong" or partial version the lesson is about to fix/extend), not empty. Lesson 01 is the sole exception (pure orientation, no playground yet).
- **SQL string literals with an apostrophe:** Uzbek product/customer names containing `'` (e.g. `Sovg'a sertifikati`) must double the apostrophe inside a SQL string literal (`'Sovg''a sertifikati'`) — standard SQL escaping, not optional. Get this right in every `schema`/`CodeBlock` sample; it's the SQL-course equivalent of the Python course's "no apostrophe inside a Python identifier" gotcha.
- **Schema consistency:** copy the Phase 1 or Phase 2 schema SQL (given verbatim in the implementation plan) exactly into every `SqlPlayground schema` prop for that lesson — never invent new tables/columns or alter seed data.
- **Quiz:** still used for conceptual checks (e.g. "what will this query return") — options with no duplicate strings.
- **Exercise + Solution:** still present per lesson, but now typically frames a task to attempt in the lesson's own `SqlPlayground` before revealing the reference query in `Solution`.
- **KeyPoints:** every lesson ends with one.
- **Structure:** every lesson exports `meta = { title, section }` per the table above and a default function component.

## Workflow

Use `subagent-driven-development`, sequential (not parallel) — later lessons assume earlier vocabulary and the schema's phase transition at lesson 16 is a hard dependency boundary:

1. **Writer subagent** drafts the lesson per its table row and the content requirements, using the exact schema SQL from the plan's Global Constraints.
2. **Reviewer subagent** checks: "Must cover" coverage, primitive contracts, the apostrophe-escaping rule, and — critically for this course — that every SQL sample is *actually valid SQLite* and produces the output claimed. A reviewer should mentally (or, if tooling allows, actually) execute each query against the known seed data.
3. Writer revises until approved.
4. `npm run build && npm run lint` clean after each lesson, per AGENTS.md.

No routine browser/Playwright pass per lesson — `SqlPlayground` itself was already validated end-to-end (query execution, aggregates, INSERT persistence, error handling, reset) before this content pass began. One full manual browser pass happens after lesson 28, per the implementation plan's final check.

## Out of scope

Transactions, indexes, views, window functions, stored procedures, normalization theory, multi-database dialect differences, and any change to `SqlPlayground`/`sqlEngine.js`/the registry — this pass is content-only. If a genuine gap in the primitive set is discovered while writing, stop and flag it rather than improvising.
