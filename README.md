# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Deployment (Cloudflare Pages)

This is a plain static SPA — build command `npm run build`, output directory `dist`. Do **not** set a custom deploy command (e.g. `wrangler deploy`) in the Pages project settings; leave it blank so Pages serves `dist/` directly. There is no `wrangler.toml`/Workers config in this repo, so `wrangler deploy` has nothing to deploy and will fail.

`public/_redirects` (`/* /index.html 200`) makes client-side routes (e.g. `/sql/select-va-from`) work on direct load/refresh instead of 404ing — it's copied into `dist/` automatically by Vite.
