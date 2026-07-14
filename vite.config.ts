import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  // Use root base path during local dev or on Cloudflare Pages builds (CF_PAGES environment variable)
  const isLocalDev = command === 'serve';
  const isCloudflare = process.env.CF_PAGES === '1';
  const base = (isLocalDev || isCloudflare) ? '/' : '/Desi-nomad-/';

  return {
    plugins: [react()],
    base: base,
  };
})
