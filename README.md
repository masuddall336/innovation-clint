# Innovation Plastic Cans Ltd.

## Deploying to cPanel

Build the production site with `npm run build`, then upload **the contents of the generated `dist` folder** to the domain's document root (usually `public_html`). Keep `index.html`, the `assets` folder, and `.htaccess` together in that directory. Do not upload only `index.html` or place the files inside an extra `dist` directory.

The Vite base path is `/`, so this deployment expects the site at the domain root. The `.htaccess` file enables React Router URLs such as `/products/:id` and ensures missing files under `/assets` return a real 404 instead of the HTML page with the wrong MIME type. If the site is hosted under a subdirectory, configure Vite's `base` to that subdirectory before building.

After uploading, if the browser still shows an older blank page, clear the cPanel/CDN cache and do a hard refresh so the latest `index.html` is used with its matching hashed asset files.

---

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
