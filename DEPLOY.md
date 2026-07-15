# Local Cloudflare Pages Direct Upload Guide

This guide documents the procedures for building and deploying **Desi Nomad Trails** locally directly to Cloudflare Pages, bypassing any GitHub Pages, Actions, or Workers dependencies.

---

## 🛠️ Step-by-Step Deployment Instructions

### 1. Install Dependencies
Ensure all package dependencies are installed locally:
```bash
npm install
```

### 2. Compile and Build
Compile the TypeScript source files, build the optimized Vite bundle, and execute the static site pre-renderer pipeline:
```bash
npm run build
```
This command generates the output folder under `./dist` containing all static pages (including pre-rendered treks, blogs, and general sections).

### 3. Deploy to Cloudflare Pages
To upload the compiled assets folder (`dist`) directly to your Cloudflare Pages project, run:
```bash
npm run deploy
```
This executes `npm run build` and runs `npx wrangler pages deploy dist --project-name=desi-nomad` consecutively.

---

## ⚙️ Updating the Website
1. Make your code modifications inside the `./src` directory.
2. Preview your changes locally using the Vite dev server:
   ```bash
   npm run dev
   ```
3. Once satisfied, execute the one-step deployment:
   ```bash
   npm run deploy
   ```

---

## ⚠️ Troubleshooting

### 1. Authentication Failures
* **Error**: `Authentication failed` or `Token expired`.
* **Fix**: Run `npx wrangler logout` followed by `npx wrangler login` to refresh the session tokens.

### 2. Project Name Mismatch
* **Diagnosis**: Check the project name defined in `package.json` (`--project-name=desi-nomad`). Ensure this matches the project name created in your Cloudflare Pages dashboard.

### 3. SPA Asset Fallback Failures
* **Diagnosis**: Ensure that `dist/_redirects` is compiled successfully. Cloudflare Pages uses this file to route all undefined path fallbacks back to `/index.html` natively.
