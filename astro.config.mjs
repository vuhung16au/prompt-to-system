// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://username.github.io',
  base: '/applied-llm-patterns',
  output: 'static',
  integrations: [sitemap()]
});
