# Local Cloudflare Workers Deployment Guide

This guide documents the procedures for building, testing, and deploying **Desi Nomad** locally using Wrangler, bypassing any GitHub Pages or Actions dependencies.

---

## 🛠️ Step-by-Step Deployment Instructions

### 1. Authenticate with Cloudflare
Ensure your local environment is logged into your Cloudflare account. Run the following command:
```bash
npx wrangler login
```
This will automatically open your web browser and prompt you to grant authorization access to Wrangler.

### 2. Compile and Build
Compile the TypeScript source files, build the optimized Vite bundle, and execute the static site pre-renderer pipeline:
```bash
npm run build
```
This command generates the output folder under `./dist` containing all static pages (including pre-rendered treks, blogs, and general sections).

### 3. Deploy to Production
To push all code, worker assets, and route definitions to the live Cloudflare Worker edge nodes, run:
```bash
npm run deploy
```
This executes `npm run build` and runs `npx wrangler deploy` consecutively. Your site is live immediately upon command completion.

---

## ↩️ Rollback Procedure
If you need to roll back to a previous live version due to an error, you can revert directly from your terminal:
1. List your deployment history versions:
   ```bash
   npx wrangler deployments
   ```
2. Rollback to a specific deployment ID (e.g., version `v3`):
   ```bash
   npx wrangler rollback <deployment-id>
   ```

---

## ⚙️ Updating the Website
1. Make your code modifications inside the `./src` directory.
2. Preview your changes locally in the mock Cloudflare environment using Wrangler's local development server:
   ```bash
   npx wrangler dev
   ```
3. Once satisfied, execute the one-step deployment:
   ```bash
   npm run deploy
   ```

---

## ⚠️ Common Errors & Troubleshooting

### 1. Authentication Failures
* **Error**: `Authentication failed` or `Token expired`.
* **Fix**: Run `npx wrangler logout` followed by `npx wrangler login` to refresh the session tokens.

### 2. Execution Policy Warnings (Windows PowerShell)
* **Error**: `npx : File ... cannot be loaded because running scripts is disabled`.
* **Fix**: Run the command bypassing execution policies:
  ```powershell
  powershell -ExecutionPolicy Bypass -Command "npm run deploy"
  ```

### 3. SPA Asset Fallback Failures (404)
* **Diagnosis**: Check **[src/worker.js](file:///c:/Users/ABL%20STORE/Desktop/Desi-nomad-/src/worker.js)** configuration. Ensure that the fall-through route handler is catching requests that lack extensions and serving `/index.html` from `env.ASSETS` correctly.
