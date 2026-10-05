// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://vuhung16au.github.io',
  base: '/prompt-to-system',
  output: 'static',
  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});