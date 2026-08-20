# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Deployment (Cloudflare Workers Builds)

This is a plain static SPA deployed as a Workers-with-static-assets project (Worker name `learntocode`) — build command `npm run build`, deploy command `npx wrangler deploy`. `wrangler.jsonc` points `assets.directory` at `dist/` and sets `not_found_handling: "single-page-application"`, which serves `index.html` for any unmatched path so client-side routes (e.g. `/sql/select-va-from`) work on direct load/refresh.

Do **not** add a `public/_redirects` file — it conflicts with `not_found_handling` (Workers assets strip `.html`/`index` from URLs by default, and a `/* /index.html 200` rule on top of that creates a redirect loop that Cloudflare rejects at deploy time).
