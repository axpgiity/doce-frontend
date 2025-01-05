import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  server: {
    port: process.env.PORT || 4321,
  },
  integrations: [react(), tailwind()]
});